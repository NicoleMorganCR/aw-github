(function () {

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

  function getSelectedAttributeIds() {
    var ids = [];
    document.querySelectorAll('form[data-cart-item-add] input[name^="attribute["]:checked').forEach(function (el) {
      var val = parseInt(el.value, 10);
      if (!isNaN(val) && val > 0) ids.push(val);
    });
    return ids;
  }

  function updateUI(inStockAttributes) {
    try {
      var form = document.querySelector('form[data-cart-item-add]');
      if (!form || !form.checkValidity()) return;

      var selectedIds = getSelectedAttributeIds();
      if (selectedIds.length === 0) return;

      var invalid = selectedIds.some(function (id) {
        return inStockAttributes.indexOf(id) === -1;
      });

      var msg = getOrCreateWarning();
      var btn = document.getElementById('form-action-addToCart');
      if (msg) msg.style.display = invalid ? 'block' : 'none';
      if (btn) btn.disabled = invalid;
    } catch (e) {}
  }

  // Only intercept BC's product attributes endpoint — no interference with other scripts
  var originalJson = Response.prototype.json;
  Response.prototype.json = function () {
    var url = this.url || '';
    var originalResult = originalJson.call(this);

    if (url.indexOf('/remote/v1/product-attributes/') === -1) {
      return originalResult;
    }

    return originalResult.then(function (data) {
      try {
        if (data && data.data && Array.isArray(data.data.in_stock_attributes)) {
          setTimeout(function () { updateUI(data.data.in_stock_attributes); }, 0);
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
      var msg = document.getElementById('sku-unavailable-msg');
      if (msg && msg.style.display !== 'none') {
        e.preventDefault();
        e.stopImmediatePropagation();
      }
    }, true);
  });

})();
