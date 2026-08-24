import $ from 'jquery';
import { api } from '@bigcommerce/stencil-utils';

//const MAX_RULES = 7;

const RULES = [
    {
        groupName: 'Dealers',
        prefixes: ['AW-0','AW-25','AW-30','AW-35','AW-4','AW-5','AW-6','AW-7','AW-8','AWB-','AWDC-1','AWDC-2','AWDC-3','AWDC-7','AWH-KIT','AW-KIT-'],
        whitelist: [],
    },
    {
        groupName: 'Certified Contractor',
        prefixes: ['AW-0','AW-25','AW-35','AW-4','AW-5','AW-6','AW-7','AW-8','AWB-','AWCC-1000','AWCC-1006','AWCC-1008','AWCC-2003','AWCC-2019','AWCC-2021','AWCC-2024','AWCC-3','AWCC-4','AWCC-5','AWCC-6','AWCC-7','AWCC-8','AWCCC-1','AWCCC-2','AWCCC-3','AWCCC-7','AWH-KIT','AW-KIT-'],
        whitelist: [],
    },
    {
        groupName: 'Select Builder',
        prefixes: ['AW-0','AW-25','AW-35','AW-4','AW-5','AW-6','AW-7','AW-8','AWB-','AWH-KIT','AW-KIT-','AWSB-3','AWSB-4','AWSB-5','AWSB-6','AWSB-7','AWSB-8','AWSBC-1','AWSBC-2','AWSBC-3','AWSBC-7'],
        whitelist: [],
    },
    {
        groupName: 'Employees',
        prefixes: ['AW'],
        whitelist: [],
    },
    {
        groupName: 'Insider',
        prefixes: ['AW-0','AW-1','AW-20','AW-21','AW-25','AW-30','AW-35','AW-4','AW-5','AW-6','AW-7','AW-8','AWB-','AWH-KIT','AW-KIT-'],
        whitelist: [],
    },
    {
        groupName: 'Other',
        prefixes: ['AW-0','AW-1','AW-20','AW-21','AW-25','AW-30','AW-35','AW-4','AW-5','AW-6','AW-7','AW-8','AWB-','AWH-KIT','AW-KIT-'],
        whitelist: [],
    },
];

function parseRules() {
    return RULES;
}
/*function parseRules(themeSettings) {
    const rules = [];
    for (let i = 1; i <= MAX_RULES; i++) {
        const groupName = themeSettings[`aw-filter-rule-${i}-group-name`];
        const skuPrefixes = themeSettings[`aw-filter-rule-${i}-sku-prefixes`];
        const skuWhitelist = themeSettings[`aw-filter-rule-${i}-sku-whitelist`];

        const prefixes = skuPrefixes
            ? skuPrefixes.split(',').map(p => p.trim().toUpperCase()).filter(p => p)
            : [];
        const whitelist = skuWhitelist
            ? skuWhitelist.split(',').map(s => s.trim().toUpperCase()).filter(s => s)
            : [];

        if (groupName && (prefixes.length > 0 || whitelist.length > 0)) {
            rules.push({
                groupName: groupName.trim(),
                prefixes,
                whitelist,
            });
        }
    }
    return rules;
}*/

function shouldHideProduct(sku, customerGroupName, rules, superUserGroup) {
    if (customerGroupName === superUserGroup) {
        return false;
    }

    const skuUpper = (sku || '').toUpperCase();
    if (!skuUpper) {
        return false; // Don't hide products with empty SKU
    }

    const userRule = rules.find(r => r.groupName === customerGroupName);
    if (!userRule) {
        return true;
    }

    const matchesPrefix = userRule.prefixes.some(prefix => skuUpper.startsWith(prefix));
    const matchesWhitelist = userRule.whitelist.some(entry => skuUpper.includes(entry));
    return !(matchesPrefix || matchesWhitelist);
}

function parseAllowedGroups(raw) {
    if (raw == null || raw === '') return null;
    let list = null;
    try {
        const v = JSON.parse(raw);
        if (Array.isArray(v)) list = v.map(s => String(s).trim()).filter(Boolean);
    } catch (e) { /* not JSON */ }
    if (!list) {
        list = String(raw).split(',').map(s => s.trim()).filter(Boolean);
    }
    return list.length ? list : null;
}

// Super User sees all; no allowed groups means Super User only.
function isProductHidden(product, customerGroupName, superUserGroup) {
    if (customerGroupName && customerGroupName === superUserGroup) {
        return false;
    }
    const allowed = product.allowedGroups;
    if (!allowed || !allowed.length) {
        return true;
    }
    const name = (customerGroupName || '').trim().toLowerCase();
    return !name || !allowed.some(g => g.toLowerCase() === name);
}

function readProductFromEl(el) {
    return {
        sku: el.getAttribute('data-product-sku'),
        id: el.getAttribute('data-entity-id'),
        allowedGroups: parseAllowedGroups(el.getAttribute('data-allowed-groups')),
    };
}

export function applyProductFilter(context, containerSelector, options = {}) {
    const themeSettings = context.themeSettings || {};

    if (!themeSettings['aw-group-filter-enabled']) {
        return { filtered: false };
    }
    const rules = parseRules();
    if (rules.length === 0) {
        document.body.classList.add('aw-filter-applied');
        return { filtered: false };
    }

    const customerGroupName = context.customerGroupName || null;
    const superUserGroup = (themeSettings['aw-super-user-group'] || '').trim();

    if (customerGroupName === superUserGroup) {
        document.body.classList.add('aw-filter-applied');
        return { filtered: false };
    }

    const scope = containerSelector
        ? document.querySelector(containerSelector)
        : document;

    if (!scope) {
        document.body.classList.add('aw-filter-applied');
        return { filtered: false };
    }

    const productElements = scope.querySelectorAll('[data-product-sku][data-entity-id]');
    const excludeRoot = options.exclude ? document.querySelector(options.exclude) : null;
    let visibleProducts = 0;
    let hiddenProducts = 0;

    productElements.forEach(el => {
        if (excludeRoot && excludeRoot.contains(el)) return;
        const product = readProductFromEl(el);
        const parentLi = el.closest('li.product') || el.closest('.productCarousel-slide');
        const target = parentLi || el;

        if (isProductHidden(product, customerGroupName, superUserGroup)) {
            target.style.display = 'none';
            target.setAttribute('aria-hidden', 'true');
            hiddenProducts++;
        } else {
            target.style.display = '';
            target.removeAttribute('aria-hidden');
            visibleProducts++;
        }
    });

    document.body.classList.add('aw-filter-applied');

    $('.productCarousel[data-slick]').each(function () {
        const $carousel = $(this);
        if ($carousel.hasClass('slick-initialized')) {
            $carousel.slick('setPosition');
        }
    });

    return { filtered: true, visibleProducts, hiddenProducts };
}

export function adjustPaginationAfterFilter(filterResult, containerSelector) {
    const container = document.querySelector(containerSelector || '#product-listing-container');
    if (!container) return;

    // Clean up any previous no-products message
    const existingMsg = container.querySelector('.aw-no-products-message');
    if (existingMsg) existingMsg.remove();

    if (!filterResult || !filterResult.filtered) {
        const pagination = container.querySelector('nav.pagination');
        if (pagination) pagination.style.display = '';
        return;
    }

    if (filterResult.visibleProducts === 0) {
        const nextLink = document.querySelector('a[data-page-next], .pagination-item--next a, a[rel="next"]');
        if (nextLink && nextLink.href) {
            window.location.replace(nextLink.href);
            return;
        }

        const pagination = container.querySelector('nav.pagination');
        if (pagination) pagination.style.display = 'none';

        const wrapper = document.createElement('div');
        wrapper.className = 'aw-no-products-message';

        const msg = document.createElement('p');
        msg.textContent = 'No products are available for your group in this category.';
        wrapper.appendChild(msg);

        const grid = container.querySelector('.productGrid, .productList');
        if (grid) {
            grid.after(wrapper);
        } else {
            container.appendChild(wrapper);
        }
    }
}


// Client-side pagination over the visible set, so hiding products doesn't leave
// half-empty native pages. Fetches all listing pages, filters, re-paginates.

const VP_MAX_PAGES = 100;
const VP_COLLECT_TIMEOUT = 25000;
const VP_FETCH_LIMIT = 250;

let vpState = null;
let vpBound = false;

// Ignores the page number so changing facets/sort invalidates the cached set.
function vpSignature(containerSelector) {
    const params = new URLSearchParams(window.location.search);
    params.delete('page');
    return `${window.location.pathname}?${params.toString()}#${containerSelector}`;
}

function vpRequestedPage() {
    const p = parseInt(new URLSearchParams(window.location.search).get('page'), 10);
    return p && p > 0 ? p : 1;
}

function vpScrape(doc, containerSelector) {
    const scope = doc.querySelector(containerSelector) || doc;
    return Array.from(scope.querySelectorAll('[data-product-sku][data-entity-id]')).map((el) => {
        const wrapper = el.closest('li.product') || el;
        return {
            sku: el.getAttribute('data-product-sku') || '',
            id: el.getAttribute('data-entity-id') || null,
            allowedGroups: parseAllowedGroups(el.getAttribute('data-allowed-groups')),
            html: wrapper.outerHTML,
        };
    });
}

const VP_CONCURRENCY = 6;

// Fetch one listing page as a fragment via the same remote API faceted search uses.
function vpFetchFragment(remote, pageNum) {
    const params = new URLSearchParams(window.location.search);
    params.set('page', String(pageNum));
    const url = `${window.location.pathname}?${params.toString()}`;
    return new Promise((resolve) => {
        api.getPage(url, { template: remote.template, config: remote.buildConfig(VP_FETCH_LIMIT) }, (err, content) => {
            if (err || !content) { resolve(''); return; }
            if (typeof content === 'string') { resolve(content); return; }
            resolve(content[remote.template] || content[Object.keys(content)[0]] || '');
        });
    });
}

async function vpFetchPage(remote, containerSelector, pageNum, parser) {
    const html = await vpFetchFragment(remote, pageNum);
    if (!html) return { items: [], doc: null, hasNext: false };
    const doc = parser.parseFromString(html, 'text/html');
    // "next" link is the reliable signal that more pages exist (BC caps our limit).
    const hasNext = !!doc.querySelector('.pagination-item--next');
    return { items: vpScrape(doc, containerSelector), doc, hasNext };
}

async function vpCollectAll(remote, containerSelector) {
    const parser = new DOMParser();
    const out = [];
    const seen = new Set();
    const pushNew = (items) => {
        let added = 0;
        items.forEach((it) => {
            const key = it.id || it.html;
            if (seen.has(key)) return; // BC clamps pages beyond the last, so guard dupes
            seen.add(key);
            out.push(it);
            added += 1;
        });
        return added;
    };

    const first = await vpFetchPage(remote, containerSelector, 1, parser);
    const gridClass = first.doc && first.doc.querySelector('.productList') ? 'productList' : 'productGrid';
    pushNew(first.items);

    let done = first.items.length === 0 || !first.hasNext;
    let page = 2;
    while (!done && page <= VP_MAX_PAGES) {
        const batch = [];
        for (let i = 0; i < VP_CONCURRENCY && page <= VP_MAX_PAGES; i++, page++) batch.push(page);

        // eslint-disable-next-line no-await-in-loop
        const results = await Promise.all(batch.map((p) => vpFetchPage(remote, containerSelector, p, parser)));
        results.forEach((r) => {
            if (!r || r.items.length === 0) { done = true; return; }
            const added = pushNew(r.items);
            if (added === 0 || !r.hasNext) done = true;
        });
    }

    return { items: out, gridClass };
}

function vpUnveilImages(grid) {
    if (window.lazySizes && window.lazySizes.loader) {
        window.lazySizes.loader.checkElems();
        return;
    }
    grid.querySelectorAll('img.lazyload[data-srcset]').forEach((img) => {
        img.setAttribute('srcset', img.getAttribute('data-srcset'));
        const dataSrc = img.getAttribute('data-src');
        if (dataSrc) img.setAttribute('src', dataSrc);
        img.classList.remove('lazyload');
        img.classList.add('lazyloaded');
    });
}

function vpBuildPagination(total, current) {
    if (total <= 1) return '';
    const params = new URLSearchParams(window.location.search);
    const urlFor = (n) => {
        params.set('page', String(n));
        return `${window.location.pathname}?${params.toString()}`;
    };
    const item = (n, label, liExtra = '', aExtra = '') =>
        `<li class="pagination-item${liExtra}"><a class="pagination-link" href="${urlFor(n)}" data-aw-vpage="${n}"${aExtra}>${label}</a></li>`;

    const prevIcon = '<i class="icon" aria-hidden="true"><svg><use href="#icon-chevron-left"></use></svg></i>';
    const nextIcon = '<i class="icon" aria-hidden="true"><svg><use href="#icon-chevron-right"></use></svg></i>';

    const DELTA = 5;
    const start = Math.max(1, current - DELTA);
    const end = Math.min(total, current + DELTA);

    let items = '';
    if (current > 1) items += item(current - 1, `${prevIcon}Previous`, ' pagination-item--previous', ' aria-label="Previous"');
    for (let n = start; n <= end; n++) {
        const isCur = n === current;
        items += item(n, String(n), isCur ? ' pagination-item--current' : '', isCur ? ' aria-current="page" data-pagination-current-page-link' : '');
    }
    if (current < total) items += item(current + 1, `Next${nextIcon}`, ' pagination-item--next', ' aria-label="Next"');

    return `<nav class="pagination" aria-label="pagination" data-aw-pagination><ul class="pagination-list">${items}</ul></nav>`;
}

function vpUpdateCount(container, total) {
    const bar = container.querySelector('.actionBar');
    if (!bar) return;
    let el = container.querySelector('.aw-visible-count');
    if (!el) {
        el = document.createElement('span');
        el.className = 'aw-visible-count';
        container.appendChild(el);
    }
    el.textContent = total > 0 ? `${total} ${total === 1 ? 'Product' : 'Products'}` : '';
    el.style.top = `${bar.offsetTop + bar.offsetHeight / 4}px`;
}

function vpRenderCurrent() {
    if (!vpState) return;
    const { container, grid, visible, perPage } = vpState;

    container.querySelectorAll('.aw-no-products-message').forEach((n) => n.remove());
    container.querySelectorAll('nav.pagination').forEach((n) => n.remove());

    if (visible.length === 0) {
        vpUpdateCount(container, 0);
        grid.innerHTML = '';
        const msg = document.createElement('p');
        msg.className = 'aw-no-products-message';
        msg.textContent = 'No products are available.';
        grid.after(msg);
        return;
    }

    const total = Math.max(1, Math.ceil(visible.length / perPage));
    const requested = vpRequestedPage();
    const page = requested > total ? total : requested;

    // Correct the URL when it points past the last page.
    if (requested !== page) {
        const params = new URLSearchParams(window.location.search);
        if (page > 1) params.set('page', String(page));
        else params.delete('page');
        const qs = params.toString();
        window.history.replaceState({ awVpage: page }, '', `${window.location.pathname}${qs ? `?${qs}` : ''}`);
    }

    grid.innerHTML = visible.slice((page - 1) * perPage, page * perPage).join('');
    vpUpdateCount(container, visible.length);

    const nav = vpBuildPagination(total, page);
    if (nav) grid.insertAdjacentHTML('afterend', nav);

    vpUnveilImages(grid);
    $('body').triggerHandler('compareReset');
}

function vpEnsureBound() {
    if (vpBound) return;
    vpBound = true;

    document.addEventListener('click', (e) => {
        const link = e.target.closest('[data-aw-pagination] a[data-aw-vpage]');
        if (!link || !vpState) return;
        e.preventDefault();
        const n = parseInt(link.getAttribute('data-aw-vpage'), 10) || 1;
        const params = new URLSearchParams(window.location.search);
        params.set('page', String(n));
        window.history.pushState({ awVpage: n }, '', `${window.location.pathname}?${params.toString()}`);
        vpRenderCurrent();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    window.addEventListener('popstate', () => vpRenderCurrent());
}

export const VP_REMOTES = {
    category: { template: 'category/product-listing', buildConfig: (limit) => ({ category: { products: { limit } } }) },
    brand: { template: 'brand/product-listing', buildConfig: (limit) => ({ shop_by_brand: true, brand: { products: { limit } } }) },
    search: { template: 'search/product-listing', buildConfig: (limit) => ({ product_results: { limit } }) },
};

export async function applyVisiblePagination(context, remote, containerSelector = '#product-listing-container') {
    const themeSettings = context.themeSettings || {};
    const reveal = () => {
        document.body.classList.add('aw-filter-applied');
        document.body.classList.remove('aw-vp-pending');
    };
    const container = document.querySelector(containerSelector);

    if (!container || !remote || !themeSettings['aw-group-filter-enabled']) {
        reveal();
        return { filtered: false };
    }

    const customerGroupName = context.customerGroupName || null;
    const superUserGroup = (themeSettings['aw-super-user-group'] || '').trim();
    if (customerGroupName && customerGroupName === superUserGroup) {
        reveal();
        return { filtered: false };
    }

    const existingGrid = container.querySelector('.productGrid, .productList');
    const rules = parseRules();
    const perPage = parseInt(
        context.categoryProductsPerPage || context.brandProductsPerPage || context.productsPerPage, 10,
    ) || (existingGrid && existingGrid.children.length) || 12;

    const signature = vpSignature(containerSelector);

    try {
        let visible;
        let gridClass;
        if (vpState && vpState.signature === signature && vpState.visible) {
            visible = vpState.visible;
            gridClass = vpState.gridClass;
        } else {
            // Hide the listing before the first await so the native grid never paints.
            document.body.classList.add('aw-vp-pending');
            const collected = await Promise.race([
                vpCollectAll(remote, containerSelector),
                new Promise((_, reject) => setTimeout(() => reject(new Error('vp collect timeout')), VP_COLLECT_TIMEOUT)),
            ]);
            const { items, gridClass: gc } = collected;
            gridClass = gc;
            visible = items
                .filter((p) => !isProductHidden(p, customerGroupName, superUserGroup))
                .map((p) => p.html);
        }

        // An out-of-range ?page=N renders an empty "no products" page with no grid.
        let grid = container.querySelector('.productGrid, .productList');
        if (!grid) {
            container.querySelectorAll('[data-no-products-notification]').forEach((n) => n.remove());
            grid = document.createElement('ul');
            grid.className = gridClass || 'productGrid';
            container.appendChild(grid);
        }

        vpState = { signature, container, grid, visible, perPage, gridClass };
        vpEnsureBound();
        vpRenderCurrent();
    } catch (e) {
        console.error('[aw] visible pagination failed, showing native listing:', e);
    } finally {
        reveal();
    }

    return { filtered: true, visibleProducts: vpState && vpState.visible ? vpState.visible.length : 0 };
}

export function handleGuestRedirect(context) {
    const themeSettings = context.themeSettings || {};

    if (!themeSettings['aw-guest-redirect-enabled']) {
        return;
    }

    const isGuest = context.customerGroupName == null;

    if (!isGuest) {
        return;
    }

    const redirectUrl = themeSettings['aw-b2c-generic-login-url'];

    const currentPath = window.location.pathname.toLowerCase();
    const excludedPaths = [
        '/login',
        '/login.php',
        '/account.php',
        '/saml/',
        '/create-account',
        '/forgot-password',
    ];

    if (excludedPaths.some(path => currentPath.startsWith(path))) {
        return;
    }

    window.location.href = redirectUrl;
}
