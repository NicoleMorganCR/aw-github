import utils from '@bigcommerce/stencil-utils';
import ProductDetailsBase, { optionChangeDecorator } from './product-details-base';
import 'foundation-sites/js/foundation/foundation';
import 'foundation-sites/js/foundation/foundation.reveal';
import ImageGallery from '../product/image-gallery';
import modalFactory, { alertModal, showAlertModal } from '../global/modal';
import { isEmpty, isPlainObject } from 'lodash';
import nod from './nod';
import { announceInputErrorMessage } from './utils/form-utils';
import forms from './models/forms';
import { normalizeFormData } from './utils/api';
import { isBrowserIE, convertIntoArray } from './utils/ie-helpers';
import bannerUtils from './utils/banner-utils';
import currencySelector from '../global/currency-selector';
import { triggerCartUpdate, CartUpdateTypes } from '../global/cart-update-listener';

export default class ProductDetails extends ProductDetailsBase {
    constructor($scope, context, productAttributesData = {}) {
        
        super($scope, context);

        this.$overlay = $('[data-cart-item-add] .loadingOverlay');
        this.imageGallery = new ImageGallery($('[data-image-gallery]', this.$scope));
        this.imageGallery.init();
        this.listenQuantityChange();
        this.$swatchOptionMessage = $('.swatch-option-message');
        this.swatchInitMessageStorage = {};
        this.swatchGroupIdList = $('[id^="swatchGroup"]').map((_, group) => $(group).attr('id'));
        this.storeInitMessagesForSwatches();
        this.updateDateSelector();

        const $form = $('form[data-cart-item-add]', $scope);

        if ($form[0].checkValidity()) {
            this.updateProductDetailsData();
        } else {
            this.toggleWalletButtonsVisibility(false);
        }

        this.addToCartValidator = nod({
            submit: $form.find('input#form-action-addToCart'),
            tap: announceInputErrorMessage,
        });

        const $productOptionsElement = $('[data-product-option-change]', $form);
        const hasOptions = $productOptionsElement.html().trim().length;
        const hasDefaultOptions = $productOptionsElement.find('[data-default]').length;
        const $productSwatchGroup = $('[id*="attribute_swatch"]', $form);
        const $productSwatchLabels = $('.form-option-swatch', $form);
        const placeSwatchLabelImage = (_, label) => {
            const $optionImage = $('.form-option-expanded', $(label));
            const optionImageWidth = $optionImage.outerWidth();
            const extendedOptionImageOffsetLeft = 55;
            const { right } = label.getBoundingClientRect();
            const emptySpaceToScreenRightBorder = window.screen.width - right;
            const shiftValue = optionImageWidth - emptySpaceToScreenRightBorder;

            if (emptySpaceToScreenRightBorder < (optionImageWidth + extendedOptionImageOffsetLeft)) {
                $optionImage.css('left', `${shiftValue > 0 ? -shiftValue : shiftValue}px`);
            }
        };

        $(window).on('load', () => {
            this.registerAddToCartValidation();
            $.each($productSwatchLabels, placeSwatchLabelImage);
        });

        if (context.showSwatchNames) {
            this.$swatchOptionMessage.removeClass('u-hidden');

            $productSwatchGroup.on('change', ({ target }) => {
                const swatchGroupElement = target.parentNode.parentNode;

                this.showSwatchNameOnOption($(target), $(swatchGroupElement));
            });

            $.each($productSwatchGroup, (_, element) => {
                const swatchGroupElement = element.parentNode.parentNode;

                if ($(element).is(':checked')) this.showSwatchNameOnOption($(element), $(swatchGroupElement));
            });
        }

        $productOptionsElement.on('change', event => {
            this.productOptionsChanged(event);
            this.setProductVariant();
        });

        $form.on('submit', event => {
            this.addToCartValidator.performCheck();

            if (this.addToCartValidator.areAll('valid')) {
                this.addProductToCart(event, $form[0]);
            }
        });

        // Update product attributes. Also update the initial view in case items are oos
        // or have default variant properties that change the view
        if ((isEmpty(productAttributesData) || hasDefaultOptions) && hasOptions) {
            const $productId = $('[name="product_id"]', $form).val();
            const optionChangeCallback = optionChangeDecorator.call(this, hasDefaultOptions);

            utils.api.productAttributes.optionChange($productId, $form.serialize(), 'products/bulk-discount-rates', optionChangeCallback);
        } else {
            this.updateProductAttributes(productAttributesData);
            bannerUtils.dispatchProductBannerEvent(productAttributesData);
        }

        $productOptionsElement.show();
        
        setTimeout(() => this.selectFirstVariant(), 1000);
        this.previewModal = modalFactory('#previewModal')[0];
        this.initModifierOptions();
    }

    registerAddToCartValidation() {
        this.addToCartValidator.add([{
            selector: '[data-quantity-change] > .form-input--incrementTotal',
            validate: (cb, val) => {
                const result = forms.numbersOnly(val);
                cb(result);
            },
            errorMessage: this.context.productQuantityErrorMessage,
        }]);

        return this.addToCartValidator;
    }

    storeInitMessagesForSwatches() {
        if (this.swatchGroupIdList.length && isEmpty(this.swatchInitMessageStorage)) {
            this.swatchGroupIdList.each((_, swatchGroupId) => {
                if (!this.swatchInitMessageStorage[swatchGroupId]) {
                    this.swatchInitMessageStorage[swatchGroupId] = $(`#${swatchGroupId} ~ .swatch-option-message`).text().trim();
                }
            });
        }
    }

    setProductVariant() {
        const unsatisfiedRequiredFields = [];
        const options = [];

        $.each($('[data-product-attribute]'), (index, value) => {
            const optionLabel = value.children[0].innerText;
            const optionTitle = optionLabel.split(':')[0].trim();
            const required = optionLabel.toLowerCase().includes('required');
            const type = value.getAttribute('data-product-attribute');

            if ((type === 'input-file' || type === 'input-text' || type === 'input-number') && value.querySelector('input').value === '' && required) {
                unsatisfiedRequiredFields.push(value);
            }

            if (type === 'textarea' && value.querySelector('textarea').value === '' && required) {
                unsatisfiedRequiredFields.push(value);
            }

            if (type === 'date') {
                const isSatisfied = Array.from(value.querySelectorAll('select')).every((select) => select.selectedIndex !== 0);

                if (isSatisfied) {
                    const dateString = Array.from(value.querySelectorAll('select')).map((x) => x.value).join('-');
                    options.push(`${optionTitle}:${dateString}`);

                    return;
                }

                if (required) {
                    unsatisfiedRequiredFields.push(value);
                }
            }

            if (type === 'set-select') {
                const select = value.querySelector('select');
                const selectedIndex = select.selectedIndex;

                if (selectedIndex !== 0) {
                    options.push(`${optionTitle}:${select.options[selectedIndex].innerText}`);

                    return;
                }

                if (required) {
                    unsatisfiedRequiredFields.push(value);
                }
            }

            if (type === 'set-rectangle' || type === 'set-radio' || type === 'swatch' || type === 'input-checkbox' || type === 'product-list') {
                const checked = value.querySelector(':checked');
                if (checked) {
                    const getSelectedOptionLabel = () => {
                        const productVariantslist = convertIntoArray(value.children);
                        const matchLabelForCheckedInput = inpt => inpt.dataset.productAttributeValue === checked.value;
                        return productVariantslist.filter(matchLabelForCheckedInput)[0];
                    };
                    if (type === 'set-rectangle' || type === 'set-radio' || type === 'product-list') {
                        const label = isBrowserIE ? getSelectedOptionLabel().innerText.trim() : checked.labels[0].innerText;
                        if (label) {
                            options.push(`${optionTitle}:${label}`);
                        }
                    }

                    if (type === 'swatch') {
                        const label = isBrowserIE ? getSelectedOptionLabel().children[0] : checked.labels[0].children[0];
                        if (label) {
                            options.push(`${optionTitle}:${label.title}`);
                        }
                    }

                    if (type === 'input-checkbox') {
                        options.push(`${optionTitle}:Yes`);
                    }

                    return;
                }

                if (type === 'input-checkbox') {
                    options.push(`${optionTitle}:No`);
                }

                if (required) {
                    unsatisfiedRequiredFields.push(value);
                }
            }
        });

        let productVariant = unsatisfiedRequiredFields.length === 0 ? options.sort().join(', ') : 'unsatisfied';
        const view = $('.productView');

        if (productVariant) {
            productVariant = productVariant === 'unsatisfied' ? '' : productVariant;
            if (view.attr('data-event-type')) {
                view.attr('data-product-variant', productVariant);
            } else {
                const productName = view.find('.productView-title')[0].innerText.replace(/"/g, '\\$&');
                const card = $(`[data-name="${productName}"]`);
                card.attr('data-product-variant', productVariant);
            }
        }
    }

    /**
     * Checks if the current window is being run inside an iframe
     * @returns {boolean}
     */
    isRunningInIframe() {
        try {
            return window.self !== window.top;
        } catch (e) {
            return true;
        }
    }

    /**
     *
     * Handle product options changes
     *
     */
    productOptionsChanged(event) {
        const $changedOption = $(event.target);
        const $form = $changedOption.parents('form');
        const productId = $('[name="product_id"]', $form).val();

        // Do not trigger an ajax request if it's a file or if the browser doesn't support FormData
        if ($changedOption.attr('type') === 'file' || window.FormData === undefined) {
            return;
        }

        utils.api.productAttributes.optionChange(productId, $form.serialize(), 'products/bulk-discount-rates', (err, response) => {
            const productAttributesData = response.data || {};
            const productAttributesContent = response.content || {};
            this.updateProductAttributes(productAttributesData);
            this.updateView(productAttributesData, productAttributesContent);
            this.updateProductDetailsData();
            bannerUtils.dispatchProductBannerEvent(productAttributesData);

            if (!this.checkIsQuickViewChild($form)) {
                const $context = $form.parents('.productView').find('.productView-info');
                modalFactory('[data-reveal]', { $context });
            }

            document.dispatchEvent(new CustomEvent('onProductOptionsChanged', {
                bubbles: true,
                detail: {
                    content: productAttributesData,
                    data: productAttributesContent,
                },
            }));
        });
    }

    /**
     * if this setting is enabled in Page Builder
     * show name for swatch option
     */
    showSwatchNameOnOption($swatch, $swatchGroup) {
        const swatchName = $swatch.attr('aria-label');
        const activeSwatchGroupId = $swatchGroup.attr('aria-labelledby');
        const $swatchOptionMessage = $(`#${activeSwatchGroupId} ~ .swatch-option-message`);

        $('[data-option-value]', $swatchGroup).text(swatchName);
        $swatchOptionMessage.text(`${this.swatchInitMessageStorage[activeSwatchGroupId]} ${swatchName}`);
        this.setLiveRegionAttributes($swatchOptionMessage, 'status', 'assertive');
    }

    setLiveRegionAttributes($element, roleType, ariaLiveStatus) {
        $element.attr({
            role: roleType,
            'aria-live': ariaLiveStatus,
        });
    }

    checkIsQuickViewChild($element) {
        return !!$element.parents('.quickView').length;
    }

    showProductImage(image) {
        if (isPlainObject(image)) {
            const zoomImageUrl = utils.tools.imageSrcset.getSrcset(
                image.data,
                { '1x': this.context.zoomSize },
                /*
                    Should match zoom size used for data-zoom-image in
                    components/products/product-view.html

                    Note that this will only be used as a fallback image for browsers that do not support srcset

                    Also note that getSrcset returns a simple src string when exactly one size is provided
                */
            );

            const mainImageUrl = utils.tools.imageSrcset.getSrcset(
                image.data,
                { '1x': this.context.productSize },
                /*
                    Should match fallback image size used for the main product image in
                    components/products/product-view.html

                    Note that this will only be used as a fallback image for browsers that do not support srcset

                    Also note that getSrcset returns a simple src string when exactly one size is provided
                */
            );

            const mainImageSrcset = utils.tools.imageSrcset.getSrcset(image.data);

            this.imageGallery.setAlternateImage({
                mainImageUrl,
                zoomImageUrl,
                mainImageSrcset,
            });
        } else {
            this.imageGallery.restoreImage();
        }
    }

    /**
     *
     * Handle action when the shopper clicks on + / - for quantity
     *
     */
    listenQuantityChange() {
        this.$scope.on('click', '[data-quantity-change] button', event => {
            event.preventDefault();
            const $target = $(event.currentTarget);
            const viewModel = this.getViewModel(this.$scope);
            const $input = viewModel.quantity.$input;
            const quantityMin = parseInt($input.data('quantityMin'), 10);
            const quantityMax = parseInt($input.data('quantityMax'), 10);

            let qty = forms.numbersOnly($input.val()) ? parseInt($input.val(), 10) : quantityMin;
            // If action is incrementing
            if ($target.data('action') === 'inc') {
                qty = forms.validateIncreaseAgainstMaxBoundary(qty, quantityMax);
            } else if (qty > 1) {
                qty = forms.validateDecreaseAgainstMinBoundary(qty, quantityMin);
            }

            // update hidden input
            viewModel.quantity.$input.val(qty);
            // update text
            viewModel.quantity.$text.text(qty);
            // perform validation after updating product quantity
            this.addToCartValidator.performCheck();

            this.updateProductDetailsData();
        });

        // Prevent triggering quantity change when pressing enter
        this.$scope.on('keypress', '.form-input--incrementTotal', event => {
            // If the browser supports event.which, then use event.which, otherwise use event.keyCode
            const x = event.which || event.keyCode;
            if (x === 13) {
                // Prevent default
                event.preventDefault();
            }
        });

        this.$scope.on('keyup', '.form-input--incrementTotal', () => {
            this.updateProductDetailsData();
        });
    }

    /**
     *
     * Add a product to cart
     *
     */
    addProductToCart(event, form) {
        const $addToCartBtn = $('#form-action-addToCart', $(event.target));
        const originalBtnVal = $addToCartBtn.val();
        const waitMessage = $addToCartBtn.data('waitMessage');

        // Do not do AJAX if browser doesn't support FormData
        if (window.FormData === undefined) {
            return;
        }

        // Prevent default
        event.preventDefault();

        $addToCartBtn
            .val(waitMessage)
            .prop('disabled', true);

        this.$overlay.show();

        // Add item to cart
        utils.api.cart.itemAdd(normalizeFormData(new FormData(form)), (err, response) => {
            currencySelector(response.data.cart_id);
            const errorMessage = err || response.data.error;

            $addToCartBtn
                .val(originalBtnVal)
                .prop('disabled', false);

            this.$overlay.hide();

            // Guard statement
            if (errorMessage) {
                // Strip the HTML from the error message
                const tmp = document.createElement('DIV');
                tmp.innerHTML = errorMessage;

                if (!this.checkIsQuickViewChild($addToCartBtn)) {
                    alertModal().$preModalFocusedEl = $addToCartBtn;
                }

                return showAlertModal(tmp.textContent || tmp.innerText);
            }

            // Trigger cart update event
            triggerCartUpdate(CartUpdateTypes.ANY, {
                cartId: response.data.cart_id // Include the cart ID (important for empty cart)
            });

            // Open preview modal and update content
            if (this.previewModal) {
                this.previewModal.open();

                if (window.ApplePaySession) {
                    this.previewModal.$modal.addClass('apple-pay-supported');
                }

                if (!this.checkIsQuickViewChild($addToCartBtn)) {
                    this.previewModal.$preModalFocusedEl = $addToCartBtn;
                }

                this.updateCartContent(this.previewModal, response.data.cart_item.id);
            } else {
                this.$overlay.show();
                // if no modal, redirect to the cart page
                this.redirectTo(response.data.cart_item.cart_url || this.context.urls.cart);
            }
        });

        this.setLiveRegionAttributes($addToCartBtn.next(), 'status', 'polite');
    }

    /**
     * Get cart contents
     *
     * @param {String} cartItemId
     * @param {Function} onComplete
     */
    getCartContent(cartItemId, onComplete) {
        const options = {
            template: 'cart/preview',
            params: {
                suggest: cartItemId,
            },
            config: {
                cart: {
                    suggestions: {
                        limit: 4,
                    },
                },
            },
        };

        utils.api.cart.getContent(options, onComplete);
    }

    /**
     * Redirect to url
     *
     * @param {String} url
     */
    redirectTo(url) {
        if (this.isRunningInIframe() && !window.iframeSdk) {
            window.top.location = url;
        } else {
            window.location = url;
        }
    }

    /**
     * Update cart content
     *
     * @param {Modal} modal
     * @param {String} cartItemId
     * @param {Function} onComplete
     */
    updateCartContent(modal, cartItemId, onComplete) {
        this.getCartContent(cartItemId, (err, response) => {
            if (err) {
                return;
            }

            modal.updateContent(response);

            // Update cart counter
            const $body = $('body');
            const $cartQuantity = $('[data-cart-quantity]', modal.$content);
            const $cartCounter = $('.navUser-action .cart-count');
            const quantity = $cartQuantity.data('cartQuantity') || 0;
            const $promotionBanner = $('[data-promotion-banner]');
            const $backToShopppingBtn = $('.previewCartCheckout > [data-reveal-close]');
            const $modalCloseBtn = $('#previewModal > .modal-close');
            const bannerUpdateHandler = () => {
                const $productContainer = $('#main-content > .container');

                $productContainer.append('<div class="loadingOverlay pdp-update"></div>');
                $('.loadingOverlay.pdp-update', $productContainer).show();
                window.location.reload();
            };

            $cartCounter.addClass('cart-count--positive');
            $body.trigger('cart-quantity-update', quantity);

            if (onComplete) {
                onComplete(response);
            }

            if ($promotionBanner.length && $backToShopppingBtn.length) {
                $backToShopppingBtn.on('click', bannerUpdateHandler);
                $modalCloseBtn.on('click', bannerUpdateHandler);
            }
        });
    }

    /**
     * Hide or mark as unavailable out of stock attributes if enabled
     * @param  {Object} data Product attribute data
     */
    updateProductAttributes(data) {
        super.updateProductAttributes(data);
        this.showProductImage(data.image);
    }

    updateProductDetailsData() {
        const $form = $('form[data-cart-item-add]');
        const formDataItems = $form.serializeArray();

        const productDetails = {};

        for (const formDataItem of formDataItems) {
            const { name, value } = formDataItem;

            if (name === 'product_id') {
                productDetails.productId = Number(value);
            }

            if (name === 'qty[]') {
                productDetails.quantity = Number(value);
            }

            if (name.match(/attribute/)) {
                const productOption = {
                    optionId: Number(name.match(/\d+/g)[0]),
                    optionValue: value,
                };

                productDetails.optionSelections = productDetails?.optionSelections
                    ? [...productDetails.optionSelections, productOption]
                    : [productOption];
            }
        }

        document.dispatchEvent(new CustomEvent('onProductUpdate', {
            bubbles: true,
            detail: { productDetails },
        }));
    }

    selectFirstVariant() {
        const $form = $('[data-cart-item-add]');

        // Handle dropdowns
        const $dropdowns = $form.find('[data-product-option-change] select');
        $dropdowns.each((index, element) => {
            const $select = $(element);
            const $options = $select.find('option:not([value=""])').not(':disabled');
            
            if ($options.length > 0) {
                const $firstOption = $options.first();
                $firstOption.prop('selected', true).trigger('change');
            }
        });

        // Handle radio buttons (rectangles and swatches)
        const $radios = $form.find('[data-product-option-change] input[type="radio"]');
        $radios.each((index, element) => {
            const $radio = $(element);
        });

        // Group by name and select first in each group
        const radioGroups = {};
        $radios.each((index, element) => {
            const $radio = $(element);
            const name = $radio.attr('name');
            if (!radioGroups[name]) {
                radioGroups[name] = [];
            }
            radioGroups[name].push($radio);
        });

        Object.keys(radioGroups).forEach(name => {
            const group = radioGroups[name];
            const hasChecked = group.some(radio => radio.is(':checked'));
            if (!hasChecked) {
                const uncheckedEnabled = group.filter(radio => !radio.is(':checked') && radio.is(':enabled'));
                if (uncheckedEnabled.length > 0) {
                    const $firstRadio = uncheckedEnabled[0];
                    $firstRadio.prop('checked', true).trigger('change');
                }
            }
        });
    }

    updateDateSelector() {
        this.$scope.each((i, scope) => {
            function updateDays(dateOption) {
                const monthSelector = dateOption.querySelector('select[name$="[month]"]');
                const daySelector = dateOption.querySelector('select[name$="[day]"]');
                const yearSelector = dateOption.querySelector('select[name$="[year]"]');
                const month = parseInt(monthSelector.value, 10);
                const year = parseInt(yearSelector.value, 10);
                let daysInMonth;

                if (!Number.isNaN(month) && !Number.isNaN(year)) {
                    switch (month) {
                    case 2:
                        daysInMonth = (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0) ? 29 : 28;
                        break;
                    case 4: case 6: case 9: case 11:
                        daysInMonth = 30;
                        break;
                    default:
                        daysInMonth = 31;
                    }

                    for (let day = 29; day <= 31; day++) {
                        const option = daySelector.querySelector(`option[value="${day}"]`);
                        if (day <= daysInMonth && !option) {
                            daySelector.options.add(new Option(day, day));
                        } else if (day > daysInMonth && option) {
                            option.remove();
                        }
                    }
                }
            }

            $(scope).on('change', (e) => {
                const dateOption = e.target && e.target.closest && e.target.closest('[data-product-attribute=date]');

                if (dateOption) {
                    updateDays(dateOption);
                }
            });

            scope.querySelectorAll('[data-product-attribute=date]').forEach(dateOption => {
                updateDays(dateOption);
            });
        });
    }

    initModifierOptions() {
        const findField = (labelText) => {
            return Array.from(document.querySelectorAll('[data-product-attribute]'))
                .find(field => field.textContent.includes(labelText));
        };

        const cobrandableField = findField('Do you want to Cobrand this item?:');
        const dstField = findField('Do you have a dst file?:');
        const artworkField = findField('Artwork:');
        const instructionsField = findField('Decoration Instructions:');

        // Get selected text from radio
        const getSelectedText = (field) => {
            if (!field) return null;

            const checked = field.querySelector('input[type="radio"]:checked');
            if (!checked) return null;

            const label = field.querySelector(`label[for="${checked.id}"] .form-option-variant`);
            return label ? label.textContent.trim().toLowerCase() : null;
        };

        const handleChange = () => {
            const cobrandable = getSelectedText(cobrandableField);
            const dst = getSelectedText(dstField);

            const isCobrandable = cobrandable === 'yes';
            const hasDst = dst === 'yes';

            console.log('Do you want to Cobrand this item?:', cobrandable, 'DST:', dst);

            // Artwork
            if (artworkField) {
                if (isCobrandable && dst === 'no') {
                    artworkField.style.display = '';
                } else {
                    const fileInput = artworkField.querySelector('input[type="file"]');
                    if (fileInput) fileInput.value = '';
                    artworkField.style.display = 'none';
                }
            }

            // Instructions
            if (instructionsField) {
                if (isCobrandable) {
                    instructionsField.style.display = '';
                } else {
                    const textarea = instructionsField.querySelector('textarea');
                    if (textarea) textarea.value = '';
                    instructionsField.style.display = 'none';
                }
            }

            // DST field
            if (dstField) {
                dstField.style.display = isCobrandable ? '' : 'none';
            }
        };

        const attach = (field) => {
            if (!field) return;

            // radios trigger change reliably
            field.addEventListener('change', handleChange);

            // fallback for UI wrappers
            field.addEventListener('click', () => setTimeout(handleChange, 50));
        };

        attach(cobrandableField);
        attach(dstField);

        // Update file upload description to show MB instead of KB
        const fileDesc = document.querySelector('[data-product-attribute="input-file"] .form-fileDescription');
        if (fileDesc) {
            // Extract KB value from text (e.g., 102400KB)
            const match = fileDesc.textContent.match(/(\d+)\s*KB/i);

            if (match) {
                const kb = parseInt(match[1], 10);
                const mb = Math.round(kb / 1024); // convert to MB

                // Replace only the size part
                fileDesc.innerHTML = fileDesc.innerHTML.replace(
                    /\d+\s*KB/i,
                    `${mb}MB`
                );
            }
        }

        // initial state
        handleChange();
    }
}
