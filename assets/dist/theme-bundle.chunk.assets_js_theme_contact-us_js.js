"use strict";
(self["webpackChunkepic_superstore"] = self["webpackChunkepic_superstore"] || []).push([["assets_js_theme_contact-us_js"],{

/***/ "./assets/js/theme/contact-us.js"
/*!***************************************!*\
  !*** ./assets/js/theme/contact-us.js ***!
  \***************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ContactUs)
/* harmony export */ });
/* harmony import */ var _page_manager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./page-manager */ "./assets/js/theme/page-manager.js");
/* harmony import */ var _common_nod__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./common/nod */ "./assets/js/theme/common/nod.js");
/* harmony import */ var _common_models_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./common/models/forms */ "./assets/js/theme/common/models/forms.js");
/* harmony import */ var _common_utils_form_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./common/utils/form-utils */ "./assets/js/theme/common/utils/form-utils.js");
/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js");
function _inheritsLoose(t, o) { t.prototype = Object.create(o.prototype), t.prototype.constructor = t, _setPrototypeOf(t, o); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }




var ContactUs = /*#__PURE__*/function (_PageManager) {
  function ContactUs() {
    return _PageManager.apply(this, arguments) || this;
  }
  _inheritsLoose(ContactUs, _PageManager);
  var _proto = ContactUs.prototype;
  _proto.onReady = function onReady() {
    this.registerContactFormValidation();
  };
  _proto.registerContactFormValidation = function registerContactFormValidation() {
    var formSelector = 'form[data-contact-form]';
    var contactUsValidator = (0,_common_nod__WEBPACK_IMPORTED_MODULE_1__["default"])({
      submit: formSelector + " input[type=\"submit\"]",
      tap: _common_utils_form_utils__WEBPACK_IMPORTED_MODULE_3__.announceInputErrorMessage
    });
    var $contactForm = $(formSelector);
    contactUsValidator.add([{
      selector: formSelector + " input[name=\"contact_email\"]",
      validate: function validate(cb, val) {
        var result = _common_models_forms__WEBPACK_IMPORTED_MODULE_2__["default"].email(val);
        cb(result);
      },
      errorMessage: this.context.contactEmail
    }, {
      selector: formSelector + " textarea[name=\"contact_question\"]",
      validate: function validate(cb, val) {
        var result = _common_models_forms__WEBPACK_IMPORTED_MODULE_2__["default"].notEmpty(val);
        cb(result);
      },
      errorMessage: this.context.contactQuestion
    }]);
    $contactForm.on('submit', function (event) {
      contactUsValidator.performCheck();
      if (contactUsValidator.areAll('valid')) {
        return;
      }
      event.preventDefault();
    });
  };
  return ContactUs;
}(_page_manager__WEBPACK_IMPORTED_MODULE_0__["default"]);


/***/ }

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlbWUtYnVuZGxlLmNodW5rLmFzc2V0c19qc190aGVtZV9jb250YWN0LXVzX2pzLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQXlDO0FBQ1Y7QUFDVztBQUM0QjtBQUFBLElBRWpESSxTQUFTLDBCQUFBQyxZQUFBO0VBQUEsU0FBQUQsVUFBQTtJQUFBLE9BQUFDLFlBQUEsQ0FBQUMsS0FBQSxPQUFBQyxTQUFBO0VBQUE7RUFBQUMsY0FBQSxDQUFBSixTQUFBLEVBQUFDLFlBQUE7RUFBQSxJQUFBSSxNQUFBLEdBQUFMLFNBQUEsQ0FBQU0sU0FBQTtFQUFBRCxNQUFBLENBQzFCRSxPQUFPLEdBQVAsU0FBQUEsT0FBT0EsQ0FBQSxFQUFHO0lBQ04sSUFBSSxDQUFDQyw2QkFBNkIsQ0FBQyxDQUFDO0VBQ3hDLENBQUM7RUFBQUgsTUFBQSxDQUVERyw2QkFBNkIsR0FBN0IsU0FBQUEsNkJBQTZCQSxDQUFBLEVBQUc7SUFDNUIsSUFBTUMsWUFBWSxHQUFHLHlCQUF5QjtJQUM5QyxJQUFNQyxrQkFBa0IsR0FBR2IsdURBQUcsQ0FBQztNQUMzQmMsTUFBTSxFQUFLRixZQUFZLDRCQUF1QjtNQUM5Q0csR0FBRyxFQUFFYiwrRUFBeUJBO0lBQ2xDLENBQUMsQ0FBQztJQUNGLElBQU1jLFlBQVksR0FBR0MsQ0FBQyxDQUFDTCxZQUFZLENBQUM7SUFFcENDLGtCQUFrQixDQUFDSyxHQUFHLENBQUMsQ0FDbkI7TUFDSUMsUUFBUSxFQUFLUCxZQUFZLG1DQUE4QjtNQUN2RFEsUUFBUSxFQUFFLFNBQVZBLFFBQVFBLENBQUdDLEVBQUUsRUFBRUMsR0FBRyxFQUFLO1FBQ25CLElBQU1DLE1BQU0sR0FBR3RCLDREQUFLLENBQUN1QixLQUFLLENBQUNGLEdBQUcsQ0FBQztRQUUvQkQsRUFBRSxDQUFDRSxNQUFNLENBQUM7TUFDZCxDQUFDO01BQ0RFLFlBQVksRUFBRSxJQUFJLENBQUNDLE9BQU8sQ0FBQ0M7SUFDL0IsQ0FBQyxFQUNEO01BQ0lSLFFBQVEsRUFBS1AsWUFBWSx5Q0FBb0M7TUFDN0RRLFFBQVEsRUFBRSxTQUFWQSxRQUFRQSxDQUFHQyxFQUFFLEVBQUVDLEdBQUcsRUFBSztRQUNuQixJQUFNQyxNQUFNLEdBQUd0Qiw0REFBSyxDQUFDMkIsUUFBUSxDQUFDTixHQUFHLENBQUM7UUFFbENELEVBQUUsQ0FBQ0UsTUFBTSxDQUFDO01BQ2QsQ0FBQztNQUNERSxZQUFZLEVBQUUsSUFBSSxDQUFDQyxPQUFPLENBQUNHO0lBQy9CLENBQUMsQ0FDSixDQUFDO0lBRUZiLFlBQVksQ0FBQ2MsRUFBRSxDQUFDLFFBQVEsRUFBRSxVQUFBQyxLQUFLLEVBQUk7TUFDL0JsQixrQkFBa0IsQ0FBQ21CLFlBQVksQ0FBQyxDQUFDO01BRWpDLElBQUluQixrQkFBa0IsQ0FBQ29CLE1BQU0sQ0FBQyxPQUFPLENBQUMsRUFBRTtRQUNwQztNQUNKO01BRUFGLEtBQUssQ0FBQ0csY0FBYyxDQUFDLENBQUM7SUFDMUIsQ0FBQyxDQUFDO0VBQ04sQ0FBQztFQUFBLE9BQUEvQixTQUFBO0FBQUEsRUEzQ2tDSixxREFBVyIsInNvdXJjZXMiOlsid2VicGFjazovL2VwaWMtc3VwZXJzdG9yZS8uL2Fzc2V0cy9qcy90aGVtZS9jb250YWN0LXVzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQYWdlTWFuYWdlciBmcm9tICcuL3BhZ2UtbWFuYWdlcic7XG5pbXBvcnQgbm9kIGZyb20gJy4vY29tbW9uL25vZCc7XG5pbXBvcnQgZm9ybXMgZnJvbSAnLi9jb21tb24vbW9kZWxzL2Zvcm1zJztcbmltcG9ydCB7IGFubm91bmNlSW5wdXRFcnJvck1lc3NhZ2UgfSBmcm9tICcuL2NvbW1vbi91dGlscy9mb3JtLXV0aWxzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29udGFjdFVzIGV4dGVuZHMgUGFnZU1hbmFnZXIge1xuICAgIG9uUmVhZHkoKSB7XG4gICAgICAgIHRoaXMucmVnaXN0ZXJDb250YWN0Rm9ybVZhbGlkYXRpb24oKTtcbiAgICB9XG5cbiAgICByZWdpc3RlckNvbnRhY3RGb3JtVmFsaWRhdGlvbigpIHtcbiAgICAgICAgY29uc3QgZm9ybVNlbGVjdG9yID0gJ2Zvcm1bZGF0YS1jb250YWN0LWZvcm1dJztcbiAgICAgICAgY29uc3QgY29udGFjdFVzVmFsaWRhdG9yID0gbm9kKHtcbiAgICAgICAgICAgIHN1Ym1pdDogYCR7Zm9ybVNlbGVjdG9yfSBpbnB1dFt0eXBlPVwic3VibWl0XCJdYCxcbiAgICAgICAgICAgIHRhcDogYW5ub3VuY2VJbnB1dEVycm9yTWVzc2FnZSxcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnN0ICRjb250YWN0Rm9ybSA9ICQoZm9ybVNlbGVjdG9yKTtcblxuICAgICAgICBjb250YWN0VXNWYWxpZGF0b3IuYWRkKFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzZWxlY3RvcjogYCR7Zm9ybVNlbGVjdG9yfSBpbnB1dFtuYW1lPVwiY29udGFjdF9lbWFpbFwiXWAsXG4gICAgICAgICAgICAgICAgdmFsaWRhdGU6IChjYiwgdmFsKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IGZvcm1zLmVtYWlsKHZhbCk7XG5cbiAgICAgICAgICAgICAgICAgICAgY2IocmVzdWx0KTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGVycm9yTWVzc2FnZTogdGhpcy5jb250ZXh0LmNvbnRhY3RFbWFpbCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc2VsZWN0b3I6IGAke2Zvcm1TZWxlY3Rvcn0gdGV4dGFyZWFbbmFtZT1cImNvbnRhY3RfcXVlc3Rpb25cIl1gLFxuICAgICAgICAgICAgICAgIHZhbGlkYXRlOiAoY2IsIHZhbCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSBmb3Jtcy5ub3RFbXB0eSh2YWwpO1xuXG4gICAgICAgICAgICAgICAgICAgIGNiKHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlcnJvck1lc3NhZ2U6IHRoaXMuY29udGV4dC5jb250YWN0UXVlc3Rpb24sXG4gICAgICAgICAgICB9LFxuICAgICAgICBdKTtcblxuICAgICAgICAkY29udGFjdEZvcm0ub24oJ3N1Ym1pdCcsIGV2ZW50ID0+IHtcbiAgICAgICAgICAgIGNvbnRhY3RVc1ZhbGlkYXRvci5wZXJmb3JtQ2hlY2soKTtcblxuICAgICAgICAgICAgaWYgKGNvbnRhY3RVc1ZhbGlkYXRvci5hcmVBbGwoJ3ZhbGlkJykpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiJdLCJuYW1lcyI6WyJQYWdlTWFuYWdlciIsIm5vZCIsImZvcm1zIiwiYW5ub3VuY2VJbnB1dEVycm9yTWVzc2FnZSIsIkNvbnRhY3RVcyIsIl9QYWdlTWFuYWdlciIsImFwcGx5IiwiYXJndW1lbnRzIiwiX2luaGVyaXRzTG9vc2UiLCJfcHJvdG8iLCJwcm90b3R5cGUiLCJvblJlYWR5IiwicmVnaXN0ZXJDb250YWN0Rm9ybVZhbGlkYXRpb24iLCJmb3JtU2VsZWN0b3IiLCJjb250YWN0VXNWYWxpZGF0b3IiLCJzdWJtaXQiLCJ0YXAiLCIkY29udGFjdEZvcm0iLCIkIiwiYWRkIiwic2VsZWN0b3IiLCJ2YWxpZGF0ZSIsImNiIiwidmFsIiwicmVzdWx0IiwiZW1haWwiLCJlcnJvck1lc3NhZ2UiLCJjb250ZXh0IiwiY29udGFjdEVtYWlsIiwibm90RW1wdHkiLCJjb250YWN0UXVlc3Rpb24iLCJvbiIsImV2ZW50IiwicGVyZm9ybUNoZWNrIiwiYXJlQWxsIiwicHJldmVudERlZmF1bHQiLCJkZWZhdWx0Il0sInNvdXJjZVJvb3QiOiIifQ==
