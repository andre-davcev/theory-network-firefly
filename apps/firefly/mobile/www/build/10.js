webpackJsonp([10],{

/***/ 1000:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PageFindStream; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_temp__ = __webpack_require__(255);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__page__ = __webpack_require__(516);
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



var PageFindStream = /** @class */ (function (_super) {
    __extends(PageFindStream, _super);
    function PageFindStream(temp) {
        var _this = _super.call(this) || this;
        _this.subscriptions = [];
        _this.subscriptions = temp.subscriptions;
        return _this;
    }
    PageFindStream.prototype.doInfinite = function (infiniteScroll) {
        var _this = this;
        console.log('Begin async operation');
        setTimeout(function () {
            for (var i = 0; i < 30; i++) {
                _this.subscriptions.push(_this.subscriptions[i]);
            }
            console.log('Async operation has ended');
            infiniteScroll.complete();
        }, 500);
    };
    PageFindStream.prototype.subscribe = function (subscription) {
        subscription.subscribed = !subscription.subscribed;
    };
    PageFindStream = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-page-find-stream',template:/*ion-inline-start:"/Users/andredavcev/Files/Firefly/app/src/pages/find.stream/find.stream.html"*/'<ion-list class="ff-list">\n    <ion-item no-lines class="ff-primary-background" *ngFor="let subscription of subscriptions" (click)="go()">\n        <ion-card>\n            <img [src]="subscription.photo">\n\n            <ion-item>\n                <h2>{{subscription.name}}</h2>\n                <p>{{subscription.tagline}}</p>\n            </ion-item>\n\n            <ion-row>\n                <ion-col>\n                    <button ion-button clear icon-start (click)="subscribe(subscription)">\n                        <ff-icon name="check" [active]="subscription.subscribed"></ff-icon>\n                        {{subscription.subscribed ? \'pages.find.stream.subscribed\' : \'pages.find.stream.subscribe\' | translate}}\n                    </button>\n                </ion-col>\n\n                <ion-col text-right>\n                    <button ion-button icon-start clear>\n\n                    </button>\n                </ion-col>\n            </ion-row>\n        </ion-card>\n    </ion-item>\n</ion-list>\n\n<ion-infinite-scroll (ionInfinite)="doInfinite($event)">\n    <ion-infinite-scroll-content></ion-infinite-scroll-content>\n</ion-infinite-scroll>'/*ion-inline-end:"/Users/andredavcev/Files/Firefly/app/src/pages/find.stream/find.stream.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__services_temp__["a" /* Temp */]])
    ], PageFindStream);
    return PageFindStream;
}(__WEBPACK_IMPORTED_MODULE_2__page__["a" /* Page */]));

//# sourceMappingURL=find.stream.js.map

/***/ }),

/***/ 984:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ModulePageFindStream", function() { return ModulePageFindStream; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__ = __webpack_require__(109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__find_stream__ = __webpack_require__(1000);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var ModulePageFindStream = /** @class */ (function () {
    function ModulePageFindStream() {
    }
    ModulePageFindStream = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__["b" /* TranslateModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["IonicPageModule"].forChild(__WEBPACK_IMPORTED_MODULE_3__find_stream__["a" /* PageFindStream */])
            ],
            declarations: [__WEBPACK_IMPORTED_MODULE_3__find_stream__["a" /* PageFindStream */]]
        })
    ], ModulePageFindStream);
    return ModulePageFindStream;
}());

//# sourceMappingURL=find.stream.module.js.map

/***/ })

});
//# sourceMappingURL=10.js.map