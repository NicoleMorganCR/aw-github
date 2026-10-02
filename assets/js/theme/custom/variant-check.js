(function () {

  // BC auto-generates variant SKUs ending in a 2-char size code + 2-letter color code
  // (e.g. -ME-NA, -LA-GR, -2X-HE, sometimes with a trailing -1). Real SKUs never end this way.
  var AUTO_GENERATED_SKU = /-[A-Z0-9]{2}-[A-Z]{2}(-\d+)?$/;

  var VARIANT_OPTION_SELECTOR =
    '[data-product-attribute="set-select"],' +
    '[data-product-attribute="set-radio"],' +
    '[data-product-attribute="set-rectangle"],' +
    '[data-product-attribute="swatch"]';

  function isInvalidSku(sku) {
    return !!sku && AUTO_GENERATED_SKU.test(sku);
  }

  function updateUI(isInvalid) {
    try {
      var form = document.querySelector('form[data-cart-item-add]');
      if (!form || !form.checkValidity()) return;

      if (isInvalid) {
        var btn = document.getElementById('form-action-addToCart');
        var msgBox = document.querySelector('.productAttributes-message');
        var msgText = msgBox && msgBox.querySelector('.alertBox-message');
        if (msgText) msgText.textContent = 'The selected product combination is currently unavailable.';
        if (msgBox) msgBox.style.display = '';
        if (btn) btn.disabled = true;
      }
      // When valid, let BC handle the message and button state normally
    } catch (e) {}
  }

  // Only intercept BC's product attributes endpoint
  var originalJson = Response.prototype.json;
  Response.prototype.json = function () {
    var url = this.url || '';
    var originalResult = originalJson.call(this);

    if (url.indexOf('/remote/v1/product-attributes/') === -1) {
      return originalResult;
    }

    return originalResult.then(function (data) {
      try {
        if (data && data.data) {
          // Products without variant options have no combination to get wrong — never block them
          var form = document.querySelector('form[data-cart-item-add]');
          if (!form || !form.querySelector(VARIANT_OPTION_SELECTOR)) return data;

          var variantId = data.data.variantId;
          var sku = data.data.sku || '';
          var invalid = !variantId || isInvalidSku(sku);
          setTimeout(function () { updateUI(invalid); }, 0);
        }
      } catch (e) {}
      return data;
    });
  };

  // Hard block on form submit as safety net
  document.addEventListener('DOMContentLoaded', function () {
    var form = document.querySelector('form[data-cart-item-add]');
    if (!form) return;
    form.addEventListener('submit', function (e) {
      var msgBox = document.querySelector('.productAttributes-message');
      if (msgBox && msgBox.style.display !== 'none') {
        e.preventDefault();
        e.stopImmediatePropagation();
      }
    }, true);
  });

})();
