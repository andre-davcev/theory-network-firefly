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

/***/ "../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/components lazy recursive ^\\.\\/.*\\.js$":
/*!*******************************************************************************************************************************************************!*\
  !*** /Users/andredavcev/Files/Theory/node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/components lazy ^\.\/.*\.js$ namespace object ***!
  \*******************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./0iz6fign.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/components/0iz6fign.js",
		"common",
		11
	],
	"./0iz6fign.sc.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/components/0iz6fign.sc.js",
		"common",
		12
	],
	"./1n9h5yax.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/components/1n9h5yax.js",
		"common",
		13
	],
	"./1n9h5yax.sc.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/components/1n9h5yax.sc.js",
		"common",
		14
	],
	"./1tyxckfi.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/components/1tyxckfi.js",
		"common",
		15
	],
	"./1tyxckfi.sc.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/components/1tyxckfi.sc.js",
		"common",
		16
	],
	"./1vurn78f.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/components/1vurn78f.js",
		"common",
		17
	],
	"./1vurn78f.sc.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/components/1vurn78f.sc.js",
		"common",
		18
	],
	"./1xdpom6f.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/components/1xdpom6f.js",
		"common",
		19
	],
	"./1xdpom6f.sc.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/components/1xdpom6f.sc.js",
		"common",
		20
	],
	"./2fvhq14d.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/components/2fvhq14d.js",
		"common",
		21
	],
	"./2fvhq14d.sc.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/components/2fvhq14d.sc.js",
		"common",
		22
	],
	"./5crjzoc5.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/components/5crjzoc5.js",
		"common",
		23
	],
	"./5crjzoc5.sc.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/components/5crjzoc5.sc.js",
		"common",
		24
	],
	"./7wrgypuz.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/components/7wrgypuz.js",
		"common",
		25
	],
	"./7wrgypuz.sc.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/components/7wrgypuz.sc.js",
		"common",
		26
	],
	"./8fuazfbn.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/components/8fuazfbn.js",
		27
	],
	"./8fuazfbn.sc.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/components/8fuazfbn.sc.js",
		28
	],
	"./8hc0amys.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/components/8hc0amys.js",
		"common",
		29
	],
	"./8hc0amys.sc.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/components/8hc0amys.sc.js",
		"common",
		30
	],
	"./8zjbpglr.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/components/8zjbpglr.js",
		"common",
		31
	],
	"./8zjbpglr.sc.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/components/8zjbpglr.sc.js",
		"common",
		32
	],
	"./aeyzpkio.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/components/aeyzpkio.js",
		"common",
		33
	],
	"./aeyzpkio.sc.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/components/aeyzpkio.sc.js",
		"common",
		34
	],
	"./ainrlibw.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/components/ainrlibw.js",
		"common",
		35
	],
	"./ainrlibw.sc.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/components/ainrlibw.sc.js",
		"common",
		36
	],
	"./al4ydocp.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/components/al4ydocp.js",
		"common",
		37
	],
	"./al4ydocp.sc.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/components/al4ydocp.sc.js",
		"common",
		38
	],
	"./b7vmm4bm.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/components/b7vmm4bm.js",
		"common",
		39
	],
	"./b7vmm4bm.sc.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/components/b7vmm4bm.sc.js",
		"common",
		40
	],
	"./bpxvc3nq.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/components/bpxvc3nq.js",
		"common",
		41
	],
	"./bpxvc3nq.sc.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/components/bpxvc3nq.sc.js",
		"common",
		42
	],
	"./carlzqik.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/components/carlzqik.js",
		"common",
		43
	],
	"./carlzqik.sc.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/components/carlzqik.sc.js",
		"common",
		44
	],
	"./chunk-276e047f.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/components/chunk-276e047f.js",
		"common"
	],
	"./chunk-5f438245.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/components/chunk-5f438245.js",
		"common"
	],
	"./chunk-a4253575.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/components/chunk-a4253575.js",
		"common"
	],
	"./chunk-ca273e40.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/components/chunk-ca273e40.js",
		"common"
	],
	"./chunk-db84a248.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/components/chunk-db84a248.js",
		"common"
	],
	"./csqwq01c.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/components/csqwq01c.js",
		"common",
		45
	],
	"./csqwq01c.sc.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/components/csqwq01c.sc.js",
		"common",
		46
	],
	"./cvpumfnt.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/components/cvpumfnt.js",
		"common",
		47
	],
	"./cvpumfnt.sc.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/components/cvpumfnt.sc.js",
		"common",
		48
	],
	"./dcyhuhsu.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/components/dcyhuhsu.js",
		"common",
		49
	],
	"./dcyhuhsu.sc.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/components/dcyhuhsu.sc.js",
		"common",
		50
	],
	"./dko6k9zg.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/components/dko6k9zg.js",
		"common",
		51
	],
	"./dko6k9zg.sc.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/components/dko6k9zg.sc.js",
		"common",
		52
	],
	"./dovqtr4x.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/components/dovqtr4x.js",
		"common",
		53
	],
	"./dovqtr4x.sc.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/components/dovqtr4x.sc.js",
		"common",
		54
	],
	"./dq6scah8.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/components/dq6scah8.js",
		"common",
		55
	],
	"./dq6scah8.sc.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/components/dq6scah8.sc.js",
		"common",
		56
	],
	"./dubpmlw2.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/components/dubpmlw2.js",
		"common",
		57
	],
	"./dubpmlw2.sc.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/components/dubpmlw2.sc.js",
		"common",
		58
	],
	"./f4c6sdkg.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/components/f4c6sdkg.js",
		"common",
		59
	],
	"./f4c6sdkg.sc.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/components/f4c6sdkg.sc.js",
		"common",
		60
	],
	"./frurae9c.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/components/frurae9c.js",
		"common",
		61
	],
	"./frurae9c.sc.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/components/frurae9c.sc.js",
		"common",
		62
	],
	"./gesture.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/components/gesture.js",
		0
	],
	"./gq8h5fwm.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/components/gq8h5fwm.js",
		"common",
		63
	],
	"./gq8h5fwm.sc.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/components/gq8h5fwm.sc.js",
		"common",
		64
	],
	"./h0wlf0bd.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/components/h0wlf0bd.js",
		"common",
		65
	],
	"./h0wlf0bd.sc.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/components/h0wlf0bd.sc.js",
		"common",
		66
	],
	"./hardware-back-button.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/components/hardware-back-button.js",
		1
	],
	"./hp3h1z0g.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/components/hp3h1z0g.js",
		"common",
		67
	],
	"./hp3h1z0g.sc.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/components/hp3h1z0g.sc.js",
		"common",
		68
	],
	"./hvtpn8k5.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/components/hvtpn8k5.js",
		"common",
		69
	],
	"./hvtpn8k5.sc.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/components/hvtpn8k5.sc.js",
		"common",
		70
	],
	"./hx2ygwkr.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/components/hx2ygwkr.js",
		"common",
		71
	],
	"./hx2ygwkr.sc.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/components/hx2ygwkr.sc.js",
		"common",
		72
	],
	"./ic16lacj.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/components/ic16lacj.js",
		"common",
		73
	],
	"./ic16lacj.sc.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/components/ic16lacj.sc.js",
		"common",
		74
	],
	"./igx912x9.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/components/igx912x9.js",
		75
	],
	"./igx912x9.sc.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/components/igx912x9.sc.js",
		76
	],
	"./iihtgbhw.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/components/iihtgbhw.js",
		"common",
		77
	],
	"./iihtgbhw.sc.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/components/iihtgbhw.sc.js",
		"common",
		78
	],
	"./index.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/components/index.js",
		"common",
		79
	],
	"./input-shims.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/components/input-shims.js",
		"common"
	],
	"./ios.transition.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/components/ios.transition.js",
		3
	],
	"./j071tyom.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/components/j071tyom.js",
		"common",
		80
	],
	"./j071tyom.sc.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/components/j071tyom.sc.js",
		"common",
		81
	],
	"./j8pysivw.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/components/j8pysivw.js",
		"common",
		82
	],
	"./j8pysivw.sc.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/components/j8pysivw.sc.js",
		"common",
		83
	],
	"./jwtki7yq.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/components/jwtki7yq.js",
		"common",
		84
	],
	"./jwtki7yq.sc.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/components/jwtki7yq.sc.js",
		"common",
		85
	],
	"./k3arey9z.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/components/k3arey9z.js",
		"common",
		86
	],
	"./k3arey9z.sc.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/components/k3arey9z.sc.js",
		"common",
		87
	],
	"./kns6yxvk.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/components/kns6yxvk.js",
		"common",
		88
	],
	"./kns6yxvk.sc.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/components/kns6yxvk.sc.js",
		"common",
		89
	],
	"./kqirdh6c.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/components/kqirdh6c.js",
		"common",
		90
	],
	"./kqirdh6c.sc.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/components/kqirdh6c.sc.js",
		"common",
		91
	],
	"./kr2ks9ex.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/components/kr2ks9ex.js",
		"common",
		92
	],
	"./kr2ks9ex.sc.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/components/kr2ks9ex.sc.js",
		"common",
		93
	],
	"./lk8d4yol.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/components/lk8d4yol.js",
		"common",
		94
	],
	"./lk8d4yol.sc.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/components/lk8d4yol.sc.js",
		"common",
		95
	],
	"./lnqrftay.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/components/lnqrftay.js",
		"common",
		96
	],
	"./lnqrftay.sc.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/components/lnqrftay.sc.js",
		"common",
		97
	],
	"./lviwsafz.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/components/lviwsafz.js",
		"common",
		98
	],
	"./lviwsafz.sc.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/components/lviwsafz.sc.js",
		"common",
		99
	],
	"./md.transition.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/components/md.transition.js",
		4
	],
	"./mgyaif1n.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/components/mgyaif1n.js",
		"common",
		100
	],
	"./mgyaif1n.sc.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/components/mgyaif1n.sc.js",
		"common",
		101
	],
	"./nkpqfhed.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/components/nkpqfhed.js",
		"common",
		102
	],
	"./nkpqfhed.sc.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/components/nkpqfhed.sc.js",
		"common",
		103
	],
	"./o9bkx9ur.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/components/o9bkx9ur.js",
		"common",
		104
	],
	"./o9bkx9ur.sc.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/components/o9bkx9ur.sc.js",
		"common",
		105
	],
	"./ohlgz1zq.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/components/ohlgz1zq.js",
		"common",
		106
	],
	"./ohlgz1zq.sc.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/components/ohlgz1zq.sc.js",
		"common",
		107
	],
	"./ooo1yrih.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/components/ooo1yrih.js",
		"common",
		108
	],
	"./ooo1yrih.sc.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/components/ooo1yrih.sc.js",
		"common",
		109
	],
	"./ouvzk56y.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/components/ouvzk56y.js",
		"common",
		110
	],
	"./ouvzk56y.sc.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/components/ouvzk56y.sc.js",
		"common",
		111
	],
	"./ov1xqesp.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/components/ov1xqesp.js",
		"common",
		112
	],
	"./ov1xqesp.sc.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/components/ov1xqesp.sc.js",
		"common",
		113
	],
	"./ovd8bylq.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/components/ovd8bylq.js",
		"common",
		114
	],
	"./ovd8bylq.sc.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/components/ovd8bylq.sc.js",
		"common",
		115
	],
	"./pfyzszvb.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/components/pfyzszvb.js",
		"common",
		116
	],
	"./pfyzszvb.sc.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/components/pfyzszvb.sc.js",
		"common",
		117
	],
	"./plmzb2rd.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/components/plmzb2rd.js",
		"common",
		118
	],
	"./plmzb2rd.sc.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/components/plmzb2rd.sc.js",
		"common",
		119
	],
	"./pny5jgxt.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/components/pny5jgxt.js",
		"common",
		120
	],
	"./pny5jgxt.sc.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/components/pny5jgxt.sc.js",
		"common",
		121
	],
	"./qphzv9lk.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/components/qphzv9lk.js",
		"common",
		122
	],
	"./qphzv9lk.sc.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/components/qphzv9lk.sc.js",
		"common",
		123
	],
	"./rihgbjgj.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/components/rihgbjgj.js",
		"common",
		124
	],
	"./rihgbjgj.sc.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/components/rihgbjgj.sc.js",
		"common",
		125
	],
	"./sm2zlrta.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/components/sm2zlrta.js",
		"common",
		126
	],
	"./sm2zlrta.sc.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/components/sm2zlrta.sc.js",
		"common",
		127
	],
	"./sq9nnxm2.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/components/sq9nnxm2.js",
		"common",
		128
	],
	"./sq9nnxm2.sc.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/components/sq9nnxm2.sc.js",
		"common",
		129
	],
	"./status-tap.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/components/status-tap.js",
		2
	],
	"./stxlpqkl.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/components/stxlpqkl.js",
		"common",
		130
	],
	"./stxlpqkl.sc.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/components/stxlpqkl.sc.js",
		"common",
		131
	],
	"./tap-click.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/components/tap-click.js",
		"common"
	],
	"./txfdhs2w.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/components/txfdhs2w.js",
		"common",
		132
	],
	"./txfdhs2w.sc.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/components/txfdhs2w.sc.js",
		"common",
		133
	],
	"./tyhluajn.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/components/tyhluajn.js",
		"common",
		134
	],
	"./tyhluajn.sc.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/components/tyhluajn.sc.js",
		"common",
		135
	],
	"./uelgtckt.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/components/uelgtckt.js",
		"common",
		136
	],
	"./uelgtckt.sc.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/components/uelgtckt.sc.js",
		"common",
		137
	],
	"./vnlqynwa.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/components/vnlqynwa.js",
		"common",
		138
	],
	"./vnlqynwa.sc.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/components/vnlqynwa.sc.js",
		"common",
		139
	],
	"./w1mgqp47.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/components/w1mgqp47.js",
		"common",
		140
	],
	"./w1mgqp47.sc.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/components/w1mgqp47.sc.js",
		"common",
		141
	],
	"./woyxtltn.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/components/woyxtltn.js",
		"common",
		142
	],
	"./woyxtltn.sc.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/components/woyxtltn.sc.js",
		"common",
		143
	],
	"./xcsewabo.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/components/xcsewabo.js",
		144
	],
	"./xcsewabo.sc.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/components/xcsewabo.sc.js",
		145
	],
	"./xnzdjmmg.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/components/xnzdjmmg.js",
		146
	],
	"./xnzdjmmg.sc.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/components/xnzdjmmg.sc.js",
		147
	],
	"./xwmkkhy0.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/components/xwmkkhy0.js",
		"common",
		148
	],
	"./xwmkkhy0.sc.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/components/xwmkkhy0.sc.js",
		"common",
		149
	],
	"./xyjznrch.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/components/xyjznrch.js",
		"common",
		150
	],
	"./xyjznrch.sc.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/components/xyjznrch.sc.js",
		"common",
		151
	],
	"./yextj6m4.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/components/yextj6m4.js",
		"common",
		152
	],
	"./yextj6m4.sc.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/components/yextj6m4.sc.js",
		"common",
		153
	],
	"./ygot15ry.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/components/ygot15ry.js",
		"common",
		154
	],
	"./ygot15ry.sc.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/components/ygot15ry.sc.js",
		"common",
		155
	],
	"./yrpxz1br.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/components/yrpxz1br.js",
		"common",
		156
	],
	"./yrpxz1br.sc.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/components/yrpxz1br.sc.js",
		"common",
		157
	],
	"./ywug4gy4.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/components/ywug4gy4.js",
		"common",
		158
	],
	"./ywug4gy4.sc.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/components/ywug4gy4.sc.js",
		"common",
		159
	],
	"./zaltzdmz.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/components/zaltzdmz.js",
		"common",
		160
	],
	"./zaltzdmz.sc.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/components/zaltzdmz.sc.js",
		"common",
		161
	],
	"./zvhrhv7a.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/components/zvhrhv7a.js",
		162
	],
	"./zvhrhv7a.sc.js": [
		"../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/components/zvhrhv7a.sc.js",
		163
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
webpackAsyncContext.id = "../../node_modules/@ionic/angular/node_modules/@ionic/core/dist/esm/es5/components lazy recursive ^\\.\\/.*\\.js$";
module.exports = webpackAsyncContext;

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
	"./pages/home/home.page.module": [
		"./src/app/pages/home/home.page.module.ts",
		"common",
		"pages-home-home-page-module"
	],
	"./pages/login/login.page.module": [
		"./src/app/pages/login/login.page.module.ts",
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

module.exports = "<ion-app>\n  <ion-router-outlet main></ion-router-outlet>\n</ion-app>\n"

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
/* harmony import */ var _capacitor_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @capacitor/core */ "./node_modules/@capacitor/core/dist/esm/index.js");
/* harmony import */ var _ngxs_store__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ngxs/store */ "../../node_modules/@ngxs/store/fesm5/ngxs-store.js");
/* harmony import */ var _state_app_app_actions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./state/app/app.actions */ "./src/app/state/app/app.actions.ts");
/* harmony import */ var _constants_capacitor_const__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./constants/capacitor.const */ "./src/app/constants/capacitor.const.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

//import { isCapacitorNative } from '@ionic/core';





var ComponentApp = /** @class */ (function () {
    function ComponentApp(platform, store) {
        this.platform = platform;
        this.store = store;
        this.initializeApp();
    }
    ComponentApp.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            //            if (isCapacitorNative(window))
            //            {
            _constants_capacitor_const__WEBPACK_IMPORTED_MODULE_5__["StatusBar"].setStyle({ style: _capacitor_core__WEBPACK_IMPORTED_MODULE_2__["StatusBarStyle"].Dark });
            //            }
            _this.store.dispatch(new _state_app_app_actions__WEBPACK_IMPORTED_MODULE_4__["AppInitialize"]());
        });
    };
    ComponentApp = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html")
        }),
        __metadata("design:paramtypes", [_ionic_angular__WEBPACK_IMPORTED_MODULE_1__["Platform"], _ngxs_store__WEBPACK_IMPORTED_MODULE_3__["Store"]])
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
/*! exports provided: StatusBar */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StatusBar", function() { return StatusBar; });
/* harmony import */ var _capacitor_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @capacitor/core */ "./node_modules/@capacitor/core/dist/esm/index.js");

var StatusBar = _capacitor_core__WEBPACK_IMPORTED_MODULE_0__["Plugins"].StatusBar;


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
/* harmony import */ var _ionic_native_facebook_ngx__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ionic-native/facebook/ngx */ "../../node_modules/@ionic-native/facebook/ngx/index.js");
/* harmony import */ var _ionic_native_google_plus_ngx__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ionic-native/google-plus/ngx */ "../../node_modules/@ionic-native/google-plus/ngx/index.js");
/* harmony import */ var _ionic_native_firebase_ngx__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @ionic-native/firebase/ngx */ "../../node_modules/@ionic-native/firebase/ngx/index.js");
/* harmony import */ var _angular_fire_auth__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/fire/auth */ "../../node_modules/@angular/fire/auth/index.js");
/* harmony import */ var _angular_fire_firestore__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/fire/firestore */ "../../node_modules/@angular/fire/firestore/index.js");
/* harmony import */ var _theory_ionic__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @theory/ionic */ "../../xplat/ionic/index.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _state_app_app_state__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../state/app/app.state */ "./src/app/state/app/app.state.ts");
/* harmony import */ var _state_language_language_state__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../state/language/language.state */ "./src/app/state/language/language.state.ts");
/* harmony import */ var _state_location_location_state__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../state/location/location.state */ "./src/app/state/location/location.state.ts");
/* harmony import */ var _state_device_device_state__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../state/device/device.state */ "./src/app/state/device/device.state.ts");
/* harmony import */ var _state_user_user_state__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../state/user/user.state */ "./src/app/state/user/user.state.ts");
/* harmony import */ var _state_notifications_notifications_state__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ../state/notifications/notifications.state */ "./src/app/state/notifications/notifications.state.ts");
/* harmony import */ var _state_cluster_cluster_state__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ../state/cluster/cluster.state */ "./src/app/state/cluster/cluster.state.ts");
/* harmony import */ var _state_places_places_state__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ../state/places/places.state */ "./src/app/state/places/places.state.ts");
/* harmony import */ var _state_icons_icons_state__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ../state/icons/icons.state */ "./src/app/state/icons/icons.state.ts");
/* harmony import */ var _state_subscriptions_subscriptions_state__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ../state/subscriptions/subscriptions.state */ "./src/app/state/subscriptions/subscriptions.state.ts");
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
                _theory_ionic__WEBPACK_IMPORTED_MODULE_13__["AppIonicCoreModule"],
                _angular_fire__WEBPACK_IMPORTED_MODULE_1__["AngularFireModule"].initializeApp(_environments_environment__WEBPACK_IMPORTED_MODULE_14__["environment"].apis.firebase),
                _angular_fire_auth__WEBPACK_IMPORTED_MODULE_11__["AngularFireAuthModule"],
                _angular_fire_firestore__WEBPACK_IMPORTED_MODULE_12__["AngularFirestoreModule"],
                _ngxs_store__WEBPACK_IMPORTED_MODULE_4__["NgxsModule"].forRoot([
                    _state_app_app_state__WEBPACK_IMPORTED_MODULE_15__["StateApp"],
                    _state_language_language_state__WEBPACK_IMPORTED_MODULE_16__["StateLanguage"],
                    _state_location_location_state__WEBPACK_IMPORTED_MODULE_17__["StateLocation"],
                    _state_device_device_state__WEBPACK_IMPORTED_MODULE_18__["StateDevice"],
                    _state_user_user_state__WEBPACK_IMPORTED_MODULE_19__["StateUser"],
                    _state_notifications_notifications_state__WEBPACK_IMPORTED_MODULE_20__["StateNotifications"],
                    _state_cluster_cluster_state__WEBPACK_IMPORTED_MODULE_21__["StateCluster"],
                    _state_places_places_state__WEBPACK_IMPORTED_MODULE_22__["StatePlaces"],
                    _state_icons_icons_state__WEBPACK_IMPORTED_MODULE_23__["StateIcons"],
                    _state_subscriptions_subscriptions_state__WEBPACK_IMPORTED_MODULE_24__["StateSubscriptions"]
                ]),
                _ngxs_devtools_plugin__WEBPACK_IMPORTED_MODULE_5__["NgxsReduxDevtoolsPluginModule"].forRoot({ disabled: _environments_environment__WEBPACK_IMPORTED_MODULE_14__["environment"].production }),
                ngx_mapbox_gl__WEBPACK_IMPORTED_MODULE_6__["NgxMapboxGLModule"].withConfig({ accessToken: _environments_environment__WEBPACK_IMPORTED_MODULE_14__["environment"].apis.maps.accessToken })
            ],
            providers: [
                _ionic_native_globalization_ngx__WEBPACK_IMPORTED_MODULE_7__["Globalization"],
                _ionic_native_facebook_ngx__WEBPACK_IMPORTED_MODULE_8__["Facebook"],
                _ionic_native_google_plus_ngx__WEBPACK_IMPORTED_MODULE_9__["GooglePlus"],
                _ionic_native_firebase_ngx__WEBPACK_IMPORTED_MODULE_10__["Firebase"],
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
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "../../node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var rxjs_observable_fromPromise__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/observable/fromPromise */ "../../node_modules/rxjs-compat/_esm5/observable/fromPromise.js");
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
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(function (actions) {
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
        return Object(rxjs_observable_fromPromise__WEBPACK_IMPORTED_MODULE_3__["fromPromise"])(document.set(cluster)).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["switchMap"])(function () { return document.valueChanges(); }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["filter"])(function (cluster) { return cluster.dateCreated != null; }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["take"])(1));
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
/* harmony import */ var rxjs_observable_fromPromise__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/observable/fromPromise */ "../../node_modules/rxjs-compat/_esm5/observable/fromPromise.js");
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
        return Object(rxjs_observable_fromPromise__WEBPACK_IMPORTED_MODULE_2__["fromPromise"])(document.set(icon)).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["switchMap"])(function () { return document.valueChanges(); }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["filter"])(function (icon) { return icon.dateCreated != null; }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["take"])(1));
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

/***/ "./src/app/state/app/app.actions.ts":
/*!******************************************!*\
  !*** ./src/app/state/app/app.actions.ts ***!
  \******************************************/
/*! exports provided: ActionsApp, AppInitialize */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ActionsApp", function() { return ActionsApp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppInitialize", function() { return AppInitialize; });
var ActionsApp;
(function (ActionsApp) {
    ActionsApp["AppInitialize"] = "[App] App Initialize";
})(ActionsApp || (ActionsApp = {}));
var AppInitialize = /** @class */ (function () {
    function AppInitialize() {
    }
    AppInitialize.type = ActionsApp.AppInitialize;
    return AppInitialize;
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
/* harmony import */ var _location_location_actions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../location/location.actions */ "./src/app/state/location/location.actions.ts");
/* harmony import */ var _language_language_actions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../language/language.actions */ "./src/app/state/language/language.actions.ts");
/* harmony import */ var _app_actions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app.actions */ "./src/app/state/app/app.actions.ts");
/* harmony import */ var _device_device_actions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../device/device.actions */ "./src/app/state/device/device.actions.ts");
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
    StateApp.prototype.appInitialize = function (_a) {
        var dispatch = _a.dispatch;
        dispatch(new _device_device_actions__WEBPACK_IMPORTED_MODULE_4__["DeviceInitialize"]());
        dispatch(new _language_language_actions__WEBPACK_IMPORTED_MODULE_2__["LanguageInitialize"]());
        dispatch(new _location_location_actions__WEBPACK_IMPORTED_MODULE_1__["LocationWatch"]());
    };
    __decorate([
        Object(_ngxs_store__WEBPACK_IMPORTED_MODULE_0__["Action"])(_app_actions__WEBPACK_IMPORTED_MODULE_3__["AppInitialize"]),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], StateApp.prototype, "appInitialize", null);
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
        var patchState = _a.patchState, dispatch = _a.dispatch;
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
/* harmony import */ var rxjs_observable_fromPromise__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/observable/fromPromise */ "../../node_modules/rxjs-compat/_esm5/observable/fromPromise.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ "../../node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "../../node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ngx-translate/core */ "../../node_modules/@ngx-translate/core/fesm5/ngx-translate-core.js");
/* harmony import */ var _ionic_native_globalization_ngx__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic-native/globalization/ngx */ "../../node_modules/@ionic-native/globalization/ngx/index.js");
/* harmony import */ var _enums_platform_enum__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../enums/platform.enum */ "./src/app/enums/platform.enum.ts");
/* harmony import */ var _language_actions__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./language.actions */ "./src/app/state/language/language.actions.ts");
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
    StateLanguage.prototype.languageInitialize = function () {
        this.translate.setDefaultLang('en');
    };
    StateLanguage.prototype.languageGet = function (_a) {
        var patchState = _a.patchState, dispatch = _a.dispatch;
        var observable;
        if (this.platform.is(_enums_platform_enum__WEBPACK_IMPORTED_MODULE_7__["PlatformEnum"].Cordova)) {
            observable = Object(rxjs_observable_fromPromise__WEBPACK_IMPORTED_MODULE_2__["fromPromise"])(this.globalization.getLocaleName());
        }
        else {
            observable = Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["of"])({ value: navigator.language });
        }
        return observable.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["switchMap"])(function (language) { return dispatch(new _language_actions__WEBPACK_IMPORTED_MODULE_8__["LanguageSet"](language.value)); }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["catchError"])(function (error) { return Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["of"])(patchState({ error: error })); }));
    };
    StateLanguage.prototype.languageSet = function (_a, _b) {
        var patchState = _a.patchState;
        var payload = _b.payload;
        var language = payload;
        this.translate.use(language);
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["of"])(patchState({ language: language }));
    };
    __decorate([
        Object(_ngxs_store__WEBPACK_IMPORTED_MODULE_0__["Action"])(_language_actions__WEBPACK_IMPORTED_MODULE_8__["LanguageInitialize"]),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], StateLanguage.prototype, "languageInitialize", null);
    __decorate([
        Object(_ngxs_store__WEBPACK_IMPORTED_MODULE_0__["Action"])(_language_actions__WEBPACK_IMPORTED_MODULE_8__["LanguageGet"]),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], StateLanguage.prototype, "languageGet", null);
    __decorate([
        Object(_ngxs_store__WEBPACK_IMPORTED_MODULE_0__["Action"])(_language_actions__WEBPACK_IMPORTED_MODULE_8__["LanguageSet"]),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, _language_actions__WEBPACK_IMPORTED_MODULE_8__["LanguageSet"]]),
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
        __metadata("design:paramtypes", [_ionic_native_globalization_ngx__WEBPACK_IMPORTED_MODULE_6__["Globalization"], _ionic_angular__WEBPACK_IMPORTED_MODULE_1__["Platform"], _ngx_translate_core__WEBPACK_IMPORTED_MODULE_5__["TranslateService"]])
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
    StateLocation.prototype.locationWatch = function (_a) {
        var patchState = _a.patchState;
        /*
                return Plugins.Geolocation.
        
                watchPosition({enableHighAccuracy: true},
        
                (location, error) =>
                {
                    if (error != null)
                    {
                        console.log(location);
                        patchState({error});
                    }
                    else
                    {
                        console.log(location);
                        patchState({location});
                    }
                });
        */
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
/* harmony import */ var rxjs_observable_fromPromise__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/observable/fromPromise */ "../../node_modules/rxjs-compat/_esm5/observable/fromPromise.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "../../node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _ionic_native_firebase_ngx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic-native/firebase/ngx */ "../../node_modules/@ionic-native/firebase/ngx/index.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "../../node_modules/@ionic/angular/dist/index.js");
/* harmony import */ var _notifications_actions__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./notifications.actions */ "./src/app/state/notifications/notifications.actions.ts");
/* harmony import */ var _user_user_actions__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../user/user.actions */ "./src/app/state/user/user.actions.ts");
/* harmony import */ var _services_notifications_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../services/notifications.service */ "./src/app/services/notifications.service.ts");
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
    StateNotifications.notifications = function (state) { return state.notificationsPush; };
    StateNotifications.notification = function (state) { return state.notificationPush; };
    StateNotifications.hasPushNotifications = function (state) { return state.notificationsPush.length > 0; };
    StateNotifications.prototype.notificationsWatch = function (_a) {
        var patchState = _a.patchState, getState = _a.getState, dispatch = _a.dispatch;
        this.firebaseNative.onNotificationOpen().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["tap"])(function (notificationPush) {
            return patchState({
                notificationPush: notificationPush,
                notificationsPush: getState().notificationsPush.concat([
                    notificationPush
                ])
            });
        }));
        var permission$ = this.platform.is('ios') ? Object(rxjs_observable_fromPromise__WEBPACK_IMPORTED_MODULE_2__["fromPromise"])(this.firebaseNative.grantPermission()) : Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["of"])(undefined);
        var token$ = this.platform.is('cordova') ? Object(rxjs_observable_fromPromise__WEBPACK_IMPORTED_MODULE_2__["fromPromise"])(this.firebaseNative.getToken()) : Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["of"])(undefined);
        return permission$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["switchMap"])(function () { return token$; }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["filter"])(function (token) { return token != null; }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["switchMap"])(function (token) { return dispatch(new _user_user_actions__WEBPACK_IMPORTED_MODULE_7__["UserAddToken"](token)); }));
    };
    StateNotifications.prototype.notificationsGet = function (_a) {
        var patchState = _a.patchState;
        return this.serviceNotifications.get().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["tap"])(function (notifications) { return patchState({ notifications: notifications }); }));
    };
    __decorate([
        Object(_ngxs_store__WEBPACK_IMPORTED_MODULE_0__["Action"])(_notifications_actions__WEBPACK_IMPORTED_MODULE_6__["NotificationsWatch"]),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], StateNotifications.prototype, "notificationsWatch", null);
    __decorate([
        Object(_ngxs_store__WEBPACK_IMPORTED_MODULE_0__["Action"])(_notifications_actions__WEBPACK_IMPORTED_MODULE_6__["NotificationsGet"]),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], StateNotifications.prototype, "notificationsGet", null);
    __decorate([
        Object(_ngxs_store__WEBPACK_IMPORTED_MODULE_0__["Selector"])(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], StateNotifications, "notifications", null);
    __decorate([
        Object(_ngxs_store__WEBPACK_IMPORTED_MODULE_0__["Selector"])(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], StateNotifications, "notification", null);
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
                notificationsPush: [],
                notificationPush: undefined
            }
        }),
        __metadata("design:paramtypes", [_ionic_native_firebase_ngx__WEBPACK_IMPORTED_MODULE_4__["Firebase"], _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["Platform"], _services_notifications_service__WEBPACK_IMPORTED_MODULE_8__["ServiceNotifications"]])
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
/*! exports provided: ActionsUser, UserAuthenticate, UserAuthenticateCheck, UserGet, UserCreate, UserAddToken, LoginEmail, LoginFacebook, LoginFacebookBrowser, LoginFacebookDevice, LoginGoogle, LoginGoogleBrowser, LoginGoogleDevice, UserLogout, UserSet */
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
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginFacebook", function() { return LoginFacebook; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginFacebookBrowser", function() { return LoginFacebookBrowser; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginFacebookDevice", function() { return LoginFacebookDevice; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginGoogle", function() { return LoginGoogle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginGoogleBrowser", function() { return LoginGoogleBrowser; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginGoogleDevice", function() { return LoginGoogleDevice; });
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
    ActionsUser["LoginFacebook"] = "[User] Login Facebook";
    ActionsUser["LoginFacebookBrowser"] = "[User] Login Facebook Browser";
    ActionsUser["LoginFacebookDevice"] = "[User] Login Facebook Device";
    ActionsUser["LoginGoogle"] = "[User] Login Google";
    ActionsUser["LoginGoogleBrowser"] = "[User] Login Google Browser";
    ActionsUser["LoginGoogleDevice"] = "[User] Login Google Device";
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

var LoginFacebook = /** @class */ (function () {
    function LoginFacebook() {
    }
    LoginFacebook.type = ActionsUser.LoginFacebook;
    return LoginFacebook;
}());

var LoginFacebookBrowser = /** @class */ (function () {
    function LoginFacebookBrowser() {
    }
    LoginFacebookBrowser.type = ActionsUser.LoginFacebookBrowser;
    return LoginFacebookBrowser;
}());

var LoginFacebookDevice = /** @class */ (function () {
    function LoginFacebookDevice() {
    }
    LoginFacebookDevice.type = ActionsUser.LoginFacebookDevice;
    return LoginFacebookDevice;
}());

var LoginGoogle = /** @class */ (function () {
    function LoginGoogle() {
    }
    LoginGoogle.type = ActionsUser.LoginGoogle;
    return LoginGoogle;
}());

var LoginGoogleBrowser = /** @class */ (function () {
    function LoginGoogleBrowser() {
    }
    LoginGoogleBrowser.type = ActionsUser.LoginGoogleBrowser;
    return LoginGoogleBrowser;
}());

var LoginGoogleDevice = /** @class */ (function () {
    function LoginGoogleDevice() {
    }
    LoginGoogleDevice.type = ActionsUser.LoginGoogleDevice;
    return LoginGoogleDevice;
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
/* harmony import */ var rxjs_observable_fromPromise__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/observable/fromPromise */ "../../node_modules/rxjs-compat/_esm5/observable/fromPromise.js");
/* harmony import */ var _angular_fire_auth__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/fire/auth */ "../../node_modules/@angular/fire/auth/index.js");
/* harmony import */ var _angular_fire_firestore__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/fire/firestore */ "../../node_modules/@angular/fire/firestore/index.js");
/* harmony import */ var _ionic_native_facebook_ngx__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ionic-native/facebook/ngx */ "../../node_modules/@ionic-native/facebook/ngx/index.js");
/* harmony import */ var _ionic_native_google_plus_ngx__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ionic-native/google-plus/ngx */ "../../node_modules/@ionic-native/google-plus/ngx/index.js");
/* harmony import */ var _enums_platform_enum__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../enums/platform.enum */ "./src/app/enums/platform.enum.ts");
/* harmony import */ var _language_language_state__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../language/language.state */ "./src/app/state/language/language.state.ts");
/* harmony import */ var _language_language_actions__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../language/language.actions */ "./src/app/state/language/language.actions.ts");
/* harmony import */ var _user_actions__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./user.actions */ "./src/app/state/user/user.actions.ts");
/* harmony import */ var _alert_alert_actions__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../alert/alert.actions */ "./src/app/state/alert/alert.actions.ts");
/* harmony import */ var _notifications_notifications_actions__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../notifications/notifications.actions */ "./src/app/state/notifications/notifications.actions.ts");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @ionic/angular */ "../../node_modules/@ionic/angular/dist/index.js");
/* harmony import */ var _enums_auth_provider_enum__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../enums/auth-provider.enum */ "./src/app/enums/auth-provider.enum.ts");
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
    function StateUser(auth, firestore, facebook, googlePlus, platform) {
        this.auth = auth;
        this.firestore = firestore;
        this.facebook = facebook;
        this.googlePlus = googlePlus;
        this.platform = platform;
    }
    StateUser.authData = function (state) { return state.authData; };
    StateUser.user = function (state) { return state.authenticated; };
    StateUser.authenticated = function (state) { return state.user; };
    StateUser.error = function (state) { return state.error; };
    StateUser.errored = function (state) { return state.error != null; };
    StateUser.userFound = function (state) { return state.user != null; };
    StateUser.prototype.userAuthenticate = function (_a) {
        var patchState = _a.patchState, dispatch = _a.dispatch;
        return this.auth.authState.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["switchMap"])(function (authData) {
            if (authData == null) {
                patchState({ authenticated: false, authData: authData });
                return dispatch(new _language_language_actions__WEBPACK_IMPORTED_MODULE_11__["LanguageGet"]());
            }
            else {
                patchState({ authData: authData });
                return dispatch(new _user_actions__WEBPACK_IMPORTED_MODULE_12__["UserGet"](authData));
            }
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["take"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(function (error) { return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["of"])(patchState({ error: error })); }));
    };
    StateUser.prototype.userAuthenticateCheck = function (_a, _b) {
        var patchState = _a.patchState, dispatch = _a.dispatch;
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
                user.uidInternal = providerId + ':' + providerId === _enums_auth_provider_enum__WEBPACK_IMPORTED_MODULE_16__["AuthProvider"].Email ? email : user.uid;
                patchState({ authData: authData, authenticated: true, user: user });
            }
        }));
    };
    StateUser.prototype.userGet = function (_a, _b) {
        var patchState = _a.patchState, dispatch = _a.dispatch;
        var payload = _b.payload;
        var providerData = payload.providerData[0];
        var providerId = providerData.providerId;
        var uidInternal = providerId + ':' + (providerId === _enums_auth_provider_enum__WEBPACK_IMPORTED_MODULE_16__["AuthProvider"].Email ? providerData.email : providerData.uid);
        return this.firestore.doc("user/" + uidInternal).valueChanges().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["filter"])(function (user) { return user != null; }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["take"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["tap"])(function (user) {
            if (user == null) {
                patchState({ error: { name: 'Could not find user', message: 'Could not find user' } });
            }
            else {
                patchState({ user: user, authenticated: true });
                dispatch(new _language_language_actions__WEBPACK_IMPORTED_MODULE_11__["LanguageSet"](user.language));
                dispatch(new _alert_alert_actions__WEBPACK_IMPORTED_MODULE_13__["AlertsGet"]());
                //                    dispatch(new NotificationsWatch());
                dispatch(new _notifications_notifications_actions__WEBPACK_IMPORTED_MODULE_14__["NotificationsGet"]());
            }
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
        return Object(rxjs_observable_fromPromise__WEBPACK_IMPORTED_MODULE_4__["fromPromise"])(firebase_app__WEBPACK_IMPORTED_MODULE_0__["auth"]().signInWithEmailAndPassword(payload.id, payload.password)).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["switchMap"])(function (authData) { return dispatch(new _user_actions__WEBPACK_IMPORTED_MODULE_12__["UserAuthenticateCheck"](authData.user)); }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(function (error) { return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["of"])(patchState({ error: error })); }));
    };
    StateUser.prototype.loginFacebook = function (_a) {
        var dispatch = _a.dispatch;
        return this.platform.is(_enums_platform_enum__WEBPACK_IMPORTED_MODULE_9__["PlatformEnum"].Cordova) ? dispatch(new _user_actions__WEBPACK_IMPORTED_MODULE_12__["LoginFacebookDevice"]()) : dispatch(new _user_actions__WEBPACK_IMPORTED_MODULE_12__["LoginFacebookBrowser"]());
    };
    StateUser.prototype.loginFacebookBrowser = function (_a) {
        var patchState = _a.patchState, dispatch = _a.dispatch;
        return Object(rxjs_observable_fromPromise__WEBPACK_IMPORTED_MODULE_4__["fromPromise"])(this.auth.auth.signInWithPopup(new firebase_app__WEBPACK_IMPORTED_MODULE_0__["auth"].FacebookAuthProvider())).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["switchMap"])(function (response) { return dispatch(new _user_actions__WEBPACK_IMPORTED_MODULE_12__["UserAuthenticateCheck"](response.user)); }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(function (error) { return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["of"])(patchState({ error: error })); }));
    };
    StateUser.prototype.loginFacebookDevice = function (_a) {
        var patchState = _a.patchState, dispatch = _a.dispatch;
        return Object(rxjs_observable_fromPromise__WEBPACK_IMPORTED_MODULE_4__["fromPromise"])(this.facebook.login(['email'])).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["switchMap"])(function (response) {
            var credential = firebase_app__WEBPACK_IMPORTED_MODULE_0__["auth"].FacebookAuthProvider.credential(response.authResponse.accessToken);
            return Object(rxjs_observable_fromPromise__WEBPACK_IMPORTED_MODULE_4__["fromPromise"])(firebase_app__WEBPACK_IMPORTED_MODULE_0__["auth"]().signInWithCredential(credential));
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["switchMap"])(function (user) { return dispatch(new _user_actions__WEBPACK_IMPORTED_MODULE_12__["UserAuthenticateCheck"](user)); }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(function (error) { return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["of"])(patchState({ error: error })); }));
    };
    StateUser.prototype.loginGoogle = function (_a) {
        var dispatch = _a.dispatch;
        return this.platform.is(_enums_platform_enum__WEBPACK_IMPORTED_MODULE_9__["PlatformEnum"].Cordova) ? dispatch(new _user_actions__WEBPACK_IMPORTED_MODULE_12__["LoginGoogleDevice"]()) : dispatch(new _user_actions__WEBPACK_IMPORTED_MODULE_12__["LoginGoogleBrowser"]());
    };
    StateUser.prototype.loginGoogleBrowser = function (_a) {
        var patchState = _a.patchState, dispatch = _a.dispatch;
        return Object(rxjs_observable_fromPromise__WEBPACK_IMPORTED_MODULE_4__["fromPromise"])(this.auth.auth.signInWithPopup(new firebase_app__WEBPACK_IMPORTED_MODULE_0__["auth"].GoogleAuthProvider())).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["switchMap"])(function (response) { return dispatch(new _user_actions__WEBPACK_IMPORTED_MODULE_12__["UserAuthenticateCheck"](response.user)); }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(function (error) { return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["of"])(patchState({ error: error })); }));
    };
    StateUser.prototype.loginGoogleDevice = function (_a) {
        var patchState = _a.patchState, dispatch = _a.dispatch;
        return Object(rxjs_observable_fromPromise__WEBPACK_IMPORTED_MODULE_4__["fromPromise"])(this.facebook.login(['email'])).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["switchMap"])(function (response) {
            var credential = firebase_app__WEBPACK_IMPORTED_MODULE_0__["auth"].FacebookAuthProvider.credential(response.authResponse.accessToken);
            return Object(rxjs_observable_fromPromise__WEBPACK_IMPORTED_MODULE_4__["fromPromise"])(firebase_app__WEBPACK_IMPORTED_MODULE_0__["auth"]().signInWithCredential(credential)).
                pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["switchMap"])(function (user) { return dispatch(new _user_actions__WEBPACK_IMPORTED_MODULE_12__["UserAuthenticateCheck"](user)); }));
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(function (error) { return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["of"])(patchState({ error: error })); }));
    };
    StateUser.prototype.userLogout = function (_a) {
        var patchState = _a.patchState, dispatch = _a.dispatch;
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["of"])(this.auth.auth.signOut()).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["tap"])(function () {
            patchState({
                authenticated: false,
                authData: undefined,
                user: undefined
            });
            dispatch(new _user_actions__WEBPACK_IMPORTED_MODULE_12__["UserLogout"]());
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(function (error) { return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["of"])(patchState({ error: error })); }));
    };
    __decorate([
        Object(_ngxs_store__WEBPACK_IMPORTED_MODULE_1__["Select"])(_language_language_state__WEBPACK_IMPORTED_MODULE_10__["StateLanguage"].language),
        __metadata("design:type", rxjs__WEBPACK_IMPORTED_MODULE_2__["Observable"])
    ], StateUser.prototype, "language$", void 0);
    __decorate([
        Object(_ngxs_store__WEBPACK_IMPORTED_MODULE_1__["Action"])(_user_actions__WEBPACK_IMPORTED_MODULE_12__["UserAuthenticate"]),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], StateUser.prototype, "userAuthenticate", null);
    __decorate([
        Object(_ngxs_store__WEBPACK_IMPORTED_MODULE_1__["Action"])(_user_actions__WEBPACK_IMPORTED_MODULE_12__["UserAuthenticateCheck"]),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, _user_actions__WEBPACK_IMPORTED_MODULE_12__["UserAuthenticateCheck"]]),
        __metadata("design:returntype", void 0)
    ], StateUser.prototype, "userAuthenticateCheck", null);
    __decorate([
        Object(_ngxs_store__WEBPACK_IMPORTED_MODULE_1__["Action"])(_user_actions__WEBPACK_IMPORTED_MODULE_12__["UserGet"]),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, _user_actions__WEBPACK_IMPORTED_MODULE_12__["UserGet"]]),
        __metadata("design:returntype", void 0)
    ], StateUser.prototype, "userGet", null);
    __decorate([
        Object(_ngxs_store__WEBPACK_IMPORTED_MODULE_1__["Action"])(_user_actions__WEBPACK_IMPORTED_MODULE_12__["UserAddToken"]),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, _user_actions__WEBPACK_IMPORTED_MODULE_12__["UserAddToken"]]),
        __metadata("design:returntype", void 0)
    ], StateUser.prototype, "userAddToken", null);
    __decorate([
        Object(_ngxs_store__WEBPACK_IMPORTED_MODULE_1__["Action"])(_user_actions__WEBPACK_IMPORTED_MODULE_12__["LoginEmail"]),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, _user_actions__WEBPACK_IMPORTED_MODULE_12__["LoginEmail"]]),
        __metadata("design:returntype", void 0)
    ], StateUser.prototype, "loginEmail", null);
    __decorate([
        Object(_ngxs_store__WEBPACK_IMPORTED_MODULE_1__["Action"])(_user_actions__WEBPACK_IMPORTED_MODULE_12__["LoginFacebook"]),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], StateUser.prototype, "loginFacebook", null);
    __decorate([
        Object(_ngxs_store__WEBPACK_IMPORTED_MODULE_1__["Action"])(_user_actions__WEBPACK_IMPORTED_MODULE_12__["LoginFacebookBrowser"]),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], StateUser.prototype, "loginFacebookBrowser", null);
    __decorate([
        Object(_ngxs_store__WEBPACK_IMPORTED_MODULE_1__["Action"])(_user_actions__WEBPACK_IMPORTED_MODULE_12__["LoginFacebookDevice"]),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], StateUser.prototype, "loginFacebookDevice", null);
    __decorate([
        Object(_ngxs_store__WEBPACK_IMPORTED_MODULE_1__["Action"])(_user_actions__WEBPACK_IMPORTED_MODULE_12__["LoginGoogle"]),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], StateUser.prototype, "loginGoogle", null);
    __decorate([
        Object(_ngxs_store__WEBPACK_IMPORTED_MODULE_1__["Action"])(_user_actions__WEBPACK_IMPORTED_MODULE_12__["LoginGoogleBrowser"]),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], StateUser.prototype, "loginGoogleBrowser", null);
    __decorate([
        Object(_ngxs_store__WEBPACK_IMPORTED_MODULE_1__["Action"])(_user_actions__WEBPACK_IMPORTED_MODULE_12__["LoginGoogleDevice"]),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], StateUser.prototype, "loginGoogleDevice", null);
    __decorate([
        Object(_ngxs_store__WEBPACK_IMPORTED_MODULE_1__["Action"])(_user_actions__WEBPACK_IMPORTED_MODULE_12__["UserLogout"]),
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
    StateUser = __decorate([
        Object(_ngxs_store__WEBPACK_IMPORTED_MODULE_1__["State"])({
            name: 'user',
            defaults: {
                authData: undefined,
                user: undefined,
                error: undefined,
                authenticated: false
            }
        }),
        __metadata("design:paramtypes", [_angular_fire_auth__WEBPACK_IMPORTED_MODULE_5__["AngularFireAuth"], _angular_fire_firestore__WEBPACK_IMPORTED_MODULE_6__["AngularFirestore"], _ionic_native_facebook_ngx__WEBPACK_IMPORTED_MODULE_7__["Facebook"], _ionic_native_google_plus_ngx__WEBPACK_IMPORTED_MODULE_8__["GooglePlus"], _ionic_angular__WEBPACK_IMPORTED_MODULE_15__["Platform"]])
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

module.exports = __webpack_require__(/*! /Users/andredavcev/Files/Theory/apps/ionic-firefly/src/main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map