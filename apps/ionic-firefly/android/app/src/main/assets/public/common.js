(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["common"],{

/***/ "../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/components/chunk-276e047f.js":
/*!**************************************************************************************************************************************!*\
  !*** /Users/andredavcev/Files/Theory/node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/components/chunk-276e047f.js ***!
  \**************************************************************************************************************************************/
/*! exports provided: a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return rIC; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return now; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return hasShadowDom; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return deferEvent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return renderHiddenInput; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return debounceEvent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return isEndSide; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return assert; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return clamp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return debounce; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "k", function() { return pointerCoord; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "l", function() { return reorderArray; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "m", function() { return isPlatform; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "n", function() { return PLATFORMS_MAP; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "o", function() { return getPlatforms; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "p", function() { return setupPlatforms; });
function reorderArray(t, e) { var n = t[e.from]; return t.splice(e.from, 1), t.splice(e.to, 0, n), t; }
function rIC(t) { "requestIdleCallback" in window ? window.requestIdleCallback(t) : setTimeout(t, 32); }
function hasShadowDom(t) { return !!t.shadowRoot && !!t.attachShadow; }
function renderHiddenInput(t, e, n, i) { if (hasShadowDom(t)) {
    var r = t.querySelector("input.aux-input");
    r || ((r = t.ownerDocument.createElement("input")).type = "hidden", r.classList.add("aux-input"), t.appendChild(r)), r.disabled = i, r.name = e, r.value = n;
} }
function clamp(t, e, n) { return Math.max(t, Math.min(e, n)); }
function assert(t, e) { if (!t) {
    var t_1 = "ASSERT: " + e;
    throw console.error(t_1), new Error(t_1);
} }
function now(t) { return t.timeStamp || Date.now(); }
function pointerCoord(t) { if (t) {
    var e = t.changedTouches;
    if (e && e.length > 0) {
        var t_2 = e[0];
        return { x: t_2.clientX, y: t_2.clientY };
    }
    if (void 0 !== t.pageX)
        return { x: t.pageX, y: t.pageY };
} return { x: 0, y: 0 }; }
function isEndSide(t, e) { var n = "rtl" === t.document.dir; switch (e) {
    case "start": return n;
    case "end": return !n;
    default: throw new Error("\"" + e + "\" is not a valid value for [side]. Use \"start\" or \"end\" instead.");
} }
function deferEvent(t) { return debounceEvent(t, 0); }
function debounceEvent(t, e) { var n = t._original || t; return { _original: t, emit: debounce(n.emit.bind(n), e) }; }
function debounce(t, e) {
    if (e === void 0) { e = 0; }
    var n;
    return function () {
        var i = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            i[_i] = arguments[_i];
        }
        clearTimeout(n), n = setTimeout.apply(void 0, [t, e].concat(i));
    };
}
var PLATFORMS_MAP = { ipad: isIpad, iphone: isIphone, ios: isIOS, android: isAndroid, phablet: isPhablet, tablet: isTablet, cordova: isCordova, capacitor: isCapacitorNative, electron: isElectron, pwa: isPWA, mobile: isMobile, desktop: isDesktop, hybrid: isHybrid };
function getPlatforms(t) { return setupPlatforms(t); }
function isPlatform(t, e) { return getPlatforms(t).includes(e); }
function setupPlatforms(t) { t.Ionic = t.Ionic || {}; var e = t.Ionic.platforms; if (null == e) {
    e = t.Ionic.platforms = detectPlatforms(t);
    var n_1 = t.document.documentElement.classList;
    e.forEach(function (t) { return n_1.add("plt-" + t); });
} return e; }
function detectPlatforms(t) { return Object.keys(PLATFORMS_MAP).filter(function (e) { return PLATFORMS_MAP[e](t); }); }
function isIpad(t) { return testUserAgent(t, /iPad/i); }
function isIphone(t) { return testUserAgent(t, /iPhone/i); }
function isIOS(t) { return testUserAgent(t, /iPad|iPhone|iPod/i); }
function isAndroid(t) { return testUserAgent(t, /android|sink/i); }
function isPhablet(t) { var e = t.innerWidth, n = t.innerHeight, i = Math.min(e, n), r = Math.max(e, n); return i > 390 && i < 520 && r > 620 && r < 800; }
function isTablet(t) { var e = t.innerWidth, n = t.innerHeight, i = Math.min(e, n), r = Math.max(e, n); return i > 460 && i < 820 && r > 780 && r < 1400; }
function isMobile(t) { return matchMedia(t, "(any-pointer:coarse)"); }
function isDesktop(t) { return !isMobile(t); }
function isHybrid(t) { return isCordova(t) || isCapacitorNative(t); }
function isCordova(t) { var e = t; return !!(e.cordova || e.phonegap || e.PhoneGap); }
function isCapacitorNative(t) { var e = t.Capacitor; return !(!e || !e.isNative); }
function isElectron(t) { return testUserAgent(t, /electron/); }
function isPWA(t) { return t.matchMedia("(display-mode: standalone)").matches; }
function testUserAgent(t, e) { return e.test(t.navigator.userAgent); }
function matchMedia(t, e) { return t.matchMedia(e).matches; }



/***/ }),

/***/ "../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/components/chunk-5f438245.js":
/*!**************************************************************************************************************************************!*\
  !*** /Users/andredavcev/Files/Theory/node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/components/chunk-5f438245.js ***!
  \**************************************************************************************************************************************/
/*! exports provided: a, b, c, d */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return deepReady; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return lifecycle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return setPageHidden; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return transition; });
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var iosTransitionAnimation = function () { return __webpack_require__.e(/*! import() */ 3).then(__webpack_require__.bind(null, /*! ./ios.transition.js */ "../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/components/ios.transition.js")); }, mdTransitionAnimation = function () { return __webpack_require__.e(/*! import() */ 4).then(__webpack_require__.bind(null, /*! ./md.transition.js */ "../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/components/md.transition.js")); };
function transition(i) { return new Promise(function (n, e) { i.queue.write(function () { beforeTransition(i), runTransition(i).then(function (e) { e.animation && e.animation.destroy(), afterTransition(i), n(e); }, function (n) { afterTransition(i), e(n); }); }); }); }
function beforeTransition(i) { var n = i.enteringEl, e = i.leavingEl; setZIndex(n, e, i.direction), i.showGoBack ? n.classList.add("can-go-back") : n.classList.remove("can-go-back"), setPageHidden(n, !1), e && setPageHidden(e, !1); }
function runTransition(i) {
    return __awaiter(this, void 0, void 0, function () { var n; return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, getAnimationBuilder(i)];
            case 1:
                n = _a.sent();
                return [2 /*return*/, n ? animation(n, i) : noAnimation(i)];
        }
    }); });
}
function afterTransition(i) { var n = i.enteringEl, e = i.leavingEl; n.classList.remove("ion-page-invisible"), void 0 !== e && e.classList.remove("ion-page-invisible"); }
function getAnimationBuilder(i) {
    return __awaiter(this, void 0, void 0, function () { var _a, _b; return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                if (!(i.leavingEl && i.animated && 0 !== i.duration)) return [3 /*break*/, 7];
                if (!i.animationBuilder) return [3 /*break*/, 1];
                _a = i.animationBuilder;
                return [3 /*break*/, 6];
            case 1:
                if (!("ios" === i.mode)) return [3 /*break*/, 3];
                return [4 /*yield*/, iosTransitionAnimation()];
            case 2:
                _b = (_c.sent()).iosTransitionAnimation;
                return [3 /*break*/, 5];
            case 3: return [4 /*yield*/, mdTransitionAnimation()];
            case 4:
                _b = (_c.sent()).mdTransitionAnimation;
                _c.label = 5;
            case 5:
                _a = _b;
                _c.label = 6;
            case 6: return [2 /*return*/, _a];
            case 7: return [2 /*return*/];
        }
    }); });
}
function animation(i, n) {
    return __awaiter(this, void 0, void 0, function () { var e; return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, waitForReady(n, !0)];
            case 1:
                _a.sent();
                return [4 /*yield*/, n.animationCtrl.create(i, n.baseEl, n)];
            case 2:
                e = _a.sent();
                fireWillEvents(n.window, n.enteringEl, n.leavingEl);
                return [4 /*yield*/, playTransition(e, n)];
            case 3: return [2 /*return*/, (_a.sent(), e.hasCompleted && fireDidEvents(n.window, n.enteringEl, n.leavingEl), { hasCompleted: e.hasCompleted, animation: e })];
        }
    }); });
}
function noAnimation(i) {
    return __awaiter(this, void 0, void 0, function () { var n, e; return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                n = i.enteringEl, e = i.leavingEl;
                return [4 /*yield*/, waitForReady(i, !1)];
            case 1: return [2 /*return*/, (_a.sent(), fireWillEvents(i.window, n, e), fireDidEvents(i.window, n, e), { hasCompleted: !0 })];
        }
    }); });
}
function waitForReady(i, n) {
    return __awaiter(this, void 0, void 0, function () { var e; return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                e = (void 0 !== i.deepWait ? i.deepWait : n) ? [deepReady(i.enteringEl), deepReady(i.leavingEl)] : [shallowReady(i.enteringEl), shallowReady(i.leavingEl)];
                return [4 /*yield*/, Promise.all(e)];
            case 1:
                _a.sent();
                return [4 /*yield*/, notifyViewReady(i.viewIsReady, i.enteringEl)];
            case 2:
                _a.sent();
                return [2 /*return*/];
        }
    }); });
}
function notifyViewReady(i, n) {
    return __awaiter(this, void 0, void 0, function () { var _a; return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = i;
                if (!_a) return [3 /*break*/, 2];
                return [4 /*yield*/, i(n)];
            case 1:
                _a = (_b.sent());
                _b.label = 2;
            case 2:
                _a;
                return [2 /*return*/];
        }
    }); });
}
function playTransition(i, n) { var e = n.progressCallback, a = new Promise(function (n) { return i.onFinish(n); }); return e ? (i.progressStart(), e(i)) : i.play(), a; }
function fireWillEvents(i, n, e) { lifecycle(i, e, "ionViewWillLeave"), lifecycle(i, n, "ionViewWillEnter"); }
function fireDidEvents(i, n, e) { lifecycle(i, n, "ionViewDidEnter"), lifecycle(i, e, "ionViewDidLeave"); }
function lifecycle(i, n, e) { if (n) {
    var a = new (0, i.CustomEvent)(e, { bubbles: !1, cancelable: !1 });
    n.dispatchEvent(a);
} }
function shallowReady(i) { return i && i.componentOnReady ? i.componentOnReady() : Promise.resolve(); }
function deepReady(i) {
    return __awaiter(this, void 0, void 0, function () { var n, _a, _b; return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                n = i;
                if (!n) return [3 /*break*/, 4];
                _a = null != n.componentOnReady;
                if (!_a) return [3 /*break*/, 2];
                _b = null;
                return [4 /*yield*/, n.componentOnReady()];
            case 1:
                _a = _b != (_c.sent());
                _c.label = 2;
            case 2:
                if (_a)
                    return [2 /*return*/];
                return [4 /*yield*/, Promise.all(Array.from(n.children).map(deepReady))];
            case 3:
                _c.sent();
                _c.label = 4;
            case 4: return [2 /*return*/];
        }
    }); });
}
function setPageHidden(i, n) { n ? (i.setAttribute("aria-hidden", "true"), i.classList.add("ion-page-hidden")) : (i.hidden = !1, i.removeAttribute("aria-hidden"), i.classList.remove("ion-page-hidden")); }
function setZIndex(i, n, e) { void 0 !== i && (i.style.zIndex = "back" === e ? "99" : "101"), void 0 !== n && (n.style.zIndex = "100"); }



/***/ }),

/***/ "../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/components/chunk-a4253575.js":
/*!**************************************************************************************************************************************!*\
  !*** /Users/andredavcev/Files/Theory/node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/components/chunk-a4253575.js ***!
  \**************************************************************************************************************************************/
/*! exports provided: a, b, c, d, e, f, g, h, i, j, k, l, m, n */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return attachComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return detachComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return hapticSelectionChanged; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return hapticSelectionEnd; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return hapticSelectionStart; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return hapticSelection; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return hapticAvailable; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return hapticNotification; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return hapticImpact; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return getClassMap; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "k", function() { return createColorClasses; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "l", function() { return openURL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "m", function() { return createThemedClasses; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "n", function() { return hostContext; });
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
function attachComponent(t, n, e, i, o) {
    return __awaiter(this, void 0, void 0, function () { var a, _a; return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                if (t)
                    return [2 /*return*/, t.attachViewToDom(n, e, o, i)];
                if ("string" != typeof e && !(e instanceof HTMLElement))
                    throw new Error("framework delegate is missing");
                a = "string" == typeof e ? n.ownerDocument.createElement(e) : e;
                i && i.forEach(function (t) { return a.classList.add(t); }), o && Object.assign(a, o), n.appendChild(a);
                _a = a.componentOnReady;
                if (!_a) return [3 /*break*/, 2];
                return [4 /*yield*/, a.componentOnReady()];
            case 1:
                _a = (_b.sent());
                _b.label = 2;
            case 2: return [2 /*return*/, (_a, a)];
        }
    }); });
}
function detachComponent(t, n) { if (n) {
    if (t) {
        var e = n.parentElement;
        return t.removeViewFromDom(e, n);
    }
    n.remove();
} return Promise.resolve(); }
function hapticAvailable() { return !!window.TapticEngine; }
function hapticSelection() { var t = window.TapticEngine; t && t.selection(); }
function hapticSelectionStart() { var t = window.TapticEngine; t && t.gestureSelectionStart(); }
function hapticSelectionChanged() { var t = window.TapticEngine; t && t.gestureSelectionChanged(); }
function hapticSelectionEnd() { var t = window.TapticEngine; t && t.gestureSelectionEnd(); }
function hapticNotification(t) { var n = window.TapticEngine; n && n.notification(t); }
function hapticImpact(t) { var n = window.TapticEngine; n && n.impact(t); }
function hostContext(t, n) { return null !== n.closest(t); }
function createColorClasses(t) { var _a; return null != t ? (_a = { "ion-color": !0 }, _a["ion-color-" + t] = !0, _a) : void 0; }
function createThemedClasses(t, n) { var _a; return _a = {}, _a[n] = !0, _a[n + "-" + t] = !!t, _a; }
function getClassList(t) { return void 0 !== t ? (Array.isArray(t) ? t : t.split(" ")).filter(function (t) { return null != t; }).map(function (t) { return t.trim(); }).filter(function (t) { return "" !== t; }) : []; }
function getClassMap(t) { var n = {}; return getClassList(t).forEach(function (t) { return n[t] = !0; }), n; }
function openURL(t, n, e, i) {
    return __awaiter(this, void 0, void 0, function () { var o; return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!(null != n && "#" !== n[0] && -1 === n.indexOf("://"))) return [3 /*break*/, 2];
                o = t.document.querySelector("ion-router");
                if (!o) return [3 /*break*/, 2];
                null != e && e.preventDefault();
                return [4 /*yield*/, o.componentOnReady()];
            case 1: return [2 /*return*/, (_a.sent(), o.push(n, i))];
            case 2: return [2 /*return*/, !1];
        }
    }); });
}



/***/ }),

/***/ "../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/components/chunk-ca273e40.js":
/*!**************************************************************************************************************************************!*\
  !*** /Users/andredavcev/Files/Theory/node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/components/chunk-ca273e40.js ***!
  \**************************************************************************************************************************************/
/*! exports provided: a, b, c, d, e, f, g, h */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BACKDROP; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return dismiss; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return eventMethod; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return isCancel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return present; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return createOverlay; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return dismissOverlay; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return getOverlay; });
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var lastId = 0;
function createOverlay(e, t) { var n = e.ownerDocument; connectListeners(n), Object.assign(e, t), e.classList.add("ion-page-invisible"); var i = lastId++; return e.overlayIndex = i, e.hasAttribute("id") || (e.id = "ion-overlay-" + i), getAppRoot(n).appendChild(e), n.body.addEventListener("ionBackButton", function (e) { e.detail.register(100, function () { return closeTopOverlay(n); }); }), n.body.addEventListener("keyup", function (e) { "Escape" === e.key && closeTopOverlay(n); }), e.componentOnReady(); }
function closeTopOverlay(e) { var t = getOverlay(e); return t && t.backdropDismiss ? t.dismiss(null, BACKDROP) : Promise.resolve(); }
function connectListeners(e) { 0 === lastId && (lastId = 1, e.body.addEventListener("keyup", function (t) { if ("Escape" === t.key) {
    var t_1 = getOverlay(e);
    t_1 && t_1.backdropDismiss && t_1.dismiss("backdrop");
} })); }
function dismissOverlay(e, t, n, i, o) { var s = getOverlay(e, i, o); return s ? s.dismiss(t, n) : Promise.reject("overlay does not exist"); }
function getOverlays(e, t) { var n = Array.from(getAppRoot(e).children); return void 0 === t ? n : (t = t.toUpperCase(), n.filter(function (e) { return e.tagName === t; })); }
function getOverlay(e, t, n) { var i = getOverlays(e, t); return void 0 === n ? i[i.length - 1] : i.find(function (e) { return e.id === n; }); }
function present(e, t, n, i, o) {
    return __awaiter(this, void 0, void 0, function () { var s; return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (e.presented)
                    return [2 /*return*/];
                e.presented = !0, e.willPresent.emit();
                s = e.enterAnimation ? e.enterAnimation : e.config.get(t, "ios" === e.mode ? n : i);
                return [4 /*yield*/, overlayAnimation(e, s, e.el, o)];
            case 1:
                _a.sent(), e.didPresent.emit();
                return [2 /*return*/];
        }
    }); });
}
function dismiss(e, t, n, i, o, s, a) {
    return __awaiter(this, void 0, void 0, function () { var r; return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!e.presented)
                    return [2 /*return*/, !1];
                e.presented = !1, e.willDismiss.emit({ data: t, role: n });
                r = e.leaveAnimation ? e.leaveAnimation : e.config.get(i, "ios" === e.mode ? o : s);
                return [4 /*yield*/, overlayAnimation(e, r, e.el, a)];
            case 1: return [2 /*return*/, (_a.sent(), e.didDismiss.emit({ data: t, role: n }), e.el.remove(), !0)];
        }
    }); });
}
function getAppRoot(e) { return e.querySelector("ion-app") || e.body; }
function overlayAnimation(e, t, n, i) {
    return __awaiter(this, void 0, void 0, function () { var o, s, _a; return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                e.animation && (e.animation.destroy(), e.animation = void 0), n.classList.remove("ion-page-invisible");
                o = n.shadowRoot || e.el;
                _a = e;
                return [4 /*yield*/, e.animationCtrl.create(t, o, i)];
            case 1:
                s = _a.animation = _b.sent();
                e.animation = s, e.animated || s.duration(0), e.keyboardClose && s.beforeAddWrite(function () { var e = n.ownerDocument.activeElement; e && e.matches("input, ion-input, ion-textarea") && e.blur(); });
                return [4 /*yield*/, s.playAsync()];
            case 2:
                _b.sent(), s.destroy(), e.animation = void 0;
                return [2 /*return*/];
        }
    }); });
}
function eventMethod(e, t) { var n; var i = new Promise(function (e) { return n = e; }); return onceEvent(e, t, function (e) { n(e.detail); }), i; }
function onceEvent(e, t, n) { var i = function (o) { e.removeEventListener(t, i), n(o); }; e.addEventListener(t, i); }
function isCancel(e) { return "cancel" === e || e === BACKDROP; }
var BACKDROP = "backdrop";



/***/ }),

/***/ "../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/components/chunk-db84a248.js":
/*!**************************************************************************************************************************************!*\
  !*** /Users/andredavcev/Files/Theory/node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/components/chunk-db84a248.js ***!
  \**************************************************************************************************************************************/
/*! exports provided: a */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return matchBreakpoint; });
var SIZE_TO_MEDIA = { xs: "(min-width: 0px)", sm: "(min-width: 576px)", md: "(min-width: 768px)", lg: "(min-width: 992px)", xl: "(min-width: 1200px)" };
function matchBreakpoint(i, t) { if (void 0 === t)
    return !0; var n = SIZE_TO_MEDIA[t]; return i.matchMedia(n).matches; }



/***/ }),

/***/ "../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/components/input-shims.js":
/*!***********************************************************************************************************************************!*\
  !*** /Users/andredavcev/Files/Theory/node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/components/input-shims.js ***!
  \***********************************************************************************************************************************/
/*! exports provided: startInputShims */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "startInputShims", function() { return startInputShims; });
/* harmony import */ var _chunk_276e047f_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./chunk-276e047f.js */ "../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/components/chunk-276e047f.js");

var RELOCATED_KEY = "$ionRelocated";
function relocateInput(t, e, n, o) {
    if (o === void 0) { o = 0; }
    if (t[RELOCATED_KEY] !== n) {
        if (e.value, n) {
            cloneInputComponent(t, e);
            var n_1 = "rtl" === t.ownerDocument.dir ? 9999 : -9999;
            e.style.transform = "translate3d(" + n_1 + "px," + o + "px,0)";
        }
        else
            removeClone(t, e);
        t[RELOCATED_KEY] = n;
    }
}
function isFocused(t) { return t === t.ownerDocument.activeElement; }
function removeClone(t, e) { t && t.parentElement && (Array.from(t.parentElement.querySelectorAll(".cloned-input")).forEach(function (t) { return t.remove(); }), t.style.pointerEvents = ""), e.style.transform = "", e.style.opacity = ""; }
function cloneInputComponent(t, e) { var _a, _b; var n = t.parentElement, o = t.ownerDocument; if (t && n) {
    var r = t.offsetTop, i = t.offsetLeft, s = t.offsetWidth, l = t.offsetHeight, a = o.createElement("div"), c = a.style;
    (_a = a.classList).add.apply(_a, Array.from(t.classList)), a.classList.add("cloned-input"), a.setAttribute("aria-hidden", "true"), c.pointerEvents = "none", c.position = "absolute", c.top = r + "px", c.left = i + "px", c.width = s + "px", c.height = l + "px";
    var u = o.createElement("input");
    (_b = u.classList).add.apply(_b, Array.from(e.classList)), u.value = e.value, u.type = e.type, u.placeholder = e.placeholder, u.tabIndex = -1, a.appendChild(u), n.appendChild(a), t.style.pointerEvents = "none";
} e.style.transform = "scale(0)"; }
function enableHideCaretOnScroll(t, e, n) { if (!n || !e)
    return function () { }; var o = function (n) { isFocused(e) && relocateInput(t, e, n); }, r = function () { return relocateInput(t, e, !1); }, i = function () { return o(!0); }, s = function () { return o(!1); }; return n.addEventListener("ionScrollStart", i), n.addEventListener("ionScrollEnd", s), e.addEventListener("blur", r), function () { n.removeEventListener("ionScrollStart", i), n.removeEventListener("ionScrollEnd", s), e.addEventListener("ionBlur", r); }; }
var SKIP_SELECTOR = "input, textarea, [no-blur]";
function enableInputBlurring(t) { var e = !0, n = !1; function o() { n = !0; } function r() { e = !0; } function i(o) { if (n)
    return void (n = !1); var r = t.activeElement; if (!r)
    return; if (r.matches(SKIP_SELECTOR))
    return; var i = o.target; i !== r && (i.matches(SKIP_SELECTOR) || i.closest(SKIP_SELECTOR) || i.classList.contains("input-cover") || (e = !1, setTimeout(function () { e || r.blur(); }, 50))); } return t.addEventListener("ionScrollStart", o), t.addEventListener("focusin", r, !0), t.addEventListener("touchend", i, !1), function () { t.removeEventListener("ionScrollStart", o, !0), t.removeEventListener("focusin", r, !0), t.removeEventListener("touchend", i, !1); }; }
var SCROLL_ASSIST_SPEED = .3;
function getScrollData(t, e, n) { return calcScrollData((t.closest("ion-item,[ion-item]") || t).getBoundingClientRect(), e.getBoundingClientRect(), n, window.innerHeight); }
function calcScrollData(t, e, n, o) { var r = t.top, i = t.bottom, s = e.top + 10, l = Math.min(e.bottom, o - n) / 2 - i, a = s - r, c = Math.round(l < 0 ? -l : a > 0 ? -a : 0), u = Math.abs(c) / SCROLL_ASSIST_SPEED; return { scrollAmount: c, scrollDuration: Math.min(400, Math.max(150, u)), scrollPadding: n, inputSafeY: 4 - (r - s) }; }
function enableScrollAssist(t, e, n, o) { var r; var i = function (t) { r = Object(_chunk_276e047f_js__WEBPACK_IMPORTED_MODULE_0__["k"])(t), t.type; }, s = function (i) { if (i.type, !r)
    return; var s = Object(_chunk_276e047f_js__WEBPACK_IMPORTED_MODULE_0__["k"])(i); hasPointerMoved(6, r, s) || isFocused(e) || (i.preventDefault(), i.stopPropagation(), jsSetFocus(t, e, n, o)); }; return t.addEventListener("touchstart", i, !0), t.addEventListener("touchend", s, !0), function () { t.removeEventListener("touchstart", i, !0), t.removeEventListener("touchend", s, !0); }; }
function jsSetFocus(t, e, n, o) { var r = getScrollData(t, n, o); Math.abs(r.scrollAmount) < 4 ? e.focus() : (relocateInput(t, e, !0, r.inputSafeY), e.focus(), n.scrollByPoint(0, r.scrollAmount, r.scrollDuration).then(function () { relocateInput(t, e, !1, r.inputSafeY), e.focus(); })); }
function hasPointerMoved(t, e, n) { if (e && n) {
    var o = e.x - n.x, r = e.y - n.y;
    return o * o + r * r > t * t;
} return !1; }
var PADDING_TIMER_KEY = "$ionPaddingTimer";
function enableScrollPadding(t, e) { function n(t) { setScrollPadding(t.target, e); } function o(t) { setScrollPadding(t.target, 0); } return t.addEventListener("focusin", n), t.addEventListener("focusout", o), function () { t.removeEventListener("focusin", n), t.removeEventListener("focusout", o); }; }
function setScrollPadding(t, e) { if ("INPUT" !== t.tagName)
    return; if (t.parentElement && "ION-INPUT" === t.parentElement.tagName)
    return; var n = t.closest("ion-content"); if (null === n)
    return; var o = n[PADDING_TIMER_KEY]; o && clearTimeout(o), e > 0 ? n.style.setProperty("--keyboard-offset", e + "px") : n[PADDING_TIMER_KEY] = setTimeout(function () { n.style.setProperty("--keyboard-offset", "0px"); }, 120); }
var INPUT_BLURRING = !0, SCROLL_PADDING = !0;
function startInputShims(t, e) { var n = e.getNumber("keyboardHeight", 290), o = e.getBoolean("scrollAssist", !0), r = e.getBoolean("hideCaretOnScroll", !0), i = e.getBoolean("inputBlurring", !0), s = e.getBoolean("scrollPadding", !0), l = new WeakMap, a = new WeakMap; function c(t) { var e = (t.shadowRoot || t).querySelector("input"), i = t.closest("ion-content"); if (e) {
    if (i && r && !l.has(t)) {
        var n_2 = enableHideCaretOnScroll(t, e, i);
        l.set(t, n_2);
    }
    if (i && o && !a.has(t)) {
        var o_1 = enableScrollAssist(t, e, i, n);
        a.set(t, o_1);
    }
} } i && INPUT_BLURRING && enableInputBlurring(t), s && SCROLL_PADDING && enableScrollPadding(t, n); var u = Array.from(t.querySelectorAll("ion-input")); for (var _i = 0, u_1 = u; _i < u_1.length; _i++) {
    var t_1 = u_1[_i];
    c(t_1);
} t.body.addEventListener("ionInputDidLoad", function (t) { c(t.target); }), t.body.addEventListener("ionInputDidUnload", function (t) { !function (t) { if (r) {
    var e_1 = l.get(t);
    e_1 && e_1(), l.delete(t);
} if (o) {
    var e_2 = a.get(t);
    e_2 && e_2(), a.delete(t);
} }(t.target); }); }



/***/ }),

/***/ "../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/components/tap-click.js":
/*!*********************************************************************************************************************************!*\
  !*** /Users/andredavcev/Files/Theory/node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/components/tap-click.js ***!
  \*********************************************************************************************************************************/
/*! exports provided: startTapClick */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "startTapClick", function() { return startTapClick; });
/* harmony import */ var _chunk_276e047f_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./chunk-276e047f.js */ "../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/components/chunk-276e047f.js");

function startTapClick(t) { var e, o, n = 10 * -MOUSE_WAIT, i = 0, r = !1; var c = new WeakMap; function a(t) { n = Object(_chunk_276e047f_js__WEBPACK_IMPORTED_MODULE_0__["b"])(t), u(t); } function s() { clearTimeout(o), e && (l(!1), e = void 0), r = !0; } function d(t) { e || (r = !1, E(getActivatableTarget(t), t)); } function u(t) { E(void 0, t), r && t.cancelable && t.preventDefault(); } function E(t, n) { if (t && t === e)
    return; clearTimeout(o), o = void 0; var _a = Object(_chunk_276e047f_js__WEBPACK_IMPORTED_MODULE_0__["k"])(n), i = _a.x, r = _a.y; if (e) {
    if (c.has(e))
        throw new Error("internal error");
    e.classList.contains(ACTIVATED) || f(e, i, r), l(!0);
} if (t) {
    var e_1 = c.get(t);
    e_1 && (clearTimeout(e_1), c.delete(t)), t.classList.remove(ACTIVATED), o = setTimeout(function () { f(t, i, r), o = void 0; }, ADD_ACTIVATED_DEFERS);
} e = t; } function f(t, e, o) { i = Date.now(), t.classList.add(ACTIVATED); var n = getRippleEffect(t); n && n.addRipple && n.addRipple(e, o); } function l(t) { var o = e; if (!o)
    return; var n = CLEAR_STATE_DEFERS - Date.now() + i; if (t && n > 0) {
    var t_1 = setTimeout(function () { o.classList.remove(ACTIVATED), c.delete(o); }, CLEAR_STATE_DEFERS);
    c.set(o, t_1);
}
else
    o.classList.remove(ACTIVATED); } t.body.addEventListener("click", function (t) { r && (t.preventDefault(), t.stopPropagation()); }, !0), t.body.addEventListener("ionScrollStart", s), t.body.addEventListener("ionGestureCaptured", s), t.addEventListener("touchstart", function (t) { n = Object(_chunk_276e047f_js__WEBPACK_IMPORTED_MODULE_0__["b"])(t), d(t); }, !0), t.addEventListener("touchcancel", a, !0), t.addEventListener("touchend", a, !0), t.addEventListener("mousedown", function (t) { var e = Object(_chunk_276e047f_js__WEBPACK_IMPORTED_MODULE_0__["b"])(t) - MOUSE_WAIT; n < e && d(t); }, !0), t.addEventListener("mouseup", function (t) { var e = Object(_chunk_276e047f_js__WEBPACK_IMPORTED_MODULE_0__["b"])(t) - MOUSE_WAIT; n < e && u(t); }, !0); }
function getActivatableTarget(t) { if (!t.composedPath)
    return t.target.closest("[ion-activable]"); {
    var e = t.composedPath();
    for (var t_2 = 0; t_2 < e.length - 2; t_2++) {
        var o = e[t_2];
        if (o.hasAttribute && o.hasAttribute("ion-activable"))
            return o;
    }
} }
function getRippleEffect(t) { if (t.shadowRoot) {
    var e = t.shadowRoot.querySelector("ion-ripple-effect");
    if (e)
        return e;
} return t.querySelector("ion-ripple-effect"); }
var ACTIVATED = "activated", ADD_ACTIVATED_DEFERS = 200, CLEAR_STATE_DEFERS = 200, MOUSE_WAIT = 2500;



/***/ })

}]);
//# sourceMappingURL=common.js.map