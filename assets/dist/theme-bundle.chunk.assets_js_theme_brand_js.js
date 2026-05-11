"use strict";
(self["webpackChunkepic_superstore"] = self["webpackChunkepic_superstore"] || []).push([["assets_js_theme_brand_js"],{

/***/ "./assets/js/theme/brand.js"
/*!**********************************!*\
  !*** ./assets/js/theme/brand.js ***!
  \**********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Brand)
/* harmony export */ });
/* harmony import */ var _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @bigcommerce/stencil-utils */ "./node_modules/@bigcommerce/stencil-utils/src/main.js");
/* harmony import */ var _catalog__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./catalog */ "./assets/js/theme/catalog.js");
/* harmony import */ var _global_compare_products__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./global/compare-products */ "./assets/js/theme/global/compare-products.js");
/* harmony import */ var _common_faceted_search__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./common/faceted-search */ "./assets/js/theme/common/faceted-search.js");
/* harmony import */ var _common_utils_translations_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./common/utils/translations-utils */ "./assets/js/theme/common/utils/translations-utils.js");
/* harmony import */ var _custom_customer_group_filter__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./custom/customer-group-filter */ "./assets/js/theme/custom/customer-group-filter.js");
/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js");
function _inheritsLoose(t, o) { t.prototype = Object.create(o.prototype), t.prototype.constructor = t, _setPrototypeOf(t, o); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }






var Brand = /*#__PURE__*/function (_CatalogPage) {
  function Brand(context) {
    var _this;
    _this = _CatalogPage.call(this, context) || this;
    _this.validationDictionary = (0,_common_utils_translations_utils__WEBPACK_IMPORTED_MODULE_4__.createTranslationDictionary)(context);
    return _this;
  }
  _inheritsLoose(Brand, _CatalogPage);
  var _proto = Brand.prototype;
  _proto.onReady = function onReady() {
    (0,_global_compare_products__WEBPACK_IMPORTED_MODULE_2__["default"])(this.context);
    if ($('#facetedSearch').length > 0) {
      this.initFacetedSearch();
    } else {
      this.onSortBySubmit = this.onSortBySubmit.bind(this);
      _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_0__.hooks.on('sortBy-submitted', this.onSortBySubmit);
    }
  };
  _proto.initFacetedSearch = function initFacetedSearch() {
    var _this2 = this;
    var _this$validationDicti = this.validationDictionary,
      onMinPriceError = _this$validationDicti.price_min_evaluation,
      onMaxPriceError = _this$validationDicti.price_max_evaluation,
      minPriceNotEntered = _this$validationDicti.price_min_not_entered,
      maxPriceNotEntered = _this$validationDicti.price_max_not_entered,
      onInvalidPrice = _this$validationDicti.price_invalid_value;
    var $productListingContainer = $('#product-listing-container');
    var $facetedSearchContainer = $('#faceted-search-container');
    var productsPerPage = this.context.brandProductsPerPage;
    var requestOptions = {
      template: {
        productListing: 'brand/product-listing',
        sidebar: 'brand/sidebar'
      },
      config: {
        shop_by_brand: true,
        brand: {
          products: {
            limit: productsPerPage
          }
        }
      },
      showMore: 'brand/show-more'
    };
    this.facetedSearch = new _common_faceted_search__WEBPACK_IMPORTED_MODULE_3__["default"](requestOptions, function (content) {
      $productListingContainer.html(content.productListing);
      $facetedSearchContainer.html(content.sidebar);
      var filterResult = (0,_custom_customer_group_filter__WEBPACK_IMPORTED_MODULE_5__.applyProductFilter)(_this2.context, '#product-listing-container');
      (0,_custom_customer_group_filter__WEBPACK_IMPORTED_MODULE_5__.adjustPaginationAfterFilter)(filterResult, '#product-listing-container');
      $('body').triggerHandler('compareReset');
      $('html, body').animate({
        scrollTop: 0
      }, 100);
    }, {
      validationErrorMessages: {
        onMinPriceError: onMinPriceError,
        onMaxPriceError: onMaxPriceError,
        minPriceNotEntered: minPriceNotEntered,
        maxPriceNotEntered: maxPriceNotEntered,
        onInvalidPrice: onInvalidPrice
      }
    });
  };
  return Brand;
}(_catalog__WEBPACK_IMPORTED_MODULE_1__["default"]);


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlbWUtYnVuZGxlLmNodW5rLmFzc2V0c19qc190aGVtZV9icmFuZF9qcy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQW1EO0FBQ2Y7QUFDb0I7QUFDSjtBQUM0QjtBQUNpQjtBQUFBLElBRTVFTyxLQUFLLDBCQUFBQyxZQUFBO0VBQ3RCLFNBQUFELE1BQVlFLE9BQU8sRUFBRTtJQUFBLElBQUFDLEtBQUE7SUFDakJBLEtBQUEsR0FBQUYsWUFBQSxDQUFBRyxJQUFBLE9BQU1GLE9BQU8sQ0FBQztJQUNkQyxLQUFBLENBQUtFLG9CQUFvQixHQUFHUiw2RkFBMkIsQ0FBQ0ssT0FBTyxDQUFDO0lBQUMsT0FBQUMsS0FBQTtFQUNyRTtFQUFDRyxjQUFBLENBQUFOLEtBQUEsRUFBQUMsWUFBQTtFQUFBLElBQUFNLE1BQUEsR0FBQVAsS0FBQSxDQUFBUSxTQUFBO0VBQUFELE1BQUEsQ0FFREUsT0FBTyxHQUFQLFNBQUFBLE9BQU9BLENBQUEsRUFBRztJQUNOZCxvRUFBZSxDQUFDLElBQUksQ0FBQ08sT0FBTyxDQUFDO0lBRTdCLElBQUlRLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO01BQ2hDLElBQUksQ0FBQ0MsaUJBQWlCLENBQUMsQ0FBQztJQUM1QixDQUFDLE1BQU07TUFDSCxJQUFJLENBQUNDLGNBQWMsR0FBRyxJQUFJLENBQUNBLGNBQWMsQ0FBQ0MsSUFBSSxDQUFDLElBQUksQ0FBQztNQUNwRHJCLDZEQUFLLENBQUNzQixFQUFFLENBQUMsa0JBQWtCLEVBQUUsSUFBSSxDQUFDRixjQUFjLENBQUM7SUFDckQ7RUFDSixDQUFDO0VBQUFOLE1BQUEsQ0FFREssaUJBQWlCLEdBQWpCLFNBQUFBLGlCQUFpQkEsQ0FBQSxFQUFHO0lBQUEsSUFBQUksTUFBQTtJQUNoQixJQUFBQyxxQkFBQSxHQU1JLElBQUksQ0FBQ1osb0JBQW9CO01BTEhhLGVBQWUsR0FBQUQscUJBQUEsQ0FBckNFLG9CQUFvQjtN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QkFBd0IsR0FBd0U1RCxPQUFPLENBQXZHNEQsd0JBQXdCO0lBQUVDLGdDQUFnQyxHQUFzQzdELE9BQU8sQ0FBN0U2RCxnQ0FBZ0M7SUFBRUMsK0JBQStCLEdBQUs5RCxPQUFPLENBQTNDOEQsK0JBQStCO0VBQ25HLElBQU1DLGdCQUFnQixHQUFHVCxzQkFBc0IsQ0FBQ00sd0JBQXdCLEVBQUVDLGdDQUFnQyxFQUFFQywrQkFBK0IsQ0FBQztFQUM1SSxJQUFNRSxhQUFhLEdBQUdaLE1BQU0sQ0FBQ2EsTUFBTSxDQUFDRixnQkFBZ0IsQ0FBQ2QsWUFBWSxDQUFDLENBQUM7RUFDbkUsSUFBTWlCLGVBQWUsR0FBR2QsTUFBTSxDQUFDQyxJQUFJLENBQUNVLGdCQUFnQixDQUFDZCxZQUFZLENBQUMsQ0FBQyxDQUFDa0IsR0FBRyxDQUFDLFVBQUFDLEdBQUc7SUFBQSxPQUFJQSxHQUFHLENBQUNDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQ0MsR0FBRyxDQUFDLENBQUM7RUFBQSxFQUFDO0VBRXBHLE9BQU9KLGVBQWUsQ0FBQ0ssTUFBTSxDQUFDLFVBQUNDLEdBQUcsRUFBRUosR0FBRyxFQUFFYixDQUFDLEVBQUs7SUFDM0NpQixHQUFHLENBQUNKLEdBQUcsQ0FBQyxHQUFHSixhQUFhLENBQUNULENBQUMsQ0FBQztJQUMzQixPQUFPaUIsR0FBRztFQUNkLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUNWLENBQUMsQyIsInNvdXJjZXMiOlsid2VicGFjazovL2VwaWMtc3VwZXJzdG9yZS8uL2Fzc2V0cy9qcy90aGVtZS9icmFuZC5qcyIsIndlYnBhY2s6Ly9lcGljLXN1cGVyc3RvcmUvLi9hc3NldHMvanMvdGhlbWUvY29tbW9uL3V0aWxzL3RyYW5zbGF0aW9ucy11dGlscy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBob29rcyB9IGZyb20gJ0BiaWdjb21tZXJjZS9zdGVuY2lsLXV0aWxzJztcbmltcG9ydCBDYXRhbG9nUGFnZSBmcm9tICcuL2NhdGFsb2cnO1xuaW1wb3J0IGNvbXBhcmVQcm9kdWN0cyBmcm9tICcuL2dsb2JhbC9jb21wYXJlLXByb2R1Y3RzJztcbmltcG9ydCBGYWNldGVkU2VhcmNoIGZyb20gJy4vY29tbW9uL2ZhY2V0ZWQtc2VhcmNoJztcbmltcG9ydCB7IGNyZWF0ZVRyYW5zbGF0aW9uRGljdGlvbmFyeSB9IGZyb20gJy4vY29tbW9uL3V0aWxzL3RyYW5zbGF0aW9ucy11dGlscyc7XG5pbXBvcnQgeyBhcHBseVByb2R1Y3RGaWx0ZXIsIGFkanVzdFBhZ2luYXRpb25BZnRlckZpbHRlciB9IGZyb20gJy4vY3VzdG9tL2N1c3RvbWVyLWdyb3VwLWZpbHRlcic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJyYW5kIGV4dGVuZHMgQ2F0YWxvZ1BhZ2Uge1xuICAgIGNvbnN0cnVjdG9yKGNvbnRleHQpIHtcbiAgICAgICAgc3VwZXIoY29udGV4dCk7XG4gICAgICAgIHRoaXMudmFsaWRhdGlvbkRpY3Rpb25hcnkgPSBjcmVhdGVUcmFuc2xhdGlvbkRpY3Rpb25hcnkoY29udGV4dCk7XG4gICAgfVxuXG4gICAgb25SZWFkeSgpIHtcbiAgICAgICAgY29tcGFyZVByb2R1Y3RzKHRoaXMuY29udGV4dCk7XG5cbiAgICAgICAgaWYgKCQoJyNmYWNldGVkU2VhcmNoJykubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgdGhpcy5pbml0RmFjZXRlZFNlYXJjaCgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5vblNvcnRCeVN1Ym1pdCA9IHRoaXMub25Tb3J0QnlTdWJtaXQuYmluZCh0aGlzKTtcbiAgICAgICAgICAgIGhvb2tzLm9uKCdzb3J0Qnktc3VibWl0dGVkJywgdGhpcy5vblNvcnRCeVN1Ym1pdCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpbml0RmFjZXRlZFNlYXJjaCgpIHtcbiAgICAgICAgY29uc3Qge1xuICAgICAgICAgICAgcHJpY2VfbWluX2V2YWx1YXRpb246IG9uTWluUHJpY2VFcnJvcixcbiAgICAgICAgICAgIHByaWNlX21heF9ldmFsdWF0aW9uOiBvbk1heFByaWNlRXJyb3IsXG4gICAgICAgICAgICBwcmljZV9taW5fbm90X2VudGVyZWQ6IG1pblByaWNlTm90RW50ZXJlZCxcbiAgICAgICAgICAgIHByaWNlX21heF9ub3RfZW50ZXJlZDogbWF4UHJpY2VOb3RFbnRlcmVkLFxuICAgICAgICAgICAgcHJpY2VfaW52YWxpZF92YWx1ZTogb25JbnZhbGlkUHJpY2UsXG4gICAgICAgIH0gPSB0aGlzLnZhbGlkYXRpb25EaWN0aW9uYXJ5O1xuICAgICAgICBjb25zdCAkcHJvZHVjdExpc3RpbmdDb250YWluZXIgPSAkKCcjcHJvZHVjdC1saXN0aW5nLWNvbnRhaW5lcicpO1xuICAgICAgICBjb25zdCAkZmFjZXRlZFNlYXJjaENvbnRhaW5lciA9ICQoJyNmYWNldGVkLXNlYXJjaC1jb250YWluZXInKTtcbiAgICAgICAgY29uc3QgcHJvZHVjdHNQZXJQYWdlID0gdGhpcy5jb250ZXh0LmJyYW5kUHJvZHVjdHNQZXJQYWdlO1xuICAgICAgICBjb25zdCByZXF1ZXN0T3B0aW9ucyA9IHtcbiAgICAgICAgICAgIHRlbXBsYXRlOiB7XG4gICAgICAgICAgICAgICAgcHJvZHVjdExpc3Rpbmc6ICdicmFuZC9wcm9kdWN0LWxpc3RpbmcnLFxuICAgICAgICAgICAgICAgIHNpZGViYXI6ICdicmFuZC9zaWRlYmFyJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjb25maWc6IHtcbiAgICAgICAgICAgICAgICBzaG9wX2J5X2JyYW5kOiB0cnVlLFxuICAgICAgICAgICAgICAgIGJyYW5kOiB7XG4gICAgICAgICAgICAgICAgICAgIHByb2R1Y3RzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsaW1pdDogcHJvZHVjdHNQZXJQYWdlLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2hvd01vcmU6ICdicmFuZC9zaG93LW1vcmUnLFxuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMuZmFjZXRlZFNlYXJjaCA9IG5ldyBGYWNldGVkU2VhcmNoKHJlcXVlc3RPcHRpb25zLCAoY29udGVudCkgPT4ge1xuICAgICAgICAgICAgJHByb2R1Y3RMaXN0aW5nQ29udGFpbmVyLmh0bWwoY29udGVudC5wcm9kdWN0TGlzdGluZyk7XG4gICAgICAgICAgICAkZmFjZXRlZFNlYXJjaENvbnRhaW5lci5odG1sKGNvbnRlbnQuc2lkZWJhcik7XG5cbiAgICAgICAgICAgIGNvbnN0IGZpbHRlclJlc3VsdCA9IGFwcGx5UHJvZHVjdEZpbHRlcih0aGlzLmNvbnRleHQsICcjcHJvZHVjdC1saXN0aW5nLWNvbnRhaW5lcicpO1xuICAgICAgICAgICAgYWRqdXN0UGFnaW5hdGlvbkFmdGVyRmlsdGVyKGZpbHRlclJlc3VsdCwgJyNwcm9kdWN0LWxpc3RpbmctY29udGFpbmVyJyk7XG5cbiAgICAgICAgICAgICQoJ2JvZHknKS50cmlnZ2VySGFuZGxlcignY29tcGFyZVJlc2V0Jyk7XG5cbiAgICAgICAgICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHtcbiAgICAgICAgICAgICAgICBzY3JvbGxUb3A6IDAsXG4gICAgICAgICAgICB9LCAxMDApO1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICB2YWxpZGF0aW9uRXJyb3JNZXNzYWdlczoge1xuICAgICAgICAgICAgICAgIG9uTWluUHJpY2VFcnJvcixcbiAgICAgICAgICAgICAgICBvbk1heFByaWNlRXJyb3IsXG4gICAgICAgICAgICAgICAgbWluUHJpY2VOb3RFbnRlcmVkLFxuICAgICAgICAgICAgICAgIG1heFByaWNlTm90RW50ZXJlZCxcbiAgICAgICAgICAgICAgICBvbkludmFsaWRQcmljZSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiIsImNvbnN0IFRSQU5TTEFUSU9OUyA9ICd0cmFuc2xhdGlvbnMnO1xuY29uc3QgaXNUcmFuc2xhdGlvbkRpY3Rpb25hcnlOb3RFbXB0eSA9IChkaWN0aW9uYXJ5KSA9PiAhIU9iamVjdC5rZXlzKGRpY3Rpb25hcnlbVFJBTlNMQVRJT05TXSkubGVuZ3RoO1xuY29uc3QgY2hvb3NlQWN0aXZlRGljdGlvbmFyeSA9ICguLi5kaWN0aW9uYXJ5SnNvbkxpc3QpID0+IHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRpY3Rpb25hcnlKc29uTGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBkaWN0aW9uYXJ5ID0gSlNPTi5wYXJzZShkaWN0aW9uYXJ5SnNvbkxpc3RbaV0pO1xuICAgICAgICBpZiAoaXNUcmFuc2xhdGlvbkRpY3Rpb25hcnlOb3RFbXB0eShkaWN0aW9uYXJ5KSkge1xuICAgICAgICAgICAgcmV0dXJuIGRpY3Rpb25hcnk7XG4gICAgICAgIH1cbiAgICB9XG59O1xuXG4vKipcbiAqIGRlZmluZXMgVHJhbnNsYXRpb24gRGljdGlvbmFyeSB0byB1c2VcbiAqIEBwYXJhbSBjb250ZXh0IHByb3ZpZGVzIGFjY2VzcyB0byAzIHZhbGlkYXRpb24gSlNPTnMgZnJvbSBlbi5qc29uOlxuICogdmFsaWRhdGlvbl9tZXNzYWdlcywgdmFsaWRhdGlvbl9mYWxsYmFja19tZXNzYWdlcyBhbmQgZGVmYXVsdF9tZXNzYWdlc1xuICogQHJldHVybnMge09iamVjdH1cbiAqL1xuZXhwb3J0IGNvbnN0IGNyZWF0ZVRyYW5zbGF0aW9uRGljdGlvbmFyeSA9IChjb250ZXh0KSA9PiB7XG4gICAgY29uc3QgeyB2YWxpZGF0aW9uRGljdGlvbmFyeUpTT04sIHZhbGlkYXRpb25GYWxsYmFja0RpY3Rpb25hcnlKU09OLCB2YWxpZGF0aW9uRGVmYXVsdERpY3Rpb25hcnlKU09OIH0gPSBjb250ZXh0O1xuICAgIGNvbnN0IGFjdGl2ZURpY3Rpb25hcnkgPSBjaG9vc2VBY3RpdmVEaWN0aW9uYXJ5KHZhbGlkYXRpb25EaWN0aW9uYXJ5SlNPTiwgdmFsaWRhdGlvbkZhbGxiYWNrRGljdGlvbmFyeUpTT04sIHZhbGlkYXRpb25EZWZhdWx0RGljdGlvbmFyeUpTT04pO1xuICAgIGNvbnN0IGxvY2FsaXphdGlvbnMgPSBPYmplY3QudmFsdWVzKGFjdGl2ZURpY3Rpb25hcnlbVFJBTlNMQVRJT05TXSk7XG4gICAgY29uc3QgdHJhbnNsYXRpb25LZXlzID0gT2JqZWN0LmtleXMoYWN0aXZlRGljdGlvbmFyeVtUUkFOU0xBVElPTlNdKS5tYXAoa2V5ID0+IGtleS5zcGxpdCgnLicpLnBvcCgpKTtcblxuICAgIHJldHVybiB0cmFuc2xhdGlvbktleXMucmVkdWNlKChhY2MsIGtleSwgaSkgPT4ge1xuICAgICAgICBhY2Nba2V5XSA9IGxvY2FsaXphdGlvbnNbaV07XG4gICAgICAgIHJldHVybiBhY2M7XG4gICAgfSwge30pO1xufTtcbiJdLCJuYW1lcyI6WyJob29rcyIsIkNhdGFsb2dQYWdlIiwiY29tcGFyZVByb2R1Y3RzIiwiRmFjZXRlZFNlYXJjaCIsImNyZWF0ZVRyYW5zbGF0aW9uRGljdGlvbmFyeSIsImFwcGx5UHJvZHVjdEZpbHRlciIsImFkanVzdFBhZ2luYXRpb25BZnRlckZpbHRlciIsIkJyYW5kIiwiX0NhdGFsb2dQYWdlIiwiY29udGV4dCIsIl90aGlzIiwiY2FsbCIsInZhbGlkYXRpb25EaWN0aW9uYXJ5IiwiX2luaGVyaXRzTG9vc2UiLCJfcHJvdG8iLCJwcm90b3R5cGUiLCJvblJlYWR5IiwiJCIsImxlbmd0aCIsImluaXRGYWNldGVkU2VhcmNoIiwib25Tb3J0QnlTdWJtaXQiLCJiaW5kIiwib24iLCJfdGhpczIiLCJfdGhpcyR2YWxpZGF0aW9uRGljdGkiLCJvbk1pblByaWNlRXJyb3IiLCJwcmljZV9taW5fZXZhbHVhdGlvbiIsIm9uTWF4UHJpY2VFcnJvciIsInByaWNlX21heF9ldmFsdWF0aW9uIiwibWluUHJpY2VOb3RFbnRlcmVkIiwicHJpY2VfbWluX25vdF9lbnRlcmVkIiwibWF4UHJpY2VOb3RFbnRlcmVkIiwicHJpY2VfbWF4X25vdF9lbnRlcmVkIiwib25JbnZhbGlkUHJpY2UiLCJwcmljZV9pbnZhbGlkX3ZhbHVlIiwiJHByb2R1Y3RMaXN0aW5nQ29udGFpbmVyIiwiJGZhY2V0ZWRTZWFyY2hDb250YWluZXIiLCJwcm9kdWN0c1BlclBhZ2UiLCJicmFuZFByb2R1Y3RzUGVyUGFnZSIsInJlcXVlc3RPcHRpb25zIiwidGVtcGxhdGUiLCJwcm9kdWN0TGlzdGluZyIsInNpZGViYXIiLCJjb25maWciLCJzaG9wX2J5X2JyYW5kIiwiYnJhbmQiLCJwcm9kdWN0cyIsImxpbWl0Iiwic2hvd01vcmUiLCJmYWNldGVkU2VhcmNoIiwiY29udGVudCIsImh0bWwiLCJmaWx0ZXJSZXN1bHQiLCJ0cmlnZ2VySGFuZGxlciIsImFuaW1hdGUiLCJzY3JvbGxUb3AiLCJ2YWxpZGF0aW9uRXJyb3JNZXNzYWdlcyIsImRlZmF1bHQiLCJUUkFOU0xBVElPTlMiLCJpc1RyYW5zbGF0aW9uRGljdGlvbmFyeU5vdEVtcHR5IiwiZGljdGlvbmFyeSIsIk9iamVjdCIsImtleXMiLCJjaG9vc2VBY3RpdmVEaWN0aW9uYXJ5IiwiaSIsImFyZ3VtZW50cyIsIkpTT04iLCJwYXJzZSIsInVuZGVmaW5lZCIsInZhbGlkYXRpb25EaWN0aW9uYXJ5SlNPTiIsInZhbGlkYXRpb25GYWxsYmFja0RpY3Rpb25hcnlKU09OIiwidmFsaWRhdGlvbkRlZmF1bHREaWN0aW9uYXJ5SlNPTiIsImFjdGl2ZURpY3Rpb25hcnkiLCJsb2NhbGl6YXRpb25zIiwidmFsdWVzIiwidHJhbnNsYXRpb25LZXlzIiwibWFwIiwia2V5Iiwic3BsaXQiLCJwb3AiLCJyZWR1Y2UiLCJhY2MiXSwic291cmNlUm9vdCI6IiJ9
