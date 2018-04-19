webpackJsonp([13],{

/***/ 1007:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PageAlerts; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_alerts__ = __webpack_require__(256);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_page__ = __webpack_require__(516);
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






var PageAlerts = /** @class */ (function (_super) {
    __extends(PageAlerts, _super);
    function PageAlerts(alertController, alertsObject) {
        var _this = _super.call(this) || this;
        _this.alertController = alertController;
        _this.alertsObject = alertsObject;
        _this.segment = 'fired';
        _this.alerts = alertsObject.alerts;
        alertsObject.view(0);
        return _this;
    }
    PageAlerts.prototype.slideChanged = function () {
        this.alertsObject.view(this.slides.getActiveIndex());
    };
    PageAlerts.prototype.deleteConfirm = function () {
        /*
        let confirm = this.alertController.create
        ({
            title   : dictionary.deleteConfirmTitle,
            message : dictionary.deleteConfirmMessage,
            buttons :
            [
                {
                    text    : dictionary.deleteConfirmDisagree,
                    handler : () => {}
                },

                {
                    text    : dictionary.deleteConfirmAgree,
                    handler : () =>
                    {
                        let
                        index = this.slides.getActiveIndex();

                        this.alertsObject.delete(index);

                        if (this.slides.isEnd())
                        {
                            this.slides.slideTo(index - 1);
                        }

                        this.slides.update();
                    }
                }
            ]
        });

        confirm.present();
                */
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["Slides"]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["Slides"])
    ], PageAlerts.prototype, "slides", void 0);
    PageAlerts = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-page-alerts',template:/*ion-inline-start:"/Users/andredavcev/Files/Firefly/app/src/pages/alerts/alerts.html"*/'<ion-header class="app-transparent ff-page-alerts">\n    <ion-navbar transparent>\n        <ion-buttons end>\n            <button ion-button icon-only (click)="deleteConfirm()">\n                <ion-icon name="trash"></ion-icon>\n            </button>\n            <button ion-button icon-only>\n                <ion-icon name="options"></ion-icon>\n            </button>\n        </ion-buttons>\n    </ion-navbar>\n</ion-header>\n\n<ion-content class="ff-primary-background">\n    <ion-slides ion-fixed pager (ionSlideDidChange)="slideChanged()">\n        <ion-slide *ngFor="let alert of alerts">\n            <div class="ff-card">\n                <h1 class="ff-title">{{alert.title}}</h1>\n                <h2 class="ff-short">{{alert.short}}</h2>\n                <img class="ff-image" [src]="alert.image">\n                <button class="ff-button">{{\'pages.alerts.addCoupon\' | translate}}</button>\n                <p class="ff-paragraph">{{alert.date}}</p>\n            </div>\n        </ion-slide>\n    </ion-slides>\n</ion-content>'/*ion-inline-end:"/Users/andredavcev/Files/Firefly/app/src/pages/alerts/alerts.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["AlertController"], __WEBPACK_IMPORTED_MODULE_2__services_alerts__["a" /* Alerts */]])
    ], PageAlerts);
    return PageAlerts;
}(__WEBPACK_IMPORTED_MODULE_3__pages_page__["a" /* Page */]));

//# sourceMappingURL=alerts.js.map

/***/ }),

/***/ 979:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ModulePageAlerts", function() { return ModulePageAlerts; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__ = __webpack_require__(109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__alerts__ = __webpack_require__(1007);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var ModulePageAlerts = /** @class */ (function () {
    function ModulePageAlerts() {
    }
    ModulePageAlerts = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__["b" /* TranslateModule */],
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["IonicPageModule"].forChild(__WEBPACK_IMPORTED_MODULE_3__alerts__["a" /* PageAlerts */])
            ],
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__alerts__["a" /* PageAlerts */]
            ]
        })
    ], ModulePageAlerts);
    return ModulePageAlerts;
}());

//# sourceMappingURL=alerts.module.js.map

/***/ })

});
//# sourceMappingURL=13.js.map