/**
 * Cart Update Listener
 * 
 * Provides a centralized event system for listening to cart updates
 * throughout the application. Works with jQuery events and provides
 * a clean API for subscribing to cart changes.
 */

/**
 * Cart update event types
 */
export const CartUpdateTypes = {
    QUANTITY_UPDATE: 'cart:quantity-update',
    ITEM_ADD: 'cart:item-add',
    ITEM_REMOVE: 'cart:item-remove',
    ITEM_UPDATE: 'cart:item-update',
    COUPON_APPLY: 'cart:coupon-apply',
    COUPON_REMOVE: 'cart:coupon-remove',
    GIFT_CERTIFICATE_APPLY: 'cart:gift-certificate-apply',
    GIFT_CERTIFICATE_REMOVE: 'cart:gift-certificate-remove',
    CONTENT_REFRESH: 'cart:content-refresh',
    ANY: 'cart:update', // Generic event for any cart update
};

/**
 * Cart Update Listener class
 * Provides methods to listen to and trigger cart update events
 */
class CartUpdateListener {
    constructor() {
        this.$body = $('body');
        this.listeners = new Map();
    }

    /**
     * Listen to cart updates
     * 
     * @param {Function} callback - Callback function to execute on cart update
     * @param {string|Array} updateTypes - Type(s) of cart updates to listen to
     * @param {Object} options - Additional options
     * @param {boolean} options.once - If true, listener will be removed after first trigger
     * @returns {Function} Unsubscribe function
     */
    on(callback, updateTypes = CartUpdateTypes.ANY, options = {}) {
        const types = Array.isArray(updateTypes) ? updateTypes : [updateTypes];
        const listenerId = `cart-listener-${Date.now()}-${Math.random()}`;
        const handlers = [];

        types.forEach(type => {
            const handler = (event, data) => {
                callback({
                    type,
                    data: data || {},
                    originalEvent: event,
                });
            };

            this.$body.on(type, handler);
            handlers.push({ type, handler });

            // If once option is set, remove listener after first trigger
            if (options.once) {
                this.$body.one(type, handler);
            }
        });

        // Store listener info for cleanup
        this.listeners.set(listenerId, handlers);

        // Return unsubscribe function
        return () => {
            handlers.forEach(({ type, handler }) => {
                this.$body.off(type, handler);
            });
            this.listeners.delete(listenerId);
        };
    }

    /**
     * Listen to cart updates once (removed after first trigger)
     * 
     * @param {Function} callback - Callback function to execute on cart update
     * @param {string|Array} updateTypes - Type(s) of cart updates to listen to
     * @returns {Function} Unsubscribe function
     */
    once(callback, updateTypes = CartUpdateTypes.ANY) {
        return this.on(callback, updateTypes, { once: true });
    }

    /**
     * Trigger a cart update event
     * 
     * @param {string} updateType - Type of cart update
     * @param {Object} data - Data to pass with the event
     */
    trigger(updateType, data = {}) {
        // Trigger specific event type
        this.$body.trigger(updateType, data);

        // Also trigger generic cart:update event
        // if (updateType !== CartUpdateTypes.ANY) {
        //     this.$body.trigger(CartUpdateTypes.ANY, {
        //         type: updateType,
        //         ...data,
        //     });
        // }
    }

    /**
     * Remove all listeners
     */
    removeAllListeners() {
        this.listeners.forEach((handlers) => {
            handlers.forEach(({ type, handler }) => {
                this.$body.off(type, handler);
            });
        });
        this.listeners.clear();
    }
}

// Create singleton instance
const cartUpdateListener = new CartUpdateListener();

/**
 * Convenience function to listen to cart updates
 * 
 * @param {Function} callback - Callback function
 * @param {string|Array} updateTypes - Type(s) of updates to listen to
 * @param {Object} options - Additional options
 * @returns {Function} Unsubscribe function
 */
export function onCartUpdate(callback, updateTypes = CartUpdateTypes.ANY, options = {}) {
    return cartUpdateListener.on(callback, updateTypes, options);
}

/**
 * Convenience function to listen to cart updates once
 * 
 * @param {Function} callback - Callback function
 * @param {string|Array} updateTypes - Type(s) of updates to listen to
 * @returns {Function} Unsubscribe function
 */
export function onceCartUpdate(callback, updateTypes = CartUpdateTypes.ANY) {
    return cartUpdateListener.once(callback, updateTypes);
}

/**
 * Convenience function to trigger cart update events
 * 
 * @param {string} updateType - Type of cart update
 * @param {Object} data - Data to pass with the event
 */
export function triggerCartUpdate(updateType, data = {}) {
    cartUpdateListener.trigger(updateType, data);
}

// Export the singleton instance and class
export default cartUpdateListener;
export { CartUpdateListener };
