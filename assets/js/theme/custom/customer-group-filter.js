import $ from 'jquery';

const MAX_RULES = 7;

function parseRules(themeSettings) {
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
}

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

export function applyProductFilter(context, containerSelector) {
    const themeSettings = context.themeSettings || {};

    if (!themeSettings['aw-group-filter-enabled']) {
        return { filtered: false };
    }

    const rules = parseRules(themeSettings);
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

    const productElements = scope.querySelectorAll('[data-product-sku]');
    let visibleProducts = 0;
    let hiddenProducts = 0;

    productElements.forEach(el => {
        const sku = el.getAttribute('data-product-sku');
        const parentLi = el.closest('li.product') || el.closest('.productCarousel-slide');
        const target = parentLi || el;

        if (shouldHideProduct(sku, customerGroupName, rules, superUserGroup)) {
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
        // No visible products on this page — hide pagination and show message
        const pagination = container.querySelector('nav.pagination');
        if (pagination) {
            pagination.style.display = 'none';
        }

        const wrapper = document.createElement('div');
        wrapper.className = 'aw-no-products-message';

        const msg = document.createElement('p');
        msg.textContent = 'No more products are available.';
        wrapper.appendChild(msg);

        // Build a "Go Back" button linking to the previous page
        const url = new URL(window.location.href);
        const currentPage = parseInt(url.searchParams.get('page'), 10) || 1;
        if (currentPage > 1) {
            url.searchParams.set('page', currentPage - 1);
            const backBtn = document.createElement('a');
            backBtn.href = url.toString();
            backBtn.className = 'button button--primary';
            backBtn.textContent = 'Go to Previous Page';
            wrapper.appendChild(backBtn);
        }

        const grid = container.querySelector('.productGrid, .productList');
        if (grid) {
            grid.after(wrapper);
        } else {
            container.appendChild(wrapper);
        }
    }
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
