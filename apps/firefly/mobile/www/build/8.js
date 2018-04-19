webpackJsonp([8],{

/***/ 1001:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PagePublisherClusters; });
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



var PagePublisherClusters = /** @class */ (function (_super) {
    __extends(PagePublisherClusters, _super);
    function PagePublisherClusters(temp) {
        var _this = _super.call(this) || this;
        _this.clusters = temp.subscriptions;
        console.log(_this.clusters);
        return _this;
    }
    PagePublisherClusters.prototype.clicked = function (cluster) {
        console.log(cluster);
    };
    PagePublisherClusters.prototype.deleted = function (cluster) {
        console.log(cluster);
    };
    PagePublisherClusters = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-page-publisher-clusters',template:/*ion-inline-start:"/Users/andredavcev/Files/Firefly/app/src/pages/publisher.clusters/publisher.clusters.html"*/'<app-list title="name" subtitle="tagline" icon="icon" [data]="clusters" (clicked)="clicked($event)" (deleted)="deleted($event)"></app-list>'/*ion-inline-end:"/Users/andredavcev/Files/Firefly/app/src/pages/publisher.clusters/publisher.clusters.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__services_temp__["a" /* Temp */]])
    ], PagePublisherClusters);
    return PagePublisherClusters;
}(__WEBPACK_IMPORTED_MODULE_2__page__["a" /* Page */]));

//# sourceMappingURL=publisher.clusters.js.map

/***/ }),

/***/ 989:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ModulePagePublisherClusters", function() { return ModulePagePublisherClusters; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__ = __webpack_require__(109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__publisher_clusters__ = __webpack_require__(1001);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var ModulePagePublisherClusters = /** @class */ (function () {
    function ModulePagePublisherClusters() {
    }
    ModulePagePublisherClusters = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__["b" /* TranslateModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["IonicPageModule"].forChild(__WEBPACK_IMPORTED_MODULE_3__publisher_clusters__["a" /* PagePublisherClusters */])
            ],
            declarations: [__WEBPACK_IMPORTED_MODULE_3__publisher_clusters__["a" /* PagePublisherClusters */]]
        })
    ], ModulePagePublisherClusters);
    return ModulePagePublisherClusters;
}());

//# sourceMappingURL=publisher.clusters.module.js.map

/***/ })

});
//# sourceMappingURL=8.js.map