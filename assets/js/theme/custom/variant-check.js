(function () {

  function isInvalidSku(sku) {
    if (!sku) return false;
    var parts = sku.split('-');
    return parts.length >= 3 && !/^\d+$/.test(parts[2]);
  }

  function getOrCreateWarning() {
    var existing = document.getElementById('sku-unavailable-msg');
    if (existing) return existing;
    var msg = document.createElement('p');
    msg.id = 'sku-unavailable-msg';
    msg.textContent = 'Variant Unavailable';
    msg.style.cssText = 'color: #cc0000; font-weight: bold; margin-bottom: 8px; display: none;';
    var btn = document.getElementById('form-action-addToCart');
    if (btn) btn.parentNode.insertBefore(msg, btn);
    return msg;
  }

  function updateUI(isInvalid) {
    var form = document.querySelector('form[data-cart-item-add]');
    if (!form || !form.checkValidity()) return;
    var msg = getOrCreateWarning();
    var btn = document.getElementById('form-action-addToCart');
    if (msg) msg.style.display = isInvalid ? 'block' : 'none';
    if (btn) btn.disabled = isInvalid;
  }

  // Patch Response.prototype.json to intercept BC's product attributes API response
  var originalJson = Response.prototype.json;
  Response.prototype.json = function () {
    return originalJson.call(this).then(function (data) {
      if (data && data.data && 'variantId' in data.data) {
        var variantId = data.data.variantId;
        var sku = data.data.sku || '';
        var invalid = !variantId || isInvalidSku(sku);
        setTimeout(function () { updateUI(invalid); }, 0);
      }
      return data;
    });
  };

  // Hard block on form submit as safety net
  document.addEventListener('DOMContentLoaded', function () {
    var form = document.querySelector('form[data-cart-item-add]');
    if (!form) return;
    form.addEventListener('submit', function (e) {
      var msg = document.getElementById('sku-unavailable-msg');
      if (msg && msg.style.display !== 'none') {
        e.preventDefault();
        e.stopImmediatePropagation();
      }
    }, true);
  });

})();
