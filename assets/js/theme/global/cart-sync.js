/**
 * Cart Sync Utilities
 * 
 * Functions for syncing cart data, fees, and other cart-related operations
 */

import utils from '@bigcommerce/stencil-utils';
import { normalizeFormData } from '../common/utils/api';

const FEE_PRODUCT_ID = 929;
const SURCHARGE_PRODUCT_ID = 930;
export const NO_CHARGE_COBRANDABLE_SKUS = Object.freeze([
    'AWCCC-7001',
    'AWCCC-7009',
    'AWCCC-7010',
    'AWCCC-7011',
    'AWCCC-7012',
    'AWCCC-7013',
    'AWCCC-7014',
    'AWCCC-7015',
    'AWCCC-7016',
    'AWCCC-7017',
    'AWCCC-7018',
    'AWDC-7006',
    'AWDC-7007',
    'AWDC-7008',
    'AWDC-7009',
    'AWDC-7010',
    'AWDC-7011',
    'AWSBC-7005',
]);

function getCartOptionName(option) {
    return option.name || option.displayName || option.label || 'Unknown';
}

function getCartOptionValue(option) {
    return option.value || option.displayValue || option.text || option.selectedValue || 'Unknown';
}

function normalizeSku(sku) {
    return (sku || '').trim().toUpperCase();
}

export function isNoChargeCobrandableSku(sku) {
    return NO_CHARGE_COBRANDABLE_SKUS.includes(normalizeSku(sku));
}

export function getCartCobrandingState(items = []) {
    return items.reduce((state, item) => {
        const options = Array.isArray(item.options) ? item.options : [];
        const isCobrandable = options.some((option) => (
            getCartOptionName(option) === 'Do you want to Cobrand this item?'
            && getCartOptionValue(option) === 'Yes'
        ));

        if (isCobrandable && !isNoChargeCobrandableSku(item.sku)) {
            state.cobrandable_quantity += Number(item.quantity) || 0;
        }

        if (!state.hasDstFile) {
            state.hasDstFile = options.some((option) => (
                getCartOptionName(option) === 'Do you have a dst file?'
                && getCartOptionValue(option) === 'Yes'
            ));
        }

        return state;
    }, {
        cobrandable_quantity: 0,
        hasDstFile: false,
    });
}

function syncSurchargeFee(surcharge_item_id, surcharge_item_quantity, hasDstFile, cobrandable_quantity) {
    console.log('Has DST File:', hasDstFile);

    if (surcharge_item_id) {
        if (surcharge_item_quantity > 1 && cobrandable_quantity > 0) {
            console.log('Updating current surcharge item quantity to:', 1);
            utils.api.cart.itemUpdate(surcharge_item_id, 1, (updateErr, updateResp) => {
                if (updateErr) {
                    console.error('Failed to update surcharge item quantity in cart:', updateErr);
                } else {
                    console.log('Surcharge item quantity updated in cart successfully:', updateResp);
                }
            });
        } else if (hasDstFile || cobrandable_quantity === 0) {
            console.log('Removing current surcharge item from cart, ID:', surcharge_item_id);
            utils.api.cart.itemRemove(surcharge_item_id, (removeErr, removeResp) => {
                if (removeErr) {
                    console.error('Failed to remove surcharge item from cart:', removeErr);
                } else {
                    console.log('Surcharge item removed from cart successfully:', removeResp);
                }
            });
        }
    } else if (!hasDstFile && cobrandable_quantity > 0) {
        console.log('Adding surcharge to cart:', 1);
        const formData = new FormData();
        formData.append('product_id', SURCHARGE_PRODUCT_ID);
        formData.append('qty[]', '1');
        utils.api.cart.itemAdd(normalizeFormData(formData), (addErr, addResp) => {
            if (addErr || addResp === undefined) {
                console.error('Failed to add surcharge to cart:', addErr);
            } else {
                console.log('Surcharge added to cart successfully:', addResp);
            }
        });
    }
}

/**
 * Sync fees by reading the entire cart content
 * This function retrieves the full cart data including totals, items, and fees
 * 
 * @param {string|Function} cartIdOrCallback - Cart ID (string) or callback function
 * @param {Function} callback - Optional callback function to handle the cart data
 * @returns {void}
 */
export function syncFees(cartId) {
    if (!cartId) {
        console.warn('Cart ID not found, cannot sync fees');
        if (cb) {
            cb(new Error('Cart ID not found'), null);
        }
        return;
    }

    // Get structured cart data (JSON) instead of HTML templates
    utils.api.cart.getCart({ cartId, includeOptions: true }, (err, response) => {
        if (err || response === undefined) {
            console.error('Error syncing cart fees:', err);
            if (cb) {
                cb(err || new Error('Cart data not available'), null);
            }
            return;
        }

        console.log('Full cart response structure:', JSON.stringify(response, null, 2));
        
        let cobrandable_quantity = 0;
        let hasDstFile = false;
        if (response.lineItems && response.lineItems.physicalItems) {
            const cobrandingState = getCartCobrandingState(response.lineItems.physicalItems);

            cobrandable_quantity = cobrandingState.cobrandable_quantity;
            hasDstFile = cobrandingState.hasDstFile;

            response.lineItems.physicalItems.forEach((item) => {
                console.log('=== Cart Item ===');
                console.log('Item ID:', item.id);
                console.log('Item Name:', item.name);
                console.log('Item Quantity:', item.quantity);
                console.log('Item SKU:', item.sku);
                console.log('Full Item Object:', item);
                
                // Try different possible property names for options
                const options = item.options;
                
                console.log('Item Options (found):', options);
                
                // Check for specific item options
                if (options && options.length > 0) {
                    options.forEach((option) => {
                        const optionName = getCartOptionName(option);
                        const optionValue = getCartOptionValue(option);
                        console.log(`  Option: ${optionName} = ${optionValue}`);
                    });
                } else {
                    console.log('  No options found for this item');
                }
            });
        } else {
            console.warn('No physicalItems found in response.lineItems');
            console.log('Available properties:', Object.keys(response));
        }

        let fee_item_quantity = 0;
        let fee_item_id = null;
        let surcharge_item_id = null;
        let surcharge_item_quantity = 0;
        if (response.lineItems && response.lineItems.digitalItems && typeof FEE_PRODUCT_ID !== 'undefined') {
            response.lineItems.digitalItems.forEach((item) => {
                if (item.productId === FEE_PRODUCT_ID) {
                    fee_item_quantity = Number(item.quantity);
                    fee_item_id = item.id;
                } else if (item.productId === SURCHARGE_PRODUCT_ID) {
                    surcharge_item_id = item.id;
                    surcharge_item_quantity = Number(item.quantity);
                }
            });
        }
        console.log('Current Fee Item Quantity:', fee_item_quantity);
        console.log('Current Fee Item ID:', fee_item_id);
        console.log('Current Surcharge Item ID:', surcharge_item_id);
        console.log('Current Surcharge Item Quantity:', surcharge_item_quantity);
        
        console.log('Cobrandable Quantity:', cobrandable_quantity);

        if (fee_item_id) {
            if (cobrandable_quantity === 0) {
                // remove current fee item
                console.log('Removing current fee item from cart, ID:', fee_item_id);
                utils.api.cart.itemRemove(fee_item_id, (removeErr, removeResp) => {
                    if (removeErr) {
                        console.error('Failed to remove fee item from cart:', removeErr);
                    } else {
                        console.log('Fee item removed from cart successfully:', removeResp);
                    }

                    syncSurchargeFee(surcharge_item_id, surcharge_item_quantity, hasDstFile, cobrandable_quantity);
                });
            } else if (fee_item_quantity !== cobrandable_quantity) {
                // update current fee item quantity
                console.log('Updating current fee item quantity to:', cobrandable_quantity);
                utils.api.cart.itemUpdate(fee_item_id, cobrandable_quantity, (updateErr, updateResp) => {
                    if (updateErr) {
                        console.error('Failed to update fee item quantity in cart:', updateErr);
                    } else {
                        console.log('Fee item quantity updated in cart successfully:', updateResp);
                    }

                    syncSurchargeFee(surcharge_item_id, surcharge_item_quantity, hasDstFile, cobrandable_quantity);
                });
            } else {
                syncSurchargeFee(surcharge_item_id, surcharge_item_quantity, hasDstFile, cobrandable_quantity);
            }
        } else if (cobrandable_quantity > 0) {
            console.log('Adding fee to cart:', cobrandable_quantity);
            // Create FormData properly for adding a product to cart
            const formData = new FormData();
            formData.append('product_id', FEE_PRODUCT_ID);
            formData.append('qty[]', cobrandable_quantity.toString());
            
            utils.api.cart.itemAdd(normalizeFormData(formData), (addErr, addResp) => {
                if (addErr || addResp === undefined) {
                    console.error('Failed to add fee to cart:', addErr);
                } else {
                    console.log('Fee added to cart successfully:', addResp);
                }

                syncSurchargeFee(surcharge_item_id, surcharge_item_quantity, hasDstFile, cobrandable_quantity);
            });
        } else {
            syncSurchargeFee(surcharge_item_id, surcharge_item_quantity, hasDstFile, cobrandable_quantity);
        }        
    });
}
