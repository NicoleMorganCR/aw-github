import utils from '@bigcommerce/stencil-utils';
import PageManager from './page-manager';
import { initCarousel } from './common/carousel';

const SLIDES_TEMPLATE = 'products/carousel-slides';

const NEW_PRODUCTS_QUERY = `
    query NewProductsByCategory($categoryEntityIds: [Int!], $first: Int!) {
        site {
            search {
                searchProducts(
                    filters: { categoryEntityIds: $categoryEntityIds }
                    sort: NEWEST
                ) {
                    products(first: $first) {
                        edges {
                            node {
                                entityId
                            }
                        }
                    }
                }
            }
        }
    }
`;

function fetchNewestProductIds(categoryEntityIds, first, storefrontAPIToken) {
    return fetch('/graphql', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${storefrontAPIToken}`,
        },
        body: JSON.stringify({
            query: NEW_PRODUCTS_QUERY,
            variables: { categoryEntityIds, first },
        }),
    })
        .then(response => response.json())
        .then(({ data, errors }) => {
            if (errors && errors.length) {
                throw new Error(errors[0].message);
            }

            return data.site.search.searchProducts.products.edges.map(({ node }) => node.entityId);
        });
}

/**
 * Renders the carousel slides for the given products in a single request. The compare page is
 * used as the render context because it is the only storefront page whose context exposes a list
 * of arbitrary products in the shape the product card partial expects. Products the shopper is
 * not allowed to see are dropped by the storefront, so the response is customer group aware.
 */
function fetchSlides(compareUrl, productIds) {
    return new Promise(resolve => {
        utils.api.getPage(`${compareUrl}/${productIds.join('/')}`, { template: SLIDES_TEMPLATE }, (err, response) => {
            resolve(err || !response ? '' : response);
        });
    });
}

/**
 * The compare page returns the products ordered by entity ID, so restore the order the
 * GraphQL query returned them in (newest first) and renumber the analytics positions.
 */
function orderSlides(html, productIds) {
    const $rendered = $('<div></div>').html(html).children('[data-product-slide]');

    return productIds
        .map(productId => $rendered.filter(`[data-product-id="${productId}"]`).first())
        .filter($slide => $slide.length)
        .map(($slide, index) => {
            $slide.find('.card').attr({
                'data-event-type': 'list',
                'data-position': index + 1,
            });

            return $slide;
        });
}

export default class Home extends PageManager {
    onReady() {
        const $carousel = $('.productCarousel[data-category-ids]');

        if (!$carousel.length) {
            return;
        }

        const $section = $carousel.closest('[data-new-products]');
        const removeSection = () => $section.remove();
        const { storefrontAPIToken, urls } = this.context;

        if (!storefrontAPIToken) {
            removeSection();
            return;
        }

        const categoryEntityIds = ($carousel.data('categoryIds') || '')
            .toString()
            .split(',')
            .map(id => parseInt(id.trim(), 10))
            .filter(id => !Number.isNaN(id));

        const first = parseInt($carousel.data('productsLimit'), 10) || 12;

        if (!categoryEntityIds.length) {
            removeSection();
            return;
        }

        let orderedProductIds = [];

        fetchNewestProductIds(categoryEntityIds, first, storefrontAPIToken)
            .then(productIds => {
                orderedProductIds = productIds;

                if (!productIds.length) {
                    return '';
                }

                return fetchSlides((urls && urls.compare) || '/compare', productIds);
            })
            .then(html => {
                const $slides = html ? orderSlides(html, orderedProductIds) : [];

                // Nothing to show from the custom query: drop the whole section rather than
                // falling back to the server rendered new products.
                if (!$slides.length) {
                    removeSection();
                    return;
                }

                if ($carousel.hasClass('slick-initialized')) {
                    $carousel.slick('unslick');
                }

                $carousel.off().empty().append($slides);

                if ($slides.length > 1) {
                    $carousel.append($('<span data-carousel-content-change-message class="aria-description--hidden" aria-live="polite" role="status"></span>'));
                }

                $section.removeAttr('hidden');

                initCarousel($carousel, this.context);
            })
            .catch(removeSection);
    }
}
