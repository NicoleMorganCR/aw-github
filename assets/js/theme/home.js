import PageManager from './page-manager';
import { initCarousel } from './common/carousel';
import { createAllowedGroupsCheck } from './custom/customer-group-filter';

const ALLOWED_GROUPS_FIELD = 'Allowed Groups';
const CARD_IMAGE_WIDTH = 500;

// Incomplete or non-purchasable products are skipped, so ask for more candidates than the
// carousel needs. The storefront API caps `first` at 50.
const CANDIDATE_MULTIPLIER = 10;
const MAX_CANDIDATES = 50;

const NEW_PRODUCTS_QUERY = `
    query NewProductsByCategory($categoryEntityIds: [Int!], $first: Int!, $imageWidth: Int!) {
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
                                name
                                path
                                sku
                                description
                                defaultImage {
                                    url(width: $imageWidth)
                                    altText
                                }
                                categories(first: 1) {
                                    edges {
                                        node {
                                            entityId
                                        }
                                    }
                                }
                                prices(currencyCode: USD) {
                                    price {
                                        value
                                        currencyCode
                                    }
                                    salePrice {
                                        value
                                        currencyCode
                                    }
                                }
                                inventory {
                                    isInStock
                                }
                                availabilityV2 {
                                    status
                                }
                                variants(first: 2) {
                                    edges {
                                        node {
                                            entityId
                                        }
                                    }
                                }
                                customFields {
                                    edges {
                                        node {
                                            name
                                            value
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`;

/**
 * Only merchandised products belong in the carousel: a product stays out until it has an image,
 * a category and a description in BigCommerce, so half finished products never reach the homepage.
 */
function isProductComplete({
    defaultImage, categories, description, name, path,
}) {
    const hasImage = Boolean(defaultImage && defaultImage.url);
    const hasCategory = Boolean(categories && categories.edges && categories.edges.length);
    const hasDescription = Boolean(description && description
        .replace(/<[^>]*>/g, ' ')
        .replace(/&nbsp;/gi, ' ')
        .trim());

    return hasImage && hasCategory && hasDescription && Boolean(name) && Boolean(path);
}

// A product is only shown if it can actually be added to the cart: in stock and not
// disabled/preorder-only. `isInStock` alone isn't enough — a product can report stock while
// still being marked Unavailable on the storefront.
function isPurchasable({ inventory, availabilityV2 }) {
    return Boolean(inventory && inventory.isInStock)
        && Boolean(availabilityV2 && availabilityV2.status === 'Available');
}

// Mirrors the data-allowed-groups attribute the card partial renders from the same custom field.
function allowedGroupsOf({ customFields }) {
    const values = ((customFields && customFields.edges) || [])
        .map(({ node }) => node)
        .filter(({ name }) => name === ALLOWED_GROUPS_FIELD)
        .map(({ value }) => value);

    return values.length ? values.join(',') : null;
}

function fetchNewestProducts(categoryEntityIds, limit, storefrontAPIToken, isAllowedForCustomer) {
    return fetch('/graphql', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${storefrontAPIToken}`,
        },
        body: JSON.stringify({
            query: NEW_PRODUCTS_QUERY,
            variables: {
                categoryEntityIds,
                first: Math.min(limit * CANDIDATE_MULTIPLIER, MAX_CANDIDATES),
                imageWidth: CARD_IMAGE_WIDTH,
            },
        }),
    })
        .then(response => response.json())
        .then(({ data, errors }) => {
            if (errors && errors.length) {
                throw new Error(errors[0].message);
            }

            return data.site.search.searchProducts.products.edges
                .map(({ node }) => node)
                .filter(isProductComplete)
                .filter(isPurchasable)
                .filter(node => isAllowedForCustomer(allowedGroupsOf(node)))
                .slice(0, limit);
        });
}

function formatPrice({ value, currencyCode }) {
    try {
        return new Intl.NumberFormat(undefined, {
            style: 'currency',
            currency: currencyCode,
            currencyDisplay: 'narrowSymbol',
        }).format(value);
    } catch (e) {
        return `${currencyCode} ${value}`;
    }
}

function priceOf({ prices }) {
    if (!prices) {
        return null;
    }

    return (prices.salePrice && prices.salePrice.value != null) ? prices.salePrice : prices.price;
}

// Mirrors the theme's `ellipsis` Handlebars helper: strip markup, collapse whitespace, cap length.
function summarize(description, length = 100) {
    const text = (description || '')
        .replace(/<[^>]*>/g, ' ')
        .replace(/&nbsp;/gi, ' ')
        .replace(/\s+/g, ' ')
        .trim();

    return text.length > length ? `${text.slice(0, length).trim()}...` : text;
}

function hasOptions({ variants }) {
    return Boolean(variants && variants.edges && variants.edges.length > 1);
}

// Built from GraphQL data rather than an AJAX-rendered partial: the `products/card` template
// depends on being invoked from inside a `{{#each products}}` list and cannot be rendered in
// isolation through the storefront's AJAX render endpoints (confirmed on both the production
// and staging stores). This also avoids depending on the store's Product Comparisons feature,
// which the previous compare-page-based approach silently relied on being enabled.
function buildCardSlide(node, position, allowedGroupsRaw, showQuickView) {
    const {
        entityId, name, path, sku, description, defaultImage,
    } = node;
    const price = priceOf(node);

    const $slide = $('<div data-product-slide class="productCarousel-slide"></div>');
    const $card = $('<article class="card"></article>').attr({
        'data-test': `card-${entityId}`,
        'data-event-type': 'list',
        'data-entity-id': entityId,
        'data-position': position,
        'data-name': name,
    });

    if (allowedGroupsRaw) {
        $card.attr('data-allowed-groups', allowedGroupsRaw);
    }

    const $figure = $('<figure class="card-figure"></figure>');
    const $link = $('<a class="card-figure__link" data-event-type="product-click"></a>').attr({ href: path, 'aria-label': name });
    const $imgContainer = $('<div class="card-img-container"></div>');
    const $img = $('<img class="card-image">').attr({
        src: defaultImage.url,
        alt: defaultImage.altText || name,
    });

    $imgContainer.append($img);
    $link.append($imgContainer);
    $figure.append($link);

    // The quickview button relies on the site-wide click handler bound in quick-view.js
    // (delegated on `body`), so no extra wiring is needed here beyond the markup it expects.
    const $figcaptionBody = $('<div class="card-figcaption-body"></div>');

    if (showQuickView) {
        const $quickViewButton = $('<button type="button" class="button button--small card-figcaption-button quickview" data-event-type="product-click"></button>')
            .attr('data-product-id', entityId)
            .text('Quick view');

        $figcaptionBody.append($quickViewButton);
    }

    // Every product reaching this point already passed the isPurchasable() filter upstream.
    const $actionLink = hasOptions(node)
        ? $('<a data-event-type="product-click" class="button button--small card-figcaption-button"></a>')
            .attr({ href: path, 'data-product-id': entityId })
            .text('Choose Options')
        : $('<a data-event-type="product-click" data-button-type="add-cart" class="button button--small card-figcaption-button"></a>')
            .attr({ href: `/cart.php?action=add&product_id=${entityId}&qty=1`, 'data-product-id': entityId })
            .text('Add to Cart');

    $figcaptionBody.append($actionLink);

    const $figcaption = $('<figcaption class="card-figcaption"></figcaption>').append($figcaptionBody);
    $figure.append($figcaption);

    const $body = $('<div class="card-body"></div>');
    const $title = $('<span class="card-title"></span>');
    const $titleLink = $('<a data-event-type="product-click"></a>').attr('href', path).text(name);

    $title.append($titleLink);
    $body.append($title);

    if (sku) {
        $body.append($('<p class="card-text card-sku" style="color:#999;font-size:0.8em;margin-top:2px;"></p>').text(sku));
    }

    const summary = summarize(description);
    if (summary) {
        $body.append($('<p class="card-text" data-test-info-type="summary"></p>').text(summary));
    }

    if (price) {
        const $priceWrap = $('<div class="card-text" data-test-info-type="price"></div>');
        $priceWrap.append($('<span class="price price--withTax"></span>').text(formatPrice(price)));
        $body.append($priceWrap);
    }

    $card.append($figure, $body);
    $slide.append($card);

    return $slide;
}

export default class Home extends PageManager {
    onReady() {
        const $carousel = $('.productCarousel[data-category-ids]');

        if (!$carousel.length) {
            return;
        }

        const $section = $carousel.closest('[data-new-products]');
        const removeSection = () => $section.remove();
        const { storefrontAPIToken } = this.context;

        if (!storefrontAPIToken) {
            removeSection();
            return;
        }

        const categoryEntityIds = ($carousel.data('categoryIds') || '')
            .toString()
            .split(',')
            .map(id => parseInt(id.trim(), 10))
            .filter(id => !Number.isNaN(id));

        const limit = parseInt($carousel.data('productsLimit'), 10) || 12;

        if (!categoryEntityIds.length) {
            removeSection();
            return;
        }

        const showQuickView = Boolean(this.context.themeSettings && this.context.themeSettings.show_product_quick_view);

        fetchNewestProducts(categoryEntityIds, limit, storefrontAPIToken, createAllowedGroupsCheck(this.context))
            .then(products => {
                const $slides = products.map((node, index) => buildCardSlide(node, index + 1, allowedGroupsOf(node), showQuickView));

                // Nothing to show from the custom query, or nothing this customer group may
                // see: drop the whole section rather than falling back to the server
                // rendered new products.
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
