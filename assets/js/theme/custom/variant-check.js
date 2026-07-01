(function () {

  function isInvalidSku(sku) {
    if (!sku) return false;
    var parts = sku.split('-');
    // Real variant SKUs always contain a 4-digit inventory code (e.g. 0471, 0048)
    // Auto-generated SKUs never do — they use abbreviations like 2X, HE, SM, NA
    if (parts.length <= 2) return false; // Simple SKUs (AW-0005) are always valid
    for (var i = 2; i < parts.length; i++) {
      if (/^\d{4}$/.test(parts[i])) return false; // Found a real inventory code
    }
    return true; // No 4-digit code found — likely auto-generated
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
