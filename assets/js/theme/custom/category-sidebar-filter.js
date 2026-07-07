// Interactive sidebar "Filter by Group" for Andersen category pages.
// Filters visible products by SKU prefix based on checkbox selection.

const GROUP_PREFIXES = {
    employee: ['AW-', 'AWDC-', 'AWDCC-', 'AWCC-', 'AWCCC-', 'AWSB-', 'AWSBC-'],
    dealer:   ['AWDC-', 'AWDCC-'],
    cc:       ['AWCC-', 'AWCCC-'],
    sb:       ['AWSB-', 'AWSBC-'],
    insider:  ['AW-', 'AWDC-'],
};

function skuMatchesGroup(sku, group) {
    const skuUpper = (sku || '').toUpperCase();
    return GROUP_PREFIXES[group].some(prefix => skuUpper.startsWith(prefix));
}

function applyGroupFilter() {
    const checked = Array.from(
        document.querySelectorAll('.aw-group-filter-checkbox:checked')
    ).map(el => el.value);

    const products = document.querySelectorAll('#product-listing-container [data-product-sku]');

    products.forEach(el => {
        const sku = el.getAttribute('data-product-sku');
        const row = el.closest('li.product') || el.closest('.productCarousel-slide') || el;

        if (checked.length === 0) {
            // No filters active — show everything
            row.style.display = '';
            row.removeAttribute('aria-hidden');
        } else {
            // Show if SKU matches ANY of the checked groups
            const visible = checked.some(group => skuMatchesGroup(sku, group));
            row.style.display = visible ? '' : 'none';
            if (visible) {
                row.removeAttribute('aria-hidden');
            } else {
                row.setAttribute('aria-hidden', 'true');
            }
        }
    });
}

export function initCategorySidebarFilter(context) {
    if ((context.customerGroupName || '').toLowerCase() !== 'employees') {
        const el = document.getElementById('aw-group-filter');
        if (el) el.style.display = 'none';
        return;
    }

    document.addEventListener('change', (e) => {
        if (e.target.classList.contains('aw-group-filter-checkbox')) {
            applyGroupFilter();
        }
    });
}
