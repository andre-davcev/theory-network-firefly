webpackJsonp([9],{

/***/ 1020:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PagePublisherBeacon; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__page__ = __webpack_require__(516);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var PagePublisherBeacon = /** @class */ (function (_super) {
    __extends(PagePublisherBeacon, _super);
    function PagePublisherBeacon() {
        return _super.call(this) || this;
    }
    PagePublisherBeacon = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-page-publisher-beacon',template:/*ion-inline-start:"/Users/andredavcev/Files/Firefly/app/src/pages/publisher.beacon/publisher.beacon.html"*/'<ion-header>\n    <ion-navbar>\n        <ion-title>{{\'pages.publisher.beacon.title\' | translate}}</ion-title>\n        <ion-buttons end>\n            <button ion-button icon-only>\n                <ion-icon name="cloud-upload"></ion-icon>\n            </button>\n        </ion-buttons>\n    </ion-navbar>\n</ion-header>\n  \n<ion-content>\n    <ion-item-group>\n        <ion-item-divider color="primary"></ion-item-divider>\n\n        <ion-item>\n            <ion-toggle checked="true" color="secondary"></ion-toggle>\n            <ion-label>{{\'pages.publisher.beacon.private\' | translate}}</ion-label>\n        </ion-item>\n    </ion-item-group>\n\n    <ion-item-group>\n        <ion-item-divider color="primary">{{\'pages.publisher.beacon.major\' | translate}}</ion-item-divider>\n\n        <ion-item>\n            <ion-label>{{\'pages.publisher.beacon.label\' | translate}}</ion-label>\n            <ion-input type="text" value=""></ion-input>\n        </ion-item>\n\n        <ion-item>\n            <ion-label>{{\'pages.publisher.beacon.value\' | translate}}</ion-label>\n            <ion-input type="number" value=""></ion-input>\n        </ion-item>\n    </ion-item-group>\n\n    <ion-item-group>\n        <ion-item-divider color="primary">{{\'pages.publisher.beacon.minor\' | translate}}</ion-item-divider>\n\n        <ion-item>\n            <ion-label>{{\'pages.publisher.beacon.label\' | translate}}</ion-label>\n            <ion-input type="text" value=""></ion-input>\n        </ion-item>\n\n        <ion-item>\n            <ion-label>{{\'pages.publisher.beacon.value\' | translate}}</ion-label>\n            <ion-input type="number" value=""></ion-input>\n        </ion-item>\n    </ion-item-group>\n\n    <ion-item-group>\n        <ion-item-divider color="primary">{{dictionary.minor}}</ion-item-divider>\n\n        <ion-item>\n            <ion-label>{{\'pages.publisher.beacon.label\' | translate}}</ion-label>\n            <ion-input type="text" value=""></ion-input>\n        </ion-item>\n\n        <ion-item>\n            <ion-label>{{\'pages.publisher.beacon.value\' | translate}}</ion-label>\n            <ion-input type="number" value=""></ion-input>\n        </ion-item>\n    </ion-item-group>\n</ion-content>'/*ion-inline-end:"/Users/andredavcev/Files/Firefly/app/src/pages/publisher.beacon/publisher.beacon.html"*/
        }),
        __metadata("design:paramtypes", [])
    ], PagePublisherBeacon);
    return PagePublisherBeacon;
}(__WEBPACK_IMPORTED_MODULE_1__page__["a" /* Page */]));

//# sourceMappingURL=publisher.beacon.js.map

/***/ }),

/***/ 987:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ModulePagePublisherBeacon", function() { return ModulePagePublisherBeacon; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__ = __webpack_require__(109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__publisher_beacon__ = __webpack_require__(1020);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var ModulePagePublisherBeacon = /** @class */ (function () {
    function ModulePagePublisherBeacon() {
    }
    ModulePagePublisherBeacon = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__["b" /* TranslateModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["IonicPageModule"].forChild(__WEBPACK_IMPORTED_MODULE_3__publisher_beacon__["a" /* PagePublisherBeacon */])
            ],
            declarations: [__WEBPACK_IMPORTED_MODULE_3__publisher_beacon__["a" /* PagePublisherBeacon */]]
        })
    ], ModulePagePublisherBeacon);
    return ModulePagePublisherBeacon;
}());

//# sourceMappingURL=publisher.beacon.module.js.map

/***/ })

});
//# sourceMappingURL=9.js.map