(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "../../libs/core/base/base-component.ts":
/*!***************************************************************************!*\
  !*** /Users/andredavcev/Projects/theory/libs/core/base/base-component.ts ***!
  \***************************************************************************/
/*! exports provided: BaseComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BaseComponent", function() { return BaseComponent; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "../../node_modules/rxjs/_esm5/index.js");
// libs

var BaseComponent = /** @class */ (function () {
    function BaseComponent() {
        this.destroy$ = new rxjs__WEBPACK_IMPORTED_MODULE_0__["Subject"]();
    }
    BaseComponent.prototype.ngOnDestroy = function () {
        this.destroy$.next(true);
        this.destroy$.complete();
    };
    return BaseComponent;
}());



/***/ }),

/***/ "../../libs/core/base/index.ts":
/*!******************************************************************!*\
  !*** /Users/andredavcev/Projects/theory/libs/core/base/index.ts ***!
  \******************************************************************/
/*! exports provided: BaseComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _base_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base-component */ "../../libs/core/base/base-component.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BaseComponent", function() { return _base_component__WEBPACK_IMPORTED_MODULE_0__["BaseComponent"]; });




/***/ }),

/***/ "../../libs/core/core.module.ts":
/*!*******************************************************************!*\
  !*** /Users/andredavcev/Projects/theory/libs/core/core.module.ts ***!
  \*******************************************************************/
/*! exports provided: BASE_PROVIDERS, CoreModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BASE_PROVIDERS", function() { return BASE_PROVIDERS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CoreModule", function() { return CoreModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "../../node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _nrwl_nx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @nrwl/nx */ "../../node_modules/@nrwl/nx/esm5/nrwl-nx.js");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ngx-translate/core */ "../../node_modules/@ngx-translate/core/fesm5/ngx-translate-core.js");
/* harmony import */ var _theory_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @theory/utils */ "../../libs/utils/index.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./environments/environment */ "../../libs/core/environments/environment.ts");
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./services */ "../../libs/core/services/index.ts");
/* harmony import */ var _services_log_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./services/log.service */ "../../libs/core/services/log.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (undefined && undefined.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};


// libs



// app



/**
 * DEBUGGING
 */
_services_log_service__WEBPACK_IMPORTED_MODULE_7__["LogService"].DEBUG.LEVEL_4 = !_environments_environment__WEBPACK_IMPORTED_MODULE_5__["environment"].production;
var BASE_PROVIDERS = _services__WEBPACK_IMPORTED_MODULE_6__["CORE_PROVIDERS"].concat([
    {
        provide: _angular_common__WEBPACK_IMPORTED_MODULE_1__["APP_BASE_HREF"],
        useValue: '/'
    }
]);
var CoreModule = /** @class */ (function () {
    function CoreModule(parentModule, lang, translate) {
        Object(_theory_utils__WEBPACK_IMPORTED_MODULE_4__["throwIfAlreadyLoaded"])(parentModule, 'CoreModule');
        // ensure default platform language is set
        translate.use(lang);
    }
    CoreModule_1 = CoreModule;
    // configuredProviders: *required to configure WindowService and others per platform
    CoreModule.forRoot = function (configuredProviders) {
        return {
            ngModule: CoreModule_1,
            providers: BASE_PROVIDERS.concat(configuredProviders)
        };
    };
    var CoreModule_1;
    CoreModule = CoreModule_1 = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"], _nrwl_nx__WEBPACK_IMPORTED_MODULE_2__["NxModule"].forRoot()]
        }),
        __param(0, Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Optional"])()),
        __param(0, Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["SkipSelf"])()),
        __param(1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"])(_services__WEBPACK_IMPORTED_MODULE_6__["PlatformLanguageToken"])),
        __metadata("design:paramtypes", [CoreModule, String, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_3__["TranslateService"]])
    ], CoreModule);
    return CoreModule;
}());



/***/ }),

/***/ "../../libs/core/environments/environment.ts":
/*!********************************************************************************!*\
  !*** /Users/andredavcev/Projects/theory/libs/core/environments/environment.ts ***!
  \********************************************************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
var environment = {
    production: false,
    api_url: 'http://127.0.0.1:4000',
    baseRoutePath: ''
};


/***/ }),

/***/ "../../libs/core/index.ts":
/*!*************************************************************!*\
  !*** /Users/andredavcev/Projects/theory/libs/core/index.ts ***!
  \*************************************************************/
/*! exports provided: CoreModule, environment, CORE_PROVIDERS, LogService, BaseComponent, WindowPlatformService, WindowService, PlatformLanguageToken */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base */ "../../libs/core/base/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BaseComponent", function() { return _base__WEBPACK_IMPORTED_MODULE_0__["BaseComponent"]; });

/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./environments/environment */ "../../libs/core/environments/environment.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return _environments_environment__WEBPACK_IMPORTED_MODULE_1__["environment"]; });

/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./services */ "../../libs/core/services/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CORE_PROVIDERS", function() { return _services__WEBPACK_IMPORTED_MODULE_2__["CORE_PROVIDERS"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "LogService", function() { return _services__WEBPACK_IMPORTED_MODULE_2__["LogService"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "WindowPlatformService", function() { return _services__WEBPACK_IMPORTED_MODULE_2__["WindowPlatformService"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "WindowService", function() { return _services__WEBPACK_IMPORTED_MODULE_2__["WindowService"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PlatformLanguageToken", function() { return _services__WEBPACK_IMPORTED_MODULE_2__["PlatformLanguageToken"]; });

/* harmony import */ var _core_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./core.module */ "../../libs/core/core.module.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CoreModule", function() { return _core_module__WEBPACK_IMPORTED_MODULE_3__["CoreModule"]; });







/***/ }),

/***/ "../../libs/core/services/index.ts":
/*!**********************************************************************!*\
  !*** /Users/andredavcev/Projects/theory/libs/core/services/index.ts ***!
  \**********************************************************************/
/*! exports provided: CORE_PROVIDERS, LogService, WindowPlatformService, WindowService, PlatformLanguageToken */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CORE_PROVIDERS", function() { return CORE_PROVIDERS; });
/* harmony import */ var _log_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./log.service */ "../../libs/core/services/log.service.ts");
/* harmony import */ var _window_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./window.service */ "../../libs/core/services/window.service.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "LogService", function() { return _log_service__WEBPACK_IMPORTED_MODULE_0__["LogService"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "WindowPlatformService", function() { return _window_service__WEBPACK_IMPORTED_MODULE_1__["WindowPlatformService"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "WindowService", function() { return _window_service__WEBPACK_IMPORTED_MODULE_1__["WindowService"]; });

/* harmony import */ var _tokens__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./tokens */ "../../libs/core/services/tokens.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PlatformLanguageToken", function() { return _tokens__WEBPACK_IMPORTED_MODULE_2__["PlatformLanguageToken"]; });



var CORE_PROVIDERS = [_log_service__WEBPACK_IMPORTED_MODULE_0__["LogService"], _window_service__WEBPACK_IMPORTED_MODULE_1__["WindowService"]];





/***/ }),

/***/ "../../libs/core/services/log.service.ts":
/*!****************************************************************************!*\
  !*** /Users/andredavcev/Projects/theory/libs/core/services/log.service.ts ***!
  \****************************************************************************/
/*! exports provided: LogService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LogService", function() { return LogService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
// angular

var LogService = /** @class */ (function () {
    function LogService() {
    }
    LogService_1 = LogService;
    // info (extra messages like analytics)
    // use LEVEL_5 to see only these
    LogService.prototype.info = function () {
        var msg = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            msg[_i] = arguments[_i];
        }
        if (LogService_1.DEBUG.LEVEL_5 || LogService_1.DEBUG.LEVEL_4) {
            // extra messages
            console.info(msg);
        }
    };
    // debug (standard output)
    LogService.prototype.debug = function () {
        var msg = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            msg[_i] = arguments[_i];
        }
        if (LogService_1.DEBUG.LEVEL_4 || LogService_1.DEBUG.LEVEL_3) {
            // console.debug does not work on {N} apps... use `log`
            console.log(msg);
        }
    };
    // error
    LogService.prototype.error = function () {
        var err = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            err[_i] = arguments[_i];
        }
        if (LogService_1.DEBUG.LEVEL_4 ||
            LogService_1.DEBUG.LEVEL_3 ||
            LogService_1.DEBUG.LEVEL_2) {
            console.error(err);
        }
    };
    // warn
    LogService.prototype.warn = function () {
        var warn = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            warn[_i] = arguments[_i];
        }
        if (LogService_1.DEBUG.LEVEL_4 ||
            LogService_1.DEBUG.LEVEL_3 ||
            LogService_1.DEBUG.LEVEL_1) {
            console.warn(warn);
        }
    };
    var LogService_1;
    LogService.DEBUG = {
        LEVEL_1: false,
        LEVEL_2: false,
        LEVEL_3: false,
        LEVEL_4: false,
        LEVEL_5: false // just info (excluding all else)
    };
    LogService = LogService_1 = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])()
    ], LogService);
    return LogService;
}());



/***/ }),

/***/ "../../libs/core/services/tokens.ts":
/*!***********************************************************************!*\
  !*** /Users/andredavcev/Projects/theory/libs/core/services/tokens.ts ***!
  \***********************************************************************/
/*! exports provided: PlatformLanguageToken */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlatformLanguageToken", function() { return PlatformLanguageToken; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");

/**
 * Various InjectionTokens shared across all platforms
 * Always suffix with 'Token' for clarity and consistency
 */
var PlatformLanguageToken = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["InjectionToken"]('PlatformLanguage');


/***/ }),

/***/ "../../libs/core/services/window.service.ts":
/*!*******************************************************************************!*\
  !*** /Users/andredavcev/Projects/theory/libs/core/services/window.service.ts ***!
  \*******************************************************************************/
/*! exports provided: WindowPlatformService, WindowService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WindowPlatformService", function() { return WindowPlatformService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WindowService", function() { return WindowService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _theory_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @theory/utils */ "../../libs/utils/index.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
// angular

// app

var WindowPlatformService = /** @class */ (function () {
    function WindowPlatformService() {
        this.navigator = {};
        this.location = {};
        // ...You can expand support for more window methods as you need them here...
    }
    WindowPlatformService.prototype.alert = function (msg) { };
    WindowPlatformService.prototype.confirm = function (msg) { };
    WindowPlatformService.prototype.setTimeout = function (handler, timeout) {
        return 0;
    };
    WindowPlatformService.prototype.clearTimeout = function (timeoutId) { };
    WindowPlatformService.prototype.setInterval = function (handler, ms) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        return 0;
    };
    WindowPlatformService.prototype.clearInterval = function (intervalId) { };
    WindowPlatformService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])()
    ], WindowPlatformService);
    return WindowPlatformService;
}());

var WindowService = /** @class */ (function () {
    function WindowService(_platformWindow) {
        this._platformWindow = _platformWindow;
    }
    Object.defineProperty(WindowService.prototype, "navigator", {
        get: function () {
            return this._platformWindow.navigator;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WindowService.prototype, "location", {
        get: function () {
            return this._platformWindow.location;
        },
        enumerable: true,
        configurable: true
    });
    WindowService.prototype.alert = function (msg) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var result = _this._platformWindow.alert(msg);
            if (Object(_theory_utils__WEBPACK_IMPORTED_MODULE_1__["isObject"])(result) && result.then) {
                // console.log('WindowService -- using result.then promise');
                result.then(resolve, reject);
            }
            else {
                resolve();
            }
        });
    };
    WindowService.prototype.confirm = function (msg, action /* used for fancyalerts on mobile*/) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var result = _this._platformWindow.confirm(msg, Object(_theory_utils__WEBPACK_IMPORTED_MODULE_1__["isNativeScript"])() ? action : undefined);
            if (Object(_theory_utils__WEBPACK_IMPORTED_MODULE_1__["isObject"])(result) && result.then) {
                result.then(resolve, reject);
            }
            else if (result) {
                resolve();
            }
            else {
                reject();
            }
        });
    };
    WindowService.prototype.setTimeout = function (handler, timeout) {
        return this._platformWindow.setTimeout(handler, timeout);
    };
    WindowService.prototype.clearTimeout = function (timeoutId) {
        return this._platformWindow.clearTimeout(timeoutId);
    };
    WindowService.prototype.setInterval = function (handler, ms) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        return this._platformWindow.setInterval(handler, ms, args);
    };
    WindowService.prototype.clearInterval = function (intervalId) {
        return this._platformWindow.clearInterval(intervalId);
    };
    WindowService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [WindowPlatformService])
    ], WindowService);
    return WindowService;
}());



/***/ }),

/***/ "../../libs/features/index.ts":
/*!*****************************************************************!*\
  !*** /Users/andredavcev/Projects/theory/libs/features/index.ts ***!
  \*****************************************************************/
/*! exports provided: UISharedModule, HeaderBaseComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ui__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ui */ "../../libs/features/ui/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "UISharedModule", function() { return _ui__WEBPACK_IMPORTED_MODULE_0__["UISharedModule"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "HeaderBaseComponent", function() { return _ui__WEBPACK_IMPORTED_MODULE_0__["HeaderBaseComponent"]; });




/***/ }),

/***/ "../../libs/features/ui/base/header.base-component.ts":
/*!*****************************************************************************************!*\
  !*** /Users/andredavcev/Projects/theory/libs/features/ui/base/header.base-component.ts ***!
  \*****************************************************************************************/
/*! exports provided: HeaderBaseComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HeaderBaseComponent", function() { return HeaderBaseComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _theory_core_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @theory/core/base */ "../../libs/core/base/index.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

// libs

var HeaderBaseComponent = /** @class */ (function (_super) {
    __extends(HeaderBaseComponent, _super);
    function HeaderBaseComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.tappedRight = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        return _this;
    }
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", String)
    ], HeaderBaseComponent.prototype, "title", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", String)
    ], HeaderBaseComponent.prototype, "rightButton", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"])
    ], HeaderBaseComponent.prototype, "tappedRight", void 0);
    return HeaderBaseComponent;
}(_theory_core_base__WEBPACK_IMPORTED_MODULE_1__["BaseComponent"]));



/***/ }),

/***/ "../../libs/features/ui/base/index.ts":
/*!*************************************************************************!*\
  !*** /Users/andredavcev/Projects/theory/libs/features/ui/base/index.ts ***!
  \*************************************************************************/
/*! exports provided: HeaderBaseComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _header_base_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./header.base-component */ "../../libs/features/ui/base/header.base-component.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "HeaderBaseComponent", function() { return _header_base_component__WEBPACK_IMPORTED_MODULE_0__["HeaderBaseComponent"]; });




/***/ }),

/***/ "../../libs/features/ui/index.ts":
/*!********************************************************************!*\
  !*** /Users/andredavcev/Projects/theory/libs/features/ui/index.ts ***!
  \********************************************************************/
/*! exports provided: UISharedModule, HeaderBaseComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base */ "../../libs/features/ui/base/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "HeaderBaseComponent", function() { return _base__WEBPACK_IMPORTED_MODULE_0__["HeaderBaseComponent"]; });

/* harmony import */ var _ui_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ui.module */ "../../libs/features/ui/ui.module.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "UISharedModule", function() { return _ui_module__WEBPACK_IMPORTED_MODULE_1__["UISharedModule"]; });





/***/ }),

/***/ "../../libs/features/ui/pipes/date-order.pipe.ts":
/*!************************************************************************************!*\
  !*** /Users/andredavcev/Projects/theory/libs/features/ui/pipes/date-order.pipe.ts ***!
  \************************************************************************************/
/*! exports provided: DateOrderPipe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DateOrderPipe", function() { return DateOrderPipe; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var DateOrderPipe = /** @class */ (function () {
    function DateOrderPipe() {
    }
    DateOrderPipe.prototype.transform = function (value, sortBy) {
        if (value) {
            return value.sort(function (a, b) {
                if (!a[sortBy]) {
                    throw new Error("Incorrect orderByDate property");
                }
                var dateA = new Date(a[sortBy]).getTime();
                var dateB = new Date(b[sortBy]).getTime();
                return dateB - dateA;
            });
        }
    };
    DateOrderPipe = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Pipe"])({
            name: 'orderByDate',
            pure: true
        })
    ], DateOrderPipe);
    return DateOrderPipe;
}());



/***/ }),

/***/ "../../libs/features/ui/pipes/index.ts":
/*!**************************************************************************!*\
  !*** /Users/andredavcev/Projects/theory/libs/features/ui/pipes/index.ts ***!
  \**************************************************************************/
/*! exports provided: PIPES */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PIPES", function() { return PIPES; });
/* harmony import */ var _date_order_pipe__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./date-order.pipe */ "../../libs/features/ui/pipes/date-order.pipe.ts");

var PIPES = [_date_order_pipe__WEBPACK_IMPORTED_MODULE_0__["DateOrderPipe"]];


/***/ }),

/***/ "../../libs/features/ui/ui.module.ts":
/*!************************************************************************!*\
  !*** /Users/andredavcev/Projects/theory/libs/features/ui/ui.module.ts ***!
  \************************************************************************/
/*! exports provided: UISharedModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UISharedModule", function() { return UISharedModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ngx-translate/core */ "../../node_modules/@ngx-translate/core/fesm5/ngx-translate-core.js");
/* harmony import */ var _pipes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./pipes */ "../../libs/features/ui/pipes/index.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var MODULES = [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_1__["TranslateModule"]];
var UISharedModule = /** @class */ (function () {
    function UISharedModule() {
    }
    UISharedModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: MODULES.slice(),
            declarations: _pipes__WEBPACK_IMPORTED_MODULE_2__["PIPES"].slice(),
            exports: MODULES.concat(_pipes__WEBPACK_IMPORTED_MODULE_2__["PIPES"])
        })
    ], UISharedModule);
    return UISharedModule;
}());



/***/ }),

/***/ "../../libs/utils/angular.ts":
/*!****************************************************************!*\
  !*** /Users/andredavcev/Projects/theory/libs/utils/angular.ts ***!
  \****************************************************************/
/*! exports provided: throwIfAlreadyLoaded */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "throwIfAlreadyLoaded", function() { return throwIfAlreadyLoaded; });
function throwIfAlreadyLoaded(parentModule, moduleName) {
    if (parentModule) {
        throw new Error(moduleName + " has already been loaded. Import " + moduleName + " in the AppModule only.");
    }
}


/***/ }),

/***/ "../../libs/utils/index.ts":
/*!**************************************************************!*\
  !*** /Users/andredavcev/Projects/theory/libs/utils/index.ts ***!
  \**************************************************************/
/*! exports provided: throwIfAlreadyLoaded, isString, isObject, isIOS, isAndroid, isNativeScript */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./angular */ "../../libs/utils/angular.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "throwIfAlreadyLoaded", function() { return _angular__WEBPACK_IMPORTED_MODULE_0__["throwIfAlreadyLoaded"]; });

/* harmony import */ var _objects__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./objects */ "../../libs/utils/objects.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isString", function() { return _objects__WEBPACK_IMPORTED_MODULE_1__["isString"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isObject", function() { return _objects__WEBPACK_IMPORTED_MODULE_1__["isObject"]; });

/* harmony import */ var _platform__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./platform */ "../../libs/utils/platform.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isIOS", function() { return _platform__WEBPACK_IMPORTED_MODULE_2__["isIOS"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isAndroid", function() { return _platform__WEBPACK_IMPORTED_MODULE_2__["isAndroid"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isNativeScript", function() { return _platform__WEBPACK_IMPORTED_MODULE_2__["isNativeScript"]; });






/***/ }),

/***/ "../../libs/utils/objects.ts":
/*!****************************************************************!*\
  !*** /Users/andredavcev/Projects/theory/libs/utils/objects.ts ***!
  \****************************************************************/
/*! exports provided: isString, isObject */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isString", function() { return isString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isObject", function() { return isObject; });
var isString = function (arg) {
    return typeof arg === 'string';
};
var isObject = function (arg) {
    return arg && typeof arg === 'object';
};


/***/ }),

/***/ "../../libs/utils/platform.ts":
/*!*****************************************************************!*\
  !*** /Users/andredavcev/Projects/theory/libs/utils/platform.ts ***!
  \*****************************************************************/
/*! exports provided: isIOS, isAndroid, isNativeScript */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isIOS", function() { return isIOS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isAndroid", function() { return isAndroid; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isNativeScript", function() { return isNativeScript; });
/**
 * NativeScript helpers
 */
/**
 * Determine if running on native iOS mobile app
 */
function isIOS() {
    return typeof NSObject !== 'undefined' && typeof NSString !== 'undefined';
}
/**
 * Determine if running on native Android mobile app
 */
function isAndroid() {
    return typeof android !== 'undefined' && typeof java !== 'undefined';
}
/**
 * Determine if running on native iOS or Android mobile app
 */
function isNativeScript() {
    return isIOS() || isAndroid();
}


/***/ }),

/***/ "../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/build lazy recursive ^\\.\\/.*\\.entry\\.js$ include: \\.entry\\.js$":
/*!**********************************************************************************************************************************************************************************!*\
  !*** /Users/andredavcev/Projects/theory/node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/build lazy ^\.\/.*\.entry\.js$ include: \.entry\.js$ namespace object ***!
  \**********************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./1pzpmodl.entry.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/build/1pzpmodl.entry.js",
		0,
		"common",
		13
	],
	"./1pzpmodl.sc.entry.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/build/1pzpmodl.sc.entry.js",
		0,
		"common",
		14
	],
	"./1vzj4iev.entry.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/build/1vzj4iev.entry.js",
		0,
		"common",
		15
	],
	"./1vzj4iev.sc.entry.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/build/1vzj4iev.sc.entry.js",
		0,
		"common",
		16
	],
	"./2jswtbop.entry.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/build/2jswtbop.entry.js",
		17
	],
	"./2jswtbop.sc.entry.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/build/2jswtbop.sc.entry.js",
		18
	],
	"./2xlcplwx.entry.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/build/2xlcplwx.entry.js",
		0,
		"common",
		19
	],
	"./2xlcplwx.sc.entry.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/build/2xlcplwx.sc.entry.js",
		0,
		"common",
		20
	],
	"./2yck1ams.entry.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/build/2yck1ams.entry.js",
		0,
		"common",
		21
	],
	"./2yck1ams.sc.entry.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/build/2yck1ams.sc.entry.js",
		0,
		"common",
		22
	],
	"./4akfx1pp.entry.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/build/4akfx1pp.entry.js",
		0,
		"common",
		23
	],
	"./4akfx1pp.sc.entry.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/build/4akfx1pp.sc.entry.js",
		0,
		"common",
		24
	],
	"./4v89pg1l.entry.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/build/4v89pg1l.entry.js",
		0,
		"common",
		25
	],
	"./4v89pg1l.sc.entry.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/build/4v89pg1l.sc.entry.js",
		0,
		"common",
		26
	],
	"./7nk4bg8j.entry.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/build/7nk4bg8j.entry.js",
		0,
		"common",
		27
	],
	"./7nk4bg8j.sc.entry.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/build/7nk4bg8j.sc.entry.js",
		0,
		"common",
		28
	],
	"./7oweqjmw.entry.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/build/7oweqjmw.entry.js",
		0,
		"common",
		29
	],
	"./7oweqjmw.sc.entry.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/build/7oweqjmw.sc.entry.js",
		0,
		"common",
		30
	],
	"./7zslq9c2.entry.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/build/7zslq9c2.entry.js",
		0,
		"common",
		31
	],
	"./7zslq9c2.sc.entry.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/build/7zslq9c2.sc.entry.js",
		0,
		"common",
		32
	],
	"./7zvak3av.entry.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/build/7zvak3av.entry.js",
		0,
		"common",
		33
	],
	"./7zvak3av.sc.entry.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/build/7zvak3av.sc.entry.js",
		0,
		"common",
		34
	],
	"./8yhidsqq.entry.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/build/8yhidsqq.entry.js",
		0,
		"common",
		35
	],
	"./8yhidsqq.sc.entry.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/build/8yhidsqq.sc.entry.js",
		0,
		"common",
		36
	],
	"./aeaeke7j.entry.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/build/aeaeke7j.entry.js",
		0,
		"common",
		37
	],
	"./aeaeke7j.sc.entry.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/build/aeaeke7j.sc.entry.js",
		0,
		"common",
		38
	],
	"./agpviox7.entry.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/build/agpviox7.entry.js",
		0,
		"common",
		39
	],
	"./agpviox7.sc.entry.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/build/agpviox7.sc.entry.js",
		0,
		"common",
		40
	],
	"./amegv4d5.entry.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/build/amegv4d5.entry.js",
		"common",
		41
	],
	"./amegv4d5.sc.entry.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/build/amegv4d5.sc.entry.js",
		"common",
		42
	],
	"./c6noyomn.entry.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/build/c6noyomn.entry.js",
		0,
		"common",
		43
	],
	"./c6noyomn.sc.entry.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/build/c6noyomn.sc.entry.js",
		0,
		"common",
		44
	],
	"./cfguwiqk.entry.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/build/cfguwiqk.entry.js",
		0,
		"common",
		45
	],
	"./cfguwiqk.sc.entry.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/build/cfguwiqk.sc.entry.js",
		0,
		"common",
		46
	],
	"./ck21boww.entry.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/build/ck21boww.entry.js",
		0,
		"common",
		47
	],
	"./ck21boww.sc.entry.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/build/ck21boww.sc.entry.js",
		0,
		"common",
		48
	],
	"./d8hu9v7u.entry.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/build/d8hu9v7u.entry.js",
		0,
		"common",
		49
	],
	"./d8hu9v7u.sc.entry.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/build/d8hu9v7u.sc.entry.js",
		0,
		"common",
		50
	],
	"./dmqtv4c3.entry.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/build/dmqtv4c3.entry.js",
		0,
		"common",
		51
	],
	"./dmqtv4c3.sc.entry.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/build/dmqtv4c3.sc.entry.js",
		0,
		"common",
		52
	],
	"./eeuo8kz6.entry.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/build/eeuo8kz6.entry.js",
		"common",
		53
	],
	"./eeuo8kz6.sc.entry.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/build/eeuo8kz6.sc.entry.js",
		"common",
		54
	],
	"./eilluzs6.entry.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/build/eilluzs6.entry.js",
		55
	],
	"./eilluzs6.sc.entry.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/build/eilluzs6.sc.entry.js",
		56
	],
	"./ej7i9is4.entry.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/build/ej7i9is4.entry.js",
		0,
		"common",
		57
	],
	"./ej7i9is4.sc.entry.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/build/ej7i9is4.sc.entry.js",
		0,
		"common",
		58
	],
	"./ezb8uns1.entry.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/build/ezb8uns1.entry.js",
		0,
		"common",
		59
	],
	"./ezb8uns1.sc.entry.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/build/ezb8uns1.sc.entry.js",
		0,
		"common",
		60
	],
	"./fl5myp0s.entry.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/build/fl5myp0s.entry.js",
		0,
		"common",
		61
	],
	"./fl5myp0s.sc.entry.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/build/fl5myp0s.sc.entry.js",
		0,
		"common",
		62
	],
	"./fvg6ydme.entry.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/build/fvg6ydme.entry.js",
		0,
		"common",
		63
	],
	"./fvg6ydme.sc.entry.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/build/fvg6ydme.sc.entry.js",
		0,
		"common",
		64
	],
	"./fzhq1ox9.entry.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/build/fzhq1ox9.entry.js",
		0,
		"common",
		65
	],
	"./fzhq1ox9.sc.entry.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/build/fzhq1ox9.sc.entry.js",
		0,
		"common",
		66
	],
	"./hk89kth4.entry.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/build/hk89kth4.entry.js",
		0,
		"common",
		67
	],
	"./hk89kth4.sc.entry.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/build/hk89kth4.sc.entry.js",
		0,
		"common",
		68
	],
	"./hz9cqqbq.entry.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/build/hz9cqqbq.entry.js",
		0,
		"common",
		69
	],
	"./hz9cqqbq.sc.entry.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/build/hz9cqqbq.sc.entry.js",
		0,
		"common",
		70
	],
	"./i1z7ysfp.entry.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/build/i1z7ysfp.entry.js",
		0,
		"common",
		71
	],
	"./i1z7ysfp.sc.entry.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/build/i1z7ysfp.sc.entry.js",
		0,
		"common",
		72
	],
	"./i9fadijr.entry.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/build/i9fadijr.entry.js",
		0,
		"common",
		73
	],
	"./i9fadijr.sc.entry.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/build/i9fadijr.sc.entry.js",
		0,
		"common",
		74
	],
	"./ie0nvonp.entry.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/build/ie0nvonp.entry.js",
		0,
		"common",
		75
	],
	"./ie0nvonp.sc.entry.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/build/ie0nvonp.sc.entry.js",
		0,
		"common",
		76
	],
	"./ifpbahte.entry.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/build/ifpbahte.entry.js",
		0,
		"common",
		77
	],
	"./ifpbahte.sc.entry.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/build/ifpbahte.sc.entry.js",
		0,
		"common",
		78
	],
	"./ijltfkuh.entry.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/build/ijltfkuh.entry.js",
		0,
		"common",
		79
	],
	"./ijltfkuh.sc.entry.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/build/ijltfkuh.sc.entry.js",
		0,
		"common",
		80
	],
	"./ilzbfjg7.entry.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/build/ilzbfjg7.entry.js",
		0,
		"common",
		81
	],
	"./ilzbfjg7.sc.entry.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/build/ilzbfjg7.sc.entry.js",
		0,
		"common",
		82
	],
	"./j66fx9bc.entry.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/build/j66fx9bc.entry.js",
		83
	],
	"./j66fx9bc.sc.entry.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/build/j66fx9bc.sc.entry.js",
		84
	],
	"./jnylf5ki.entry.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/build/jnylf5ki.entry.js",
		0,
		"common",
		85
	],
	"./jnylf5ki.sc.entry.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/build/jnylf5ki.sc.entry.js",
		0,
		"common",
		86
	],
	"./jo5uvvdg.entry.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/build/jo5uvvdg.entry.js",
		0,
		"common",
		87
	],
	"./jo5uvvdg.sc.entry.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/build/jo5uvvdg.sc.entry.js",
		0,
		"common",
		88
	],
	"./kbdajof4.entry.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/build/kbdajof4.entry.js",
		0,
		"common",
		89
	],
	"./kbdajof4.sc.entry.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/build/kbdajof4.sc.entry.js",
		0,
		"common",
		90
	],
	"./lfpzqjwk.entry.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/build/lfpzqjwk.entry.js",
		0,
		"common",
		91
	],
	"./lfpzqjwk.sc.entry.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/build/lfpzqjwk.sc.entry.js",
		0,
		"common",
		92
	],
	"./lhpbi0xj.entry.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/build/lhpbi0xj.entry.js",
		0,
		"common",
		93
	],
	"./lhpbi0xj.sc.entry.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/build/lhpbi0xj.sc.entry.js",
		0,
		"common",
		94
	],
	"./ljmlrwjn.entry.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/build/ljmlrwjn.entry.js",
		0,
		"common",
		95
	],
	"./ljmlrwjn.sc.entry.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/build/ljmlrwjn.sc.entry.js",
		0,
		"common",
		96
	],
	"./lwfmg2hj.entry.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/build/lwfmg2hj.entry.js",
		0,
		"common",
		97
	],
	"./lwfmg2hj.sc.entry.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/build/lwfmg2hj.sc.entry.js",
		0,
		"common",
		98
	],
	"./lyp3stzb.entry.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/build/lyp3stzb.entry.js",
		0,
		"common",
		99
	],
	"./lyp3stzb.sc.entry.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/build/lyp3stzb.sc.entry.js",
		0,
		"common",
		100
	],
	"./mcbq2r23.entry.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/build/mcbq2r23.entry.js",
		0,
		"common",
		101
	],
	"./mcbq2r23.sc.entry.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/build/mcbq2r23.sc.entry.js",
		0,
		"common",
		102
	],
	"./mm8konib.entry.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/build/mm8konib.entry.js",
		0,
		"common",
		103
	],
	"./mm8konib.sc.entry.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/build/mm8konib.sc.entry.js",
		0,
		"common",
		104
	],
	"./montlozs.entry.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/build/montlozs.entry.js",
		0,
		"common",
		105
	],
	"./montlozs.sc.entry.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/build/montlozs.sc.entry.js",
		0,
		"common",
		106
	],
	"./nbcumgqm.entry.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/build/nbcumgqm.entry.js",
		0,
		"common",
		107
	],
	"./nbcumgqm.sc.entry.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/build/nbcumgqm.sc.entry.js",
		0,
		"common",
		108
	],
	"./nqouehvm.entry.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/build/nqouehvm.entry.js",
		0,
		"common",
		109
	],
	"./nqouehvm.sc.entry.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/build/nqouehvm.sc.entry.js",
		0,
		"common",
		110
	],
	"./ntlsthn3.entry.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/build/ntlsthn3.entry.js",
		111
	],
	"./ntlsthn3.sc.entry.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/build/ntlsthn3.sc.entry.js",
		112
	],
	"./ouevpaq6.entry.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/build/ouevpaq6.entry.js",
		0,
		"common",
		113
	],
	"./ouevpaq6.sc.entry.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/build/ouevpaq6.sc.entry.js",
		0,
		"common",
		114
	],
	"./pjlyljxh.entry.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/build/pjlyljxh.entry.js",
		0,
		"common",
		115
	],
	"./pjlyljxh.sc.entry.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/build/pjlyljxh.sc.entry.js",
		0,
		"common",
		116
	],
	"./puryh41h.entry.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/build/puryh41h.entry.js",
		0,
		"common",
		117
	],
	"./puryh41h.sc.entry.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/build/puryh41h.sc.entry.js",
		0,
		"common",
		118
	],
	"./q8tgxoqn.entry.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/build/q8tgxoqn.entry.js",
		0,
		"common",
		119
	],
	"./q8tgxoqn.sc.entry.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/build/q8tgxoqn.sc.entry.js",
		0,
		"common",
		120
	],
	"./qonoystt.entry.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/build/qonoystt.entry.js",
		0,
		"common",
		121
	],
	"./qonoystt.sc.entry.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/build/qonoystt.sc.entry.js",
		0,
		"common",
		122
	],
	"./qvwgwxx7.entry.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/build/qvwgwxx7.entry.js",
		0,
		"common",
		123
	],
	"./qvwgwxx7.sc.entry.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/build/qvwgwxx7.sc.entry.js",
		0,
		"common",
		124
	],
	"./ripi80zb.entry.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/build/ripi80zb.entry.js",
		0,
		"common",
		125
	],
	"./ripi80zb.sc.entry.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/build/ripi80zb.sc.entry.js",
		0,
		"common",
		126
	],
	"./rqksuytp.entry.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/build/rqksuytp.entry.js",
		0,
		"common",
		127
	],
	"./rqksuytp.sc.entry.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/build/rqksuytp.sc.entry.js",
		0,
		"common",
		128
	],
	"./t3ahlg1u.entry.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/build/t3ahlg1u.entry.js",
		0,
		"common",
		129
	],
	"./t3ahlg1u.sc.entry.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/build/t3ahlg1u.sc.entry.js",
		0,
		"common",
		130
	],
	"./ubpxpkut.entry.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/build/ubpxpkut.entry.js",
		0,
		"common",
		131
	],
	"./ubpxpkut.sc.entry.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/build/ubpxpkut.sc.entry.js",
		0,
		"common",
		132
	],
	"./ujtvejfw.entry.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/build/ujtvejfw.entry.js",
		0,
		"common",
		133
	],
	"./ujtvejfw.sc.entry.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/build/ujtvejfw.sc.entry.js",
		0,
		"common",
		134
	],
	"./ujzgtij1.entry.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/build/ujzgtij1.entry.js",
		0,
		"common",
		135
	],
	"./ujzgtij1.sc.entry.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/build/ujzgtij1.sc.entry.js",
		0,
		"common",
		136
	],
	"./v3mzxt80.entry.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/build/v3mzxt80.entry.js",
		"common",
		137
	],
	"./v3mzxt80.sc.entry.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/build/v3mzxt80.sc.entry.js",
		"common",
		138
	],
	"./v4bp8gqa.entry.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/build/v4bp8gqa.entry.js",
		0,
		"common",
		139
	],
	"./v4bp8gqa.sc.entry.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/build/v4bp8gqa.sc.entry.js",
		0,
		"common",
		140
	],
	"./vmkrep9v.entry.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/build/vmkrep9v.entry.js",
		0,
		"common",
		141
	],
	"./vmkrep9v.sc.entry.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/build/vmkrep9v.sc.entry.js",
		0,
		"common",
		142
	],
	"./vyajviiv.entry.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/build/vyajviiv.entry.js",
		0,
		"common",
		143
	],
	"./vyajviiv.sc.entry.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/build/vyajviiv.sc.entry.js",
		0,
		"common",
		144
	],
	"./wwxoh75w.entry.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/build/wwxoh75w.entry.js",
		0,
		"common",
		145
	],
	"./wwxoh75w.sc.entry.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/build/wwxoh75w.sc.entry.js",
		0,
		"common",
		146
	],
	"./wyjsq9xc.entry.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/build/wyjsq9xc.entry.js",
		0,
		"common",
		147
	],
	"./wyjsq9xc.sc.entry.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/build/wyjsq9xc.sc.entry.js",
		0,
		"common",
		148
	],
	"./xaspetje.entry.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/build/xaspetje.entry.js",
		0,
		"common",
		149
	],
	"./xaspetje.sc.entry.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/build/xaspetje.sc.entry.js",
		0,
		"common",
		150
	],
	"./xcsewabo.entry.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/build/xcsewabo.entry.js",
		151
	],
	"./xcsewabo.sc.entry.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/build/xcsewabo.sc.entry.js",
		152
	],
	"./xddssfba.entry.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/build/xddssfba.entry.js",
		0,
		"common",
		153
	],
	"./xddssfba.sc.entry.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/build/xddssfba.sc.entry.js",
		0,
		"common",
		154
	],
	"./xejzifhx.entry.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/build/xejzifhx.entry.js",
		0,
		"common",
		155
	],
	"./xejzifhx.sc.entry.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/build/xejzifhx.sc.entry.js",
		0,
		"common",
		156
	],
	"./xgggkkjr.entry.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/build/xgggkkjr.entry.js",
		0,
		"common",
		157
	],
	"./xgggkkjr.sc.entry.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/build/xgggkkjr.sc.entry.js",
		0,
		"common",
		158
	],
	"./yvqnqulj.entry.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/build/yvqnqulj.entry.js",
		"common",
		159
	],
	"./yvqnqulj.sc.entry.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/build/yvqnqulj.sc.entry.js",
		"common",
		160
	],
	"./z8chb03e.entry.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/build/z8chb03e.entry.js",
		0,
		"common",
		161
	],
	"./z8chb03e.sc.entry.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/build/z8chb03e.sc.entry.js",
		0,
		"common",
		162
	],
	"./zzifk9rl.entry.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/build/zzifk9rl.entry.js",
		"common",
		163
	],
	"./zzifk9rl.sc.entry.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/build/zzifk9rl.sc.entry.js",
		"common",
		164
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids) {
		return Promise.resolve().then(function() {
			var e = new Error("Cannot find module '" + req + "'");
			e.code = 'MODULE_NOT_FOUND';
			throw e;
		});
	}
	return Promise.all(ids.slice(1).map(__webpack_require__.e)).then(function() {
		var id = ids[0];
		return __webpack_require__(id);
	});
}
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = "../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/build lazy recursive ^\\.\\/.*\\.entry\\.js$ include: \\.entry\\.js$";
module.exports = webpackAsyncContext;

/***/ }),

/***/ "../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg sync ./!./!../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!./ .svg$":
/*!************************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/andredavcev/Projects/theory/node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg sync nonrecursive !/Users/andredavcev/Projects/theory/node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg .svg$ ***!
  \************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./ios-add-circle-outline.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-add-circle-outline.svg",
	"./ios-add-circle.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-add-circle.svg",
	"./ios-add.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-add.svg",
	"./ios-airplane.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-airplane.svg",
	"./ios-alarm.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-alarm.svg",
	"./ios-albums.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-albums.svg",
	"./ios-alert.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-alert.svg",
	"./ios-american-football.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-american-football.svg",
	"./ios-analytics.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-analytics.svg",
	"./ios-aperture.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-aperture.svg",
	"./ios-apps.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-apps.svg",
	"./ios-appstore.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-appstore.svg",
	"./ios-archive.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-archive.svg",
	"./ios-arrow-back.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-arrow-back.svg",
	"./ios-arrow-down.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-arrow-down.svg",
	"./ios-arrow-dropdown-circle.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-arrow-dropdown-circle.svg",
	"./ios-arrow-dropdown.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-arrow-dropdown.svg",
	"./ios-arrow-dropleft-circle.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-arrow-dropleft-circle.svg",
	"./ios-arrow-dropleft.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-arrow-dropleft.svg",
	"./ios-arrow-dropright-circle.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-arrow-dropright-circle.svg",
	"./ios-arrow-dropright.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-arrow-dropright.svg",
	"./ios-arrow-dropup-circle.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-arrow-dropup-circle.svg",
	"./ios-arrow-dropup.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-arrow-dropup.svg",
	"./ios-arrow-forward.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-arrow-forward.svg",
	"./ios-arrow-round-back.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-arrow-round-back.svg",
	"./ios-arrow-round-down.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-arrow-round-down.svg",
	"./ios-arrow-round-forward.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-arrow-round-forward.svg",
	"./ios-arrow-round-up.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-arrow-round-up.svg",
	"./ios-arrow-up.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-arrow-up.svg",
	"./ios-at.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-at.svg",
	"./ios-attach.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-attach.svg",
	"./ios-backspace.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-backspace.svg",
	"./ios-barcode.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-barcode.svg",
	"./ios-baseball.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-baseball.svg",
	"./ios-basket.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-basket.svg",
	"./ios-basketball.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-basketball.svg",
	"./ios-battery-charging.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-battery-charging.svg",
	"./ios-battery-dead.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-battery-dead.svg",
	"./ios-battery-full.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-battery-full.svg",
	"./ios-beaker.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-beaker.svg",
	"./ios-bed.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-bed.svg",
	"./ios-beer.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-beer.svg",
	"./ios-bicycle.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-bicycle.svg",
	"./ios-bluetooth.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-bluetooth.svg",
	"./ios-boat.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-boat.svg",
	"./ios-body.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-body.svg",
	"./ios-bonfire.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-bonfire.svg",
	"./ios-book.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-book.svg",
	"./ios-bookmark.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-bookmark.svg",
	"./ios-bookmarks.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-bookmarks.svg",
	"./ios-bowtie.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-bowtie.svg",
	"./ios-briefcase.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-briefcase.svg",
	"./ios-browsers.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-browsers.svg",
	"./ios-brush.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-brush.svg",
	"./ios-bug.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-bug.svg",
	"./ios-build.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-build.svg",
	"./ios-bulb.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-bulb.svg",
	"./ios-bus.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-bus.svg",
	"./ios-business.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-business.svg",
	"./ios-cafe.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-cafe.svg",
	"./ios-calculator.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-calculator.svg",
	"./ios-calendar.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-calendar.svg",
	"./ios-call.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-call.svg",
	"./ios-camera.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-camera.svg",
	"./ios-car.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-car.svg",
	"./ios-card.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-card.svg",
	"./ios-cart.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-cart.svg",
	"./ios-cash.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-cash.svg",
	"./ios-cellular.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-cellular.svg",
	"./ios-chatboxes.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-chatboxes.svg",
	"./ios-chatbubbles.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-chatbubbles.svg",
	"./ios-checkbox-outline.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-checkbox-outline.svg",
	"./ios-checkbox.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-checkbox.svg",
	"./ios-checkmark-circle-outline.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-checkmark-circle-outline.svg",
	"./ios-checkmark-circle.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-checkmark-circle.svg",
	"./ios-checkmark.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-checkmark.svg",
	"./ios-clipboard.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-clipboard.svg",
	"./ios-clock.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-clock.svg",
	"./ios-close-circle-outline.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-close-circle-outline.svg",
	"./ios-close-circle.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-close-circle.svg",
	"./ios-close.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-close.svg",
	"./ios-cloud-circle.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-cloud-circle.svg",
	"./ios-cloud-done.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-cloud-done.svg",
	"./ios-cloud-download.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-cloud-download.svg",
	"./ios-cloud-outline.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-cloud-outline.svg",
	"./ios-cloud-upload.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-cloud-upload.svg",
	"./ios-cloud.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-cloud.svg",
	"./ios-cloudy-night.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-cloudy-night.svg",
	"./ios-cloudy.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-cloudy.svg",
	"./ios-code-download.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-code-download.svg",
	"./ios-code-working.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-code-working.svg",
	"./ios-code.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-code.svg",
	"./ios-cog.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-cog.svg",
	"./ios-color-fill.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-color-fill.svg",
	"./ios-color-filter.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-color-filter.svg",
	"./ios-color-palette.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-color-palette.svg",
	"./ios-color-wand.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-color-wand.svg",
	"./ios-compass.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-compass.svg",
	"./ios-construct.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-construct.svg",
	"./ios-contact.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-contact.svg",
	"./ios-contacts.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-contacts.svg",
	"./ios-contract.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-contract.svg",
	"./ios-contrast.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-contrast.svg",
	"./ios-copy.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-copy.svg",
	"./ios-create.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-create.svg",
	"./ios-crop.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-crop.svg",
	"./ios-cube.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-cube.svg",
	"./ios-cut.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-cut.svg",
	"./ios-desktop.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-desktop.svg",
	"./ios-disc.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-disc.svg",
	"./ios-document.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-document.svg",
	"./ios-done-all.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-done-all.svg",
	"./ios-download.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-download.svg",
	"./ios-easel.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-easel.svg",
	"./ios-egg.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-egg.svg",
	"./ios-exit.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-exit.svg",
	"./ios-expand.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-expand.svg",
	"./ios-eye-off.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-eye-off.svg",
	"./ios-eye.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-eye.svg",
	"./ios-fastforward.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-fastforward.svg",
	"./ios-female.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-female.svg",
	"./ios-filing.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-filing.svg",
	"./ios-film.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-film.svg",
	"./ios-finger-print.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-finger-print.svg",
	"./ios-fitness.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-fitness.svg",
	"./ios-flag.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-flag.svg",
	"./ios-flame.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-flame.svg",
	"./ios-flash-off.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-flash-off.svg",
	"./ios-flash.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-flash.svg",
	"./ios-flashlight.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-flashlight.svg",
	"./ios-flask.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-flask.svg",
	"./ios-flower.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-flower.svg",
	"./ios-folder-open.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-folder-open.svg",
	"./ios-folder.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-folder.svg",
	"./ios-football.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-football.svg",
	"./ios-funnel.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-funnel.svg",
	"./ios-gift.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-gift.svg",
	"./ios-git-branch.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-git-branch.svg",
	"./ios-git-commit.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-git-commit.svg",
	"./ios-git-compare.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-git-compare.svg",
	"./ios-git-merge.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-git-merge.svg",
	"./ios-git-network.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-git-network.svg",
	"./ios-git-pull-request.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-git-pull-request.svg",
	"./ios-glasses.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-glasses.svg",
	"./ios-globe.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-globe.svg",
	"./ios-grid.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-grid.svg",
	"./ios-hammer.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-hammer.svg",
	"./ios-hand.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-hand.svg",
	"./ios-happy.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-happy.svg",
	"./ios-headset.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-headset.svg",
	"./ios-heart-dislike.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-heart-dislike.svg",
	"./ios-heart-empty.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-heart-empty.svg",
	"./ios-heart-half.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-heart-half.svg",
	"./ios-heart.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-heart.svg",
	"./ios-help-buoy.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-help-buoy.svg",
	"./ios-help-circle-outline.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-help-circle-outline.svg",
	"./ios-help-circle.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-help-circle.svg",
	"./ios-help.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-help.svg",
	"./ios-home.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-home.svg",
	"./ios-hourglass.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-hourglass.svg",
	"./ios-ice-cream.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-ice-cream.svg",
	"./ios-image.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-image.svg",
	"./ios-images.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-images.svg",
	"./ios-infinite.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-infinite.svg",
	"./ios-information-circle-outline.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-information-circle-outline.svg",
	"./ios-information-circle.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-information-circle.svg",
	"./ios-information.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-information.svg",
	"./ios-jet.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-jet.svg",
	"./ios-journal.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-journal.svg",
	"./ios-key.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-key.svg",
	"./ios-keypad.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-keypad.svg",
	"./ios-laptop.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-laptop.svg",
	"./ios-leaf.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-leaf.svg",
	"./ios-link.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-link.svg",
	"./ios-list-box.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-list-box.svg",
	"./ios-list.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-list.svg",
	"./ios-locate.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-locate.svg",
	"./ios-lock.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-lock.svg",
	"./ios-log-in.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-log-in.svg",
	"./ios-log-out.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-log-out.svg",
	"./ios-magnet.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-magnet.svg",
	"./ios-mail-open.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-mail-open.svg",
	"./ios-mail-unread.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-mail-unread.svg",
	"./ios-mail.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-mail.svg",
	"./ios-male.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-male.svg",
	"./ios-man.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-man.svg",
	"./ios-map.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-map.svg",
	"./ios-medal.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-medal.svg",
	"./ios-medical.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-medical.svg",
	"./ios-medkit.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-medkit.svg",
	"./ios-megaphone.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-megaphone.svg",
	"./ios-menu.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-menu.svg",
	"./ios-mic-off.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-mic-off.svg",
	"./ios-mic.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-mic.svg",
	"./ios-microphone.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-microphone.svg",
	"./ios-moon.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-moon.svg",
	"./ios-more.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-more.svg",
	"./ios-move.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-move.svg",
	"./ios-musical-note.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-musical-note.svg",
	"./ios-musical-notes.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-musical-notes.svg",
	"./ios-navigate.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-navigate.svg",
	"./ios-notifications-off.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-notifications-off.svg",
	"./ios-notifications-outline.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-notifications-outline.svg",
	"./ios-notifications.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-notifications.svg",
	"./ios-nuclear.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-nuclear.svg",
	"./ios-nutrition.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-nutrition.svg",
	"./ios-open.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-open.svg",
	"./ios-options.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-options.svg",
	"./ios-outlet.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-outlet.svg",
	"./ios-paper-plane.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-paper-plane.svg",
	"./ios-paper.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-paper.svg",
	"./ios-partly-sunny.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-partly-sunny.svg",
	"./ios-pause.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-pause.svg",
	"./ios-paw.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-paw.svg",
	"./ios-people.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-people.svg",
	"./ios-person-add.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-person-add.svg",
	"./ios-person.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-person.svg",
	"./ios-phone-landscape.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-phone-landscape.svg",
	"./ios-phone-portrait.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-phone-portrait.svg",
	"./ios-photos.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-photos.svg",
	"./ios-pie.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-pie.svg",
	"./ios-pin.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-pin.svg",
	"./ios-pint.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-pint.svg",
	"./ios-pizza.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-pizza.svg",
	"./ios-planet.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-planet.svg",
	"./ios-play-circle.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-play-circle.svg",
	"./ios-play.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-play.svg",
	"./ios-podium.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-podium.svg",
	"./ios-power.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-power.svg",
	"./ios-pricetag.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-pricetag.svg",
	"./ios-pricetags.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-pricetags.svg",
	"./ios-print.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-print.svg",
	"./ios-pulse.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-pulse.svg",
	"./ios-qr-scanner.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-qr-scanner.svg",
	"./ios-quote.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-quote.svg",
	"./ios-radio-button-off.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-radio-button-off.svg",
	"./ios-radio-button-on.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-radio-button-on.svg",
	"./ios-radio.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-radio.svg",
	"./ios-rainy.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-rainy.svg",
	"./ios-recording.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-recording.svg",
	"./ios-redo.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-redo.svg",
	"./ios-refresh-circle.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-refresh-circle.svg",
	"./ios-refresh.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-refresh.svg",
	"./ios-remove-circle-outline.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-remove-circle-outline.svg",
	"./ios-remove-circle.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-remove-circle.svg",
	"./ios-remove.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-remove.svg",
	"./ios-reorder.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-reorder.svg",
	"./ios-repeat.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-repeat.svg",
	"./ios-resize.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-resize.svg",
	"./ios-restaurant.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-restaurant.svg",
	"./ios-return-left.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-return-left.svg",
	"./ios-return-right.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-return-right.svg",
	"./ios-reverse-camera.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-reverse-camera.svg",
	"./ios-rewind.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-rewind.svg",
	"./ios-ribbon.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-ribbon.svg",
	"./ios-rocket.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-rocket.svg",
	"./ios-rose.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-rose.svg",
	"./ios-sad.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-sad.svg",
	"./ios-save.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-save.svg",
	"./ios-school.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-school.svg",
	"./ios-search.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-search.svg",
	"./ios-send.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-send.svg",
	"./ios-settings.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-settings.svg",
	"./ios-share-alt.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-share-alt.svg",
	"./ios-share.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-share.svg",
	"./ios-shirt.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-shirt.svg",
	"./ios-shuffle.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-shuffle.svg",
	"./ios-skip-backward.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-skip-backward.svg",
	"./ios-skip-forward.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-skip-forward.svg",
	"./ios-snow.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-snow.svg",
	"./ios-speedometer.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-speedometer.svg",
	"./ios-square-outline.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-square-outline.svg",
	"./ios-square.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-square.svg",
	"./ios-star-half.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-star-half.svg",
	"./ios-star-outline.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-star-outline.svg",
	"./ios-star.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-star.svg",
	"./ios-stats.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-stats.svg",
	"./ios-stopwatch.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-stopwatch.svg",
	"./ios-subway.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-subway.svg",
	"./ios-sunny.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-sunny.svg",
	"./ios-swap.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-swap.svg",
	"./ios-switch.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-switch.svg",
	"./ios-sync.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-sync.svg",
	"./ios-tablet-landscape.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-tablet-landscape.svg",
	"./ios-tablet-portrait.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-tablet-portrait.svg",
	"./ios-tennisball.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-tennisball.svg",
	"./ios-text.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-text.svg",
	"./ios-thermometer.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-thermometer.svg",
	"./ios-thumbs-down.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-thumbs-down.svg",
	"./ios-thumbs-up.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-thumbs-up.svg",
	"./ios-thunderstorm.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-thunderstorm.svg",
	"./ios-time.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-time.svg",
	"./ios-timer.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-timer.svg",
	"./ios-today.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-today.svg",
	"./ios-train.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-train.svg",
	"./ios-transgender.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-transgender.svg",
	"./ios-trash.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-trash.svg",
	"./ios-trending-down.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-trending-down.svg",
	"./ios-trending-up.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-trending-up.svg",
	"./ios-trophy.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-trophy.svg",
	"./ios-tv.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-tv.svg",
	"./ios-umbrella.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-umbrella.svg",
	"./ios-undo.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-undo.svg",
	"./ios-unlock.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-unlock.svg",
	"./ios-videocam.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-videocam.svg",
	"./ios-volume-high.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-volume-high.svg",
	"./ios-volume-low.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-volume-low.svg",
	"./ios-volume-mute.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-volume-mute.svg",
	"./ios-volume-off.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-volume-off.svg",
	"./ios-walk.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-walk.svg",
	"./ios-wallet.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-wallet.svg",
	"./ios-warning.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-warning.svg",
	"./ios-watch.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-watch.svg",
	"./ios-water.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-water.svg",
	"./ios-wifi.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-wifi.svg",
	"./ios-wine.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-wine.svg",
	"./ios-woman.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/ios-woman.svg",
	"./logo-android.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/logo-android.svg",
	"./logo-angular.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/logo-angular.svg",
	"./logo-apple.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/logo-apple.svg",
	"./logo-bitbucket.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/logo-bitbucket.svg",
	"./logo-bitcoin.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/logo-bitcoin.svg",
	"./logo-buffer.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/logo-buffer.svg",
	"./logo-chrome.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/logo-chrome.svg",
	"./logo-closed-captioning.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/logo-closed-captioning.svg",
	"./logo-codepen.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/logo-codepen.svg",
	"./logo-css3.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/logo-css3.svg",
	"./logo-designernews.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/logo-designernews.svg",
	"./logo-dribbble.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/logo-dribbble.svg",
	"./logo-dropbox.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/logo-dropbox.svg",
	"./logo-euro.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/logo-euro.svg",
	"./logo-facebook.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/logo-facebook.svg",
	"./logo-flickr.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/logo-flickr.svg",
	"./logo-foursquare.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/logo-foursquare.svg",
	"./logo-freebsd-devil.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/logo-freebsd-devil.svg",
	"./logo-game-controller-a.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/logo-game-controller-a.svg",
	"./logo-game-controller-b.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/logo-game-controller-b.svg",
	"./logo-github.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/logo-github.svg",
	"./logo-google.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/logo-google.svg",
	"./logo-googleplus.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/logo-googleplus.svg",
	"./logo-hackernews.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/logo-hackernews.svg",
	"./logo-html5.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/logo-html5.svg",
	"./logo-instagram.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/logo-instagram.svg",
	"./logo-ionic.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/logo-ionic.svg",
	"./logo-ionitron.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/logo-ionitron.svg",
	"./logo-javascript.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/logo-javascript.svg",
	"./logo-linkedin.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/logo-linkedin.svg",
	"./logo-markdown.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/logo-markdown.svg",
	"./logo-model-s.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/logo-model-s.svg",
	"./logo-no-smoking.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/logo-no-smoking.svg",
	"./logo-nodejs.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/logo-nodejs.svg",
	"./logo-npm.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/logo-npm.svg",
	"./logo-octocat.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/logo-octocat.svg",
	"./logo-pinterest.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/logo-pinterest.svg",
	"./logo-playstation.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/logo-playstation.svg",
	"./logo-polymer.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/logo-polymer.svg",
	"./logo-python.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/logo-python.svg",
	"./logo-reddit.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/logo-reddit.svg",
	"./logo-rss.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/logo-rss.svg",
	"./logo-sass.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/logo-sass.svg",
	"./logo-skype.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/logo-skype.svg",
	"./logo-slack.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/logo-slack.svg",
	"./logo-snapchat.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/logo-snapchat.svg",
	"./logo-steam.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/logo-steam.svg",
	"./logo-tumblr.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/logo-tumblr.svg",
	"./logo-tux.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/logo-tux.svg",
	"./logo-twitch.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/logo-twitch.svg",
	"./logo-twitter.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/logo-twitter.svg",
	"./logo-usd.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/logo-usd.svg",
	"./logo-vimeo.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/logo-vimeo.svg",
	"./logo-vk.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/logo-vk.svg",
	"./logo-whatsapp.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/logo-whatsapp.svg",
	"./logo-windows.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/logo-windows.svg",
	"./logo-wordpress.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/logo-wordpress.svg",
	"./logo-xbox.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/logo-xbox.svg",
	"./logo-xing.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/logo-xing.svg",
	"./logo-yahoo.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/logo-yahoo.svg",
	"./logo-yen.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/logo-yen.svg",
	"./logo-youtube.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/logo-youtube.svg",
	"./md-add-circle-outline.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-add-circle-outline.svg",
	"./md-add-circle.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-add-circle.svg",
	"./md-add.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-add.svg",
	"./md-airplane.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-airplane.svg",
	"./md-alarm.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-alarm.svg",
	"./md-albums.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-albums.svg",
	"./md-alert.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-alert.svg",
	"./md-american-football.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-american-football.svg",
	"./md-analytics.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-analytics.svg",
	"./md-aperture.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-aperture.svg",
	"./md-apps.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-apps.svg",
	"./md-appstore.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-appstore.svg",
	"./md-archive.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-archive.svg",
	"./md-arrow-back.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-arrow-back.svg",
	"./md-arrow-down.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-arrow-down.svg",
	"./md-arrow-dropdown-circle.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-arrow-dropdown-circle.svg",
	"./md-arrow-dropdown.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-arrow-dropdown.svg",
	"./md-arrow-dropleft-circle.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-arrow-dropleft-circle.svg",
	"./md-arrow-dropleft.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-arrow-dropleft.svg",
	"./md-arrow-dropright-circle.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-arrow-dropright-circle.svg",
	"./md-arrow-dropright.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-arrow-dropright.svg",
	"./md-arrow-dropup-circle.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-arrow-dropup-circle.svg",
	"./md-arrow-dropup.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-arrow-dropup.svg",
	"./md-arrow-forward.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-arrow-forward.svg",
	"./md-arrow-round-back.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-arrow-round-back.svg",
	"./md-arrow-round-down.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-arrow-round-down.svg",
	"./md-arrow-round-forward.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-arrow-round-forward.svg",
	"./md-arrow-round-up.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-arrow-round-up.svg",
	"./md-arrow-up.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-arrow-up.svg",
	"./md-at.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-at.svg",
	"./md-attach.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-attach.svg",
	"./md-backspace.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-backspace.svg",
	"./md-barcode.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-barcode.svg",
	"./md-baseball.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-baseball.svg",
	"./md-basket.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-basket.svg",
	"./md-basketball.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-basketball.svg",
	"./md-battery-charging.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-battery-charging.svg",
	"./md-battery-dead.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-battery-dead.svg",
	"./md-battery-full.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-battery-full.svg",
	"./md-beaker.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-beaker.svg",
	"./md-bed.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-bed.svg",
	"./md-beer.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-beer.svg",
	"./md-bicycle.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-bicycle.svg",
	"./md-bluetooth.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-bluetooth.svg",
	"./md-boat.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-boat.svg",
	"./md-body.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-body.svg",
	"./md-bonfire.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-bonfire.svg",
	"./md-book.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-book.svg",
	"./md-bookmark.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-bookmark.svg",
	"./md-bookmarks.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-bookmarks.svg",
	"./md-bowtie.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-bowtie.svg",
	"./md-briefcase.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-briefcase.svg",
	"./md-browsers.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-browsers.svg",
	"./md-brush.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-brush.svg",
	"./md-bug.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-bug.svg",
	"./md-build.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-build.svg",
	"./md-bulb.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-bulb.svg",
	"./md-bus.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-bus.svg",
	"./md-business.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-business.svg",
	"./md-cafe.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-cafe.svg",
	"./md-calculator.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-calculator.svg",
	"./md-calendar.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-calendar.svg",
	"./md-call.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-call.svg",
	"./md-camera.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-camera.svg",
	"./md-car.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-car.svg",
	"./md-card.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-card.svg",
	"./md-cart.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-cart.svg",
	"./md-cash.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-cash.svg",
	"./md-cellular.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-cellular.svg",
	"./md-chatboxes.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-chatboxes.svg",
	"./md-chatbubbles.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-chatbubbles.svg",
	"./md-checkbox-outline.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-checkbox-outline.svg",
	"./md-checkbox.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-checkbox.svg",
	"./md-checkmark-circle-outline.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-checkmark-circle-outline.svg",
	"./md-checkmark-circle.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-checkmark-circle.svg",
	"./md-checkmark.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-checkmark.svg",
	"./md-clipboard.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-clipboard.svg",
	"./md-clock.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-clock.svg",
	"./md-close-circle-outline.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-close-circle-outline.svg",
	"./md-close-circle.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-close-circle.svg",
	"./md-close.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-close.svg",
	"./md-cloud-circle.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-cloud-circle.svg",
	"./md-cloud-done.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-cloud-done.svg",
	"./md-cloud-download.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-cloud-download.svg",
	"./md-cloud-outline.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-cloud-outline.svg",
	"./md-cloud-upload.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-cloud-upload.svg",
	"./md-cloud.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-cloud.svg",
	"./md-cloudy-night.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-cloudy-night.svg",
	"./md-cloudy.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-cloudy.svg",
	"./md-code-download.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-code-download.svg",
	"./md-code-working.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-code-working.svg",
	"./md-code.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-code.svg",
	"./md-cog.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-cog.svg",
	"./md-color-fill.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-color-fill.svg",
	"./md-color-filter.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-color-filter.svg",
	"./md-color-palette.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-color-palette.svg",
	"./md-color-wand.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-color-wand.svg",
	"./md-compass.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-compass.svg",
	"./md-construct.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-construct.svg",
	"./md-contact.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-contact.svg",
	"./md-contacts.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-contacts.svg",
	"./md-contract.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-contract.svg",
	"./md-contrast.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-contrast.svg",
	"./md-copy.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-copy.svg",
	"./md-create.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-create.svg",
	"./md-crop.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-crop.svg",
	"./md-cube.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-cube.svg",
	"./md-cut.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-cut.svg",
	"./md-desktop.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-desktop.svg",
	"./md-disc.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-disc.svg",
	"./md-document.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-document.svg",
	"./md-done-all.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-done-all.svg",
	"./md-download.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-download.svg",
	"./md-easel.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-easel.svg",
	"./md-egg.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-egg.svg",
	"./md-exit.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-exit.svg",
	"./md-expand.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-expand.svg",
	"./md-eye-off.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-eye-off.svg",
	"./md-eye.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-eye.svg",
	"./md-fastforward.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-fastforward.svg",
	"./md-female.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-female.svg",
	"./md-filing.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-filing.svg",
	"./md-film.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-film.svg",
	"./md-finger-print.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-finger-print.svg",
	"./md-fitness.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-fitness.svg",
	"./md-flag.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-flag.svg",
	"./md-flame.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-flame.svg",
	"./md-flash-off.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-flash-off.svg",
	"./md-flash.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-flash.svg",
	"./md-flashlight.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-flashlight.svg",
	"./md-flask.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-flask.svg",
	"./md-flower.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-flower.svg",
	"./md-folder-open.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-folder-open.svg",
	"./md-folder.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-folder.svg",
	"./md-football.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-football.svg",
	"./md-funnel.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-funnel.svg",
	"./md-gift.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-gift.svg",
	"./md-git-branch.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-git-branch.svg",
	"./md-git-commit.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-git-commit.svg",
	"./md-git-compare.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-git-compare.svg",
	"./md-git-merge.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-git-merge.svg",
	"./md-git-network.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-git-network.svg",
	"./md-git-pull-request.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-git-pull-request.svg",
	"./md-glasses.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-glasses.svg",
	"./md-globe.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-globe.svg",
	"./md-grid.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-grid.svg",
	"./md-hammer.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-hammer.svg",
	"./md-hand.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-hand.svg",
	"./md-happy.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-happy.svg",
	"./md-headset.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-headset.svg",
	"./md-heart-dislike.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-heart-dislike.svg",
	"./md-heart-empty.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-heart-empty.svg",
	"./md-heart-half.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-heart-half.svg",
	"./md-heart.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-heart.svg",
	"./md-help-buoy.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-help-buoy.svg",
	"./md-help-circle-outline.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-help-circle-outline.svg",
	"./md-help-circle.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-help-circle.svg",
	"./md-help.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-help.svg",
	"./md-home.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-home.svg",
	"./md-hourglass.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-hourglass.svg",
	"./md-ice-cream.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-ice-cream.svg",
	"./md-image.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-image.svg",
	"./md-images.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-images.svg",
	"./md-infinite.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-infinite.svg",
	"./md-information-circle-outline.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-information-circle-outline.svg",
	"./md-information-circle.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-information-circle.svg",
	"./md-information.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-information.svg",
	"./md-jet.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-jet.svg",
	"./md-journal.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-journal.svg",
	"./md-key.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-key.svg",
	"./md-keypad.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-keypad.svg",
	"./md-laptop.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-laptop.svg",
	"./md-leaf.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-leaf.svg",
	"./md-link.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-link.svg",
	"./md-list-box.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-list-box.svg",
	"./md-list.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-list.svg",
	"./md-locate.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-locate.svg",
	"./md-lock.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-lock.svg",
	"./md-log-in.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-log-in.svg",
	"./md-log-out.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-log-out.svg",
	"./md-magnet.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-magnet.svg",
	"./md-mail-open.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-mail-open.svg",
	"./md-mail-unread.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-mail-unread.svg",
	"./md-mail.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-mail.svg",
	"./md-male.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-male.svg",
	"./md-man.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-man.svg",
	"./md-map.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-map.svg",
	"./md-medal.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-medal.svg",
	"./md-medical.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-medical.svg",
	"./md-medkit.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-medkit.svg",
	"./md-megaphone.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-megaphone.svg",
	"./md-menu.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-menu.svg",
	"./md-mic-off.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-mic-off.svg",
	"./md-mic.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-mic.svg",
	"./md-microphone.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-microphone.svg",
	"./md-moon.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-moon.svg",
	"./md-more.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-more.svg",
	"./md-move.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-move.svg",
	"./md-musical-note.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-musical-note.svg",
	"./md-musical-notes.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-musical-notes.svg",
	"./md-navigate.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-navigate.svg",
	"./md-notifications-off.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-notifications-off.svg",
	"./md-notifications-outline.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-notifications-outline.svg",
	"./md-notifications.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-notifications.svg",
	"./md-nuclear.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-nuclear.svg",
	"./md-nutrition.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-nutrition.svg",
	"./md-open.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-open.svg",
	"./md-options.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-options.svg",
	"./md-outlet.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-outlet.svg",
	"./md-paper-plane.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-paper-plane.svg",
	"./md-paper.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-paper.svg",
	"./md-partly-sunny.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-partly-sunny.svg",
	"./md-pause.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-pause.svg",
	"./md-paw.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-paw.svg",
	"./md-people.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-people.svg",
	"./md-person-add.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-person-add.svg",
	"./md-person.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-person.svg",
	"./md-phone-landscape.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-phone-landscape.svg",
	"./md-phone-portrait.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-phone-portrait.svg",
	"./md-photos.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-photos.svg",
	"./md-pie.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-pie.svg",
	"./md-pin.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-pin.svg",
	"./md-pint.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-pint.svg",
	"./md-pizza.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-pizza.svg",
	"./md-planet.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-planet.svg",
	"./md-play-circle.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-play-circle.svg",
	"./md-play.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-play.svg",
	"./md-podium.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-podium.svg",
	"./md-power.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-power.svg",
	"./md-pricetag.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-pricetag.svg",
	"./md-pricetags.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-pricetags.svg",
	"./md-print.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-print.svg",
	"./md-pulse.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-pulse.svg",
	"./md-qr-scanner.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-qr-scanner.svg",
	"./md-quote.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-quote.svg",
	"./md-radio-button-off.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-radio-button-off.svg",
	"./md-radio-button-on.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-radio-button-on.svg",
	"./md-radio.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-radio.svg",
	"./md-rainy.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-rainy.svg",
	"./md-recording.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-recording.svg",
	"./md-redo.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-redo.svg",
	"./md-refresh-circle.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-refresh-circle.svg",
	"./md-refresh.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-refresh.svg",
	"./md-remove-circle-outline.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-remove-circle-outline.svg",
	"./md-remove-circle.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-remove-circle.svg",
	"./md-remove.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-remove.svg",
	"./md-reorder.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-reorder.svg",
	"./md-repeat.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-repeat.svg",
	"./md-resize.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-resize.svg",
	"./md-restaurant.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-restaurant.svg",
	"./md-return-left.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-return-left.svg",
	"./md-return-right.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-return-right.svg",
	"./md-reverse-camera.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-reverse-camera.svg",
	"./md-rewind.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-rewind.svg",
	"./md-ribbon.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-ribbon.svg",
	"./md-rocket.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-rocket.svg",
	"./md-rose.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-rose.svg",
	"./md-sad.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-sad.svg",
	"./md-save.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-save.svg",
	"./md-school.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-school.svg",
	"./md-search.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-search.svg",
	"./md-send.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-send.svg",
	"./md-settings.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-settings.svg",
	"./md-share-alt.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-share-alt.svg",
	"./md-share.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-share.svg",
	"./md-shirt.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-shirt.svg",
	"./md-shuffle.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-shuffle.svg",
	"./md-skip-backward.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-skip-backward.svg",
	"./md-skip-forward.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-skip-forward.svg",
	"./md-snow.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-snow.svg",
	"./md-speedometer.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-speedometer.svg",
	"./md-square-outline.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-square-outline.svg",
	"./md-square.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-square.svg",
	"./md-star-half.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-star-half.svg",
	"./md-star-outline.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-star-outline.svg",
	"./md-star.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-star.svg",
	"./md-stats.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-stats.svg",
	"./md-stopwatch.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-stopwatch.svg",
	"./md-subway.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-subway.svg",
	"./md-sunny.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-sunny.svg",
	"./md-swap.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-swap.svg",
	"./md-switch.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-switch.svg",
	"./md-sync.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-sync.svg",
	"./md-tablet-landscape.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-tablet-landscape.svg",
	"./md-tablet-portrait.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-tablet-portrait.svg",
	"./md-tennisball.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-tennisball.svg",
	"./md-text.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-text.svg",
	"./md-thermometer.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-thermometer.svg",
	"./md-thumbs-down.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-thumbs-down.svg",
	"./md-thumbs-up.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-thumbs-up.svg",
	"./md-thunderstorm.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-thunderstorm.svg",
	"./md-time.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-time.svg",
	"./md-timer.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-timer.svg",
	"./md-today.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-today.svg",
	"./md-train.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-train.svg",
	"./md-transgender.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-transgender.svg",
	"./md-trash.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-trash.svg",
	"./md-trending-down.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-trending-down.svg",
	"./md-trending-up.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-trending-up.svg",
	"./md-trophy.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-trophy.svg",
	"./md-tv.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-tv.svg",
	"./md-umbrella.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-umbrella.svg",
	"./md-undo.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-undo.svg",
	"./md-unlock.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-unlock.svg",
	"./md-videocam.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-videocam.svg",
	"./md-volume-high.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-volume-high.svg",
	"./md-volume-low.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-volume-low.svg",
	"./md-volume-mute.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-volume-mute.svg",
	"./md-volume-off.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-volume-off.svg",
	"./md-walk.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-walk.svg",
	"./md-wallet.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-wallet.svg",
	"./md-warning.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-warning.svg",
	"./md-watch.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-watch.svg",
	"./md-water.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-water.svg",
	"./md-wifi.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-wifi.svg",
	"./md-wine.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-wine.svg",
	"./md-woman.svg": "../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg/md-woman.svg"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) { // check for number or string
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return id;
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/ionic/svg sync ./!./!../../node_modules/file-loader/dist/cjs.js?name=[name].[ext]&outputPath=svg!./ .svg$";

/***/ }),

/***/ "../../xplat/ionic/core/core.module.ts":
/*!**************************************************************************!*\
  !*** /Users/andredavcev/Projects/theory/xplat/ionic/core/core.module.ts ***!
  \**************************************************************************/
/*! exports provided: AppIonicCoreModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppIonicCoreModule", function() { return AppIonicCoreModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ionic/angular */ "../../node_modules/@ionic/angular/dist/index.js");
/* harmony import */ var _theory_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @theory/utils */ "../../libs/utils/index.ts");
/* harmony import */ var _theory_web__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @theory/web */ "../../xplat/web/index.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (undefined && undefined.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};




var AppIonicCoreModule = /** @class */ (function () {
    function AppIonicCoreModule(parentModule) {
        Object(_theory_utils__WEBPACK_IMPORTED_MODULE_2__["throwIfAlreadyLoaded"])(parentModule, 'AppIonicCoreModule');
    }
    AppIonicCoreModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_theory_web__WEBPACK_IMPORTED_MODULE_3__["AppCoreModule"], _ionic_angular__WEBPACK_IMPORTED_MODULE_1__["IonicModule"].forRoot()]
        }),
        __param(0, Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Optional"])()),
        __param(0, Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["SkipSelf"])()),
        __metadata("design:paramtypes", [AppIonicCoreModule])
    ], AppIonicCoreModule);
    return AppIonicCoreModule;
}());



/***/ }),

/***/ "../../xplat/ionic/core/index.ts":
/*!********************************************************************!*\
  !*** /Users/andredavcev/Projects/theory/xplat/ionic/core/index.ts ***!
  \********************************************************************/
/*! exports provided: AppIonicCoreModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./core.module */ "../../xplat/ionic/core/core.module.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AppIonicCoreModule", function() { return _core_module__WEBPACK_IMPORTED_MODULE_0__["AppIonicCoreModule"]; });




/***/ }),

/***/ "../../xplat/ionic/features/index.ts":
/*!************************************************************************!*\
  !*** /Users/andredavcev/Projects/theory/xplat/ionic/features/index.ts ***!
  \************************************************************************/
/*! exports provided: UIModule, UI_COMPONENTS */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ui__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ui */ "../../xplat/ionic/features/ui/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "UIModule", function() { return _ui__WEBPACK_IMPORTED_MODULE_0__["UIModule"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "UI_COMPONENTS", function() { return _ui__WEBPACK_IMPORTED_MODULE_0__["UI_COMPONENTS"]; });




/***/ }),

/***/ "../../xplat/ionic/features/ui/components/header/header.component.html":
/*!**********************************************************************************************************!*\
  !*** /Users/andredavcev/Projects/theory/xplat/ionic/features/ui/components/header/header.component.html ***!
  \**********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\n  <ion-toolbar>\n      <ion-title>\n          {{title}}\n      </ion-title>\n  </ion-toolbar>\n</ion-header>"

/***/ }),

/***/ "../../xplat/ionic/features/ui/components/header/header.component.ts":
/*!********************************************************************************************************!*\
  !*** /Users/andredavcev/Projects/theory/xplat/ionic/features/ui/components/header/header.component.ts ***!
  \********************************************************************************************************/
/*! exports provided: HeaderComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HeaderComponent", function() { return HeaderComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _theory_features__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @theory/features */ "../../libs/features/index.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var HeaderComponent = /** @class */ (function (_super) {
    __extends(HeaderComponent, _super);
    function HeaderComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HeaderComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-ion-header',
            template: __webpack_require__(/*! ./header.component.html */ "../../xplat/ionic/features/ui/components/header/header.component.html")
        })
    ], HeaderComponent);
    return HeaderComponent;
}(_theory_features__WEBPACK_IMPORTED_MODULE_1__["HeaderBaseComponent"]));



/***/ }),

/***/ "../../xplat/ionic/features/ui/components/index.ts":
/*!**************************************************************************************!*\
  !*** /Users/andredavcev/Projects/theory/xplat/ionic/features/ui/components/index.ts ***!
  \**************************************************************************************/
/*! exports provided: UI_COMPONENTS */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UI_COMPONENTS", function() { return UI_COMPONENTS; });
/* harmony import */ var _header_header_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./header/header.component */ "../../xplat/ionic/features/ui/components/header/header.component.ts");

var UI_COMPONENTS = [_header_header_component__WEBPACK_IMPORTED_MODULE_0__["HeaderComponent"]];


/***/ }),

/***/ "../../xplat/ionic/features/ui/index.ts":
/*!***************************************************************************!*\
  !*** /Users/andredavcev/Projects/theory/xplat/ionic/features/ui/index.ts ***!
  \***************************************************************************/
/*! exports provided: UIModule, UI_COMPONENTS */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components */ "../../xplat/ionic/features/ui/components/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "UI_COMPONENTS", function() { return _components__WEBPACK_IMPORTED_MODULE_0__["UI_COMPONENTS"]; });

/* harmony import */ var _ui_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ui.module */ "../../xplat/ionic/features/ui/ui.module.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "UIModule", function() { return _ui_module__WEBPACK_IMPORTED_MODULE_1__["UIModule"]; });





/***/ }),

/***/ "../../xplat/ionic/features/ui/ui.module.ts":
/*!*******************************************************************************!*\
  !*** /Users/andredavcev/Projects/theory/xplat/ionic/features/ui/ui.module.ts ***!
  \*******************************************************************************/
/*! exports provided: UIModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UIModule", function() { return UIModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ionic/angular */ "../../node_modules/@ionic/angular/dist/index.js");
/* harmony import */ var _theory_web__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @theory/web */ "../../xplat/web/index.ts");
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components */ "../../xplat/ionic/features/ui/components/index.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var MODULES = [_theory_web__WEBPACK_IMPORTED_MODULE_2__["UIModule"], _ionic_angular__WEBPACK_IMPORTED_MODULE_1__["IonicModule"]];
var UIModule = /** @class */ (function () {
    function UIModule() {
    }
    UIModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: MODULES.slice(),
            declarations: _components__WEBPACK_IMPORTED_MODULE_3__["UI_COMPONENTS"].slice(),
            exports: MODULES.concat(_components__WEBPACK_IMPORTED_MODULE_3__["UI_COMPONENTS"]),
            schemas: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["CUSTOM_ELEMENTS_SCHEMA"]]
        })
    ], UIModule);
    return UIModule;
}());



/***/ }),

/***/ "../../xplat/ionic/index.ts":
/*!***************************************************************!*\
  !*** /Users/andredavcev/Projects/theory/xplat/ionic/index.ts ***!
  \***************************************************************/
/*! exports provided: AppIonicCoreModule, UIModule, UI_COMPONENTS */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./core */ "../../xplat/ionic/core/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AppIonicCoreModule", function() { return _core__WEBPACK_IMPORTED_MODULE_0__["AppIonicCoreModule"]; });

/* harmony import */ var _features__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./features */ "../../xplat/ionic/features/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "UIModule", function() { return _features__WEBPACK_IMPORTED_MODULE_1__["UIModule"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "UI_COMPONENTS", function() { return _features__WEBPACK_IMPORTED_MODULE_1__["UI_COMPONENTS"]; });





/***/ }),

/***/ "../../xplat/web/core/base/app.base-component.ts":
/*!************************************************************************************!*\
  !*** /Users/andredavcev/Projects/theory/xplat/web/core/base/app.base-component.ts ***!
  \************************************************************************************/
/*! exports provided: AppBaseComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppBaseComponent", function() { return AppBaseComponent; });
/* harmony import */ var _theory_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @theory/core */ "../../libs/core/index.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// libs

var AppBaseComponent = /** @class */ (function (_super) {
    __extends(AppBaseComponent, _super);
    function AppBaseComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return AppBaseComponent;
}(_theory_core__WEBPACK_IMPORTED_MODULE_0__["BaseComponent"]));



/***/ }),

/***/ "../../xplat/web/core/base/index.ts":
/*!***********************************************************************!*\
  !*** /Users/andredavcev/Projects/theory/xplat/web/core/base/index.ts ***!
  \***********************************************************************/
/*! exports provided: AppBaseComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _app_base_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app.base-component */ "../../xplat/web/core/base/app.base-component.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AppBaseComponent", function() { return _app_base_component__WEBPACK_IMPORTED_MODULE_0__["AppBaseComponent"]; });




/***/ }),

/***/ "../../xplat/web/core/core.module.ts":
/*!************************************************************************!*\
  !*** /Users/andredavcev/Projects/theory/xplat/web/core/core.module.ts ***!
  \************************************************************************/
/*! exports provided: winFactory, platformLangFactory, createTranslateLoader, AppCoreModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "winFactory", function() { return winFactory; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "platformLangFactory", function() { return platformLangFactory; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createTranslateLoader", function() { return createTranslateLoader; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppCoreModule", function() { return AppCoreModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ "../../node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "../../node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ngx-translate/core */ "../../node_modules/@ngx-translate/core/fesm5/ngx-translate-core.js");
/* harmony import */ var _ngx_translate_http_loader__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ngx-translate/http-loader */ "../../node_modules/@ngx-translate/http-loader/esm5/ngx-translate-http-loader.js");
/* harmony import */ var _theory_utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @theory/utils */ "../../libs/utils/index.ts");
/* harmony import */ var _theory_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @theory/core */ "../../libs/core/index.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (undefined && undefined.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};



// libs




// bring in custom web services here...
// factories
function winFactory() {
    return window;
}
function platformLangFactory() {
    var browserLang = window.navigator.language || 'en'; // fallback English
    // browser language has 2 codes, ex: 'en-US'
    return browserLang.split('-')[0];
}
function createTranslateLoader(http) {
    return new _ngx_translate_http_loader__WEBPACK_IMPORTED_MODULE_4__["TranslateHttpLoader"](http, "/assets/i18n/", '.json');
}
var AppCoreModule = /** @class */ (function () {
    function AppCoreModule(parentModule) {
        Object(_theory_utils__WEBPACK_IMPORTED_MODULE_5__["throwIfAlreadyLoaded"])(parentModule, 'AppCoreModule');
    }
    AppCoreModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"],
                _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClientModule"],
                _theory_core__WEBPACK_IMPORTED_MODULE_6__["CoreModule"].forRoot([
                    {
                        provide: _theory_core__WEBPACK_IMPORTED_MODULE_6__["PlatformLanguageToken"],
                        useFactory: platformLangFactory
                    },
                    {
                        provide: _theory_core__WEBPACK_IMPORTED_MODULE_6__["WindowPlatformService"],
                        useFactory: winFactory
                    }
                ]),
                _ngx_translate_core__WEBPACK_IMPORTED_MODULE_3__["TranslateModule"].forRoot({
                    loader: {
                        provide: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_3__["TranslateLoader"],
                        useFactory: createTranslateLoader,
                        deps: [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"]]
                    }
                })
            ]
        }),
        __param(0, Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Optional"])()),
        __param(0, Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["SkipSelf"])()),
        __metadata("design:paramtypes", [AppCoreModule])
    ], AppCoreModule);
    return AppCoreModule;
}());



/***/ }),

/***/ "../../xplat/web/core/index.ts":
/*!******************************************************************!*\
  !*** /Users/andredavcev/Projects/theory/xplat/web/core/index.ts ***!
  \******************************************************************/
/*! exports provided: AppCoreModule, AppBaseComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base */ "../../xplat/web/core/base/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AppBaseComponent", function() { return _base__WEBPACK_IMPORTED_MODULE_0__["AppBaseComponent"]; });

/* harmony import */ var _core_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./core.module */ "../../xplat/web/core/core.module.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AppCoreModule", function() { return _core_module__WEBPACK_IMPORTED_MODULE_1__["AppCoreModule"]; });





/***/ }),

/***/ "../../xplat/web/features/index.ts":
/*!**********************************************************************!*\
  !*** /Users/andredavcev/Projects/theory/xplat/web/features/index.ts ***!
  \**********************************************************************/
/*! exports provided: UIModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ui__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ui */ "../../xplat/web/features/ui/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "UIModule", function() { return _ui__WEBPACK_IMPORTED_MODULE_0__["UIModule"]; });




/***/ }),

/***/ "../../xplat/web/features/ui/index.ts":
/*!*************************************************************************!*\
  !*** /Users/andredavcev/Projects/theory/xplat/web/features/ui/index.ts ***!
  \*************************************************************************/
/*! exports provided: UIModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ui_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ui.module */ "../../xplat/web/features/ui/ui.module.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "UIModule", function() { return _ui_module__WEBPACK_IMPORTED_MODULE_0__["UIModule"]; });




/***/ }),

/***/ "../../xplat/web/features/ui/ui.module.ts":
/*!*****************************************************************************!*\
  !*** /Users/andredavcev/Projects/theory/xplat/web/features/ui/ui.module.ts ***!
  \*****************************************************************************/
/*! exports provided: UIModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UIModule", function() { return UIModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "../../node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "../../node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "../../node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _theory_features__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @theory/features */ "../../libs/features/index.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




// libs

var MODULES = [
    _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
    _angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterModule"],
    _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"],
    _angular_forms__WEBPACK_IMPORTED_MODULE_2__["ReactiveFormsModule"],
    _theory_features__WEBPACK_IMPORTED_MODULE_4__["UISharedModule"]
];
var UIModule = /** @class */ (function () {
    function UIModule() {
    }
    UIModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: MODULES.slice(),
            exports: MODULES.slice()
        })
    ], UIModule);
    return UIModule;
}());



/***/ }),

/***/ "../../xplat/web/index.ts":
/*!*************************************************************!*\
  !*** /Users/andredavcev/Projects/theory/xplat/web/index.ts ***!
  \*************************************************************/
/*! exports provided: AppCoreModule, UIModule, AppBaseComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./core */ "../../xplat/web/core/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AppCoreModule", function() { return _core__WEBPACK_IMPORTED_MODULE_0__["AppCoreModule"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AppBaseComponent", function() { return _core__WEBPACK_IMPORTED_MODULE_0__["AppBaseComponent"]; });

/* harmony import */ var _features__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./features */ "../../xplat/web/features/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "UIModule", function() { return _features__WEBPACK_IMPORTED_MODULE_1__["UIModule"]; });





/***/ }),

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./pages/home/home.page.module": [
		"./src/app/pages/home/home.page.module.ts",
		"default~pages-home-home-page-module~pages-login-login-page-module",
		"common",
		"pages-home-home-page-module"
	],
	"./pages/login/login.page.module": [
		"./src/app/pages/login/login.page.module.ts",
		"default~pages-home-home-page-module~pages-login-login-page-module",
		"common",
		"pages-login-login-page-module"
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids) {
		return Promise.resolve().then(function() {
			var e = new Error("Cannot find module '" + req + "'");
			e.code = 'MODULE_NOT_FOUND';
			throw e;
		});
	}
	return Promise.all(ids.slice(1).map(__webpack_require__.e)).then(function() {
		var id = ids[0];
		return __webpack_require__(id);
	});
}
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";
module.exports = webpackAsyncContext;

/***/ }),

/***/ "./src/app/app-routing.module.ts":
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/*! exports provided: routes, ModuleRoutingApp */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "routes", function() { return routes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ModuleRoutingApp", function() { return ModuleRoutingApp; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "../../node_modules/@angular/router/fesm5/router.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', loadChildren: './pages/login/login.page.module#ModulePageLogin' },
    { path: 'home', loadChildren: './pages/home/home.page.module#ModulePageHome' }
];
var ModuleRoutingApp = /** @class */ (function () {
    function ModuleRoutingApp() {
    }
    ModuleRoutingApp = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forRoot(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
    ], ModuleRoutingApp);
    return ModuleRoutingApp;
}());



/***/ }),

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-app>\n    <ion-router-outlet main></ion-router-outlet>\n</ion-app>\n"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: ComponentApp */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ComponentApp", function() { return ComponentApp; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ionic/angular */ "../../node_modules/@ionic/angular/dist/index.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "../../node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "../../node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _constants_capacitor_const__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./constants/capacitor.const */ "./src/app/constants/capacitor.const.ts");
/* harmony import */ var _enums_platform_enum__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./enums/platform.enum */ "./src/app/enums/platform.enum.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var ComponentApp = /** @class */ (function () {
    function ComponentApp(platform) {
        this.platform = platform;
        this.initializeApp();
    }
    ComponentApp.prototype.initializeApp = function () {
        if (this.platform.is(_enums_platform_enum__WEBPACK_IMPORTED_MODULE_5__["PlatformEnum"].Cordova)) {
            Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["from"])(this.platform.ready()).
                pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["switchMap"])(function () { return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["from"])(_constants_capacitor_const__WEBPACK_IMPORTED_MODULE_4__["StatusBar"].show()); }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["delay"])(100)).
                subscribe(function () { return _constants_capacitor_const__WEBPACK_IMPORTED_MODULE_4__["SplashScreen"].hide(); });
        }
    };
    ComponentApp = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html")
        }),
        __metadata("design:paramtypes", [_ionic_angular__WEBPACK_IMPORTED_MODULE_1__["Platform"]])
    ], ComponentApp);
    return ComponentApp;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _core_core_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./core/core.module */ "./src/app/core/core.module.ts");
/* harmony import */ var _features_shared_shared_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./features/shared/shared.module */ "./src/app/features/shared/shared.module.ts");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app-routing.module */ "./src/app/app-routing.module.ts");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _core_core_module__WEBPACK_IMPORTED_MODULE_1__["CoreModule"],
                _features_shared_shared_module__WEBPACK_IMPORTED_MODULE_2__["SharedModule"],
                _app_routing_module__WEBPACK_IMPORTED_MODULE_3__["ModuleRoutingApp"]
            ],
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_4__["ComponentApp"]
            ],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_4__["ComponentApp"]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/constants/capacitor.const.ts":
/*!**********************************************!*\
  !*** ./src/app/constants/capacitor.const.ts ***!
  \**********************************************/
/*! exports provided: StatusBar, SplashScreen, Geolocation */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StatusBar", function() { return StatusBar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SplashScreen", function() { return SplashScreen; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Geolocation", function() { return Geolocation; });
/* harmony import */ var _capacitor_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @capacitor/core */ "./node_modules/@capacitor/core/dist/esm/index.js");

var StatusBar = _capacitor_core__WEBPACK_IMPORTED_MODULE_0__["Plugins"].StatusBar, SplashScreen = _capacitor_core__WEBPACK_IMPORTED_MODULE_0__["Plugins"].SplashScreen, Geolocation = _capacitor_core__WEBPACK_IMPORTED_MODULE_0__["Plugins"].Geolocation;


/***/ }),

/***/ "./src/app/core/core.module.ts":
/*!*************************************!*\
  !*** ./src/app/core/core.module.ts ***!
  \*************************************/
/*! exports provided: CoreModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CoreModule", function() { return CoreModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_fire__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/fire */ "../../node_modules/@angular/fire/index.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "../../node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/angular */ "../../node_modules/@ionic/angular/dist/index.js");
/* harmony import */ var _ngxs_store__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ngxs/store */ "../../node_modules/@ngxs/store/fesm5/ngxs-store.js");
/* harmony import */ var _ngxs_devtools_plugin__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ngxs/devtools-plugin */ "../../node_modules/@ngxs/devtools-plugin/fesm5/ngxs-devtools-plugin.js");
/* harmony import */ var ngx_mapbox_gl__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ngx-mapbox-gl */ "../../node_modules/ngx-mapbox-gl/fesm5/ngx-mapbox-gl.js");
/* harmony import */ var _ionic_native_globalization_ngx__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ionic-native/globalization/ngx */ "../../node_modules/@ionic-native/globalization/ngx/index.js");
/* harmony import */ var _ionic_native_firebase_ngx__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ionic-native/firebase/ngx */ "../../node_modules/@ionic-native/firebase/ngx/index.js");
/* harmony import */ var _angular_fire_auth__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/fire/auth */ "../../node_modules/@angular/fire/auth/index.js");
/* harmony import */ var _angular_fire_firestore__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/fire/firestore */ "../../node_modules/@angular/fire/firestore/index.js");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/platform-browser/animations */ "../../node_modules/@angular/platform-browser/fesm5/animations.js");
/* harmony import */ var _theory_ionic__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @theory/ionic */ "../../xplat/ionic/index.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _state_app_app_state__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../state/app/app.state */ "./src/app/state/app/app.state.ts");
/* harmony import */ var _state_language_language_state__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../state/language/language.state */ "./src/app/state/language/language.state.ts");
/* harmony import */ var _state_location_location_state__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../state/location/location.state */ "./src/app/state/location/location.state.ts");
/* harmony import */ var _state_device_device_state__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../state/device/device.state */ "./src/app/state/device/device.state.ts");
/* harmony import */ var _state_user_user_state__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../state/user/user.state */ "./src/app/state/user/user.state.ts");
/* harmony import */ var _state_notifications_notifications_state__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../state/notifications/notifications.state */ "./src/app/state/notifications/notifications.state.ts");
/* harmony import */ var _state_cluster_cluster_state__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ../state/cluster/cluster.state */ "./src/app/state/cluster/cluster.state.ts");
/* harmony import */ var _state_places_places_state__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ../state/places/places.state */ "./src/app/state/places/places.state.ts");
/* harmony import */ var _state_icons_icons_state__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ../state/icons/icons.state */ "./src/app/state/icons/icons.state.ts");
/* harmony import */ var _state_subscriptions_subscriptions_state__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ../state/subscriptions/subscriptions.state */ "./src/app/state/subscriptions/subscriptions.state.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};












//import { Pro } from '@ionic/pro';


//import { ErrorHandlerApp } from '../classes/error-handler-app.class';










/*
Pro.init('1e5146ca',
{
    appVersion: '1.0.0'
});
*/
var CoreModule = /** @class */ (function () {
    function CoreModule() {
    }
    CoreModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_11__["BrowserAnimationsModule"],
                _theory_ionic__WEBPACK_IMPORTED_MODULE_12__["AppIonicCoreModule"],
                _angular_fire__WEBPACK_IMPORTED_MODULE_1__["AngularFireModule"].initializeApp(_environments_environment__WEBPACK_IMPORTED_MODULE_13__["environment"].apis.firebase),
                _angular_fire_auth__WEBPACK_IMPORTED_MODULE_9__["AngularFireAuthModule"],
                _angular_fire_firestore__WEBPACK_IMPORTED_MODULE_10__["AngularFirestoreModule"],
                _ngxs_store__WEBPACK_IMPORTED_MODULE_4__["NgxsModule"].forRoot([
                    _state_app_app_state__WEBPACK_IMPORTED_MODULE_14__["StateApp"],
                    _state_language_language_state__WEBPACK_IMPORTED_MODULE_15__["StateLanguage"],
                    _state_location_location_state__WEBPACK_IMPORTED_MODULE_16__["StateLocation"],
                    _state_device_device_state__WEBPACK_IMPORTED_MODULE_17__["StateDevice"],
                    _state_user_user_state__WEBPACK_IMPORTED_MODULE_18__["StateUser"],
                    _state_notifications_notifications_state__WEBPACK_IMPORTED_MODULE_19__["StateNotifications"],
                    _state_cluster_cluster_state__WEBPACK_IMPORTED_MODULE_20__["StateCluster"],
                    _state_places_places_state__WEBPACK_IMPORTED_MODULE_21__["StatePlaces"],
                    _state_icons_icons_state__WEBPACK_IMPORTED_MODULE_22__["StateIcons"],
                    _state_subscriptions_subscriptions_state__WEBPACK_IMPORTED_MODULE_23__["StateSubscriptions"]
                ]),
                _ngxs_devtools_plugin__WEBPACK_IMPORTED_MODULE_5__["NgxsReduxDevtoolsPluginModule"].forRoot({ disabled: _environments_environment__WEBPACK_IMPORTED_MODULE_13__["environment"].production }),
                ngx_mapbox_gl__WEBPACK_IMPORTED_MODULE_6__["NgxMapboxGLModule"].withConfig({ accessToken: _environments_environment__WEBPACK_IMPORTED_MODULE_13__["environment"].apis.maps.accessToken })
            ],
            providers: [
                _ionic_native_globalization_ngx__WEBPACK_IMPORTED_MODULE_7__["Globalization"],
                _ionic_native_firebase_ngx__WEBPACK_IMPORTED_MODULE_8__["Firebase"],
                { provide: _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouteReuseStrategy"], useClass: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["IonicRouteStrategy"] }
                //        { provide: ErrorHandler,       useClass: ErrorHandlerApp }
            ]
        })
    ], CoreModule);
    return CoreModule;
}());



/***/ }),

/***/ "./src/app/enums/auth-provider.enum.ts":
/*!*********************************************!*\
  !*** ./src/app/enums/auth-provider.enum.ts ***!
  \*********************************************/
/*! exports provided: AuthProvider */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthProvider", function() { return AuthProvider; });
var AuthProvider;
(function (AuthProvider) {
    AuthProvider["Email"] = "password";
    AuthProvider["Phone"] = "phone";
    AuthProvider["Google"] = "google.com";
    AuthProvider["Facebook"] = "facebook.com";
    AuthProvider["Twitter"] = "twitter.com";
    AuthProvider["GitHub"] = "github.com";
})(AuthProvider || (AuthProvider = {}));


/***/ }),

/***/ "./src/app/enums/platform.enum.ts":
/*!****************************************!*\
  !*** ./src/app/enums/platform.enum.ts ***!
  \****************************************/
/*! exports provided: PlatformEnum */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlatformEnum", function() { return PlatformEnum; });
var PlatformEnum;
(function (PlatformEnum) {
    PlatformEnum["Android"] = "android";
    PlatformEnum["Cordova"] = "cordova";
    PlatformEnum["Core"] = "core";
    PlatformEnum["iOS"] = "ios";
    PlatformEnum["iPad"] = "ipad";
    PlatformEnum["iPhone"] = "iphone";
    PlatformEnum["Mobile"] = "mobile";
    PlatformEnum["MobileWeb"] = "mobileweb";
    PlatformEnum["Phablet"] = "phablet";
    PlatformEnum["Tablet"] = "tablet";
    PlatformEnum["Windows"] = "windows"; // Device running Windows
})(PlatformEnum || (PlatformEnum = {}));


/***/ }),

/***/ "./src/app/features/shared/shared.module.ts":
/*!**************************************************!*\
  !*** ./src/app/features/shared/shared.module.ts ***!
  \**************************************************/
/*! exports provided: SharedModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SharedModule", function() { return SharedModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _theory_ionic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @theory/ionic */ "../../xplat/ionic/index.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var MODULES = [
    _theory_ionic__WEBPACK_IMPORTED_MODULE_1__["UIModule"]
];
var SharedModule = /** @class */ (function () {
    function SharedModule() {
    }
    SharedModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: MODULES.slice(),
            exports: MODULES.slice()
        })
    ], SharedModule);
    return SharedModule;
}());



/***/ }),

/***/ "./src/app/forms/cluster.form.ts":
/*!***************************************!*\
  !*** ./src/app/forms/cluster.form.ts ***!
  \***************************************/
/*! exports provided: FormCluster */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FormCluster", function() { return FormCluster; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "../../node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _validators_extended_validators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../validators/extended.validators */ "./src/app/validators/extended.validators.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var FormCluster = /** @class */ (function () {
    function FormCluster(formBuilder) {
        this.formBuilder = formBuilder;
    }
    FormCluster.prototype.build = function (cluster) {
        return this.buildFrom(cluster == null ? this.empty() : cluster);
    };
    FormCluster.prototype.empty = function () {
        return {
            draft: true,
            name: null,
            tagline: null,
            description: null,
            icon: null,
            photo: null,
            categories: '',
            private: true,
            locations: []
        };
    };
    FormCluster.prototype.buildFrom = function (cluster) {
        var formGroup = this.formBuilder.group({
            draft: cluster.draft,
            name: [cluster.name, _validators_extended_validators__WEBPACK_IMPORTED_MODULE_2__["ValidatorsExtended"].minLength(1)],
            tagline: [cluster.tagline, _validators_extended_validators__WEBPACK_IMPORTED_MODULE_2__["ValidatorsExtended"].minLength(1)],
            description: [cluster.description, _validators_extended_validators__WEBPACK_IMPORTED_MODULE_2__["ValidatorsExtended"].minLength(1)],
            icon: [cluster.icon, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            photo: [cluster.photo, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            categories: [cluster.categories, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].minLength(1)],
            private: cluster.private,
            locations: this.formBuilder.array(cluster.locations, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].minLength(1))
        });
        return formGroup;
    };
    FormCluster.prototype.addLocation = function (formGroup) {
    };
    FormCluster = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({ providedIn: 'root' }),
        __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"]])
    ], FormCluster);
    return FormCluster;
}());



/***/ }),

/***/ "./src/app/forms/icon.form.ts":
/*!************************************!*\
  !*** ./src/app/forms/icon.form.ts ***!
  \************************************/
/*! exports provided: FormIcon */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FormIcon", function() { return FormIcon; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "../../node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _validators_extended_validators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../validators/extended.validators */ "./src/app/validators/extended.validators.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var FormIcon = /** @class */ (function () {
    function FormIcon(formBuilder) {
        this.formBuilder = formBuilder;
    }
    FormIcon.prototype.build = function (icon) {
        return this.buildFrom(icon == null ? this.empty() : icon);
    };
    FormIcon.prototype.empty = function () {
        return {
            draft: true,
            name: null,
            description: null,
            url: null,
            private: true
        };
    };
    FormIcon.prototype.buildFrom = function (icon) {
        var formGroup = this.formBuilder.group({
            draft: icon.draft,
            name: [icon.name, _validators_extended_validators__WEBPACK_IMPORTED_MODULE_2__["ValidatorsExtended"].minLength(1)],
            description: [icon.description, _validators_extended_validators__WEBPACK_IMPORTED_MODULE_2__["ValidatorsExtended"].minLength(1)],
            private: icon.private,
            url: [icon.url, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]
        });
        return formGroup;
    };
    FormIcon = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({ providedIn: 'root' }),
        __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"]])
    ], FormIcon);
    return FormIcon;
}());



/***/ }),

/***/ "./src/app/services/cluster.service.ts":
/*!*********************************************!*\
  !*** ./src/app/services/cluster.service.ts ***!
  \*********************************************/
/*! exports provided: ServiceCluster */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ServiceCluster", function() { return ServiceCluster; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_fire_firestore__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/fire/firestore */ "../../node_modules/@angular/fire/firestore/index.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "../../node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "../../node_modules/rxjs/_esm5/operators/index.js");
var __assign = (undefined && undefined.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ServiceCluster = /** @class */ (function () {
    function ServiceCluster(afs) {
        this.afs = afs;
        this.clustersCollection = afs.collection('clusters');
    }
    ServiceCluster.prototype.getClusters = function (userid) {
        return this.afs.collection('clusters', function (ref) {
            return ref.where('userid', '==', userid);
        })
            .snapshotChanges()
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (actions) {
            return actions.map(function (a) {
                var data = a.payload.doc.data();
                var id = a.payload.doc.id;
                return __assign({ id: id }, data);
            });
        }));
    };
    ServiceCluster.prototype.updateCluster = function () {
    };
    ServiceCluster.prototype.setCluster = function (cluster) {
        var id = this.afs.createId();
        cluster.id = id;
        var document = this.clustersCollection.doc(id);
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["from"])(document.set(cluster)).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["switchMap"])(function () { return document.valueChanges(); }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["filter"])(function (cluster) { return cluster.dateCreated != null; }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["take"])(1));
    };
    ServiceCluster = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({ providedIn: 'root' }),
        __metadata("design:paramtypes", [_angular_fire_firestore__WEBPACK_IMPORTED_MODULE_1__["AngularFirestore"]])
    ], ServiceCluster);
    return ServiceCluster;
}());



/***/ }),

/***/ "./src/app/services/icon.service.ts":
/*!******************************************!*\
  !*** ./src/app/services/icon.service.ts ***!
  \******************************************/
/*! exports provided: ServiceIcon */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ServiceIcon", function() { return ServiceIcon; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_fire_firestore__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/fire/firestore */ "../../node_modules/@angular/fire/firestore/index.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "../../node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "../../node_modules/rxjs/_esm5/operators/index.js");
var __assign = (undefined && undefined.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ServiceIcon = /** @class */ (function () {
    function ServiceIcon(firestore) {
        this.firestore = firestore;
        this.icons = firestore.collection('icons');
    }
    ServiceIcon.prototype.get = function (userId) {
        return this.firestore.collection('icons', function (ref) {
            return ref.where('userid', '==', userId);
        }).
            snapshotChanges().
            pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (actions) {
            return actions.map(function (action) {
                var data = action.payload.doc.data();
                var id = action.payload.doc.id;
                return __assign({ id: id }, data);
            });
        }));
    };
    ServiceIcon.prototype.update = function () {
    };
    ServiceIcon.prototype.set = function (icon) {
        var id = this.firestore.createId();
        icon.id = id;
        var document = this.icons.doc(id);
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["from"])(document.set(icon)).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["switchMap"])(function () { return document.valueChanges(); }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["filter"])(function (icon) { return icon.dateCreated != null; }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["take"])(1));
    };
    ServiceIcon = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({ providedIn: 'root' }),
        __metadata("design:paramtypes", [_angular_fire_firestore__WEBPACK_IMPORTED_MODULE_1__["AngularFirestore"]])
    ], ServiceIcon);
    return ServiceIcon;
}());



/***/ }),

/***/ "./src/app/services/notifications.service.ts":
/*!***************************************************!*\
  !*** ./src/app/services/notifications.service.ts ***!
  \***************************************************/
/*! exports provided: ServiceNotifications */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ServiceNotifications", function() { return ServiceNotifications; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "../../node_modules/rxjs/_esm5/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ServiceNotifications = /** @class */ (function () {
    function ServiceNotifications() {
    }
    ServiceNotifications.prototype.get = function () {
        var notifications = [
            {
                image: 'assets/images/temp-notifications-rusted.root.jpg',
                title: 'Rusted Root',
                body: "Sahlen's Music Stage",
                read: false,
                date: 'May 12, 2017 at 7:00pm'
            },
            {
                image: 'assets/images/temp-notifications-foster.the.people.jpg',
                title: 'Foster The People',
                body: "Ommegang Brewery Cooperstown",
                read: false,
                date: 'June 10, 2017 at 7:00pm'
            },
            {
                image: 'assets/images/temp-notifications-blondie.jpg',
                title: 'Blondie',
                body: "Artpark",
                read: false,
                date: 'July 25, 2016 at 6:30pm'
            }
        ];
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["of"])(notifications);
    };
    ServiceNotifications = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({ providedIn: 'root' }),
        __metadata("design:paramtypes", [])
    ], ServiceNotifications);
    return ServiceNotifications;
}());



/***/ }),

/***/ "./src/app/services/subscriptions.service.ts":
/*!***************************************************!*\
  !*** ./src/app/services/subscriptions.service.ts ***!
  \***************************************************/
/*! exports provided: ServiceSubscriptions */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ServiceSubscriptions", function() { return ServiceSubscriptions; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "../../node_modules/rxjs/_esm5/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ServiceSubscriptions = /** @class */ (function () {
    function ServiceSubscriptions() {
    }
    ServiceSubscriptions.prototype.get = function () {
        var subscriptions = [
            {
                name: 'Pokemon Go Rochester Nests',
                tagline: 'Get alerts for all your favorite Pokemon nests',
                description: '',
                icon: 'assets/icons/temp-icon.java.1.png',
                photo: 'assets/images/temp-subscriptions-pokemon-go.jpg',
                categories: '',
                private: false,
                locations: [],
                subscribed: true,
                draft: false,
                userId: ''
            },
            {
                name: 'Lilac Festival',
                tagline: 'Alerts about all the Lilac Festival events and activities',
                description: '',
                icon: 'assets/icons/temp-icon.java.2.png',
                photo: 'assets/images/temp-subscriptions-lilac-festival.jpg',
                categories: '',
                private: false,
                locations: [],
                subscribed: false,
                draft: false,
                userId: ''
            },
            {
                name: 'Music Festivals Rochester',
                tagline: 'Get alerts about Rochester music festivals',
                description: '',
                icon: 'assets/icons/temp-icon.java.3.png',
                photo: 'assets/images/temp-subscriptions-lollapalooza.png',
                categories: '',
                private: false,
                locations: [],
                subscribed: false,
                draft: false,
                userId: ''
            }
        ];
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["of"])(subscriptions);
    };
    ServiceSubscriptions = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({ providedIn: 'root' }),
        __metadata("design:paramtypes", [])
    ], ServiceSubscriptions);
    return ServiceSubscriptions;
}());



/***/ }),

/***/ "./src/app/state/alert/alert.actions.ts":
/*!**********************************************!*\
  !*** ./src/app/state/alert/alert.actions.ts ***!
  \**********************************************/
/*! exports provided: ActionsAlerts, AlertsGet */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ActionsAlerts", function() { return ActionsAlerts; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AlertsGet", function() { return AlertsGet; });
var ActionsAlerts;
(function (ActionsAlerts) {
    ActionsAlerts["AlertsGet"] = "[Alerts] Alerts Get";
})(ActionsAlerts || (ActionsAlerts = {}));
var AlertsGet = /** @class */ (function () {
    function AlertsGet() {
    }
    AlertsGet.type = ActionsAlerts.AlertsGet;
    return AlertsGet;
}());



/***/ }),

/***/ "./src/app/state/app/app.state.ts":
/*!****************************************!*\
  !*** ./src/app/state/app/app.state.ts ***!
  \****************************************/
/*! exports provided: StateApp */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StateApp", function() { return StateApp; });
/* harmony import */ var _ngxs_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ngxs/store */ "../../node_modules/@ngxs/store/fesm5/ngxs-store.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var StateApp = /** @class */ (function () {
    function StateApp() {
    }
    StateApp = __decorate([
        Object(_ngxs_store__WEBPACK_IMPORTED_MODULE_0__["State"])({
            name: 'app',
            defaults: {}
        }),
        __metadata("design:paramtypes", [])
    ], StateApp);
    return StateApp;
}());



/***/ }),

/***/ "./src/app/state/cluster/cluster.actions.ts":
/*!**************************************************!*\
  !*** ./src/app/state/cluster/cluster.actions.ts ***!
  \**************************************************/
/*! exports provided: ActionsCluster, GetClusters, SetClusterId, SetCluster */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ActionsCluster", function() { return ActionsCluster; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GetClusters", function() { return GetClusters; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SetClusterId", function() { return SetClusterId; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SetCluster", function() { return SetCluster; });
var ActionsCluster;
(function (ActionsCluster) {
    ActionsCluster["GetClusters"] = "[Cluster] Get Clusters";
    ActionsCluster["SetClusterId"] = "[Cluster] Set Cluster Id";
    ActionsCluster["SetCluster"] = "[Cluster] Set Cluster";
})(ActionsCluster || (ActionsCluster = {}));
var GetClusters = /** @class */ (function () {
    function GetClusters() {
    }
    GetClusters.type = ActionsCluster.GetClusters;
    return GetClusters;
}());

var SetClusterId = /** @class */ (function () {
    function SetClusterId(payload) {
        this.payload = payload;
    }
    SetClusterId.type = ActionsCluster.SetClusterId;
    return SetClusterId;
}());

var SetCluster = /** @class */ (function () {
    function SetCluster(payload) {
        this.payload = payload;
    }
    SetCluster.type = ActionsCluster.SetCluster;
    return SetCluster;
}());



/***/ }),

/***/ "./src/app/state/cluster/cluster.state.ts":
/*!************************************************!*\
  !*** ./src/app/state/cluster/cluster.state.ts ***!
  \************************************************/
/*! exports provided: StateCluster */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StateCluster", function() { return StateCluster; });
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs/operators */ "../../node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "../../node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _ngxs_store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ngxs/store */ "../../node_modules/@ngxs/store/fesm5/ngxs-store.js");
/* harmony import */ var _user_user_state__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../user/user.state */ "./src/app/state/user/user.state.ts");
/* harmony import */ var _cluster_actions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./cluster.actions */ "./src/app/state/cluster/cluster.actions.ts");
/* harmony import */ var _services_cluster_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../services/cluster.service */ "./src/app/services/cluster.service.ts");
/* harmony import */ var _forms_cluster_form__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../forms/cluster.form */ "./src/app/forms/cluster.form.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var StateCluster = /** @class */ (function () {
    function StateCluster(clusterService, formCluster) {
        this.clusterService = clusterService;
        this.formCluster = formCluster;
    }
    StateCluster.entities = function (state) { return state.entities; };
    StateCluster.id = function (state) { return state.id; };
    StateCluster.form = function (state) { return state.form; };
    StateCluster.clusters = function (state) { return Object.keys(state.entities).map(function (id) { return state.entities[id]; }); };
    StateCluster.entity = function (state) { return state.entities[state.id]; };
    StateCluster.prototype.getClusters = function (_a) {
        var _this = this;
        var patchState = _a.patchState;
        return this.user$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["map"])(function (user) { return user.uidInternal; }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["switchMap"])(function (uidInternal) {
            return _this.clusterService
                .getClusters(uidInternal)
                .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["map"])(function (clusters) {
                var entities = {};
                for (var _i = 0, clusters_1 = clusters; _i < clusters_1.length; _i++) {
                    var cluster = clusters_1[_i];
                    entities[cluster.id] = cluster;
                }
                patchState({
                    entities: entities
                });
            }));
        }));
    };
    StateCluster.prototype.setClusterId = function (_a, _b) {
        var patchState = _a.patchState, getState = _a.getState;
        var payload = _b.payload;
        var id = payload;
        var state = getState();
        patchState({
            id: id,
            form: id === 'new' ? this.formCluster.build() : this.formCluster.build(state.entities[id])
        });
    };
    StateCluster.prototype.setCluster = function (_a, _b) {
        var patchState = _a.patchState, dispatch = _a.dispatch;
        var payload = _b.payload;
        return this.clusterService
            .setCluster(payload)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["map"])(function (cluster) {
            var entities = {};
            entities[cluster.id] = cluster;
            patchState({ entities: entities });
        }));
    };
    __decorate([
        Object(_ngxs_store__WEBPACK_IMPORTED_MODULE_2__["Select"])(_user_user_state__WEBPACK_IMPORTED_MODULE_3__["StateUser"].user),
        __metadata("design:type", rxjs__WEBPACK_IMPORTED_MODULE_1__["Observable"])
    ], StateCluster.prototype, "user$", void 0);
    __decorate([
        Object(_ngxs_store__WEBPACK_IMPORTED_MODULE_2__["Action"])(_cluster_actions__WEBPACK_IMPORTED_MODULE_4__["GetClusters"]),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], StateCluster.prototype, "getClusters", null);
    __decorate([
        Object(_ngxs_store__WEBPACK_IMPORTED_MODULE_2__["Action"])(_cluster_actions__WEBPACK_IMPORTED_MODULE_4__["SetClusterId"]),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, _cluster_actions__WEBPACK_IMPORTED_MODULE_4__["SetClusterId"]]),
        __metadata("design:returntype", void 0)
    ], StateCluster.prototype, "setClusterId", null);
    __decorate([
        Object(_ngxs_store__WEBPACK_IMPORTED_MODULE_2__["Action"])(_cluster_actions__WEBPACK_IMPORTED_MODULE_4__["SetCluster"]),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, _cluster_actions__WEBPACK_IMPORTED_MODULE_4__["SetCluster"]]),
        __metadata("design:returntype", void 0)
    ], StateCluster.prototype, "setCluster", null);
    __decorate([
        Object(_ngxs_store__WEBPACK_IMPORTED_MODULE_2__["Selector"])(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], StateCluster, "entities", null);
    __decorate([
        Object(_ngxs_store__WEBPACK_IMPORTED_MODULE_2__["Selector"])(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], StateCluster, "id", null);
    __decorate([
        Object(_ngxs_store__WEBPACK_IMPORTED_MODULE_2__["Selector"])(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], StateCluster, "form", null);
    __decorate([
        Object(_ngxs_store__WEBPACK_IMPORTED_MODULE_2__["Selector"])(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], StateCluster, "clusters", null);
    __decorate([
        Object(_ngxs_store__WEBPACK_IMPORTED_MODULE_2__["Selector"])(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], StateCluster, "entity", null);
    StateCluster = __decorate([
        Object(_ngxs_store__WEBPACK_IMPORTED_MODULE_2__["State"])({
            name: 'cluster',
            defaults: {
                id: undefined,
                form: undefined,
                entities: {}
            }
        }),
        __metadata("design:paramtypes", [_services_cluster_service__WEBPACK_IMPORTED_MODULE_5__["ServiceCluster"], _forms_cluster_form__WEBPACK_IMPORTED_MODULE_6__["FormCluster"]])
    ], StateCluster);
    return StateCluster;
}());



/***/ }),

/***/ "./src/app/state/device/device.actions.ts":
/*!************************************************!*\
  !*** ./src/app/state/device/device.actions.ts ***!
  \************************************************/
/*! exports provided: ActionsDevice, DeviceInitialize */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ActionsDevice", function() { return ActionsDevice; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DeviceInitialize", function() { return DeviceInitialize; });
var ActionsDevice;
(function (ActionsDevice) {
    ActionsDevice["DeviceInitialize"] = "[Device] Device Initialize";
})(ActionsDevice || (ActionsDevice = {}));
var DeviceInitialize = /** @class */ (function () {
    function DeviceInitialize() {
    }
    DeviceInitialize.type = ActionsDevice.DeviceInitialize;
    return DeviceInitialize;
}());



/***/ }),

/***/ "./src/app/state/device/device.state.ts":
/*!**********************************************!*\
  !*** ./src/app/state/device/device.state.ts ***!
  \**********************************************/
/*! exports provided: StateDevice */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StateDevice", function() { return StateDevice; });
/* harmony import */ var _ngxs_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ngxs/store */ "../../node_modules/@ngxs/store/fesm5/ngxs-store.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ionic/angular */ "../../node_modules/@ionic/angular/dist/index.js");
/* harmony import */ var _device_actions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./device.actions */ "./src/app/state/device/device.actions.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var StateDevice = /** @class */ (function () {
    function StateDevice(platform) {
        this.platform = platform;
    }
    StateDevice.loading = function (state) { return state.loading; };
    StateDevice.device = function (state) { return this.device; };
    StateDevice.web = function (state) { return !this.device; };
    StateDevice.android = function (state) { return this.android; };
    StateDevice.ios = function (state) { return this.ios; };
    StateDevice.prototype.ngxsOnInit = function (context) {
        context.dispatch(new _device_actions__WEBPACK_IMPORTED_MODULE_2__["DeviceInitialize"]());
    };
    StateDevice.prototype.deviceInitialize = function (_a) {
        var patchState = _a.patchState;
        patchState({
            device: this.platform.is('cordova'),
            ios: this.platform.is('ios'),
            android: this.platform.is('android'),
        });
    };
    __decorate([
        Object(_ngxs_store__WEBPACK_IMPORTED_MODULE_0__["Action"])(_device_actions__WEBPACK_IMPORTED_MODULE_2__["DeviceInitialize"]),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], StateDevice.prototype, "deviceInitialize", null);
    __decorate([
        Object(_ngxs_store__WEBPACK_IMPORTED_MODULE_0__["Selector"])(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], StateDevice, "loading", null);
    __decorate([
        Object(_ngxs_store__WEBPACK_IMPORTED_MODULE_0__["Selector"])(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], StateDevice, "device", null);
    __decorate([
        Object(_ngxs_store__WEBPACK_IMPORTED_MODULE_0__["Selector"])(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], StateDevice, "web", null);
    __decorate([
        Object(_ngxs_store__WEBPACK_IMPORTED_MODULE_0__["Selector"])(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], StateDevice, "android", null);
    __decorate([
        Object(_ngxs_store__WEBPACK_IMPORTED_MODULE_0__["Selector"])(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], StateDevice, "ios", null);
    StateDevice = __decorate([
        Object(_ngxs_store__WEBPACK_IMPORTED_MODULE_0__["State"])({
            name: 'device',
            defaults: {
                loading: false,
                device: false,
                ios: false,
                android: false
            }
        }),
        __metadata("design:paramtypes", [_ionic_angular__WEBPACK_IMPORTED_MODULE_1__["Platform"]])
    ], StateDevice);
    return StateDevice;
}());



/***/ }),

/***/ "./src/app/state/icons/icons.actions.ts":
/*!**********************************************!*\
  !*** ./src/app/state/icons/icons.actions.ts ***!
  \**********************************************/
/*! exports provided: ActionsIcons, GetIcons, SetIconId, SetIcon */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ActionsIcons", function() { return ActionsIcons; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GetIcons", function() { return GetIcons; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SetIconId", function() { return SetIconId; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SetIcon", function() { return SetIcon; });
var ActionsIcons;
(function (ActionsIcons) {
    ActionsIcons["GetIcons"] = "[Icons] Get Icons";
    ActionsIcons["SetIconId"] = "[Icons] Set Icon Id";
    ActionsIcons["SetIcon"] = "[Icons] Set Icon";
})(ActionsIcons || (ActionsIcons = {}));
var GetIcons = /** @class */ (function () {
    function GetIcons() {
    }
    GetIcons.type = ActionsIcons.GetIcons;
    return GetIcons;
}());

var SetIconId = /** @class */ (function () {
    function SetIconId(payload) {
        this.payload = payload;
    }
    SetIconId.type = ActionsIcons.SetIconId;
    return SetIconId;
}());

var SetIcon = /** @class */ (function () {
    function SetIcon(payload) {
        this.payload = payload;
    }
    SetIcon.type = ActionsIcons.SetIcon;
    return SetIcon;
}());



/***/ }),

/***/ "./src/app/state/icons/icons.state.ts":
/*!********************************************!*\
  !*** ./src/app/state/icons/icons.state.ts ***!
  \********************************************/
/*! exports provided: StateIcons */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StateIcons", function() { return StateIcons; });
/* harmony import */ var _ngxs_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ngxs/store */ "../../node_modules/@ngxs/store/fesm5/ngxs-store.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "../../node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "../../node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _services_icon_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../services/icon.service */ "./src/app/services/icon.service.ts");
/* harmony import */ var _icons_actions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./icons.actions */ "./src/app/state/icons/icons.actions.ts");
/* harmony import */ var _forms_icon_form__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../forms/icon.form */ "./src/app/forms/icon.form.ts");
/* harmony import */ var _user_user_state__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../user/user.state */ "./src/app/state/user/user.state.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var StateIcons = /** @class */ (function () {
    function StateIcons(serviceIcons, formIcon) {
        this.serviceIcons = serviceIcons;
        this.formIcon = formIcon;
    }
    StateIcons.entities = function (state) { return state.entities; };
    StateIcons.id = function (state) { return state.id; };
    StateIcons.form = function (state) { return state.form; };
    StateIcons.clusters = function (state) { return Object.keys(state.entities).map(function (id) { return state.entities[id]; }); };
    StateIcons.entity = function (state) { return state.entities[state.id]; };
    StateIcons.prototype.getClusters = function (_a) {
        var _this = this;
        var patchState = _a.patchState, dispatch = _a.dispatch;
        return this.user$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(function (user) { return user.uidInternal; }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["switchMap"])(function (uidInternal) {
            return _this.serviceIcons.
                get(uidInternal).
                pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(function (icons) {
                var entities = {};
                for (var _i = 0, icons_1 = icons; _i < icons_1.length; _i++) {
                    var icon = icons_1[_i];
                    entities[icon.id] = icon;
                }
                patchState({ entities: entities });
            }));
        }));
    };
    StateIcons.prototype.setClusterId = function (_a, _b) {
        var patchState = _a.patchState, getState = _a.getState;
        var payload = _b.payload;
        var id = payload;
        var state = getState();
        patchState({
            id: id,
            form: id === 'new' ? this.formIcon.build() : this.formIcon.build(state.entities[id])
        });
    };
    StateIcons.prototype.setCluster = function (_a, _b) {
        var patchState = _a.patchState, dispatch = _a.dispatch;
        var payload = _b.payload;
        return this.serviceIcons.
            set(payload).
            pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(function (icon) {
            var entities = {};
            entities[icon.id] = icon;
            patchState({ entities: entities });
        }));
    };
    __decorate([
        Object(_ngxs_store__WEBPACK_IMPORTED_MODULE_0__["Select"])(_user_user_state__WEBPACK_IMPORTED_MODULE_6__["StateUser"].user),
        __metadata("design:type", rxjs__WEBPACK_IMPORTED_MODULE_1__["Observable"])
    ], StateIcons.prototype, "user$", void 0);
    __decorate([
        Object(_ngxs_store__WEBPACK_IMPORTED_MODULE_0__["Action"])(_icons_actions__WEBPACK_IMPORTED_MODULE_4__["GetIcons"]),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], StateIcons.prototype, "getClusters", null);
    __decorate([
        Object(_ngxs_store__WEBPACK_IMPORTED_MODULE_0__["Action"])(_icons_actions__WEBPACK_IMPORTED_MODULE_4__["SetIconId"]),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, _icons_actions__WEBPACK_IMPORTED_MODULE_4__["SetIconId"]]),
        __metadata("design:returntype", void 0)
    ], StateIcons.prototype, "setClusterId", null);
    __decorate([
        Object(_ngxs_store__WEBPACK_IMPORTED_MODULE_0__["Action"])(_icons_actions__WEBPACK_IMPORTED_MODULE_4__["SetIcon"]),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, _icons_actions__WEBPACK_IMPORTED_MODULE_4__["SetIcon"]]),
        __metadata("design:returntype", void 0)
    ], StateIcons.prototype, "setCluster", null);
    __decorate([
        Object(_ngxs_store__WEBPACK_IMPORTED_MODULE_0__["Selector"])(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], StateIcons, "entities", null);
    __decorate([
        Object(_ngxs_store__WEBPACK_IMPORTED_MODULE_0__["Selector"])(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], StateIcons, "id", null);
    __decorate([
        Object(_ngxs_store__WEBPACK_IMPORTED_MODULE_0__["Selector"])(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], StateIcons, "form", null);
    __decorate([
        Object(_ngxs_store__WEBPACK_IMPORTED_MODULE_0__["Selector"])(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], StateIcons, "clusters", null);
    __decorate([
        Object(_ngxs_store__WEBPACK_IMPORTED_MODULE_0__["Selector"])(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], StateIcons, "entity", null);
    StateIcons = __decorate([
        Object(_ngxs_store__WEBPACK_IMPORTED_MODULE_0__["State"])({
            name: 'icons',
            defaults: {
                id: undefined,
                form: undefined,
                entities: {}
            }
        }),
        __metadata("design:paramtypes", [_services_icon_service__WEBPACK_IMPORTED_MODULE_3__["ServiceIcon"], _forms_icon_form__WEBPACK_IMPORTED_MODULE_5__["FormIcon"]])
    ], StateIcons);
    return StateIcons;
}());



/***/ }),

/***/ "./src/app/state/language/language.actions.ts":
/*!****************************************************!*\
  !*** ./src/app/state/language/language.actions.ts ***!
  \****************************************************/
/*! exports provided: ActionsLanguage, LanguageInitialize, LanguageGet, LanguageSet */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ActionsLanguage", function() { return ActionsLanguage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LanguageInitialize", function() { return LanguageInitialize; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LanguageGet", function() { return LanguageGet; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LanguageSet", function() { return LanguageSet; });
var ActionsLanguage;
(function (ActionsLanguage) {
    ActionsLanguage["LanguageInitialize"] = "[Language] Language Initialize";
    ActionsLanguage["LanguageGet"] = "[Language] Language Get";
    ActionsLanguage["LanguageSet"] = "[Language] Language Set";
})(ActionsLanguage || (ActionsLanguage = {}));
var LanguageInitialize = /** @class */ (function () {
    function LanguageInitialize() {
    }
    LanguageInitialize.type = ActionsLanguage.LanguageInitialize;
    return LanguageInitialize;
}());

var LanguageGet = /** @class */ (function () {
    function LanguageGet() {
    }
    LanguageGet.type = ActionsLanguage.LanguageGet;
    return LanguageGet;
}());

var LanguageSet = /** @class */ (function () {
    function LanguageSet(payload) {
        this.payload = payload;
    }
    LanguageSet.type = ActionsLanguage.LanguageSet;
    return LanguageSet;
}());



/***/ }),

/***/ "./src/app/state/language/language.state.ts":
/*!**************************************************!*\
  !*** ./src/app/state/language/language.state.ts ***!
  \**************************************************/
/*! exports provided: StateLanguage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StateLanguage", function() { return StateLanguage; });
/* harmony import */ var _ngxs_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ngxs/store */ "../../node_modules/@ngxs/store/fesm5/ngxs-store.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ionic/angular */ "../../node_modules/@ionic/angular/dist/index.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "../../node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "../../node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ngx-translate/core */ "../../node_modules/@ngx-translate/core/fesm5/ngx-translate-core.js");
/* harmony import */ var _ionic_native_globalization_ngx__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic-native/globalization/ngx */ "../../node_modules/@ionic-native/globalization/ngx/index.js");
/* harmony import */ var _enums_platform_enum__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../enums/platform.enum */ "./src/app/enums/platform.enum.ts");
/* harmony import */ var _language_actions__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./language.actions */ "./src/app/state/language/language.actions.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var StateLanguage = /** @class */ (function () {
    function StateLanguage(globalization, platform, translate) {
        this.globalization = globalization;
        this.platform = platform;
        this.translate = translate;
    }
    StateLanguage.language = function (state) { return state.language; };
    StateLanguage.error = function (state) { return state.error; };
    StateLanguage.errored = function (state) { return state.error != null; };
    StateLanguage.prototype.ngxsOnInit = function (context) {
        context.dispatch(new _language_actions__WEBPACK_IMPORTED_MODULE_7__["LanguageInitialize"]());
    };
    StateLanguage.prototype.languageInitialize = function () {
        this.translate.setDefaultLang('en');
    };
    StateLanguage.prototype.languageGet = function (_a) {
        var patchState = _a.patchState, dispatch = _a.dispatch;
        var observable;
        if (this.platform.is(_enums_platform_enum__WEBPACK_IMPORTED_MODULE_6__["PlatformEnum"].Cordova)) {
            observable = Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["from"])(this.globalization.getLocaleName());
        }
        else {
            observable = Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["of"])({ value: navigator.language });
        }
        return observable.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["switchMap"])(function (language) { return dispatch(new _language_actions__WEBPACK_IMPORTED_MODULE_7__["LanguageSet"](language.value)); }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(function (error) { return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["of"])(patchState({ error: error })); }));
    };
    StateLanguage.prototype.languageSet = function (_a, _b) {
        var patchState = _a.patchState;
        var payload = _b.payload;
        var language = payload;
        this.translate.use(language);
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["of"])(patchState({ language: language }));
    };
    __decorate([
        Object(_ngxs_store__WEBPACK_IMPORTED_MODULE_0__["Action"])(_language_actions__WEBPACK_IMPORTED_MODULE_7__["LanguageInitialize"]),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], StateLanguage.prototype, "languageInitialize", null);
    __decorate([
        Object(_ngxs_store__WEBPACK_IMPORTED_MODULE_0__["Action"])(_language_actions__WEBPACK_IMPORTED_MODULE_7__["LanguageGet"]),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], StateLanguage.prototype, "languageGet", null);
    __decorate([
        Object(_ngxs_store__WEBPACK_IMPORTED_MODULE_0__["Action"])(_language_actions__WEBPACK_IMPORTED_MODULE_7__["LanguageSet"]),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, _language_actions__WEBPACK_IMPORTED_MODULE_7__["LanguageSet"]]),
        __metadata("design:returntype", void 0)
    ], StateLanguage.prototype, "languageSet", null);
    __decorate([
        Object(_ngxs_store__WEBPACK_IMPORTED_MODULE_0__["Selector"])(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], StateLanguage, "language", null);
    __decorate([
        Object(_ngxs_store__WEBPACK_IMPORTED_MODULE_0__["Selector"])(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], StateLanguage, "error", null);
    __decorate([
        Object(_ngxs_store__WEBPACK_IMPORTED_MODULE_0__["Selector"])(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], StateLanguage, "errored", null);
    StateLanguage = __decorate([
        Object(_ngxs_store__WEBPACK_IMPORTED_MODULE_0__["State"])({
            name: 'language',
            defaults: {
                language: undefined,
                error: undefined
            }
        }),
        __metadata("design:paramtypes", [_ionic_native_globalization_ngx__WEBPACK_IMPORTED_MODULE_5__["Globalization"], _ionic_angular__WEBPACK_IMPORTED_MODULE_1__["Platform"], _ngx_translate_core__WEBPACK_IMPORTED_MODULE_4__["TranslateService"]])
    ], StateLanguage);
    return StateLanguage;
}());



/***/ }),

/***/ "./src/app/state/location/location.actions.ts":
/*!****************************************************!*\
  !*** ./src/app/state/location/location.actions.ts ***!
  \****************************************************/
/*! exports provided: ActionsLocation, LocationWatch */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ActionsLocation", function() { return ActionsLocation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LocationWatch", function() { return LocationWatch; });
var ActionsLocation;
(function (ActionsLocation) {
    ActionsLocation["LocationWatch"] = "[Location] Location Watch";
})(ActionsLocation || (ActionsLocation = {}));
var LocationWatch = /** @class */ (function () {
    function LocationWatch() {
    }
    LocationWatch.type = ActionsLocation.LocationWatch;
    return LocationWatch;
}());



/***/ }),

/***/ "./src/app/state/location/location.state.ts":
/*!**************************************************!*\
  !*** ./src/app/state/location/location.state.ts ***!
  \**************************************************/
/*! exports provided: StateLocation */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StateLocation", function() { return StateLocation; });
/* harmony import */ var _ngxs_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ngxs/store */ "../../node_modules/@ngxs/store/fesm5/ngxs-store.js");
/* harmony import */ var _location_actions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./location.actions */ "./src/app/state/location/location.actions.ts");
/* harmony import */ var _constants_capacitor_const__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../constants/capacitor.const */ "./src/app/constants/capacitor.const.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var StateLocation = /** @class */ (function () {
    function StateLocation() {
    }
    StateLocation.location = function (state) { return state.location; };
    StateLocation.error = function (state) { return state.error; };
    StateLocation.loading = function (state) { return state.location == null; };
    StateLocation.errored = function (state) { return state.error != null; };
    StateLocation.prototype.ngxsOnInit = function (context) {
        context.dispatch(new _location_actions__WEBPACK_IMPORTED_MODULE_1__["LocationWatch"]());
    };
    StateLocation.prototype.locationWatch = function (_a) {
        var patchState = _a.patchState;
        return _constants_capacitor_const__WEBPACK_IMPORTED_MODULE_2__["Geolocation"].
            watchPosition({ enableHighAccuracy: true }, function (location, error) {
            if (error != null) {
                console.log(location);
                patchState({ error: error });
            }
            else {
                console.log(location);
                patchState({ location: location });
            }
        });
    };
    __decorate([
        Object(_ngxs_store__WEBPACK_IMPORTED_MODULE_0__["Action"])(_location_actions__WEBPACK_IMPORTED_MODULE_1__["LocationWatch"]),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], StateLocation.prototype, "locationWatch", null);
    __decorate([
        Object(_ngxs_store__WEBPACK_IMPORTED_MODULE_0__["Selector"])(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], StateLocation, "location", null);
    __decorate([
        Object(_ngxs_store__WEBPACK_IMPORTED_MODULE_0__["Selector"])(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], StateLocation, "error", null);
    __decorate([
        Object(_ngxs_store__WEBPACK_IMPORTED_MODULE_0__["Selector"])(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], StateLocation, "loading", null);
    __decorate([
        Object(_ngxs_store__WEBPACK_IMPORTED_MODULE_0__["Selector"])(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], StateLocation, "errored", null);
    StateLocation = __decorate([
        Object(_ngxs_store__WEBPACK_IMPORTED_MODULE_0__["State"])({
            name: 'location',
            defaults: {
                location: undefined,
                error: undefined
            }
        }),
        __metadata("design:paramtypes", [])
    ], StateLocation);
    return StateLocation;
}());



/***/ }),

/***/ "./src/app/state/notifications/notifications.actions.ts":
/*!**************************************************************!*\
  !*** ./src/app/state/notifications/notifications.actions.ts ***!
  \**************************************************************/
/*! exports provided: ActionsNotifications, NotificationsWatch, NotificationsGet */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ActionsNotifications", function() { return ActionsNotifications; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NotificationsWatch", function() { return NotificationsWatch; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NotificationsGet", function() { return NotificationsGet; });
var ActionsNotifications;
(function (ActionsNotifications) {
    ActionsNotifications["NotificationsWatch"] = "[Notifications] Watch";
    ActionsNotifications["NotificationsGet"] = "[Notifications] Get";
})(ActionsNotifications || (ActionsNotifications = {}));
var NotificationsWatch = /** @class */ (function () {
    function NotificationsWatch() {
    }
    NotificationsWatch.type = ActionsNotifications.NotificationsWatch;
    return NotificationsWatch;
}());

var NotificationsGet = /** @class */ (function () {
    function NotificationsGet() {
    }
    NotificationsGet.type = ActionsNotifications.NotificationsGet;
    return NotificationsGet;
}());



/***/ }),

/***/ "./src/app/state/notifications/notifications.state.ts":
/*!************************************************************!*\
  !*** ./src/app/state/notifications/notifications.state.ts ***!
  \************************************************************/
/*! exports provided: StateNotifications */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StateNotifications", function() { return StateNotifications; });
/* harmony import */ var _ngxs_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ngxs/store */ "../../node_modules/@ngxs/store/fesm5/ngxs-store.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "../../node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "../../node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _ionic_native_firebase_ngx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic-native/firebase/ngx */ "../../node_modules/@ionic-native/firebase/ngx/index.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "../../node_modules/@ionic/angular/dist/index.js");
/* harmony import */ var _notifications_actions__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./notifications.actions */ "./src/app/state/notifications/notifications.actions.ts");
/* harmony import */ var _user_user_actions__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../user/user.actions */ "./src/app/state/user/user.actions.ts");
/* harmony import */ var _services_notifications_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../services/notifications.service */ "./src/app/services/notifications.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var StateNotifications = /** @class */ (function () {
    function StateNotifications(firebaseNative, platform, serviceNotifications) {
        this.firebaseNative = firebaseNative;
        this.platform = platform;
        this.serviceNotifications = serviceNotifications;
    }
    StateNotifications.notifications = function (state) { return state.notifications; };
    StateNotifications.pushNotifications = function (state) { return state.pushNotifications; };
    StateNotifications.pushNotification = function (state) { return state.pushNotification; };
    StateNotifications.hasPushNotifications = function (state) { return state.pushNotifications.length > 0; };
    StateNotifications.prototype.notificationsWatch = function (_a) {
        var patchState = _a.patchState, getState = _a.getState, dispatch = _a.dispatch;
        this.firebaseNative.onNotificationOpen().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["tap"])(function (pushNotification) {
            return patchState({
                pushNotification: pushNotification,
                pushNotifications: getState().pushNotifications.concat([
                    pushNotification
                ])
            });
        }));
        var permission$ = this.platform.is('ios') ? Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["from"])(this.firebaseNative.grantPermission()) : Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["of"])(undefined);
        var token$ = this.platform.is('cordova') ? Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["from"])(this.firebaseNative.getToken()) : Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["of"])(undefined);
        return permission$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["switchMap"])(function () { return token$; }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["filter"])(function (token) { return token != null; }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["switchMap"])(function (token) { return dispatch(new _user_user_actions__WEBPACK_IMPORTED_MODULE_6__["UserAddToken"](token)); }));
    };
    StateNotifications.prototype.notificationsGet = function (_a) {
        var patchState = _a.patchState;
        return this.serviceNotifications.get().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["tap"])(function (notifications) { return patchState({ notifications: notifications }); }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["tap"])(function (notifications) { return console.log(notifications); }));
    };
    __decorate([
        Object(_ngxs_store__WEBPACK_IMPORTED_MODULE_0__["Action"])(_notifications_actions__WEBPACK_IMPORTED_MODULE_5__["NotificationsWatch"]),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], StateNotifications.prototype, "notificationsWatch", null);
    __decorate([
        Object(_ngxs_store__WEBPACK_IMPORTED_MODULE_0__["Action"])(_notifications_actions__WEBPACK_IMPORTED_MODULE_5__["NotificationsGet"]),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], StateNotifications.prototype, "notificationsGet", null);
    __decorate([
        Object(_ngxs_store__WEBPACK_IMPORTED_MODULE_0__["Selector"])(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Array)
    ], StateNotifications, "notifications", null);
    __decorate([
        Object(_ngxs_store__WEBPACK_IMPORTED_MODULE_0__["Selector"])(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Array)
    ], StateNotifications, "pushNotifications", null);
    __decorate([
        Object(_ngxs_store__WEBPACK_IMPORTED_MODULE_0__["Selector"])(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Object)
    ], StateNotifications, "pushNotification", null);
    __decorate([
        Object(_ngxs_store__WEBPACK_IMPORTED_MODULE_0__["Selector"])(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], StateNotifications, "hasPushNotifications", null);
    StateNotifications = __decorate([
        Object(_ngxs_store__WEBPACK_IMPORTED_MODULE_0__["State"])({
            name: 'notifications',
            defaults: {
                notifications: [],
                pushNotifications: [],
                pushNotification: undefined
            }
        }),
        __metadata("design:paramtypes", [_ionic_native_firebase_ngx__WEBPACK_IMPORTED_MODULE_3__["Firebase"], _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["Platform"], _services_notifications_service__WEBPACK_IMPORTED_MODULE_7__["ServiceNotifications"]])
    ], StateNotifications);
    return StateNotifications;
}());



/***/ }),

/***/ "./src/app/state/places/places.actions.ts":
/*!************************************************!*\
  !*** ./src/app/state/places/places.actions.ts ***!
  \************************************************/
/*! exports provided: ActionsPlaces, PlaceSearch, PlaceDetails */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ActionsPlaces", function() { return ActionsPlaces; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlaceSearch", function() { return PlaceSearch; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlaceDetails", function() { return PlaceDetails; });
var ActionsPlaces;
(function (ActionsPlaces) {
    ActionsPlaces["PlaceSearch"] = "[Places] Place Search";
    ActionsPlaces["PlaceDetails"] = "[Places] Place Details";
})(ActionsPlaces || (ActionsPlaces = {}));
var PlaceSearch = /** @class */ (function () {
    function PlaceSearch(payload) {
        this.payload = payload;
    }
    PlaceSearch.type = ActionsPlaces.PlaceSearch;
    return PlaceSearch;
}());

var PlaceDetails = /** @class */ (function () {
    function PlaceDetails(payload) {
        this.payload = payload;
    }
    PlaceDetails.type = ActionsPlaces.PlaceDetails;
    return PlaceDetails;
}());



/***/ }),

/***/ "./src/app/state/places/places.state.ts":
/*!**********************************************!*\
  !*** ./src/app/state/places/places.state.ts ***!
  \**********************************************/
/*! exports provided: StatePlaces */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StatePlaces", function() { return StatePlaces; });
/* harmony import */ var _ngxs_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ngxs/store */ "../../node_modules/@ngxs/store/fesm5/ngxs-store.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "../../node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "../../node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _location_location_state__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../location/location.state */ "./src/app/state/location/location.state.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _places_actions__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./places.actions */ "./src/app/state/places/places.actions.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var StatePlaces = /** @class */ (function () {
    function StatePlaces(http, store) {
        this.http = http;
        this.store = store;
    }
    StatePlaces.searching = function (state) { return state.searching; };
    StatePlaces.results = function (state) { return state.results; };
    StatePlaces.prototype.placeSearch = function (_a, _b) {
        var getState = _a.getState, patchState = _a.patchState;
        var payload = _b.payload;
        var searchText = payload == null ? '' : payload.trim();
        var location = this.store.selectSnapshot(_location_location_state__WEBPACK_IMPORTED_MODULE_3__["StateLocation"].location);
        if (searchText.length === 0) {
            patchState({ results: [] });
        }
        else {
            return this.http.get(_environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].apis.places.url + "/explore", {
                params: {
                    client_id: _environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].apis.places.clientId,
                    client_secret: _environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].apis.places.clientSecret,
                    ll: location.coords.latitude + "," + location.coords.longitude,
                    intent: 'checkin',
                    radius: '32000',
                    limit: '5',
                    v: new Date().toISOString().slice(0, 10).split('-').join(''),
                    query: searchText
                }
            }).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["tap"])(function (results) {
                console.log(results);
            }));
        }
    };
    __decorate([
        Object(_ngxs_store__WEBPACK_IMPORTED_MODULE_0__["Action"])(_places_actions__WEBPACK_IMPORTED_MODULE_5__["PlaceSearch"]),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, _places_actions__WEBPACK_IMPORTED_MODULE_5__["PlaceSearch"]]),
        __metadata("design:returntype", void 0)
    ], StatePlaces.prototype, "placeSearch", null);
    __decorate([
        Object(_ngxs_store__WEBPACK_IMPORTED_MODULE_0__["Selector"])(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], StatePlaces, "searching", null);
    __decorate([
        Object(_ngxs_store__WEBPACK_IMPORTED_MODULE_0__["Selector"])(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], StatePlaces, "results", null);
    StatePlaces = __decorate([
        Object(_ngxs_store__WEBPACK_IMPORTED_MODULE_0__["State"])({
            name: 'places',
            defaults: {
                searching: false,
                results: []
            }
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"], _ngxs_store__WEBPACK_IMPORTED_MODULE_0__["Store"]])
    ], StatePlaces);
    return StatePlaces;
}());



/***/ }),

/***/ "./src/app/state/subscriptions/subscriptions.actions.ts":
/*!**************************************************************!*\
  !*** ./src/app/state/subscriptions/subscriptions.actions.ts ***!
  \**************************************************************/
/*! exports provided: ActionsSubscriptions, SubscriptionsGet */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ActionsSubscriptions", function() { return ActionsSubscriptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SubscriptionsGet", function() { return SubscriptionsGet; });
var ActionsSubscriptions;
(function (ActionsSubscriptions) {
    ActionsSubscriptions["SubscriptionsGet"] = "[Subscriptions] Get";
})(ActionsSubscriptions || (ActionsSubscriptions = {}));
var SubscriptionsGet = /** @class */ (function () {
    function SubscriptionsGet() {
    }
    SubscriptionsGet.type = ActionsSubscriptions.SubscriptionsGet;
    return SubscriptionsGet;
}());



/***/ }),

/***/ "./src/app/state/subscriptions/subscriptions.state.ts":
/*!************************************************************!*\
  !*** ./src/app/state/subscriptions/subscriptions.state.ts ***!
  \************************************************************/
/*! exports provided: StateSubscriptions */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StateSubscriptions", function() { return StateSubscriptions; });
/* harmony import */ var _ngxs_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ngxs/store */ "../../node_modules/@ngxs/store/fesm5/ngxs-store.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "../../node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _subscriptions_actions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./subscriptions.actions */ "./src/app/state/subscriptions/subscriptions.actions.ts");
/* harmony import */ var _services_subscriptions_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../services/subscriptions.service */ "./src/app/services/subscriptions.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var StateSubscriptions = /** @class */ (function () {
    function StateSubscriptions(subscriptions) {
        this.subscriptions = subscriptions;
    }
    StateSubscriptions.subscriptions = function (state) { return state.subscriptions; };
    StateSubscriptions.prototype.subscriptionsGet = function (_a) {
        var patchState = _a.patchState;
        return this.subscriptions.get().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["tap"])(function (subscriptions) { return patchState({ subscriptions: subscriptions }); }));
    };
    __decorate([
        Object(_ngxs_store__WEBPACK_IMPORTED_MODULE_0__["Action"])(_subscriptions_actions__WEBPACK_IMPORTED_MODULE_2__["SubscriptionsGet"]),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], StateSubscriptions.prototype, "subscriptionsGet", null);
    __decorate([
        Object(_ngxs_store__WEBPACK_IMPORTED_MODULE_0__["Selector"])(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], StateSubscriptions, "subscriptions", null);
    StateSubscriptions = __decorate([
        Object(_ngxs_store__WEBPACK_IMPORTED_MODULE_0__["State"])({
            name: 'subscriptions',
            defaults: {
                subscriptions: []
            }
        }),
        __metadata("design:paramtypes", [_services_subscriptions_service__WEBPACK_IMPORTED_MODULE_3__["ServiceSubscriptions"]])
    ], StateSubscriptions);
    return StateSubscriptions;
}());



/***/ }),

/***/ "./src/app/state/user/user.actions.ts":
/*!********************************************!*\
  !*** ./src/app/state/user/user.actions.ts ***!
  \********************************************/
/*! exports provided: ActionsUser, UserAuthenticate, UserAuthenticateCheck, UserGet, UserCreate, UserAddToken, LoginEmail, UserLogout, UserSet */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ActionsUser", function() { return ActionsUser; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserAuthenticate", function() { return UserAuthenticate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserAuthenticateCheck", function() { return UserAuthenticateCheck; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserGet", function() { return UserGet; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserCreate", function() { return UserCreate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserAddToken", function() { return UserAddToken; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginEmail", function() { return LoginEmail; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserLogout", function() { return UserLogout; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserSet", function() { return UserSet; });
var ActionsUser;
(function (ActionsUser) {
    ActionsUser["UserAuthenticate"] = "[User] User Authenticate";
    ActionsUser["UserAuthenticateCheck"] = "[User] User Authenticate Check";
    ActionsUser["UserGet"] = "[User] User Get";
    ActionsUser["UserCreate"] = "[User] User Create";
    ActionsUser["UserAddToken"] = "[User] User Add Token";
    ActionsUser["LoginEmail"] = "[User] Login Email";
    ActionsUser["UserLogout"] = "[User] User Logout";
    ActionsUser["UserSet"] = "[User] User Set";
})(ActionsUser || (ActionsUser = {}));
var UserAuthenticate = /** @class */ (function () {
    function UserAuthenticate() {
    }
    UserAuthenticate.type = ActionsUser.UserAuthenticate;
    return UserAuthenticate;
}());

var UserAuthenticateCheck = /** @class */ (function () {
    function UserAuthenticateCheck(payload) {
        this.payload = payload;
    }
    UserAuthenticateCheck.type = ActionsUser.UserAuthenticateCheck;
    return UserAuthenticateCheck;
}());

var UserGet = /** @class */ (function () {
    function UserGet(payload) {
        this.payload = payload;
    }
    UserGet.type = ActionsUser.UserGet;
    return UserGet;
}());

var UserCreate = /** @class */ (function () {
    function UserCreate() {
    }
    UserCreate.type = ActionsUser.UserCreate;
    return UserCreate;
}());

var UserAddToken = /** @class */ (function () {
    function UserAddToken(payload) {
        this.payload = payload;
    }
    UserAddToken.type = ActionsUser.UserAddToken;
    return UserAddToken;
}());

var LoginEmail = /** @class */ (function () {
    function LoginEmail(payload) {
        this.payload = payload;
    }
    LoginEmail.type = ActionsUser.LoginEmail;
    return LoginEmail;
}());

var UserLogout = /** @class */ (function () {
    function UserLogout() {
    }
    UserLogout.type = ActionsUser.UserLogout;
    return UserLogout;
}());

var UserSet = /** @class */ (function () {
    function UserSet(payload) {
        this.payload = payload;
    }
    UserSet.type = ActionsUser.UserSet;
    return UserSet;
}());



/***/ }),

/***/ "./src/app/state/user/user.state.ts":
/*!******************************************!*\
  !*** ./src/app/state/user/user.state.ts ***!
  \******************************************/
/*! exports provided: StateUser */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StateUser", function() { return StateUser; });
/* harmony import */ var firebase_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! firebase/app */ "../../node_modules/firebase/app/dist/index.cjs.js");
/* harmony import */ var firebase_app__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(firebase_app__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ngxs_store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ngxs/store */ "../../node_modules/@ngxs/store/fesm5/ngxs-store.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "../../node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "../../node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _angular_fire_auth__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/fire/auth */ "../../node_modules/@angular/fire/auth/index.js");
/* harmony import */ var _angular_fire_firestore__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/fire/firestore */ "../../node_modules/@angular/fire/firestore/index.js");
/* harmony import */ var _language_language_state__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../language/language.state */ "./src/app/state/language/language.state.ts");
/* harmony import */ var _language_language_actions__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../language/language.actions */ "./src/app/state/language/language.actions.ts");
/* harmony import */ var _user_actions__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./user.actions */ "./src/app/state/user/user.actions.ts");
/* harmony import */ var _alert_alert_actions__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../alert/alert.actions */ "./src/app/state/alert/alert.actions.ts");
/* harmony import */ var _notifications_notifications_actions__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../notifications/notifications.actions */ "./src/app/state/notifications/notifications.actions.ts");
/* harmony import */ var _enums_auth_provider_enum__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../enums/auth-provider.enum */ "./src/app/enums/auth-provider.enum.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};












var StateUser = /** @class */ (function () {
    function StateUser(auth, firestore) {
        this.auth = auth;
        this.firestore = firestore;
    }
    StateUser_1 = StateUser;
    StateUser.authData = function (state) { return state.authData; };
    StateUser.user = function (state) { return state.user; };
    StateUser.authenticated = function (state) { return state.authenticated; };
    StateUser.authenticating = function (state) { return state.authenticating; };
    StateUser.loading = function (state) { return state.authenticating || state.initializing; };
    StateUser.loadedNotAuthenticated = function (state) { return !StateUser_1.loading && !StateUser_1.authenticated; };
    StateUser.error = function (state) { return state.error; };
    StateUser.errored = function (state) { return state.error != null; };
    StateUser.userFound = function (state) { return state.user != null; };
    StateUser.prototype.userAuthenticate = function (_a) {
        var patchState = _a.patchState, dispatch = _a.dispatch;
        patchState({ authenticating: true, initializing: true });
        return this.auth.authState.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["switchMap"])(function (authData) {
            if (authData == null) {
                patchState({ authenticated: false, authData: authData, authenticating: false });
                return dispatch(new _language_language_actions__WEBPACK_IMPORTED_MODULE_7__["LanguageGet"]());
            }
            else {
                patchState({ authData: authData, authenticating: false });
                return dispatch(new _user_actions__WEBPACK_IMPORTED_MODULE_8__["UserGet"](authData));
            }
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["take"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["tap"])(function () { return patchState({ initializing: false }); }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(function (error) { return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["of"])(patchState({ error: error, authenticating: false, initializing: false })); }));
    };
    StateUser.prototype.userAuthenticateCheck = function (_a, _b) {
        var patchState = _a.patchState;
        var payload = _b.payload;
        return this.language$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["filter"])(function (language) { return language != null; }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["take"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["tap"])(function (language) {
            var authData = payload;
            if (authData == null) {
                patchState({ authData: undefined, authenticated: false, error: { name: 'Failed Login', message: 'Unable to login' } });
            }
            else {
                var user = {
                    uid: authData.uid,
                    language: language
                };
                console.log(authData);
                var providerData = authData.providerData[0];
                var displayName = providerData.displayName;
                var email = providerData.email;
                var phoneNumber = providerData.phoneNumber;
                var photoURL = providerData.photoURL;
                var providerId = providerData.providerId;
                if (displayName != null) {
                    user.displayName = displayName;
                }
                if (email != null) {
                    user.email = email;
                }
                if (phoneNumber != null) {
                    user.phoneNumber = phoneNumber;
                }
                if (photoURL != null) {
                    user.photoURL = photoURL;
                }
                user.uidInternal = providerId + ':' + providerId === _enums_auth_provider_enum__WEBPACK_IMPORTED_MODULE_11__["AuthProvider"].Email ? email : user.uid;
                patchState({ authData: authData, authenticated: true, user: user, authenticating: false });
            }
        }));
    };
    StateUser.prototype.userGet = function (_a, _b) {
        var patchState = _a.patchState, dispatch = _a.dispatch;
        var payload = _b.payload;
        var providerData = payload.providerData[0];
        var providerId = providerData.providerId;
        var uidInternal = providerId + ':' + (providerId === _enums_auth_provider_enum__WEBPACK_IMPORTED_MODULE_11__["AuthProvider"].Email ? providerData.email : providerData.uid);
        return this.firestore.doc("user/" + uidInternal).valueChanges().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["filter"])(function (user) { return user != null; }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["take"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["switchMap"])(function (user) {
            var dependencies$ = Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["of"])();
            if (user == null) {
                patchState({ error: { name: 'Could not find user', message: 'Could not find user' } });
            }
            else {
                patchState({ user: user, authenticated: true, authenticating: false });
                dependencies$ = dispatch([new _language_language_actions__WEBPACK_IMPORTED_MODULE_7__["LanguageSet"](user.language), new _alert_alert_actions__WEBPACK_IMPORTED_MODULE_9__["AlertsGet"](), new _notifications_notifications_actions__WEBPACK_IMPORTED_MODULE_10__["NotificationsGet"]()]);
                //                    dispatch(new NotificationsWatch());
            }
            return dependencies$;
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(function (error) { return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["of"])(patchState({ error: error })); }));
    };
    StateUser.prototype.userAddToken = function (_a, _b) {
        var getState = _a.getState;
        var payload = _b.payload;
        var user = getState().user;
        var token = payload;
        var tokens = user.tokens == null ? {} : user.tokens;
        tokens[token] = token;
        return user.tokens != null && user.tokens[token] != null ? Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["of"])(null) : this.firestore.collection('user').doc(user.uidInternal).update({ tokens: tokens });
    };
    StateUser.prototype.loginEmail = function (_a, _b) {
        var patchState = _a.patchState, dispatch = _a.dispatch;
        var payload = _b.payload;
        patchState({ authenticating: true });
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["from"])(firebase_app__WEBPACK_IMPORTED_MODULE_0__["auth"]().signInWithEmailAndPassword(payload.id, payload.password)).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["switchMap"])(function (authData) { return dispatch(new _user_actions__WEBPACK_IMPORTED_MODULE_8__["UserAuthenticateCheck"](authData.user)); }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(function (error) { return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["of"])(patchState({ error: error, authenticating: false })); }));
    };
    StateUser.prototype.userLogout = function (_a) {
        var patchState = _a.patchState, dispatch = _a.dispatch;
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["of"])(this.auth.auth.signOut()).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["tap"])(function () {
            patchState({
                authenticated: false,
                authData: undefined,
                user: undefined
            });
            dispatch(new _user_actions__WEBPACK_IMPORTED_MODULE_8__["UserLogout"]());
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(function (error) { return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["of"])(patchState({ error: error })); }));
    };
    var StateUser_1;
    __decorate([
        Object(_ngxs_store__WEBPACK_IMPORTED_MODULE_1__["Select"])(_language_language_state__WEBPACK_IMPORTED_MODULE_6__["StateLanguage"].language),
        __metadata("design:type", rxjs__WEBPACK_IMPORTED_MODULE_2__["Observable"])
    ], StateUser.prototype, "language$", void 0);
    __decorate([
        Object(_ngxs_store__WEBPACK_IMPORTED_MODULE_1__["Action"])(_user_actions__WEBPACK_IMPORTED_MODULE_8__["UserAuthenticate"]),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], StateUser.prototype, "userAuthenticate", null);
    __decorate([
        Object(_ngxs_store__WEBPACK_IMPORTED_MODULE_1__["Action"])(_user_actions__WEBPACK_IMPORTED_MODULE_8__["UserAuthenticateCheck"]),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, _user_actions__WEBPACK_IMPORTED_MODULE_8__["UserAuthenticateCheck"]]),
        __metadata("design:returntype", void 0)
    ], StateUser.prototype, "userAuthenticateCheck", null);
    __decorate([
        Object(_ngxs_store__WEBPACK_IMPORTED_MODULE_1__["Action"])(_user_actions__WEBPACK_IMPORTED_MODULE_8__["UserGet"]),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, _user_actions__WEBPACK_IMPORTED_MODULE_8__["UserGet"]]),
        __metadata("design:returntype", void 0)
    ], StateUser.prototype, "userGet", null);
    __decorate([
        Object(_ngxs_store__WEBPACK_IMPORTED_MODULE_1__["Action"])(_user_actions__WEBPACK_IMPORTED_MODULE_8__["UserAddToken"]),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, _user_actions__WEBPACK_IMPORTED_MODULE_8__["UserAddToken"]]),
        __metadata("design:returntype", void 0)
    ], StateUser.prototype, "userAddToken", null);
    __decorate([
        Object(_ngxs_store__WEBPACK_IMPORTED_MODULE_1__["Action"])(_user_actions__WEBPACK_IMPORTED_MODULE_8__["LoginEmail"]),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, _user_actions__WEBPACK_IMPORTED_MODULE_8__["LoginEmail"]]),
        __metadata("design:returntype", void 0)
    ], StateUser.prototype, "loginEmail", null);
    __decorate([
        Object(_ngxs_store__WEBPACK_IMPORTED_MODULE_1__["Action"])(_user_actions__WEBPACK_IMPORTED_MODULE_8__["UserLogout"]),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], StateUser.prototype, "userLogout", null);
    __decorate([
        Object(_ngxs_store__WEBPACK_IMPORTED_MODULE_1__["Selector"])(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], StateUser, "authData", null);
    __decorate([
        Object(_ngxs_store__WEBPACK_IMPORTED_MODULE_1__["Selector"])(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], StateUser, "user", null);
    __decorate([
        Object(_ngxs_store__WEBPACK_IMPORTED_MODULE_1__["Selector"])(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], StateUser, "authenticated", null);
    __decorate([
        Object(_ngxs_store__WEBPACK_IMPORTED_MODULE_1__["Selector"])(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], StateUser, "authenticating", null);
    __decorate([
        Object(_ngxs_store__WEBPACK_IMPORTED_MODULE_1__["Selector"])(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], StateUser, "loading", null);
    __decorate([
        Object(_ngxs_store__WEBPACK_IMPORTED_MODULE_1__["Selector"])(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], StateUser, "loadedNotAuthenticated", null);
    __decorate([
        Object(_ngxs_store__WEBPACK_IMPORTED_MODULE_1__["Selector"])(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], StateUser, "error", null);
    __decorate([
        Object(_ngxs_store__WEBPACK_IMPORTED_MODULE_1__["Selector"])(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], StateUser, "errored", null);
    __decorate([
        Object(_ngxs_store__WEBPACK_IMPORTED_MODULE_1__["Selector"])(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], StateUser, "userFound", null);
    StateUser = StateUser_1 = __decorate([
        Object(_ngxs_store__WEBPACK_IMPORTED_MODULE_1__["State"])({
            name: 'user',
            defaults: {
                authData: undefined,
                user: undefined,
                error: undefined,
                authenticated: false,
                authenticating: false,
                initializing: false
            }
        }),
        __metadata("design:paramtypes", [_angular_fire_auth__WEBPACK_IMPORTED_MODULE_4__["AngularFireAuth"], _angular_fire_firestore__WEBPACK_IMPORTED_MODULE_5__["AngularFirestore"]])
    ], StateUser);
    return StateUser;
}());



/***/ }),

/***/ "./src/app/validators/extended.validators.ts":
/*!***************************************************!*\
  !*** ./src/app/validators/extended.validators.ts ***!
  \***************************************************/
/*! exports provided: ValidatorsExtended */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ValidatorsExtended", function() { return ValidatorsExtended; });
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/forms */ "../../node_modules/@angular/forms/fesm5/forms.js");

var ValidatorsExtended = /** @class */ (function () {
    function ValidatorsExtended() {
    }
    ValidatorsExtended.minLength = function (minLength) {
        return function (control) {
            var validation = null;
            if (_angular_forms__WEBPACK_IMPORTED_MODULE_0__["Validators"].required(control) == null) {
                var value = control.value ? control.value : '';
                validation = value.trim().length < minLength ? { 'minlength': { 'requiredLength': minLength, 'actualLength': value.trim().length } } : null;
            }
            return validation;
        };
    };
    return ValidatorsExtended;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
var environment = {
    production: false,
    environment: 'dev',
    language: 'en',
    version: '0.0.0',
    pathJson: 'data',
    apis: {
        firebase: {
            apiKey: '***REMOVED-FIREBASE-API-KEY***',
            authDomain: '1388625286411.firebaseapp.com',
            databaseURL: 'https://1388625286411.firebaseio.com',
            projectId: 'project-4334231676697990915',
            storageBucket: 'project-4334231676697990915.appspot.com',
            messagingSenderId: '671375922961'
        },
        places: {
            clientId: '0OTN4VI0TZMQGRTJPWOUVDYUJK0VHH3YCDRQO0CAEUKG43FI',
            clientSecret: 'B0OICO4SNQ1EXRKWZSZ0JN0K3QXZCSUBP3PS1MN1NFC4YPQD',
            url: 'https://api.foursquare.com/v2/venues'
        },
        maps: {
            accessToken: '***REMOVED-MAPBOX-TOKEN***'
        }
    }
};


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "../../node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])()
    .bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/andredavcev/Projects/theory/apps/ionic-firefly/src/main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map