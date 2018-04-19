webpackJsonp([7],{

/***/ 1026:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PageTutorial; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(258);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__tabs_tabs__ = __webpack_require__(517);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__page__ = __webpack_require__(516);
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








var PageTutorial = /** @class */ (function (_super) {
    __extends(PageTutorial, _super);
    function PageTutorial(navCtrl, menu, storage) {
        var _this = _super.call(this) || this;
        _this.navCtrl = navCtrl;
        _this.menu = menu;
        _this.storage = storage;
        _this.showSkip = true;
        return _this;
    }
    PageTutorial.prototype.startApp = function () {
        var _this = this;
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__tabs_tabs__["a" /* PageTabs */]).then(function () {
            _this.storage.set('hasSeenTutorial', 'true');
        });
    };
    PageTutorial.prototype.onSlideChangeStart = function (slider) {
        this.showSkip = !slider.isEnd();
    };
    PageTutorial.prototype.ionViewWillEnter = function () {
        this.slides.update();
    };
    PageTutorial.prototype.ionViewDidEnter = function () {
        this.menu.enable(false);
    };
    PageTutorial.prototype.ionViewDidLeave = function () {
        this.menu.enable(true);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('slides'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["Slides"])
    ], PageTutorial.prototype, "slides", void 0);
    PageTutorial = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-page-tutorial',template:/*ion-inline-start:"/Users/andredavcev/Files/Firefly/app/src/pages/tutorial/tutorial.html"*/'<ion-header no-border>\n    <ion-navbar>\n        <ion-buttons end *ngIf="showSkip">\n            <button ion-button (click)="startApp()" color="primary">Skip</button>\n        </ion-buttons>\n    </ion-navbar>\n</ion-header>\n\n<ion-content no-bounce>\n    <ion-slides #slides (ionSlideWillChange)="onSlideChangeStart($event)" pager>\n        <ion-slide>\n            <img src="assets/img/ica-slidebox-img-1.png" class="slide-image"/>\n            <h2 class="slide-title">Welcome to <b>ICA</b></h2>\n            <p>The <b>ionic conference app</b> is a practical preview of the ionic framework in action, and a demonstration of proper code use.</p>\n        </ion-slide>\n\n        <ion-slide>\n            <img src="assets/img/ica-slidebox-img-2.png" class="slide-image"/>\n            <h2 class="slide-title" >What is Ionic?</h2>\n            <p><b>Ionic Framework</b> is an open source SDK that enables developers to build high quality mobile apps with web technologies like HTML, CSS, and JavaScript.</p>\n        </ion-slide>\n\n        <ion-slide>\n            <img src="assets/img/ica-slidebox-img-3.png" class="slide-image"/>\n            <h2 class="slide-title">What is Ionic Platform?</h2>\n            <p>The <b>Ionic Platform</b> is a cloud platform for managing and scaling Ionic apps with integrated services like push notifications, native builds, user auth, and live updating.</p>\n        </ion-slide>\n\n        <ion-slide>\n            <img src="assets/img/ica-slidebox-img-4.png" class="slide-image"/>\n            <h2 class="slide-title">Ready to Play?</h2>\n\n            <button ion-button icon-end large clear (click)="startApp()">\n                Continue\n                <ion-icon name="arrow-forward"></ion-icon>\n            </button>\n        </ion-slide>\n    </ion-slides>\n</ion-content>'/*ion-inline-end:"/Users/andredavcev/Files/Firefly/app/src/pages/tutorial/tutorial.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["MenuController"], __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */]])
    ], PageTutorial);
    return PageTutorial;
}(__WEBPACK_IMPORTED_MODULE_4__page__["a" /* Page */]));

//# sourceMappingURL=tutorial.js.map

/***/ }),

/***/ 992:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ModulePageTutorial", function() { return ModulePageTutorial; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__tutorial__ = __webpack_require__(1026);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var ModulePageTutorial = /** @class */ (function () {
    function ModulePageTutorial() {
    }
    ModulePageTutorial = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [__WEBPACK_IMPORTED_MODULE_2__tutorial__["a" /* PageTutorial */]],
            imports: [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["IonicPageModule"].forChild(__WEBPACK_IMPORTED_MODULE_2__tutorial__["a" /* PageTutorial */])]
        })
    ], ModulePageTutorial);
    return ModulePageTutorial;
}());

//# sourceMappingURL=tutorial.module.js.map

/***/ })

});
//# sourceMappingURL=7.js.map