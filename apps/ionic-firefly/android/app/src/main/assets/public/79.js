(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[79],{

/***/ "../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/components/index.js":
/*!*****************************************************************************************************************************!*\
  !*** /Users/andredavcev/Files/Theory/node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/components/index.js ***!
  \*****************************************************************************************************************************/
/*! exports provided: reorderArray, rIC, hasShadowDom, renderHiddenInput, clamp, assert, now, pointerCoord, isEndSide, deferEvent, debounceEvent, debounce, PLATFORMS_MAP, getPlatforms, isPlatform, setupPlatforms, hapticAvailable, hapticSelection, hapticSelectionStart, hapticSelectionChanged, hapticSelectionEnd, hapticNotification, hapticImpact, attachComponent, detachComponent, setupConfig, configFromSession, saveConfig, configFromURL */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setupConfig", function() { return setupConfig; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "configFromSession", function() { return configFromSession; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "saveConfig", function() { return saveConfig; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "configFromURL", function() { return configFromURL; });
/* harmony import */ var _chunk_276e047f_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./chunk-276e047f.js */ "../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/components/chunk-276e047f.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "reorderArray", function() { return _chunk_276e047f_js__WEBPACK_IMPORTED_MODULE_0__["l"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "rIC", function() { return _chunk_276e047f_js__WEBPACK_IMPORTED_MODULE_0__["a"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "hasShadowDom", function() { return _chunk_276e047f_js__WEBPACK_IMPORTED_MODULE_0__["c"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "renderHiddenInput", function() { return _chunk_276e047f_js__WEBPACK_IMPORTED_MODULE_0__["e"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "clamp", function() { return _chunk_276e047f_js__WEBPACK_IMPORTED_MODULE_0__["i"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "assert", function() { return _chunk_276e047f_js__WEBPACK_IMPORTED_MODULE_0__["h"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "now", function() { return _chunk_276e047f_js__WEBPACK_IMPORTED_MODULE_0__["b"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "pointerCoord", function() { return _chunk_276e047f_js__WEBPACK_IMPORTED_MODULE_0__["k"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isEndSide", function() { return _chunk_276e047f_js__WEBPACK_IMPORTED_MODULE_0__["g"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "deferEvent", function() { return _chunk_276e047f_js__WEBPACK_IMPORTED_MODULE_0__["d"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "debounceEvent", function() { return _chunk_276e047f_js__WEBPACK_IMPORTED_MODULE_0__["f"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "debounce", function() { return _chunk_276e047f_js__WEBPACK_IMPORTED_MODULE_0__["j"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PLATFORMS_MAP", function() { return _chunk_276e047f_js__WEBPACK_IMPORTED_MODULE_0__["n"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getPlatforms", function() { return _chunk_276e047f_js__WEBPACK_IMPORTED_MODULE_0__["o"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isPlatform", function() { return _chunk_276e047f_js__WEBPACK_IMPORTED_MODULE_0__["m"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "setupPlatforms", function() { return _chunk_276e047f_js__WEBPACK_IMPORTED_MODULE_0__["p"]; });

/* harmony import */ var _chunk_a4253575_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./chunk-a4253575.js */ "../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/components/chunk-a4253575.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "hapticAvailable", function() { return _chunk_a4253575_js__WEBPACK_IMPORTED_MODULE_1__["g"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "hapticSelection", function() { return _chunk_a4253575_js__WEBPACK_IMPORTED_MODULE_1__["f"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "hapticSelectionStart", function() { return _chunk_a4253575_js__WEBPACK_IMPORTED_MODULE_1__["e"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "hapticSelectionChanged", function() { return _chunk_a4253575_js__WEBPACK_IMPORTED_MODULE_1__["c"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "hapticSelectionEnd", function() { return _chunk_a4253575_js__WEBPACK_IMPORTED_MODULE_1__["d"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "hapticNotification", function() { return _chunk_a4253575_js__WEBPACK_IMPORTED_MODULE_1__["h"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "hapticImpact", function() { return _chunk_a4253575_js__WEBPACK_IMPORTED_MODULE_1__["i"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "attachComponent", function() { return _chunk_a4253575_js__WEBPACK_IMPORTED_MODULE_1__["a"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "detachComponent", function() { return _chunk_a4253575_js__WEBPACK_IMPORTED_MODULE_1__["b"]; });



function setupConfig(o) { var n = window, t = n.Ionic; if (!t || !t.config || "Object" === t.config.constructor.name)
    return n.Ionic = n.Ionic || {}, n.Ionic.config = Object.assign({}, n.Ionic.config, o), n.Ionic.config; console.error("ionic config was already initialized"); }
var IONIC_PREFIX = "ionic:", IONIC_SESSION_KEY = "ionic-persist-config";
function configFromSession() { try {
    var o = window.sessionStorage.getItem(IONIC_SESSION_KEY);
    return null !== o ? JSON.parse(o) : {};
}
catch (o) {
    return {};
} }
function saveConfig(o) { try {
    window.sessionStorage.setItem(IONIC_SESSION_KEY, JSON.stringify(o));
}
catch (o) {
    return;
} }
function configFromURL() { var o = {}; return window.location.search.slice(1).split("&").map(function (o) { return o.split("="); }).map(function (_a) {
    var o = _a[0], n = _a[1];
    return [decodeURIComponent(o), decodeURIComponent(n)];
}).filter(function (_a) {
    var o = _a[0];
    return startsWith(o, IONIC_PREFIX);
}).map(function (_a) {
    var o = _a[0], n = _a[1];
    return [o.slice(IONIC_PREFIX.length), n];
}).forEach(function (_a) {
    var n = _a[0], t = _a[1];
    o[n] = t;
}), o; }
function startsWith(o, n) { return o.substr(0, n.length) === n; }



/***/ })

}]);
//# sourceMappingURL=79.js.map