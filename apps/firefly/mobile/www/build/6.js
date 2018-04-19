webpackJsonp([6],{

/***/ 1002:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PageUserProfile; });
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


var PageUserProfile = /** @class */ (function (_super) {
    __extends(PageUserProfile, _super);
    function PageUserProfile() {
        return _super.call(this) || this;
    }
    PageUserProfile = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-page-user-profile',template:/*ion-inline-start:"/Users/andredavcev/Files/Firefly/app/src/pages/user.profile/user.profile.html"*/'<ion-list>\n    <ion-item>\n        <button ion-button color="secondary">\n            <ion-icon name="log-out">Log Out</ion-icon>\n        </button>\n    </ion-item>\n</ion-list>'/*ion-inline-end:"/Users/andredavcev/Files/Firefly/app/src/pages/user.profile/user.profile.html"*/
        }),
        __metadata("design:paramtypes", [])
    ], PageUserProfile);
    return PageUserProfile;
}(__WEBPACK_IMPORTED_MODULE_1__page__["a" /* Page */]));

//# sourceMappingURL=user.profile.js.map

/***/ }),

/***/ 993:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ModulePageUserProfile", function() { return ModulePageUserProfile; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__user_profile__ = __webpack_require__(1002);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var ModulePageUserProfile = /** @class */ (function () {
    function ModulePageUserProfile() {
    }
    ModulePageUserProfile = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [__WEBPACK_IMPORTED_MODULE_2__user_profile__["a" /* PageUserProfile */]],
            imports: [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["IonicPageModule"].forChild(__WEBPACK_IMPORTED_MODULE_2__user_profile__["a" /* PageUserProfile */])]
        })
    ], ModulePageUserProfile);
    return ModulePageUserProfile;
}());

//# sourceMappingURL=user.profile.module.js.map

/***/ })

});
//# sourceMappingURL=6.js.map