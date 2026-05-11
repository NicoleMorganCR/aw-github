"use strict";
(self["webpackChunkepic_superstore"] = self["webpackChunkepic_superstore"] || []).push([["assets_js_theme_common_loyalty-sync_js-assets_js_theme_common_state-country_js-assets_js_them-801a1f"],{

/***/ "./assets/js/theme/common/loyalty-sync.js"
/*!************************************************!*\
  !*** ./assets/js/theme/common/loyalty-sync.js ***!
  \************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ LoyaltySync)
/* harmony export */ });
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var LoyaltySync = /*#__PURE__*/function () {
  function LoyaltySync(context) {
    var _this$context, _this$context2, _this$context3, _this$context4;
    if (context === void 0) {
      context = {};
    }
    this.context = context;
    this.apiEndpoint = ((_this$context = this.context) == null || (_this$context = _this$context.themeSettings) == null ? void 0 : _this$context.laravel_api_endpoint) || ((_this$context2 = this.context) == null ? void 0 : _this$context2.laravel_api_endpoint);
    this.apiKey = ((_this$context3 = this.context) == null || (_this$context3 = _this$context3.themeSettings) == null ? void 0 : _this$context3.laravel_api_key) || ((_this$context4 = this.context) == null ? void 0 : _this$context4.laravel_api_key);
    this.customerId = this.getCustomerId();
  }
  var _proto = LoyaltySync.prototype;
  _proto.getCustomerId = function getCustomerId() {
    var _this$context5, _this$context6;
    var customerId = (_this$context5 = this.context) == null ? void 0 : _this$context5.customerId;
    if (customerId) {
      return customerId;
    }
    var customer = (_this$context6 = this.context) == null ? void 0 : _this$context6.customer;
    if (customer != null && customer.id) {
      return customer.id;
    }
    return null;
  };
  _proto.init = /*#__PURE__*/function () {
    var _init = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
      var _t;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.p = _context.n) {
          case 0:
            if (this.customerId) {
              _context.n = 1;
              break;
            }
            return _context.a(2);
          case 1:
            _context.p = 1;
            _context.n = 2;
            return this.syncLoyaltyPoints();
          case 2:
            _context.n = 4;
            break;
          case 3:
            _context.p = 3;
            _t = _context.v;
            console.error('[LoyaltySync] Failed to sync loyalty points:', _t);
          case 4:
            return _context.a(2);
        }
      }, _callee, this, [[1, 3]]);
    }));
    function init() {
      return _init.apply(this, arguments);
    }
    return init;
  }();
  _proto.syncLoyaltyPoints = /*#__PURE__*/function () {
    var _syncLoyaltyPoints = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
      var url, response, data;
      return _regenerator().w(function (_context2) {
        while (1) switch (_context2.n) {
          case 0:
            url = this.apiEndpoint + "?customer_id=" + this.customerId + "&api_key=" + this.apiKey;
            _context2.n = 1;
            return fetch(url, {
              method: 'GET',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
              }
            });
          case 1:
            response = _context2.v;
            if (response.ok) {
              _context2.n = 2;
              break;
            }
            throw new Error("HTTP error! status: " + response.status);
          case 2:
            _context2.n = 3;
            return response.json();
          case 3:
            data = _context2.v;
            document.dispatchEvent(new CustomEvent('loyaltyPointsSynced', {
              detail: data
            }));
            return _context2.a(2, data);
        }
      }, _callee2, this);
    }));
    function syncLoyaltyPoints() {
      return _syncLoyaltyPoints.apply(this, arguments);
    }
    return syncLoyaltyPoints;
  }();
  _proto.refresh = function refresh() {
    if (!this.customerId) {
      this.customerId = this.getCustomerId();
    }
    if (!this.customerId) {
      return Promise.resolve(null);
    }
    return this.syncLoyaltyPoints();
  };
  return LoyaltySync;
}();


/***/ },

/***/ "./assets/js/theme/common/state-country.js"
/*!*************************************************!*\
  !*** ./assets/js/theme/common/state-country.js ***!
  \*************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
Reflect.defineProperty(__WEBPACK_DEFAULT_EXPORT__, "name", { value: "default", configurable: true });
/* harmony import */ var _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @bigcommerce/stencil-utils */ "./node_modules/@bigcommerce/stencil-utils/src/main.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _utils_form_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/form-utils */ "./assets/js/theme/common/utils/form-utils.js");
/* harmony import */ var _global_modal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../global/modal */ "./assets/js/theme/global/modal.js");
/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js");





/**
 * If there are no options from bcapp, a text field will be sent. This will create a select element to hold options after the remote request.
 * @returns {jQuery|HTMLElement}
 */
function makeStateRequired(stateElement, context) {
  var attrs = (0,lodash__WEBPACK_IMPORTED_MODULE_1__.transform)(stateElement.prop('attributes'), function (result, item) {
    var ret = result;
    ret[item.name] = item.value;
    return ret;
  });
  var replacementAttributes = {
    id: attrs.id,
    'data-label': attrs['data-label'],
    "class": 'form-select',
    name: attrs.name,
    'data-field-type': attrs['data-field-type']
  };
  stateElement.replaceWith($('<select></select>', replacementAttributes));
  var $newElement = $('[data-field-type="State"]');
  var $hiddenInput = $('[name*="FormFieldIsText"]');
  if ($hiddenInput.length !== 0) {
    $hiddenInput.remove();
  }
  if ($newElement.prev().find('small').length === 0) {
    // String is injected from localizer
    $newElement.prev().append("<small>" + context.required + "</small>");
  } else {
    $newElement.prev().find('small').show();
  }
  return $newElement;
}

/**
 * If a country with states is the default, a select will be sent,
 * In this case we need to be able to switch to an input field and hide the required field
 */
function makeStateOptional(stateElement) {
  var attrs = (0,lodash__WEBPACK_IMPORTED_MODULE_1__.transform)(stateElement.prop('attributes'), function (result, item) {
    var ret = result;
    ret[item.name] = item.value;
    return ret;
  });
  var replacementAttributes = {
    type: 'text',
    id: attrs.id,
    'data-label': attrs['data-label'],
    "class": 'form-input',
    name: attrs.name,
    'data-field-type': attrs['data-field-type']
  };
  stateElement.replaceWith($('<input />', replacementAttributes));
  var $newElement = $('[data-field-type="State"]');
  if ($newElement.length !== 0) {
    (0,_utils_form_utils__WEBPACK_IMPORTED_MODULE_2__.insertStateHiddenField)($newElement);
    $newElement.prev().find('small').hide();
  }
  return $newElement;
}

/**
 * Adds the array of options from the remote request to the newly created select box.
 * @param {Object} statesArray
 * @param {jQuery} $selectElement
 * @param {Object} options
 */
function addOptions(statesArray, $selectElement, options) {
  var container = [];
  container.push("<option value=\"\">" + statesArray.prefix + "</option>");
  if (!(0,lodash__WEBPACK_IMPORTED_MODULE_1__.isEmpty)($selectElement)) {
    statesArray.states.forEach(function (stateObj) {
      if (options.useIdForStates) {
        container.push("<option value=\"" + stateObj.id + "\">" + stateObj.name + "</option>");
      } else {
        container.push("<option value=\"" + stateObj.name + "\">" + (stateObj.label ? stateObj.label : stateObj.name) + "</option>");
      }
    });
    $selectElement.html(container.join(' '));
  }
}

/**
 *
 * @param {jQuery} stateElement
 * @param {Object} context
 * @param {Object} options
 * @param {Function} callback
 */
// eslint-disable-next-line default-param-last
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(stateElement, context, options, callback) {
  if (context === void 0) {
    context = {};
  }
  /**
   * Backwards compatible for three parameters instead of four
   *
   * Available options:
   *
   * useIdForStates {Bool} - Generates states dropdown using id for values instead of strings
   */
  if (typeof options === 'function') {
    /* eslint-disable no-param-reassign */
    callback = options;
    options = {};
    /* eslint-enable no-param-reassign */
  }
  $('select[data-field-type="Country"]').on('change', function (event) {
    var countryName = $(event.currentTarget).val();
    if (countryName === '') {
      return;
    }
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_0__["default"].api.country.getByName(countryName, function (err, response) {
      if (err) {
        (0,_global_modal__WEBPACK_IMPORTED_MODULE_3__.showAlertModal)(context.state_error);
        return callback(err);
      }
      var $currentInput = $('[data-field-type="State"]');
      if (!(0,lodash__WEBPACK_IMPORTED_MODULE_1__.isEmpty)(response.data.states)) {
        // The element may have been replaced with a select, reselect it
        var $selectElement = makeStateRequired($currentInput, context);
        addOptions(response.data, $selectElement, options);
        callback(null, $selectElement);
      } else {
        var newElement = makeStateOptional($currentInput, context);
        callback(null, newElement);
      }
    });
  });
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

/***/ }

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlbWUtYnVuZGxlLmNodW5rLmFzc2V0c19qc190aGVtZV9jb21tb25fbG95YWx0eS1zeW5jX2pzLWFzc2V0c19qc190aGVtZV9jb21tb25fc3RhdGUtY291bnRyeV9qcy1hc3NldHNfanNfdGhlbS04MDFhMWYuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OzswQkFDQSx1S0FBQUEsQ0FBQSxFQUFBQyxDQUFBLEVBQUFDLENBQUEsd0JBQUFDLE1BQUEsR0FBQUEsTUFBQSxPQUFBQyxDQUFBLEdBQUFGLENBQUEsQ0FBQUcsUUFBQSxrQkFBQUMsQ0FBQSxHQUFBSixDQUFBLENBQUFLLFdBQUEsOEJBQUFDLEVBQUFOLENBQUEsRUFBQUUsQ0FBQSxFQUFBRSxDQUFBLEVBQUFFLENBQUEsUUFBQUMsQ0FBQSxHQUFBTCxDQUFBLElBQUFBLENBQUEsQ0FBQU0sU0FBQSxZQUFBQyxTQUFBLEdBQUFQLENBQUEsR0FBQU8sU0FBQSxFQUFBQyxDQUFBLEdBQUFDLE1BQUEsQ0FBQUMsTUFBQSxDQUFBTCxDQUFBLENBQUFDLFNBQUEsVUFBQUssbUJBQUEsQ0FBQUgsQ0FBQSx1QkFBQVYsQ0FBQSxFQUFBRSxDQUFBLEVBQUFFLENBQUEsUUFBQUUsQ0FBQSxFQUFBQyxDQUFBLEVBQUFHLENBQUEsRUFBQUksQ0FBQSxNQUFBQyxDQUFBLEdBQUFYLENBQUEsUUFBQVksQ0FBQSxPQUFBQyxDQUFBLEtBQUFGLENBQUEsS0FBQWIsQ0FBQSxLQUFBZ0IsQ0FBQSxFQUFBcEIsQ0FBQSxFQUFBcUIsQ0FBQSxFQUFBQyxDQUFBLEVBQUFOLENBQUEsRUFBQU0sQ0FBQSxDQUFBQyxJQUFBLENBQUF2QixDQUFBLE1BQUFzQixDQUFBLFdBQUFBLEVBQUFyQixDQUFBLEVBQUFDLENBQUEsV0FBQU0sQ0FBQSxHQUFBUCxDQUFBLEVBQUFRLENBQUEsTUFBQUcsQ0FBQSxHQUFBWixDQUFBLEVBQUFtQixDQUFBLENBQUFmLENBQUEsR0FBQUYsQ0FBQSxFQUFBbUIsQ0FBQSxnQkFBQUMsRUFBQXBCLENB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O0VBQ2QsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQ1YsQ0FBQyxDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZXBpYy1zdXBlcnN0b3JlLy4vYXNzZXRzL2pzL3RoZW1lL2NvbW1vbi9sb3lhbHR5LXN5bmMuanMiLCJ3ZWJwYWNrOi8vZXBpYy1zdXBlcnN0b3JlLy4vYXNzZXRzL2pzL3RoZW1lL2NvbW1vbi9zdGF0ZS1jb3VudHJ5LmpzIiwid2VicGFjazovL2VwaWMtc3VwZXJzdG9yZS8uL2Fzc2V0cy9qcy90aGVtZS9jb21tb24vdXRpbHMvdHJhbnNsYXRpb25zLXV0aWxzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGNsYXNzIExveWFsdHlTeW5jIHtcbiAgICBjb25zdHJ1Y3Rvcihjb250ZXh0ID0ge30pIHtcbiAgICAgICAgdGhpcy5jb250ZXh0ID0gY29udGV4dDtcbiAgICAgICAgdGhpcy5hcGlFbmRwb2ludCA9IHRoaXMuY29udGV4dD8udGhlbWVTZXR0aW5ncz8ubGFyYXZlbF9hcGlfZW5kcG9pbnQgfHwgdGhpcy5jb250ZXh0Py5sYXJhdmVsX2FwaV9lbmRwb2ludDtcbiAgICAgICAgdGhpcy5hcGlLZXkgPSB0aGlzLmNvbnRleHQ/LnRoZW1lU2V0dGluZ3M/LmxhcmF2ZWxfYXBpX2tleSB8fCB0aGlzLmNvbnRleHQ/LmxhcmF2ZWxfYXBpX2tleTtcbiAgICAgICAgdGhpcy5jdXN0b21lcklkID0gdGhpcy5nZXRDdXN0b21lcklkKCk7XG4gICAgfVxuXG4gICAgZ2V0Q3VzdG9tZXJJZCgpIHtcbiAgICAgICAgY29uc3QgY3VzdG9tZXJJZCA9IHRoaXMuY29udGV4dD8uY3VzdG9tZXJJZDtcblxuICAgICAgICBpZiAoY3VzdG9tZXJJZCkge1xuICAgICAgICAgICAgcmV0dXJuIGN1c3RvbWVySWQ7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBjdXN0b21lciA9IHRoaXMuY29udGV4dD8uY3VzdG9tZXI7XG5cbiAgICAgICAgaWYgKGN1c3RvbWVyPy5pZCkge1xuICAgICAgICAgICAgcmV0dXJuIGN1c3RvbWVyLmlkO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgYXN5bmMgaW5pdCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLmN1c3RvbWVySWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLnN5bmNMb3lhbHR5UG9pbnRzKCk7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdbTG95YWx0eVN5bmNdIEZhaWxlZCB0byBzeW5jIGxveWFsdHkgcG9pbnRzOicsIGVycm9yKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFzeW5jIHN5bmNMb3lhbHR5UG9pbnRzKCkge1xuICAgICAgICBjb25zdCB1cmwgPSBgJHt0aGlzLmFwaUVuZHBvaW50fT9jdXN0b21lcl9pZD0ke3RoaXMuY3VzdG9tZXJJZH0mYXBpX2tleT0ke3RoaXMuYXBpS2V5fWA7XG5cbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCh1cmwsIHtcbiAgICAgICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgICAgQWNjZXB0OiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmICghcmVzcG9uc2Uub2spIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgSFRUUCBlcnJvciEgc3RhdHVzOiAke3Jlc3BvbnNlLnN0YXR1c31gKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG5cbiAgICAgICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ2xveWFsdHlQb2ludHNTeW5jZWQnLCB7XG4gICAgICAgICAgICBkZXRhaWw6IGRhdGEsXG4gICAgICAgIH0pKTtcblxuICAgICAgICByZXR1cm4gZGF0YTtcbiAgICB9XG5cbiAgICByZWZyZXNoKCkge1xuICAgICAgICBpZiAoIXRoaXMuY3VzdG9tZXJJZCkge1xuICAgICAgICAgICAgdGhpcy5jdXN0b21lcklkID0gdGhpcy5nZXRDdXN0b21lcklkKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXRoaXMuY3VzdG9tZXJJZCkge1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShudWxsKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLnN5bmNMb3lhbHR5UG9pbnRzKCk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHV0aWxzIGZyb20gJ0BiaWdjb21tZXJjZS9zdGVuY2lsLXV0aWxzJztcbmltcG9ydCB7IHRyYW5zZm9ybSwgaXNFbXB0eSB9IGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgeyBpbnNlcnRTdGF0ZUhpZGRlbkZpZWxkIH0gZnJvbSAnLi91dGlscy9mb3JtLXV0aWxzJztcbmltcG9ydCB7IHNob3dBbGVydE1vZGFsIH0gZnJvbSAnLi4vZ2xvYmFsL21vZGFsJztcblxuLyoqXG4gKiBJZiB0aGVyZSBhcmUgbm8gb3B0aW9ucyBmcm9tIGJjYXBwLCBhIHRleHQgZmllbGQgd2lsbCBiZSBzZW50LiBUaGlzIHdpbGwgY3JlYXRlIGEgc2VsZWN0IGVsZW1lbnQgdG8gaG9sZCBvcHRpb25zIGFmdGVyIHRoZSByZW1vdGUgcmVxdWVzdC5cbiAqIEByZXR1cm5zIHtqUXVlcnl8SFRNTEVsZW1lbnR9XG4gKi9cbmZ1bmN0aW9uIG1ha2VTdGF0ZVJlcXVpcmVkKHN0YXRlRWxlbWVudCwgY29udGV4dCkge1xuICAgIGNvbnN0IGF0dHJzID0gdHJhbnNmb3JtKHN0YXRlRWxlbWVudC5wcm9wKCdhdHRyaWJ1dGVzJyksIChyZXN1bHQsIGl0ZW0pID0+IHtcbiAgICAgICAgY29uc3QgcmV0ID0gcmVzdWx0O1xuICAgICAgICByZXRbaXRlbS5uYW1lXSA9IGl0ZW0udmFsdWU7XG4gICAgICAgIHJldHVybiByZXQ7XG4gICAgfSk7XG5cbiAgICBjb25zdCByZXBsYWNlbWVudEF0dHJpYnV0ZXMgPSB7XG4gICAgICAgIGlkOiBhdHRycy5pZCxcbiAgICAgICAgJ2RhdGEtbGFiZWwnOiBhdHRyc1snZGF0YS1sYWJlbCddLFxuICAgICAgICBjbGFzczogJ2Zvcm0tc2VsZWN0JyxcbiAgICAgICAgbmFtZTogYXR0cnMubmFtZSxcbiAgICAgICAgJ2RhdGEtZmllbGQtdHlwZSc6IGF0dHJzWydkYXRhLWZpZWxkLXR5cGUnXSxcbiAgICB9O1xuXG4gICAgc3RhdGVFbGVtZW50LnJlcGxhY2VXaXRoKCQoJzxzZWxlY3Q+PC9zZWxlY3Q+JywgcmVwbGFjZW1lbnRBdHRyaWJ1dGVzKSk7XG5cbiAgICBjb25zdCAkbmV3RWxlbWVudCA9ICQoJ1tkYXRhLWZpZWxkLXR5cGU9XCJTdGF0ZVwiXScpO1xuICAgIGNvbnN0ICRoaWRkZW5JbnB1dCA9ICQoJ1tuYW1lKj1cIkZvcm1GaWVsZElzVGV4dFwiXScpO1xuXG4gICAgaWYgKCRoaWRkZW5JbnB1dC5sZW5ndGggIT09IDApIHtcbiAgICAgICAgJGhpZGRlbklucHV0LnJlbW92ZSgpO1xuICAgIH1cblxuICAgIGlmICgkbmV3RWxlbWVudC5wcmV2KCkuZmluZCgnc21hbGwnKS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgLy8gU3RyaW5nIGlzIGluamVjdGVkIGZyb20gbG9jYWxpemVyXG4gICAgICAgICRuZXdFbGVtZW50LnByZXYoKS5hcHBlbmQoYDxzbWFsbD4ke2NvbnRleHQucmVxdWlyZWR9PC9zbWFsbD5gKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICAkbmV3RWxlbWVudC5wcmV2KCkuZmluZCgnc21hbGwnKS5zaG93KCk7XG4gICAgfVxuXG4gICAgcmV0dXJuICRuZXdFbGVtZW50O1xufVxuXG4vKipcbiAqIElmIGEgY291bnRyeSB3aXRoIHN0YXRlcyBpcyB0aGUgZGVmYXVsdCwgYSBzZWxlY3Qgd2lsbCBiZSBzZW50LFxuICogSW4gdGhpcyBjYXNlIHdlIG5lZWQgdG8gYmUgYWJsZSB0byBzd2l0Y2ggdG8gYW4gaW5wdXQgZmllbGQgYW5kIGhpZGUgdGhlIHJlcXVpcmVkIGZpZWxkXG4gKi9cbmZ1bmN0aW9uIG1ha2VTdGF0ZU9wdGlvbmFsKHN0YXRlRWxlbWVudCkge1xuICAgIGNvbnN0IGF0dHJzID0gdHJhbnNmb3JtKHN0YXRlRWxlbWVudC5wcm9wKCdhdHRyaWJ1dGVzJyksIChyZXN1bHQsIGl0ZW0pID0+IHtcbiAgICAgICAgY29uc3QgcmV0ID0gcmVzdWx0O1xuICAgICAgICByZXRbaXRlbS5uYW1lXSA9IGl0ZW0udmFsdWU7XG5cbiAgICAgICAgcmV0dXJuIHJldDtcbiAgICB9KTtcblxuICAgIGNvbnN0IHJlcGxhY2VtZW50QXR0cmlidXRlcyA9IHtcbiAgICAgICAgdHlwZTogJ3RleHQnLFxuICAgICAgICBpZDogYXR0cnMuaWQsXG4gICAgICAgICdkYXRhLWxhYmVsJzogYXR0cnNbJ2RhdGEtbGFiZWwnXSxcbiAgICAgICAgY2xhc3M6ICdmb3JtLWlucHV0JyxcbiAgICAgICAgbmFtZTogYXR0cnMubmFtZSxcbiAgICAgICAgJ2RhdGEtZmllbGQtdHlwZSc6IGF0dHJzWydkYXRhLWZpZWxkLXR5cGUnXSxcbiAgICB9O1xuXG4gICAgc3RhdGVFbGVtZW50LnJlcGxhY2VXaXRoKCQoJzxpbnB1dCAvPicsIHJlcGxhY2VtZW50QXR0cmlidXRlcykpO1xuXG4gICAgY29uc3QgJG5ld0VsZW1lbnQgPSAkKCdbZGF0YS1maWVsZC10eXBlPVwiU3RhdGVcIl0nKTtcblxuICAgIGlmICgkbmV3RWxlbWVudC5sZW5ndGggIT09IDApIHtcbiAgICAgICAgaW5zZXJ0U3RhdGVIaWRkZW5GaWVsZCgkbmV3RWxlbWVudCk7XG4gICAgICAgICRuZXdFbGVtZW50LnByZXYoKS5maW5kKCdzbWFsbCcpLmhpZGUoKTtcbiAgICB9XG5cbiAgICByZXR1cm4gJG5ld0VsZW1lbnQ7XG59XG5cbi8qKlxuICogQWRkcyB0aGUgYXJyYXkgb2Ygb3B0aW9ucyBmcm9tIHRoZSByZW1vdGUgcmVxdWVzdCB0byB0aGUgbmV3bHkgY3JlYXRlZCBzZWxlY3QgYm94LlxuICogQHBhcmFtIHtPYmplY3R9IHN0YXRlc0FycmF5XG4gKiBAcGFyYW0ge2pRdWVyeX0gJHNlbGVjdEVsZW1lbnRcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gKi9cbmZ1bmN0aW9uIGFkZE9wdGlvbnMoc3RhdGVzQXJyYXksICRzZWxlY3RFbGVtZW50LCBvcHRpb25zKSB7XG4gICAgY29uc3QgY29udGFpbmVyID0gW107XG5cbiAgICBjb250YWluZXIucHVzaChgPG9wdGlvbiB2YWx1ZT1cIlwiPiR7c3RhdGVzQXJyYXkucHJlZml4fTwvb3B0aW9uPmApO1xuXG4gICAgaWYgKCFpc0VtcHR5KCRzZWxlY3RFbGVtZW50KSkge1xuICAgICAgICBzdGF0ZXNBcnJheS5zdGF0ZXMuZm9yRWFjaCgoc3RhdGVPYmopID0+IHtcbiAgICAgICAgICAgIGlmIChvcHRpb25zLnVzZUlkRm9yU3RhdGVzKSB7XG4gICAgICAgICAgICAgICAgY29udGFpbmVyLnB1c2goYDxvcHRpb24gdmFsdWU9XCIke3N0YXRlT2JqLmlkfVwiPiR7c3RhdGVPYmoubmFtZX08L29wdGlvbj5gKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29udGFpbmVyLnB1c2goYDxvcHRpb24gdmFsdWU9XCIke3N0YXRlT2JqLm5hbWV9XCI+JHtzdGF0ZU9iai5sYWJlbCA/IHN0YXRlT2JqLmxhYmVsIDogc3RhdGVPYmoubmFtZX08L29wdGlvbj5gKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgJHNlbGVjdEVsZW1lbnQuaHRtbChjb250YWluZXIuam9pbignICcpKTtcbiAgICB9XG59XG5cbi8qKlxuICpcbiAqIEBwYXJhbSB7alF1ZXJ5fSBzdGF0ZUVsZW1lbnRcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb250ZXh0XG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2tcbiAqL1xuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGRlZmF1bHQtcGFyYW0tbGFzdFxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHN0YXRlRWxlbWVudCwgY29udGV4dCA9IHt9LCBvcHRpb25zLCBjYWxsYmFjaykge1xuICAgIC8qKlxuICAgICAqIEJhY2t3YXJkcyBjb21wYXRpYmxlIGZvciB0aHJlZSBwYXJhbWV0ZXJzIGluc3RlYWQgb2YgZm91clxuICAgICAqXG4gICAgICogQXZhaWxhYmxlIG9wdGlvbnM6XG4gICAgICpcbiAgICAgKiB1c2VJZEZvclN0YXRlcyB7Qm9vbH0gLSBHZW5lcmF0ZXMgc3RhdGVzIGRyb3Bkb3duIHVzaW5nIGlkIGZvciB2YWx1ZXMgaW5zdGVhZCBvZiBzdHJpbmdzXG4gICAgICovXG4gICAgaWYgKHR5cGVvZiBvcHRpb25zID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIC8qIGVzbGludC1kaXNhYmxlIG5vLXBhcmFtLXJlYXNzaWduICovXG4gICAgICAgIGNhbGxiYWNrID0gb3B0aW9ucztcbiAgICAgICAgb3B0aW9ucyA9IHt9O1xuICAgICAgICAvKiBlc2xpbnQtZW5hYmxlIG5vLXBhcmFtLXJlYXNzaWduICovXG4gICAgfVxuXG4gICAgJCgnc2VsZWN0W2RhdGEtZmllbGQtdHlwZT1cIkNvdW50cnlcIl0nKS5vbignY2hhbmdlJywgZXZlbnQgPT4ge1xuICAgICAgICBjb25zdCBjb3VudHJ5TmFtZSA9ICQoZXZlbnQuY3VycmVudFRhcmdldCkudmFsKCk7XG5cbiAgICAgICAgaWYgKGNvdW50cnlOYW1lID09PSAnJykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdXRpbHMuYXBpLmNvdW50cnkuZ2V0QnlOYW1lKGNvdW50cnlOYW1lLCAoZXJyLCByZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgIHNob3dBbGVydE1vZGFsKGNvbnRleHQuc3RhdGVfZXJyb3IpO1xuICAgICAgICAgICAgICAgIHJldHVybiBjYWxsYmFjayhlcnIpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCAkY3VycmVudElucHV0ID0gJCgnW2RhdGEtZmllbGQtdHlwZT1cIlN0YXRlXCJdJyk7XG5cbiAgICAgICAgICAgIGlmICghaXNFbXB0eShyZXNwb25zZS5kYXRhLnN0YXRlcykpIHtcbiAgICAgICAgICAgICAgICAvLyBUaGUgZWxlbWVudCBtYXkgaGF2ZSBiZWVuIHJlcGxhY2VkIHdpdGggYSBzZWxlY3QsIHJlc2VsZWN0IGl0XG4gICAgICAgICAgICAgICAgY29uc3QgJHNlbGVjdEVsZW1lbnQgPSBtYWtlU3RhdGVSZXF1aXJlZCgkY3VycmVudElucHV0LCBjb250ZXh0KTtcblxuICAgICAgICAgICAgICAgIGFkZE9wdGlvbnMocmVzcG9uc2UuZGF0YSwgJHNlbGVjdEVsZW1lbnQsIG9wdGlvbnMpO1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrKG51bGwsICRzZWxlY3RFbGVtZW50KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc3QgbmV3RWxlbWVudCA9IG1ha2VTdGF0ZU9wdGlvbmFsKCRjdXJyZW50SW5wdXQsIGNvbnRleHQpO1xuXG4gICAgICAgICAgICAgICAgY2FsbGJhY2sobnVsbCwgbmV3RWxlbWVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0pO1xufVxuIiwiY29uc3QgVFJBTlNMQVRJT05TID0gJ3RyYW5zbGF0aW9ucyc7XG5jb25zdCBpc1RyYW5zbGF0aW9uRGljdGlvbmFyeU5vdEVtcHR5ID0gKGRpY3Rpb25hcnkpID0+ICEhT2JqZWN0LmtleXMoZGljdGlvbmFyeVtUUkFOU0xBVElPTlNdKS5sZW5ndGg7XG5jb25zdCBjaG9vc2VBY3RpdmVEaWN0aW9uYXJ5ID0gKC4uLmRpY3Rpb25hcnlKc29uTGlzdCkgPT4ge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGljdGlvbmFyeUpzb25MaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGRpY3Rpb25hcnkgPSBKU09OLnBhcnNlKGRpY3Rpb25hcnlKc29uTGlzdFtpXSk7XG4gICAgICAgIGlmIChpc1RyYW5zbGF0aW9uRGljdGlvbmFyeU5vdEVtcHR5KGRpY3Rpb25hcnkpKSB7XG4gICAgICAgICAgICByZXR1cm4gZGljdGlvbmFyeTtcbiAgICAgICAgfVxuICAgIH1cbn07XG5cbi8qKlxuICogZGVmaW5lcyBUcmFuc2xhdGlvbiBEaWN0aW9uYXJ5IHRvIHVzZVxuICogQHBhcmFtIGNvbnRleHQgcHJvdmlkZXMgYWNjZXNzIHRvIDMgdmFsaWRhdGlvbiBKU09OcyBmcm9tIGVuLmpzb246XG4gKiB2YWxpZGF0aW9uX21lc3NhZ2VzLCB2YWxpZGF0aW9uX2ZhbGxiYWNrX21lc3NhZ2VzIGFuZCBkZWZhdWx0X21lc3NhZ2VzXG4gKiBAcmV0dXJucyB7T2JqZWN0fVxuICovXG5leHBvcnQgY29uc3QgY3JlYXRlVHJhbnNsYXRpb25EaWN0aW9uYXJ5ID0gKGNvbnRleHQpID0+IHtcbiAgICBjb25zdCB7IHZhbGlkYXRpb25EaWN0aW9uYXJ5SlNPTiwgdmFsaWRhdGlvbkZhbGxiYWNrRGljdGlvbmFyeUpTT04sIHZhbGlkYXRpb25EZWZhdWx0RGljdGlvbmFyeUpTT04gfSA9IGNvbnRleHQ7XG4gICAgY29uc3QgYWN0aXZlRGljdGlvbmFyeSA9IGNob29zZUFjdGl2ZURpY3Rpb25hcnkodmFsaWRhdGlvbkRpY3Rpb25hcnlKU09OLCB2YWxpZGF0aW9uRmFsbGJhY2tEaWN0aW9uYXJ5SlNPTiwgdmFsaWRhdGlvbkRlZmF1bHREaWN0aW9uYXJ5SlNPTik7XG4gICAgY29uc3QgbG9jYWxpemF0aW9ucyA9IE9iamVjdC52YWx1ZXMoYWN0aXZlRGljdGlvbmFyeVtUUkFOU0xBVElPTlNdKTtcbiAgICBjb25zdCB0cmFuc2xhdGlvbktleXMgPSBPYmplY3Qua2V5cyhhY3RpdmVEaWN0aW9uYXJ5W1RSQU5TTEFUSU9OU10pLm1hcChrZXkgPT4ga2V5LnNwbGl0KCcuJykucG9wKCkpO1xuXG4gICAgcmV0dXJuIHRyYW5zbGF0aW9uS2V5cy5yZWR1Y2UoKGFjYywga2V5LCBpKSA9PiB7XG4gICAgICAgIGFjY1trZXldID0gbG9jYWxpemF0aW9uc1tpXTtcbiAgICAgICAgcmV0dXJuIGFjYztcbiAgICB9LCB7fSk7XG59O1xuIl0sIm5hbWVzIjpbImUiLCJ0IiwiciIsIlN5bWJvbCIsIm4iLCJpdGVyYXRvciIsIm8iLCJ0b1N0cmluZ1RhZyIsImkiLCJjIiwicHJvdG90eXBlIiwiR2VuZXJhdG9yIiwidSIsIk9iamVjdCIsImNyZWF0ZSIsIl9yZWdlbmVyYXRvckRlZmluZTIiLCJmIiwicCIsInkiLCJHIiwidiIsImEiLCJkIiwiYmluZCIsImxlbmd0aCIsImwiLCJUeXBlRXJyb3IiLCJjYWxsIiwiZG9uZSIsInZhbHVlIiwiR2VuZXJhdG9yRnVuY3Rpb24iLCJHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSIsImdldFByb3RvdHlwZU9mIiwic2V0UHJvdG90eXBlT2YiLCJfX3Byb3RvX18iLCJkaXNwbGF5TmFtZSIsIl9yZWdlbmVyYXRvciIsInciLCJtIiwiZGVmaW5lUHJvcGVydHkiLCJfcmVnZW5lcmF0b3JEZWZpbmUiLCJfaW52b2tlIiwiZW51bWVyYWJsZSIsImNvbmZpZ3VyYWJsZSIsIndyaXRhYmxlIiwiYXN5bmNHZW5lcmF0b3JTdGVwIiwiUHJvbWlzZSIsInJlc29sdmUiLCJ0aGVuIiwiX2FzeW5jVG9HZW5lcmF0b3IiLCJhcmd1bWVudHMiLCJhcHBseSIsIl9uZXh0IiwiX3Rocm93IiwiTG95YWx0eVN5bmMiLCJjb250ZXh0IiwiX3RoaXMkY29udGV4dCIsIl90aGlzJGNvbnRleHQyIiwiX3RoaXMkY29udGV4dDMiLCJfdGhpcyRjb250ZXh0NCIsImFwaUVuZHBvaW50IiwidGhlbWVTZXR0aW5ncyIsImxhcmF2ZWxfYXBpX2VuZHBvaW50IiwiYXBpS2V5IiwibGFyYXZlbF9hcGlfa2V5IiwiY3VzdG9tZXJJZCIsImdldEN1c3RvbWVySWQiLCJfcHJvdG8iLCJfdGhpcyRjb250ZXh0NSIsIl90aGlzJGNvbnRleHQ2IiwiY3VzdG9tZXIiLCJpZCIsImluaXQiLCJfaW5pdCIsIl9jYWxsZWUiLCJfdCIsIl9jb250ZXh0Iiwic3luY0xveWFsdHlQb2ludHMiLCJjb25zb2xlIiwiZXJyb3IiLCJfc3luY0xveWFsdHlQb2ludHMiLCJfY2FsbGVlMiIsInVybCIsInJlc3BvbnNlIiwiZGF0YSIsIl9jb250ZXh0MiIsImZldGNoIiwibWV0aG9kIiwiaGVhZGVycyIsIkFjY2VwdCIsIm9rIiwiRXJyb3IiLCJzdGF0dXMiLCJqc29uIiwiZG9jdW1lbnQiLCJkaXNwYXRjaEV2ZW50IiwiQ3VzdG9tRXZlbnQiLCJkZXRhaWwiLCJyZWZyZXNoIiwiZGVmYXVsdCIsInV0aWxzIiwidHJhbnNmb3JtIiwiaXNFbXB0eSIsImluc2VydFN0YXRlSGlkZGVuRmllbGQiLCJzaG93QWxlcnRNb2RhbCIsIm1ha2VTdGF0ZVJlcXVpcmVkIiwic3RhdGVFbGVtZW50IiwiYXR0cnMiLCJwcm9wIiwicmVzdWx0IiwiaXRlbSIsInJldCIsIm5hbWUiLCJyZXBsYWNlbWVudEF0dHJpYnV0ZXMiLCJyZXBsYWNlV2l0aCIsIiQiLCIkbmV3RWxlbWVudCIsIiRoaWRkZW5JbnB1dCIsInJlbW92ZSIsInByZXYiLCJmaW5kIiwiYXBwZW5kIiwicmVxdWlyZWQiLCJzaG93IiwibWFrZVN0YXRlT3B0aW9uYWwiLCJ0eXBlIiwiaGlkZSIsImFkZE9wdGlvbnMiLCJzdGF0ZXNBcnJheSIsIiRzZWxlY3RFbGVtZW50Iiwib3B0aW9ucyIsImNvbnRhaW5lciIsInB1c2giLCJwcmVmaXgiLCJzdGF0ZXMiLCJmb3JFYWNoIiwic3RhdGVPYmoiLCJ1c2VJZEZvclN0YXRlcyIsImxhYmVsIiwiaHRtbCIsImpvaW4iLCJjYWxsYmFjayIsIm9uIiwiZXZlbnQiLCJjb3VudHJ5TmFtZSIsImN1cnJlbnRUYXJnZXQiLCJ2YWwiLCJhcGkiLCJjb3VudHJ5IiwiZ2V0QnlOYW1lIiwiZXJyIiwic3RhdGVfZXJyb3IiLCIkY3VycmVudElucHV0IiwibmV3RWxlbWVudCIsIlRSQU5TTEFUSU9OUyIsImlzVHJhbnNsYXRpb25EaWN0aW9uYXJ5Tm90RW1wdHkiLCJkaWN0aW9uYXJ5Iiwia2V5cyIsImNob29zZUFjdGl2ZURpY3Rpb25hcnkiLCJKU09OIiwicGFyc2UiLCJ1bmRlZmluZWQiLCJjcmVhdGVUcmFuc2xhdGlvbkRpY3Rpb25hcnkiLCJ2YWxpZGF0aW9uRGljdGlvbmFyeUpTT04iLCJ2YWxpZGF0aW9uRmFsbGJhY2tEaWN0aW9uYXJ5SlNPTiIsInZhbGlkYXRpb25EZWZhdWx0RGljdGlvbmFyeUpTT04iLCJhY3RpdmVEaWN0aW9uYXJ5IiwibG9jYWxpemF0aW9ucyIsInZhbHVlcyIsInRyYW5zbGF0aW9uS2V5cyIsIm1hcCIsImtleSIsInNwbGl0IiwicG9wIiwicmVkdWNlIiwiYWNjIl0sInNvdXJjZVJvb3QiOiIifQ==
