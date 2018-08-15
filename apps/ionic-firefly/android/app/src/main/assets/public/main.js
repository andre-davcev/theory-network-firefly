(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "../../libs/core/base/base-component.ts":
/*!************************************************************************!*\
  !*** /Users/andredavcev/Files/Theory/libs/core/base/base-component.ts ***!
  \************************************************************************/
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
/*!***************************************************************!*\
  !*** /Users/andredavcev/Files/Theory/libs/core/base/index.ts ***!
  \***************************************************************/
/*! exports provided: BaseComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _base_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base-component */ "../../libs/core/base/base-component.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BaseComponent", function() { return _base_component__WEBPACK_IMPORTED_MODULE_0__["BaseComponent"]; });




/***/ }),

/***/ "../../libs/core/core.module.ts":
/*!****************************************************************!*\
  !*** /Users/andredavcev/Files/Theory/libs/core/core.module.ts ***!
  \****************************************************************/
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
    var CoreModule_1;
}());



/***/ }),

/***/ "../../libs/core/environments/environment.ts":
/*!*****************************************************************************!*\
  !*** /Users/andredavcev/Files/Theory/libs/core/environments/environment.ts ***!
  \*****************************************************************************/
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
/*!**********************************************************!*\
  !*** /Users/andredavcev/Files/Theory/libs/core/index.ts ***!
  \**********************************************************/
/*! exports provided: CoreModule, BaseComponent, environment, CORE_PROVIDERS, LogService, WindowPlatformService, WindowService, PlatformLanguageToken */
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
/*!*******************************************************************!*\
  !*** /Users/andredavcev/Files/Theory/libs/core/services/index.ts ***!
  \*******************************************************************/
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
/*!*************************************************************************!*\
  !*** /Users/andredavcev/Files/Theory/libs/core/services/log.service.ts ***!
  \*************************************************************************/
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
    var LogService_1;
}());



/***/ }),

/***/ "../../libs/core/services/tokens.ts":
/*!********************************************************************!*\
  !*** /Users/andredavcev/Files/Theory/libs/core/services/tokens.ts ***!
  \********************************************************************/
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
/*!****************************************************************************!*\
  !*** /Users/andredavcev/Files/Theory/libs/core/services/window.service.ts ***!
  \****************************************************************************/
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
/*!**************************************************************!*\
  !*** /Users/andredavcev/Files/Theory/libs/features/index.ts ***!
  \**************************************************************/
/*! exports provided: UISharedModule, HeaderBaseComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ui__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ui */ "../../libs/features/ui/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "UISharedModule", function() { return _ui__WEBPACK_IMPORTED_MODULE_0__["UISharedModule"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "HeaderBaseComponent", function() { return _ui__WEBPACK_IMPORTED_MODULE_0__["HeaderBaseComponent"]; });




/***/ }),

/***/ "../../libs/features/ui/base/header.base-component.ts":
/*!**************************************************************************************!*\
  !*** /Users/andredavcev/Files/Theory/libs/features/ui/base/header.base-component.ts ***!
  \**************************************************************************************/
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
/*!**********************************************************************!*\
  !*** /Users/andredavcev/Files/Theory/libs/features/ui/base/index.ts ***!
  \**********************************************************************/
/*! exports provided: HeaderBaseComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _header_base_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./header.base-component */ "../../libs/features/ui/base/header.base-component.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "HeaderBaseComponent", function() { return _header_base_component__WEBPACK_IMPORTED_MODULE_0__["HeaderBaseComponent"]; });




/***/ }),

/***/ "../../libs/features/ui/index.ts":
/*!*****************************************************************!*\
  !*** /Users/andredavcev/Files/Theory/libs/features/ui/index.ts ***!
  \*****************************************************************/
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
/*!*********************************************************************************!*\
  !*** /Users/andredavcev/Files/Theory/libs/features/ui/pipes/date-order.pipe.ts ***!
  \*********************************************************************************/
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
/*!***********************************************************************!*\
  !*** /Users/andredavcev/Files/Theory/libs/features/ui/pipes/index.ts ***!
  \***********************************************************************/
/*! exports provided: PIPES */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PIPES", function() { return PIPES; });
/* harmony import */ var _date_order_pipe__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./date-order.pipe */ "../../libs/features/ui/pipes/date-order.pipe.ts");

var PIPES = [_date_order_pipe__WEBPACK_IMPORTED_MODULE_0__["DateOrderPipe"]];


/***/ }),

/***/ "../../libs/features/ui/ui.module.ts":
/*!*********************************************************************!*\
  !*** /Users/andredavcev/Files/Theory/libs/features/ui/ui.module.ts ***!
  \*********************************************************************/
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
/*!*************************************************************!*\
  !*** /Users/andredavcev/Files/Theory/libs/utils/angular.ts ***!
  \*************************************************************/
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
/*!***********************************************************!*\
  !*** /Users/andredavcev/Files/Theory/libs/utils/index.ts ***!
  \***********************************************************/
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
/*!*************************************************************!*\
  !*** /Users/andredavcev/Files/Theory/libs/utils/objects.ts ***!
  \*************************************************************/
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
/*!**************************************************************!*\
  !*** /Users/andredavcev/Files/Theory/libs/utils/platform.ts ***!
  \**************************************************************/
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

/***/ "../../xplat/ionic/core/core.module.ts":
/*!***********************************************************************!*\
  !*** /Users/andredavcev/Files/Theory/xplat/ionic/core/core.module.ts ***!
  \***********************************************************************/
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
/*!*****************************************************************!*\
  !*** /Users/andredavcev/Files/Theory/xplat/ionic/core/index.ts ***!
  \*****************************************************************/
/*! exports provided: AppIonicCoreModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./core.module */ "../../xplat/ionic/core/core.module.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AppIonicCoreModule", function() { return _core_module__WEBPACK_IMPORTED_MODULE_0__["AppIonicCoreModule"]; });




/***/ }),

/***/ "../../xplat/ionic/features/index.ts":
/*!*********************************************************************!*\
  !*** /Users/andredavcev/Files/Theory/xplat/ionic/features/index.ts ***!
  \*********************************************************************/
/*! exports provided: UIModule, UI_COMPONENTS */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ui__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ui */ "../../xplat/ionic/features/ui/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "UIModule", function() { return _ui__WEBPACK_IMPORTED_MODULE_0__["UIModule"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "UI_COMPONENTS", function() { return _ui__WEBPACK_IMPORTED_MODULE_0__["UI_COMPONENTS"]; });




/***/ }),

/***/ "../../xplat/ionic/features/ui/components/header/header.component.html":
/*!*******************************************************************************************************!*\
  !*** /Users/andredavcev/Files/Theory/xplat/ionic/features/ui/components/header/header.component.html ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\n  <ion-toolbar>\n      <ion-title>\n          {{title}}\n      </ion-title>\n  </ion-toolbar>\n</ion-header>"

/***/ }),

/***/ "../../xplat/ionic/features/ui/components/header/header.component.ts":
/*!*****************************************************************************************************!*\
  !*** /Users/andredavcev/Files/Theory/xplat/ionic/features/ui/components/header/header.component.ts ***!
  \*****************************************************************************************************/
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
/*!***********************************************************************************!*\
  !*** /Users/andredavcev/Files/Theory/xplat/ionic/features/ui/components/index.ts ***!
  \***********************************************************************************/
/*! exports provided: UI_COMPONENTS */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UI_COMPONENTS", function() { return UI_COMPONENTS; });
/* harmony import */ var _header_header_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./header/header.component */ "../../xplat/ionic/features/ui/components/header/header.component.ts");

var UI_COMPONENTS = [_header_header_component__WEBPACK_IMPORTED_MODULE_0__["HeaderComponent"]];


/***/ }),

/***/ "../../xplat/ionic/features/ui/index.ts":
/*!************************************************************************!*\
  !*** /Users/andredavcev/Files/Theory/xplat/ionic/features/ui/index.ts ***!
  \************************************************************************/
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
/*!****************************************************************************!*\
  !*** /Users/andredavcev/Files/Theory/xplat/ionic/features/ui/ui.module.ts ***!
  \****************************************************************************/
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
/*!************************************************************!*\
  !*** /Users/andredavcev/Files/Theory/xplat/ionic/index.ts ***!
  \************************************************************/
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
/*!*********************************************************************************!*\
  !*** /Users/andredavcev/Files/Theory/xplat/web/core/base/app.base-component.ts ***!
  \*********************************************************************************/
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
/*!********************************************************************!*\
  !*** /Users/andredavcev/Files/Theory/xplat/web/core/base/index.ts ***!
  \********************************************************************/
/*! exports provided: AppBaseComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _app_base_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app.base-component */ "../../xplat/web/core/base/app.base-component.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AppBaseComponent", function() { return _app_base_component__WEBPACK_IMPORTED_MODULE_0__["AppBaseComponent"]; });




/***/ }),

/***/ "../../xplat/web/core/core.module.ts":
/*!*********************************************************************!*\
  !*** /Users/andredavcev/Files/Theory/xplat/web/core/core.module.ts ***!
  \*********************************************************************/
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
/*!***************************************************************!*\
  !*** /Users/andredavcev/Files/Theory/xplat/web/core/index.ts ***!
  \***************************************************************/
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
/*!*******************************************************************!*\
  !*** /Users/andredavcev/Files/Theory/xplat/web/features/index.ts ***!
  \*******************************************************************/
/*! exports provided: UIModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ui__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ui */ "../../xplat/web/features/ui/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "UIModule", function() { return _ui__WEBPACK_IMPORTED_MODULE_0__["UIModule"]; });




/***/ }),

/***/ "../../xplat/web/features/ui/index.ts":
/*!**********************************************************************!*\
  !*** /Users/andredavcev/Files/Theory/xplat/web/features/ui/index.ts ***!
  \**********************************************************************/
/*! exports provided: UIModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ui_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ui.module */ "../../xplat/web/features/ui/ui.module.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "UIModule", function() { return _ui_module__WEBPACK_IMPORTED_MODULE_0__["UIModule"]; });




/***/ }),

/***/ "../../xplat/web/features/ui/ui.module.ts":
/*!**************************************************************************!*\
  !*** /Users/andredavcev/Files/Theory/xplat/web/features/ui/ui.module.ts ***!
  \**************************************************************************/
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
/*!**********************************************************!*\
  !*** /Users/andredavcev/Files/Theory/xplat/web/index.ts ***!
  \**********************************************************/
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
	"./pages/home/home.module": [
		"./src/app/pages/home/home.module.ts",
		"pages-home-home-module"
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
	return __webpack_require__.e(ids[1]).then(function() {
		var module = __webpack_require__(ids[0]);
		return module;
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
/*! exports provided: routes, AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "routes", function() { return routes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "../../node_modules/@angular/router/fesm5/router.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var routes = [
    {
        path: '',
        loadChildren: './pages/home/home.module#HomeModule'
    }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forRoot(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());



/***/ }),

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-app>\n  <ion-router-outlet main></ion-router-outlet>\n</ion-app>\n"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ionic_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ionic/core */ "../../node_modules/@ionic/core/dist/collection/index.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "../../node_modules/@ionic/angular/dist/index.js");
/* harmony import */ var _capacitor_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @capacitor/core */ "./node_modules/@capacitor/core/dist/esm/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var StatusBar = _capacitor_core__WEBPACK_IMPORTED_MODULE_3__["Plugins"].StatusBar;
var AppComponent = /** @class */ (function () {
    function AppComponent(platform) {
        this.platform = platform;
        this.initializeApp();
    }
    AppComponent.prototype.initializeApp = function () {
        this.platform.ready().then(function () {
            if (Object(_ionic_core__WEBPACK_IMPORTED_MODULE_1__["isCapacitorNative"])(window)) {
                StatusBar.setStyle({
                    style: _capacitor_core__WEBPACK_IMPORTED_MODULE_3__["StatusBarStyle"].Dark
                });
            }
        });
    };
    AppComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html")
        }),
        __metadata("design:paramtypes", [_ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Platform"]])
    ], AppComponent);
    return AppComponent;
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
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "../../node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "../../node_modules/@ionic/angular/dist/index.js");
/* harmony import */ var _core_core_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./core/core.module */ "./src/app/core/core.module.ts");
/* harmony import */ var _features_shared_shared_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./features/shared/shared.module */ "./src/app/features/shared/shared.module.ts");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./app-routing.module */ "./src/app/app-routing.module.ts");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
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
            imports: [_core_core_module__WEBPACK_IMPORTED_MODULE_3__["CoreModule"], _features_shared_shared_module__WEBPACK_IMPORTED_MODULE_4__["SharedModule"], _app_routing_module__WEBPACK_IMPORTED_MODULE_5__["AppRoutingModule"]],
            declarations: [_app_component__WEBPACK_IMPORTED_MODULE_6__["AppComponent"]],
            providers: [{ provide: _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouteReuseStrategy"], useClass: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["IonicRouteStrategy"] }],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_6__["AppComponent"]]
        })
    ], AppModule);
    return AppModule;
}());



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
/* harmony import */ var _theory_ionic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @theory/ionic */ "../../xplat/ionic/index.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

// libs

var CoreModule = /** @class */ (function () {
    function CoreModule() {
    }
    CoreModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_theory_ionic__WEBPACK_IMPORTED_MODULE_1__["AppIonicCoreModule"]]
        })
    ], CoreModule);
    return CoreModule;
}());



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

// xplat

var MODULES = [_theory_ionic__WEBPACK_IMPORTED_MODULE_1__["UIModule"]];
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
    environment: 'dev'
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

module.exports = __webpack_require__(/*! /Users/andredavcev/Files/Theory/apps/ionic-firefly/src/main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map