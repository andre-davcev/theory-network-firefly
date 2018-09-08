(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[1],{

/***/ "../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/components/hardware-back-button.js":
/*!********************************************************************************************************************************************!*\
  !*** /Users/andredavcev/Files/Theory/node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/components/hardware-back-button.js ***!
  \********************************************************************************************************************************************/
/*! exports provided: startHardwareBackButton */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "startHardwareBackButton", function() { return startHardwareBackButton; });
function startHardwareBackButton(t) { var r = !1; t.addEventListener("backbutton", function () { if (r)
    return; r = !0; var e = [], n = new CustomEvent("ionBackButton", { bubbles: !1, detail: { register: function (t, r) { e.push({ priority: t, handler: r }); } } }); if (t.dispatchEvent(n), e.length > 0) {
    var t_1, n_1 = Number.MIN_SAFE_INTEGER;
    e.forEach(function (r) { r.priority >= n_1 && (n_1 = r.priority, t_1 = r.handler); });
    var o = t_1();
    null != o && o.then(function () { return r = !1; });
} }); }



/***/ })

}]);
//# sourceMappingURL=1.js.map