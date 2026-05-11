"use strict";
(self["webpackChunkepic_superstore"] = self["webpackChunkepic_superstore"] || []).push([["assets_js_theme_gift-certificate_js"],{

/***/ "./assets/js/theme/common/gift-certificate-validator.js"
/*!**************************************************************!*\
  !*** ./assets/js/theme/common/gift-certificate-validator.js ***!
  \**************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
Reflect.defineProperty(__WEBPACK_DEFAULT_EXPORT__, "name", { value: "default", configurable: true });
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(cert) {
  if (typeof cert !== 'string' || cert.length === 0) {
    return false;
  }

  // Add any custom gift certificate validation logic here
  return true;
}

/***/ },

/***/ "./assets/js/theme/common/utils/translations-utils.js"
/*!************************************************************!*\
  !*** ./assets/js/theme/common/utils/translations-utils.js ***!
  \************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createTranslationDictionary: () => (/* binding */ createTranslationDictionary)
/* harmony export */ });
var TRANSLATIONS = 'translations';
var isTranslationDictionaryNotEmpty = function isTranslationDictionaryNotEmpty(dictionary) {
  return !!Object.keys(dictionary[TRANSLATIONS]).length;
};
var chooseActiveDictionary = function chooseActiveDictionary() {
  for (var i = 0; i < arguments.length; i++) {
    var dictionary = JSON.parse(i < 0 || arguments.length <= i ? undefined : arguments[i]);
    if (isTranslationDictionaryNotEmpty(dictionary)) {
      return dictionary;
    }
  }
};

/**
 * defines Translation Dictionary to use
 * @param context provides access to 3 validation JSONs from en.json:
 * validation_messages, validation_fallback_messages and default_messages
 * @returns {Object}
 */
var createTranslationDictionary = function createTranslationDictionary(context) {
  var validationDictionaryJSON = context.validationDictionaryJSON,
    validationFallbackDictionaryJSON = context.validationFallbackDictionaryJSON,
    validationDefaultDictionaryJSON = context.validationDefaultDictionaryJSON;
  var activeDictionary = chooseActiveDictionary(validationDictionaryJSON, validationFallbackDictionaryJSON, validationDefaultDictionaryJSON);
  var localizations = Object.values(activeDictionary[TRANSLATIONS]);
  var translationKeys = Object.keys(activeDictionary[TRANSLATIONS]).map(function (key) {
    return key.split('.').pop();
  });
  return translationKeys.reduce(function (acc, key, i) {
    acc[key] = localizations[i];
    return acc;
  }, {});
};

/***/ },

/***/ "./assets/js/theme/gift-certificate.js"
/*!*********************************************!*\
  !*** ./assets/js/theme/gift-certificate.js ***!
  \*********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ GiftCertificate)
/* harmony export */ });
/* harmony import */ var _page_manager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./page-manager */ "./assets/js/theme/page-manager.js");
/* harmony import */ var _common_nod__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./common/nod */ "./assets/js/theme/common/nod.js");
/* harmony import */ var _common_gift_certificate_validator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./common/gift-certificate-validator */ "./assets/js/theme/common/gift-certificate-validator.js");
/* harmony import */ var _common_models_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./common/models/forms */ "./assets/js/theme/common/models/forms.js");
/* harmony import */ var _common_utils_translations_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./common/utils/translations-utils */ "./assets/js/theme/common/utils/translations-utils.js");
/* harmony import */ var _common_utils_form_utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./common/utils/form-utils */ "./assets/js/theme/common/utils/form-utils.js");
/* harmony import */ var _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @bigcommerce/stencil-utils */ "./node_modules/@bigcommerce/stencil-utils/src/main.js");
/* harmony import */ var _global_modal__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./global/modal */ "./assets/js/theme/global/modal.js");
/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js");
function _inheritsLoose(t, o) { t.prototype = Object.create(o.prototype), t.prototype.constructor = t, _setPrototypeOf(t, o); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }








var GiftCertificate = /*#__PURE__*/function (_PageManager) {
  function GiftCertificate(context) {
    var _this;
    _this = _PageManager.call(this, context) || this;
    _this.validationDictionary = (0,_common_utils_translations_utils__WEBPACK_IMPORTED_MODULE_4__.createTranslationDictionary)(context);
    var $certBalanceForm = $('#gift-certificate-balance');
    var purchaseModel = {
      recipientName: function recipientName(val) {
        return val.length;
      },
      recipientEmail: function recipientEmail() {
        return _common_models_forms__WEBPACK_IMPORTED_MODULE_3__["default"].email.apply(_common_models_forms__WEBPACK_IMPORTED_MODULE_3__["default"], arguments);
      },
      senderName: function senderName(val) {
        return val.length;
      },
      senderEmail: function senderEmail() {
        return _common_models_forms__WEBPACK_IMPORTED_MODULE_3__["default"].email.apply(_common_models_forms__WEBPACK_IMPORTED_MODULE_3__["default"], arguments);
      },
      customAmount: function customAmount(value, min, max) {
        return value && value >= min && value <= max;
      },
      setAmount: function setAmount(value, options) {
        var found = false;
        options.forEach(function (option) {
          if (option === value) {
            found = true;
            return false;
          }
        });
        return found;
      }
    };
    var $purchaseForm = $('#gift-certificate-form');
    var $customAmounts = $purchaseForm.find('input[name="certificate_amount"]');
    var purchaseValidator = (0,_common_nod__WEBPACK_IMPORTED_MODULE_1__["default"])({
      submit: '#gift-certificate-form input[type="submit"]',
      delay: 300,
      tap: _common_utils_form_utils__WEBPACK_IMPORTED_MODULE_5__.announceInputErrorMessage
    });
    if ($customAmounts.length) {
      var $element = $purchaseForm.find('input[name="certificate_amount"]');
      var min = $element.data('min');
      var minFormatted = $element.data('minFormatted');
      var max = $element.data('max');
      var maxFormatted = $element.data('maxFormatted');
      var insertFormattedAmountsIntoErrorMessage = function insertFormattedAmountsIntoErrorMessage(message) {
        for (var _len = arguments.length, amountRange = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          amountRange[_key - 1] = arguments[_key];
        }
        var amountPlaceholders = ['[MIN]', '[MAX]'];
        var updatedErrorText = message;
        amountPlaceholders.forEach(function (placeholder, i) {
          updatedErrorText = updatedErrorText.includes(placeholder) ? updatedErrorText.replace(placeholder, amountRange[i]) : updatedErrorText;
        });
        return updatedErrorText;
      };
      purchaseValidator.add({
        selector: '#gift-certificate-form input[name="certificate_amount"]',
        validate: function validate(cb, val) {
          var numberVal = Number(val);
          if (!numberVal) {
            cb(false);
          }
          cb(numberVal >= min && numberVal <= max);
        },
        errorMessage: insertFormattedAmountsIntoErrorMessage(_this.validationDictionary.certificate_amount_range, minFormatted, maxFormatted)
      });
    }
    purchaseValidator.add([{
      selector: '#gift-certificate-form input[name="to_name"]',
      validate: function validate(cb, val) {
        var result = purchaseModel.recipientName(val);
        cb(result);
      },
      errorMessage: _this.context.toName
    }, {
      selector: '#gift-certificate-form input[name="to_email"]',
      validate: function validate(cb, val) {
        var result = purchaseModel.recipientEmail(val);
        cb(result);
      },
      errorMessage: _this.context.toEmail
    }, {
      selector: '#gift-certificate-form input[name="from_name"]',
      validate: function validate(cb, val) {
        var result = purchaseModel.senderName(val);
        cb(result);
      },
      errorMessage: _this.context.fromName
    }, {
      selector: '#gift-certificate-form input[name="from_email"]',
      validate: function validate(cb, val) {
        var result = purchaseModel.senderEmail(val);
        cb(result);
      },
      errorMessage: _this.context.fromEmail
    }, {
      selector: '#gift-certificate-form input[name="certificate_theme"]:first-of-type',
      triggeredBy: '#gift-certificate-form input[name="certificate_theme"]',
      validate: function validate(cb) {
        var val = $purchaseForm.find('input[name="certificate_theme"]:checked').val();
        cb(typeof val === 'string');
      },
      errorMessage: _this.context.certTheme
    }, {
      selector: '#gift-certificate-form input[name="agree"]',
      validate: function validate(cb) {
        var val = $purchaseForm.find('input[name="agree"]').get(0).checked;
        cb(val);
      },
      errorMessage: _this.context.agreeToTerms
    }, {
      selector: '#gift-certificate-form input[name="agree2"]',
      validate: function validate(cb) {
        var val = $purchaseForm.find('input[name="agree2"]').get(0).checked;
        cb(val);
      },
      errorMessage: _this.context.agreeToTerms
    }]);
    if ($certBalanceForm.length) {
      var balanceVal = _this.checkCertBalanceValidator($certBalanceForm);
      $certBalanceForm.on('submit', function () {
        balanceVal.performCheck();
        if (!balanceVal.areAll('valid')) {
          return false;
        }
      });
    }
    $purchaseForm.on('submit', function (event) {
      purchaseValidator.performCheck();
      if (!purchaseValidator.areAll('valid')) {
        return event.preventDefault();
      }
    });
    var createFrame = function createFrame(container, html) {
      var frame = $('<iframe />').width('100%').attr('frameBorder', '0').appendTo(container)[0];

      // Grab the frame's document object
      var frameDoc = frame.contentWindow ? frame.contentWindow.document : frame.contentDocument;
      frameDoc.open();
      frameDoc.write(html);
      frameDoc.close();

      // Calculate max height for the iframe
      var maxheight = Math.max($(window).height() - 300, 300);

      // Auto adjust the iframe's height once its document is ready
      $(frameDoc).ready(function () {
        var height = Math.min(frameDoc.body.scrollHeight + 20, maxheight);
        $(frame).height(height);
      });
    };
    $('#gift-certificate-preview').on('click', function (event) {
      event.preventDefault();
      purchaseValidator.performCheck();
      if (!purchaseValidator.areAll('valid')) {
        return;
      }
      var modal = (0,_global_modal__WEBPACK_IMPORTED_MODULE_7__.defaultModal)();
      var previewUrl = $(event.currentTarget).data('previewUrl') + "&" + $purchaseForm.serialize();
      modal.open();
      _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_6__.api.getPage(previewUrl, {}, function (err, content) {
        if (err) {
          return modal.updateContent(_this.context.previewError);
        }
        modal.updateContent();
        var container = $('#modal-content');
        createFrame(container, content);
      });
    });
    return _this;
  }
  _inheritsLoose(GiftCertificate, _PageManager);
  var _proto = GiftCertificate.prototype;
  _proto.checkCertBalanceValidator = function checkCertBalanceValidator($balanceForm) {
    var balanceValidator = (0,_common_nod__WEBPACK_IMPORTED_MODULE_1__["default"])({
      submit: $balanceForm.find('input[type="submit"]'),
      tap: _common_utils_form_utils__WEBPACK_IMPORTED_MODULE_5__.announceInputErrorMessage
    });
    balanceValidator.add({
      selector: $balanceForm.find('input[name="giftcertificatecode"]'),
      validate: function validate(cb, val) {
        cb((0,_common_gift_certificate_validator__WEBPACK_IMPORTED_MODULE_2__["default"])(val));
      },
      errorMessage: this.validationDictionary.invalid_gift_certificate
    });
    return balanceValidator;
  };
  return GiftCertificate;
}(_page_manager__WEBPACK_IMPORTED_MODULE_0__["default"]);


/***/ }

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlbWUtYnVuZGxlLmNodW5rLmFzc2V0c19qc190aGVtZV9naWZ0LWNlcnRpZmljYXRlX2pzLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNkJBQWUsb0NBQVVBLElBQUksRUFBRTtFQUMzQixJQUFJLE9BQU9BLElBQUksS0FBSyxRQUFRLElBQUlBLElBQUksQ0FBQ0MsTUFBTSxLQUFLLENBQUMsRUFBRTtJQUMvQyxPQUFPLEtBQUs7RUFDaEI7O0VBRUE7RUFDQSxPQUFPLElBQUk7QUFDZixDOzs7Ozs7Ozs7Ozs7OztBQ1BBLElBQU1DLFlBQVksR0FBRyxjQUFjO0FBQ25DLElBQU1DLCtCQUErQixHQUFHLFNBQWxDQSwrQkFBK0JBLENBQUlDLFVBQVU7RUFBQSxPQUFLLENBQUMsQ0FBQ0MsTUFBTSxDQUFDQyxJQUFJLENBQUNGLFVBQVUsQ0FBQ0YsWUFBWSxDQUFDLENBQUMsQ0FBQ0QsTUFBTTtBQUFBO0FBQ3RHLElBQU1NLHNCQUFzQixHQUFHLFNBQXpCQSxzQkFBc0JBLENBQUEsRUFBOEI7RUFDdEQsS0FBSyxJQUFJQyxDQUFDLEdBQUcsQ0FBQyxFQUFFQSxDQUFDLEdBQUdDLFNBQUEsQ0FBbUJSLE1BQU0sRUFBRU8sQ0FBQyxFQUFFLEVBQUU7SUFDaEQsSUFBTUosVUFBVSxHQUFHTSxJQUFJLENBQUNDLEtBQUssQ0FBb0JILENBQUMsUUFBQUMsU0FBQSxDQUFBUixNQUFBLElBQURPLENBQUMsR0FBQUksU0FBQSxHQUFBSCxTQUFBLENBQURELENBQUMsQ0FBQyxDQUFDO0lBQ3BELElBQUlMLCtCQUErQixDQUFDQyxVQUFVLENBQUMsRUFBRTtNQUM3QyxPQUFPQSxVQUFVO0lBQ3JCO0VBQ0o7QUFDSixDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPLElBQU1TLDJCQUEyQixHQUFHLFNBQTlCQSwyQkFBMkJBLENBQUlDLE9BQU8sRUFBSztFQUNwRCxJQUFRQyx3QkFBd0IsR0FBd0VELE9BQU8sQ0FBdkdDLHdCQUF3QjtJ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QUFHLEVBQUVqQywrRUFBeUJBO0lBQ2xDLENBQUMsQ0FBQztJQUVGNEcsZ0JBQWdCLENBQUMzRCxHQUFHLENBQUM7TUFDakJDLFFBQVEsRUFBRXlELFlBQVksQ0FBQzlFLElBQUksQ0FBQyxtQ0FBbUMsQ0FBQztNQUNoRXNCLFFBQVEsV0FBUkEsUUFBUUEsQ0FBQ0MsRUFBRSxFQUFFeEMsR0FBRyxFQUFFO1FBQ2R3QyxFQUFFLENBQUN0RCw4RUFBb0IsQ0FBQ2MsR0FBRyxDQUFDLENBQUM7TUFDakMsQ0FBQztNQUNEMkMsWUFBWSxFQUFFLElBQUksQ0FBQ2hELG9CQUFvQixDQUFDc0c7SUFDNUMsQ0FBQyxDQUFDO0lBRUYsT0FBT0QsZ0JBQWdCO0VBQzNCLENBQUM7RUFBQSxPQUFBekcsZUFBQTtBQUFBLEVBbE93Q1AscURBQVciLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9lcGljLXN1cGVyc3RvcmUvLi9hc3NldHMvanMvdGhlbWUvY29tbW9uL2dpZnQtY2VydGlmaWNhdGUtdmFsaWRhdG9yLmpzIiwid2VicGFjazovL2VwaWMtc3VwZXJzdG9yZS8uL2Fzc2V0cy9qcy90aGVtZS9jb21tb24vdXRpbHMvdHJhbnNsYXRpb25zLXV0aWxzLmpzIiwid2VicGFjazovL2VwaWMtc3VwZXJzdG9yZS8uL2Fzc2V0cy9qcy90aGVtZS9naWZ0LWNlcnRpZmljYXRlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChjZXJ0KSB7XG4gICAgaWYgKHR5cGVvZiBjZXJ0ICE9PSAnc3RyaW5nJyB8fCBjZXJ0Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLy8gQWRkIGFueSBjdXN0b20gZ2lmdCBjZXJ0aWZpY2F0ZSB2YWxpZGF0aW9uIGxvZ2ljIGhlcmVcbiAgICByZXR1cm4gdHJ1ZTtcbn1cbiIsImNvbnN0IFRSQU5TTEFUSU9OUyA9ICd0cmFuc2xhdGlvbnMnO1xuY29uc3QgaXNUcmFuc2xhdGlvbkRpY3Rpb25hcnlOb3RFbXB0eSA9IChkaWN0aW9uYXJ5KSA9PiAhIU9iamVjdC5rZXlzKGRpY3Rpb25hcnlbVFJBTlNMQVRJT05TXSkubGVuZ3RoO1xuY29uc3QgY2hvb3NlQWN0aXZlRGljdGlvbmFyeSA9ICguLi5kaWN0aW9uYXJ5SnNvbkxpc3QpID0+IHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRpY3Rpb25hcnlKc29uTGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBkaWN0aW9uYXJ5ID0gSlNPTi5wYXJzZShkaWN0aW9uYXJ5SnNvbkxpc3RbaV0pO1xuICAgICAgICBpZiAoaXNUcmFuc2xhdGlvbkRpY3Rpb25hcnlOb3RFbXB0eShkaWN0aW9uYXJ5KSkge1xuICAgICAgICAgICAgcmV0dXJuIGRpY3Rpb25hcnk7XG4gICAgICAgIH1cbiAgICB9XG59O1xuXG4vKipcbiAqIGRlZmluZXMgVHJhbnNsYXRpb24gRGljdGlvbmFyeSB0byB1c2VcbiAqIEBwYXJhbSBjb250ZXh0IHByb3ZpZGVzIGFjY2VzcyB0byAzIHZhbGlkYXRpb24gSlNPTnMgZnJvbSBlbi5qc29uOlxuICogdmFsaWRhdGlvbl9tZXNzYWdlcywgdmFsaWRhdGlvbl9mYWxsYmFja19tZXNzYWdlcyBhbmQgZGVmYXVsdF9tZXNzYWdlc1xuICogQHJldHVybnMge09iamVjdH1cbiAqL1xuZXhwb3J0IGNvbnN0IGNyZWF0ZVRyYW5zbGF0aW9uRGljdGlvbmFyeSA9IChjb250ZXh0KSA9PiB7XG4gICAgY29uc3QgeyB2YWxpZGF0aW9uRGljdGlvbmFyeUpTT04sIHZhbGlkYXRpb25GYWxsYmFja0RpY3Rpb25hcnlKU09OLCB2YWxpZGF0aW9uRGVmYXVsdERpY3Rpb25hcnlKU09OIH0gPSBjb250ZXh0O1xuICAgIGNvbnN0IGFjdGl2ZURpY3Rpb25hcnkgPSBjaG9vc2VBY3RpdmVEaWN0aW9uYXJ5KHZhbGlkYXRpb25EaWN0aW9uYXJ5SlNPTiwgdmFsaWRhdGlvbkZhbGxiYWNrRGljdGlvbmFyeUpTT04sIHZhbGlkYXRpb25EZWZhdWx0RGljdGlvbmFyeUpTT04pO1xuICAgIGNvbnN0IGxvY2FsaXphdGlvbnMgPSBPYmplY3QudmFsdWVzKGFjdGl2ZURpY3Rpb25hcnlbVFJBTlNMQVRJT05TXSk7XG4gICAgY29uc3QgdHJhbnNsYXRpb25LZXlzID0gT2JqZWN0LmtleXMoYWN0aXZlRGljdGlvbmFyeVtUUkFOU0xBVElPTlNdKS5tYXAoa2V5ID0+IGtleS5zcGxpdCgnLicpLnBvcCgpKTtcblxuICAgIHJldHVybiB0cmFuc2xhdGlvbktleXMucmVkdWNlKChhY2MsIGtleSwgaSkgPT4ge1xuICAgICAgICBhY2Nba2V5XSA9IGxvY2FsaXphdGlvbnNbaV07XG4gICAgICAgIHJldHVybiBhY2M7XG4gICAgfSwge30pO1xufTtcbiIsImltcG9ydCBQYWdlTWFuYWdlciBmcm9tICcuL3BhZ2UtbWFuYWdlcic7XG5pbXBvcnQgbm9kIGZyb20gJy4vY29tbW9uL25vZCc7XG5pbXBvcnQgY2hlY2tJc0dpZnRDZXJ0VmFsaWQgZnJvbSAnLi9jb21tb24vZ2lmdC1jZXJ0aWZpY2F0ZS12YWxpZGF0b3InO1xuaW1wb3J0IGZvcm1Nb2RlbCBmcm9tICcuL2NvbW1vbi9tb2RlbHMvZm9ybXMnO1xuaW1wb3J0IHsgY3JlYXRlVHJhbnNsYXRpb25EaWN0aW9uYXJ5IH0gZnJvbSAnLi9jb21tb24vdXRpbHMvdHJhbnNsYXRpb25zLXV0aWxzJztcbmltcG9ydCB7IGFubm91bmNlSW5wdXRFcnJvck1lc3NhZ2UgfSBmcm9tICcuL2NvbW1vbi91dGlscy9mb3JtLXV0aWxzJztcbmltcG9ydCB7IGFwaSB9IGZyb20gJ0BiaWdjb21tZXJjZS9zdGVuY2lsLXV0aWxzJztcbmltcG9ydCB7IGRlZmF1bHRNb2RhbCB9IGZyb20gJy4vZ2xvYmFsL21vZGFsJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2lmdENlcnRpZmljYXRlIGV4dGVuZHMgUGFnZU1hbmFnZXIge1xuICAgIGNvbnN0cnVjdG9yKGNvbnRleHQpIHtcbiAgICAgICAgc3VwZXIoY29udGV4dCk7XG4gICAgICAgIHRoaXMudmFsaWRhdGlvbkRpY3Rpb25hcnkgPSBjcmVhdGVUcmFuc2xhdGlvbkRpY3Rpb25hcnkoY29udGV4dCk7XG5cbiAgICAgICAgY29uc3QgJGNlcnRCYWxhbmNlRm9ybSA9ICQoJyNnaWZ0LWNlcnRpZmljYXRlLWJhbGFuY2UnKTtcblxuICAgICAgICBjb25zdCBwdXJjaGFzZU1vZGVsID0ge1xuICAgICAgICAgICAgcmVjaXBpZW50TmFtZSh2YWwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsLmxlbmd0aDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICByZWNpcGllbnRFbWFpbCguLi5hcmdzKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZvcm1Nb2RlbC5lbWFpbCguLi5hcmdzKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZW5kZXJOYW1lKHZhbCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB2YWwubGVuZ3RoO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNlbmRlckVtYWlsKC4uLmFyZ3MpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZm9ybU1vZGVsLmVtYWlsKC4uLmFyZ3MpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGN1c3RvbUFtb3VudCh2YWx1ZSwgbWluLCBtYXgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWUgJiYgdmFsdWUgPj0gbWluICYmIHZhbHVlIDw9IG1heDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXRBbW91bnQodmFsdWUsIG9wdGlvbnMpIHtcbiAgICAgICAgICAgICAgICBsZXQgZm91bmQgPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgIG9wdGlvbnMuZm9yRWFjaCgob3B0aW9uKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChvcHRpb24gPT09IHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3VuZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIHJldHVybiBmb3VuZDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH07XG5cbiAgICAgICAgY29uc3QgJHB1cmNoYXNlRm9ybSA9ICQoJyNnaWZ0LWNlcnRpZmljYXRlLWZvcm0nKTtcbiAgICAgICAgY29uc3QgJGN1c3RvbUFtb3VudHMgPSAkcHVyY2hhc2VGb3JtLmZpbmQoJ2lucHV0W25hbWU9XCJjZXJ0aWZpY2F0ZV9hbW91bnRcIl0nKTtcbiAgICAgICAgY29uc3QgcHVyY2hhc2VWYWxpZGF0b3IgPSBub2Qoe1xuICAgICAgICAgICAgc3VibWl0OiAnI2dpZnQtY2VydGlmaWNhdGUtZm9ybSBpbnB1dFt0eXBlPVwic3VibWl0XCJdJyxcbiAgICAgICAgICAgIGRlbGF5OiAzMDAsXG4gICAgICAgICAgICB0YXA6IGFubm91bmNlSW5wdXRFcnJvck1lc3NhZ2UsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmICgkY3VzdG9tQW1vdW50cy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNvbnN0ICRlbGVtZW50ID0gJHB1cmNoYXNlRm9ybS5maW5kKCdpbnB1dFtuYW1lPVwiY2VydGlmaWNhdGVfYW1vdW50XCJdJyk7XG4gICAgICAgICAgICBjb25zdCBtaW4gPSAkZWxlbWVudC5kYXRhKCdtaW4nKTtcbiAgICAgICAgICAgIGNvbnN0IG1pbkZvcm1hdHRlZCA9ICRlbGVtZW50LmRhdGEoJ21pbkZvcm1hdHRlZCcpO1xuICAgICAgICAgICAgY29uc3QgbWF4ID0gJGVsZW1lbnQuZGF0YSgnbWF4Jyk7XG4gICAgICAgICAgICBjb25zdCBtYXhGb3JtYXR0ZWQgPSAkZWxlbWVudC5kYXRhKCdtYXhGb3JtYXR0ZWQnKTtcbiAgICAgICAgICAgIGNvbnN0IGluc2VydEZvcm1hdHRlZEFtb3VudHNJbnRvRXJyb3JNZXNzYWdlID0gKG1lc3NhZ2UsIC4uLmFtb3VudFJhbmdlKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgYW1vdW50UGxhY2Vob2xkZXJzID0gWydbTUlOXScsICdbTUFYXSddO1xuICAgICAgICAgICAgICAgIGxldCB1cGRhdGVkRXJyb3JUZXh0ID0gbWVzc2FnZTtcbiAgICAgICAgICAgICAgICBhbW91bnRQbGFjZWhvbGRlcnMuZm9yRWFjaCgocGxhY2Vob2xkZXIsIGkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdXBkYXRlZEVycm9yVGV4dCA9IHVwZGF0ZWRFcnJvclRleHQuaW5jbHVkZXMocGxhY2Vob2xkZXIpXG4gICAgICAgICAgICAgICAgICAgICAgICA/IHVwZGF0ZWRFcnJvclRleHQucmVwbGFjZShwbGFjZWhvbGRlciwgYW1vdW50UmFuZ2VbaV0pXG4gICAgICAgICAgICAgICAgICAgICAgICA6IHVwZGF0ZWRFcnJvclRleHQ7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHVwZGF0ZWRFcnJvclRleHQ7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBwdXJjaGFzZVZhbGlkYXRvci5hZGQoe1xuICAgICAgICAgICAgICAgIHNlbGVjdG9yOiAnI2dpZnQtY2VydGlmaWNhdGUtZm9ybSBpbnB1dFtuYW1lPVwiY2VydGlmaWNhdGVfYW1vdW50XCJdJyxcbiAgICAgICAgICAgICAgICB2YWxpZGF0ZTogKGNiLCB2YWwpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbnVtYmVyVmFsID0gTnVtYmVyKHZhbCk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKCFudW1iZXJWYWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNiKGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGNiKG51bWJlclZhbCA+PSBtaW4gJiYgbnVtYmVyVmFsIDw9IG1heCk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlcnJvck1lc3NhZ2U6IGluc2VydEZvcm1hdHRlZEFtb3VudHNJbnRvRXJyb3JNZXNzYWdlKHRoaXMudmFsaWRhdGlvbkRpY3Rpb25hcnkuY2VydGlmaWNhdGVfYW1vdW50X3JhbmdlLCBtaW5Gb3JtYXR0ZWQsIG1heEZvcm1hdHRlZCksXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1cmNoYXNlVmFsaWRhdG9yLmFkZChbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc2VsZWN0b3I6ICcjZ2lmdC1jZXJ0aWZpY2F0ZS1mb3JtIGlucHV0W25hbWU9XCJ0b19uYW1lXCJdJyxcbiAgICAgICAgICAgICAgICB2YWxpZGF0ZTogKGNiLCB2YWwpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gcHVyY2hhc2VNb2RlbC5yZWNpcGllbnROYW1lKHZhbCk7XG5cbiAgICAgICAgICAgICAgICAgICAgY2IocmVzdWx0KTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGVycm9yTWVzc2FnZTogdGhpcy5jb250ZXh0LnRvTmFtZSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc2VsZWN0b3I6ICcjZ2lmdC1jZXJ0aWZpY2F0ZS1mb3JtIGlucHV0W25hbWU9XCJ0b19lbWFpbFwiXScsXG4gICAgICAgICAgICAgICAgdmFsaWRhdGU6IChjYiwgdmFsKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IHB1cmNoYXNlTW9kZWwucmVjaXBpZW50RW1haWwodmFsKTtcblxuICAgICAgICAgICAgICAgICAgICBjYihyZXN1bHQpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlOiB0aGlzLmNvbnRleHQudG9FbWFpbCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc2VsZWN0b3I6ICcjZ2lmdC1jZXJ0aWZpY2F0ZS1mb3JtIGlucHV0W25hbWU9XCJmcm9tX25hbWVcIl0nLFxuICAgICAgICAgICAgICAgIHZhbGlkYXRlOiAoY2IsIHZhbCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSBwdXJjaGFzZU1vZGVsLnNlbmRlck5hbWUodmFsKTtcblxuICAgICAgICAgICAgICAgICAgICBjYihyZXN1bHQpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlOiB0aGlzLmNvbnRleHQuZnJvbU5hbWUsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHNlbGVjdG9yOiAnI2dpZnQtY2VydGlmaWNhdGUtZm9ybSBpbnB1dFtuYW1lPVwiZnJvbV9lbWFpbFwiXScsXG4gICAgICAgICAgICAgICAgdmFsaWRhdGU6IChjYiwgdmFsKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IHB1cmNoYXNlTW9kZWwuc2VuZGVyRW1haWwodmFsKTtcblxuICAgICAgICAgICAgICAgICAgICBjYihyZXN1bHQpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlOiB0aGlzLmNvbnRleHQuZnJvbUVtYWlsLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzZWxlY3RvcjogJyNnaWZ0LWNlcnRpZmljYXRlLWZvcm0gaW5wdXRbbmFtZT1cImNlcnRpZmljYXRlX3RoZW1lXCJdOmZpcnN0LW9mLXR5cGUnLFxuICAgICAgICAgICAgICAgIHRyaWdnZXJlZEJ5OiAnI2dpZnQtY2VydGlmaWNhdGUtZm9ybSBpbnB1dFtuYW1lPVwiY2VydGlmaWNhdGVfdGhlbWVcIl0nLFxuICAgICAgICAgICAgICAgIHZhbGlkYXRlOiAoY2IpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdmFsID0gJHB1cmNoYXNlRm9ybS5maW5kKCdpbnB1dFtuYW1lPVwiY2VydGlmaWNhdGVfdGhlbWVcIl06Y2hlY2tlZCcpLnZhbCgpO1xuXG4gICAgICAgICAgICAgICAgICAgIGNiKHR5cGVvZiAodmFsKSA9PT0gJ3N0cmluZycpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlOiB0aGlzLmNvbnRleHQuY2VydFRoZW1lLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzZWxlY3RvcjogJyNnaWZ0LWNlcnRpZmljYXRlLWZvcm0gaW5wdXRbbmFtZT1cImFncmVlXCJdJyxcbiAgICAgICAgICAgICAgICB2YWxpZGF0ZTogKGNiKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHZhbCA9ICRwdXJjaGFzZUZvcm0uZmluZCgnaW5wdXRbbmFtZT1cImFncmVlXCJdJykuZ2V0KDApLmNoZWNrZWQ7XG5cbiAgICAgICAgICAgICAgICAgICAgY2IodmFsKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGVycm9yTWVzc2FnZTogdGhpcy5jb250ZXh0LmFncmVlVG9UZXJtcyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc2VsZWN0b3I6ICcjZ2lmdC1jZXJ0aWZpY2F0ZS1mb3JtIGlucHV0W25hbWU9XCJhZ3JlZTJcIl0nLFxuICAgICAgICAgICAgICAgIHZhbGlkYXRlOiAoY2IpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdmFsID0gJHB1cmNoYXNlRm9ybS5maW5kKCdpbnB1dFtuYW1lPVwiYWdyZWUyXCJdJykuZ2V0KDApLmNoZWNrZWQ7XG5cbiAgICAgICAgICAgICAgICAgICAgY2IodmFsKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGVycm9yTWVzc2FnZTogdGhpcy5jb250ZXh0LmFncmVlVG9UZXJtcyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIF0pO1xuXG4gICAgICAgIGlmICgkY2VydEJhbGFuY2VGb3JtLmxlbmd0aCkge1xuICAgICAgICAgICAgY29uc3QgYmFsYW5jZVZhbCA9IHRoaXMuY2hlY2tDZXJ0QmFsYW5jZVZhbGlkYXRvcigkY2VydEJhbGFuY2VGb3JtKTtcblxuICAgICAgICAgICAgJGNlcnRCYWxhbmNlRm9ybS5vbignc3VibWl0JywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGJhbGFuY2VWYWwucGVyZm9ybUNoZWNrKCk7XG5cbiAgICAgICAgICAgICAgICBpZiAoIWJhbGFuY2VWYWwuYXJlQWxsKCd2YWxpZCcpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgICRwdXJjaGFzZUZvcm0ub24oJ3N1Ym1pdCcsIGV2ZW50ID0+IHtcbiAgICAgICAgICAgIHB1cmNoYXNlVmFsaWRhdG9yLnBlcmZvcm1DaGVjaygpO1xuXG4gICAgICAgICAgICBpZiAoIXB1cmNoYXNlVmFsaWRhdG9yLmFyZUFsbCgndmFsaWQnKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBjb25zdCBjcmVhdGVGcmFtZSA9IChjb250YWluZXIsIGh0bWwpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGZyYW1lID0gJCgnPGlmcmFtZSAvPicpLndpZHRoKCcxMDAlJykuYXR0cignZnJhbWVCb3JkZXInLCAnMCcpLmFwcGVuZFRvKGNvbnRhaW5lcilbMF07XG5cbiAgICAgICAgICAgIC8vIEdyYWIgdGhlIGZyYW1lJ3MgZG9jdW1lbnQgb2JqZWN0XG4gICAgICAgICAgICBjb25zdCBmcmFtZURvYyA9IGZyYW1lLmNvbnRlbnRXaW5kb3cgPyBmcmFtZS5jb250ZW50V2luZG93LmRvY3VtZW50IDogZnJhbWUuY29udGVudERvY3VtZW50O1xuXG4gICAgICAgICAgICBmcmFtZURvYy5vcGVuKCk7XG4gICAgICAgICAgICBmcmFtZURvYy53cml0ZShodG1sKTtcbiAgICAgICAgICAgIGZyYW1lRG9jLmNsb3NlKCk7XG5cbiAgICAgICAgICAgIC8vIENhbGN1bGF0ZSBtYXggaGVpZ2h0IGZvciB0aGUgaWZyYW1lXG4gICAgICAgICAgICBjb25zdCBtYXhoZWlnaHQgPSBNYXRoLm1heCgoJCh3aW5kb3cpLmhlaWdodCgpIC0gMzAwKSwgMzAwKTtcblxuICAgICAgICAgICAgLy8gQXV0byBhZGp1c3QgdGhlIGlmcmFtZSdzIGhlaWdodCBvbmNlIGl0cyBkb2N1bWVudCBpcyByZWFkeVxuICAgICAgICAgICAgJChmcmFtZURvYykucmVhZHkoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGhlaWdodCA9IE1hdGgubWluKGZyYW1lRG9jLmJvZHkuc2Nyb2xsSGVpZ2h0ICsgMjAsIG1heGhlaWdodCk7XG4gICAgICAgICAgICAgICAgJChmcmFtZSkuaGVpZ2h0KGhlaWdodCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcblxuICAgICAgICAkKCcjZ2lmdC1jZXJ0aWZpY2F0ZS1wcmV2aWV3Jykub24oJ2NsaWNrJywgZXZlbnQgPT4ge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgcHVyY2hhc2VWYWxpZGF0b3IucGVyZm9ybUNoZWNrKCk7XG5cbiAgICAgICAgICAgIGlmICghcHVyY2hhc2VWYWxpZGF0b3IuYXJlQWxsKCd2YWxpZCcpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCBtb2RhbCA9IGRlZmF1bHRNb2RhbCgpO1xuICAgICAgICAgICAgY29uc3QgcHJldmlld1VybCA9IGAkeyQoZXZlbnQuY3VycmVudFRhcmdldCkuZGF0YSgncHJldmlld1VybCcpfSYkeyRwdXJjaGFzZUZvcm0uc2VyaWFsaXplKCl9YDtcblxuICAgICAgICAgICAgbW9kYWwub3BlbigpO1xuXG4gICAgICAgICAgICBhcGkuZ2V0UGFnZShwcmV2aWV3VXJsLCB7fSwgKGVyciwgY29udGVudCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG1vZGFsLnVwZGF0ZUNvbnRlbnQodGhpcy5jb250ZXh0LnByZXZpZXdFcnJvcik7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgbW9kYWwudXBkYXRlQ29udGVudCgpO1xuXG4gICAgICAgICAgICAgICAgY29uc3QgY29udGFpbmVyID0gJCgnI21vZGFsLWNvbnRlbnQnKTtcbiAgICAgICAgICAgICAgICBjcmVhdGVGcmFtZShjb250YWluZXIsIGNvbnRlbnQpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGNoZWNrQ2VydEJhbGFuY2VWYWxpZGF0b3IoJGJhbGFuY2VGb3JtKSB7XG4gICAgICAgIGNvbnN0IGJhbGFuY2VWYWxpZGF0b3IgPSBub2Qoe1xuICAgICAgICAgICAgc3VibWl0OiAkYmFsYW5jZUZvcm0uZmluZCgnaW5wdXRbdHlwZT1cInN1Ym1pdFwiXScpLFxuICAgICAgICAgICAgdGFwOiBhbm5vdW5jZUlucHV0RXJyb3JNZXNzYWdlLFxuICAgICAgICB9KTtcblxuICAgICAgICBiYWxhbmNlVmFsaWRhdG9yLmFkZCh7XG4gICAgICAgICAgICBzZWxlY3RvcjogJGJhbGFuY2VGb3JtLmZpbmQoJ2lucHV0W25hbWU9XCJnaWZ0Y2VydGlmaWNhdGVjb2RlXCJdJyksXG4gICAgICAgICAgICB2YWxpZGF0ZShjYiwgdmFsKSB7XG4gICAgICAgICAgICAgICAgY2IoY2hlY2tJc0dpZnRDZXJ0VmFsaWQodmFsKSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3JNZXNzYWdlOiB0aGlzLnZhbGlkYXRpb25EaWN0aW9uYXJ5LmludmFsaWRfZ2lmdF9jZXJ0aWZpY2F0ZSxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGJhbGFuY2VWYWxpZGF0b3I7XG4gICAgfVxufVxuIl0sIm5hbWVzIjpbImNlcnQiLCJsZW5ndGgiLCJUUkFOU0xBVElPTlMiLCJpc1RyYW5zbGF0aW9uRGljdGlvbmFyeU5vdEVtcHR5IiwiZGljdGlvbmFyeSIsIk9iamVjdCIsImtleXMiLCJjaG9vc2VBY3RpdmVEaWN0aW9uYXJ5IiwiaSIsImFyZ3VtZW50cyIsIkpTT04iLCJwYXJzZSIsInVuZGVmaW5lZCIsImNyZWF0ZVRyYW5zbGF0aW9uRGljdGlvbmFyeSIsImNvbnRleHQiLCJ2YWxpZGF0aW9uRGljdGlvbmFyeUpTT04iLCJ2YWxpZGF0aW9uRmFsbGJhY2tEaWN0aW9uYXJ5SlNPTiIsInZhbGlkYXRpb25EZWZhdWx0RGljdGlvbmFyeUpTT04iLCJhY3RpdmVEaWN0aW9uYXJ5IiwibG9jYWxpemF0aW9ucyIsInZhbHVlcyIsInRyYW5zbGF0aW9uS2V5cyIsIm1hcCIsImtleSIsInNwbGl0IiwicG9wIiwicmVkdWNlIiwiYWNjIiwiUGFnZU1hbmFnZXIiLCJub2QiLCJjaGVja0lzR2lmdENlcnRWYWxpZCIsImZvcm1Nb2RlbCIsImFubm91bmNlSW5wdXRFcnJvck1lc3NhZ2UiLCJhcGkiLCJkZWZhdWx0TW9kYWwiLCJHaWZ0Q2VydGlmaWNhdGUiLCJfUGFnZU1hbmFnZXIiLCJfdGhpcyIsImNhbGwiLCJ2YWxpZGF0aW9uRGljdGlvbmFyeSIsIiRjZXJ0QmFsYW5jZUZvcm0iLCIkIiwicHVyY2hhc2VNb2RlbCIsInJlY2lwaWVudE5hbWUiLCJ2YWwiLCJyZWNpcGllbnRFbWFpbCIsImVtYWlsIiwiYXBwbHkiLCJzZW5kZXJOYW1lIiwic2VuZGVyRW1haWwiLCJjdXN0b21BbW91bnQiLCJ2YWx1ZSIsIm1pbiIsIm1heCIsInNldEFtb3VudCIsIm9wdGlvbnMiLCJmb3VuZCIsImZvckVhY2giLCJvcHRpb24iLCIkcHVyY2hhc2VGb3JtIiwiJGN1c3RvbUFtb3VudHMiLCJmaW5kIiwicHVyY2hhc2VWYWxpZGF0b3IiLCJzdWJtaXQiLCJkZWxheSIsInRhcCIsIiRlbGVtZW50IiwiZGF0YSIsIm1pbkZvcm1hdHRlZCIsIm1heEZvcm1hdHRlZCIsImluc2VydEZvcm1hdHRlZEFtb3VudHNJbnRvRXJyb3JNZXNzYWdlIiwibWVzc2FnZSIsIl9sZW4iLCJhbW91bnRSYW5nZSIsIkFycmF5IiwiX2tleSIsImFtb3VudFBsYWNlaG9sZGVycyIsInVwZGF0ZWRFcnJvclRleHQiLCJwbGFjZWhvbGRlciIsImluY2x1ZGVzIiwicmVwbGFjZSIsImFkZCIsInNlbGVjdG9yIiwidmFsaWRhdGUiLCJjYiIsIm51bWJlclZhbCIsIk51bWJlciIsImVycm9yTWVzc2FnZSIsImNlcnRpZmljYXRlX2Ftb3VudF9yYW5nZSIsInJlc3VsdCIsInRvTmFtZSIsInRvRW1haWwiLCJmcm9tTmFtZSIsImZyb21FbWFpbCIsInRyaWdnZXJlZEJ5IiwiY2VydFRoZW1lIiwiZ2V0IiwiY2hlY2tlZCIsImFncmVlVG9UZXJtcyIsImJhbGFuY2VWYWwiLCJjaGVja0NlcnRCYWxhbmNlVmFsaWRhdG9yIiwib24iLCJwZXJmb3JtQ2hlY2siLCJhcmVBbGwiLCJldmVudCIsInByZXZlbnREZWZhdWx0IiwiY3JlYXRlRnJhbWUiLCJjb250YWluZXIiLCJodG1sIiwiZnJhbWUiLCJ3aWR0aCIsImF0dHIiLCJhcHBlbmRUbyIsImZyYW1lRG9jIiwiY29udGVudFdpbmRvdyIsImRvY3VtZW50IiwiY29udGVudERvY3VtZW50Iiwib3BlbiIsIndyaXRlIiwiY2xvc2UiLCJtYXhoZWlnaHQiLCJNYXRoIiwid2luZG93IiwiaGVpZ2h0IiwicmVhZHkiLCJib2R5Iiwic2Nyb2xsSGVpZ2h0IiwibW9kYWwiLCJwcmV2aWV3VXJsIiwiY3VycmVudFRhcmdldCIsInNlcmlhbGl6ZSIsImdldFBhZ2UiLCJlcnIiLCJjb250ZW50IiwidXBkYXRlQ29udGVudCIsInByZXZpZXdFcnJvciIsIl9pbmhlcml0c0xvb3NlIiwiX3Byb3RvIiwicHJvdG90eXBlIiwiJGJhbGFuY2VGb3JtIiwiYmFsYW5jZVZhbGlkYXRvciIsImludmFsaWRfZ2lmdF9jZXJ0aWZpY2F0ZSIsImRlZmF1bHQiXSwic291cmNlUm9vdCI6IiJ9
