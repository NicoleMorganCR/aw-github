import 'focus-within-polyfill';

import './global/jquery-migrate';
import './common/select-option-plugin';
import PageManager from './page-manager';
import quickSearch from './global/quick-search';
import currencySelector from './global/currency-selector';
import mobileMenuToggle from './global/mobile-menu-toggle';
import menu from './global/menu';
import foundation from './global/foundation';
import quickView from './global/quick-view';
import cartPreview from './global/cart-preview';
import carousel from './common/carousel';
import svgInjector from './global/svg-injector';
import customScripts from './custom/custom-scripts';
import { applyProductFilter, adjustPaginationAfterFilter, handleGuestRedirect } from './custom/customer-group-filter';
import { onCartUpdate, CartUpdateTypes } from './global/cart-update-listener';
import { syncFees } from './global/cart-sync';

export default class Global extends PageManager {
    onReady() {
        handleGuestRedirect(this.context);

        const { cartId, secureBaseUrl } = this.context;
        cartPreview(secureBaseUrl, cartId);
        quickSearch(this.context);
        currencySelector(cartId);
        foundation($(document));
        quickView(this.context);
        carousel(this.context);
        menu();
        mobileMenuToggle();
        svgInjector();
        customScripts(this.context);

        const filterResult = applyProductFilter(this.context);
        adjustPaginationAfterFilter(filterResult);
        
        // Listen for cart updates on any page
        onCartUpdate((update) => {
            console.log('Cart updated:', update);
            console.log('Cart ID:', cartId);
            console.log('Update data:', update.data);

            const eventCartId = update.data?.cartId || cartId;
            syncFees(eventCartId);
            // Only reload window if on the cart page
            setTimeout(() => {
                if (window.location.pathname === '/cart.php' || window.location.pathname.startsWith('/cart')) {
                    window.location.reload();
                }
            }, 1000);
        }, CartUpdateTypes.ANY);
    }
}
