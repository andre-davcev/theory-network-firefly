webpackJsonp([2],{

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

/***/ 1021:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PagePublisher; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(49);
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



var PagePublisher = /** @class */ (function (_super) {
    __extends(PagePublisher, _super);
    function PagePublisher(nav) {
        var _this = _super.call(this) || this;
        _this.nav = nav;
        _this.segment = 'clusters';
        return _this;
    }
    PagePublisher.prototype.add = function () {
        var segment = this.segment.substring(0, this.segment.length - 1);
        var page = 'PagePublisher' + segment.charAt(0).toUpperCase() + segment.slice(1);
        this.nav.push(page);
    };
    PagePublisher = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-page-publisher',template:/*ion-inline-start:"/Users/andredavcev/Files/Firefly/app/src/pages/publisher/publisher.html"*/'<ion-header>\n    <ion-navbar dark>\n        <ion-segment [(ngModel)]="segment">\n            <ion-segment-button value="clusters">{{\'tabs.publisher.clusters\' | translate}}</ion-segment-button>\n            <!--\n            <ion-segment-button value="beacons">{{\'tabs.publisher.beacons\' | translate}}</ion-segment-button>\n            -->\n        </ion-segment>\n    </ion-navbar>\n</ion-header>\n\n<ion-content [ngSwitch]="segment">\n    <ion-fab bottom right (click)="add()">\n        <button ion-fab color="secondary">\n            <ion-icon name="md-add"></ion-icon>\n        </button>\n    </ion-fab>\n\n    <div *ngSwitchCase="\'clusters\'">\n        <app-page-publisher-clusters></app-page-publisher-clusters>\n    </div>\n<!--\n    <div *ngSwitchCase="\'beacons\'">\n        <app-page-publisher-beacons></app-page-publisher-beacons>\n    </div>\n-->\n</ion-content>'/*ion-inline-end:"/Users/andredavcev/Files/Firefly/app/src/pages/publisher/publisher.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"]])
    ], PagePublisher);
    return PagePublisher;
}(__WEBPACK_IMPORTED_MODULE_2__page__["a" /* Page */]));

//# sourceMappingURL=publisher.js.map

/***/ }),

/***/ 1022:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PagePublisherBeacons; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_beacons__ = __webpack_require__(519);
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



var PagePublisherBeacons = /** @class */ (function (_super) {
    __extends(PagePublisherBeacons, _super);
    function PagePublisherBeacons(beaconsService) {
        var _this = _super.call(this) || this;
        _this.beaconsService = beaconsService;
        _this.beacons = [
            {
                major: 5315,
                majorLabel: 'Music Stages',
                minor: 27055,
                minorLabel: 'Main Stands',
                uuid: 'b9407f30-f5f8-466e-aff9-25556b57fe6d',
                uuidLabel: 'Center Left'
            }
        ];
        return _this;
    }
    PagePublisherBeacons.prototype.ngOnInit = function () {
        this.beaconsService.beaconsGet();
    };
    PagePublisherBeacons = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-page-publisher-beacons',template:/*ion-inline-start:"/Users/andredavcev/Files/Firefly/app/src/pages/publisher.beacons/publisher.beacons.html"*/'<ion-list>\n    <button ion-item *ngFor="let beacon of beaconsService.beaconsObservable | async" (click)="go(beacon)">\n        <ion-label>{{\'pages.publisher.beacons.majorLabel\' | translate}}</ion-label>\n        <ion-note item-end>{{\'pages.publisher.beacons.major\' | translate}}</ion-note>\n    </button>\n</ion-list>'/*ion-inline-end:"/Users/andredavcev/Files/Firefly/app/src/pages/publisher.beacons/publisher.beacons.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__services_beacons__["a" /* ServiceBeacons */]])
    ], PagePublisherBeacons);
    return PagePublisherBeacons;
}(__WEBPACK_IMPORTED_MODULE_2__page__["a" /* Page */]));

//# sourceMappingURL=publisher.beacons.js.map

/***/ }),

/***/ 1023:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ModuleList; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__ = __webpack_require__(109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__list_component__ = __webpack_require__(1024);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var ModuleList = /** @class */ (function () {
    function ModuleList() {
    }
    ModuleList = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["CommonModule"],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["IonicModule"],
                __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__["b" /* TranslateModule */]
            ],
            declarations: [__WEBPACK_IMPORTED_MODULE_4__list_component__["a" /* ComponentList */]],
            exports: [__WEBPACK_IMPORTED_MODULE_4__list_component__["a" /* ComponentList */]]
        })
    ], ModuleList);
    return ModuleList;
}());

//# sourceMappingURL=list.module.js.map

/***/ }),

/***/ 1024:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ComponentList; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_util_service__ = __webpack_require__(1025);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ComponentList = /** @class */ (function () {
    function ComponentList() {
        this.flattened = [];
        this.data = [];
        this.delete = false;
        this.deleted = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.clicked = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
    }
    ComponentList.prototype.ngOnChanges = function (changes) {
        if (changes.data && changes.data.currentValue) {
            var data = [];
            var icon = this.icon;
            var title = this.title;
            var subtitle = this.subtitle;
            for (var _i = 0, _a = changes.data.currentValue; _i < _a.length; _i++) {
                var row = _a[_i];
                data.push({
                    icon: __WEBPACK_IMPORTED_MODULE_1__services_util_service__["a" /* ServiceUtil */].property(row, icon),
                    title: __WEBPACK_IMPORTED_MODULE_1__services_util_service__["a" /* ServiceUtil */].property(row, title),
                    subtitle: __WEBPACK_IMPORTED_MODULE_1__services_util_service__["a" /* ServiceUtil */].property(row, subtitle)
                });
            }
            this.flattened = data;
        }
    };
    ComponentList.prototype.eventClicked = function (row) {
        this.clicked.emit(row);
    };
    ComponentList.prototype.eventDeleted = function (row) {
        this.clicked.emit(row);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Array)
    ], ComponentList.prototype, "data", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Boolean)
    ], ComponentList.prototype, "delete", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", String)
    ], ComponentList.prototype, "icon", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", String)
    ], ComponentList.prototype, "title", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", String)
    ], ComponentList.prototype, "subtitle", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"])
    ], ComponentList.prototype, "deleted", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"])
    ], ComponentList.prototype, "clicked", void 0);
    ComponentList = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-list',template:/*ion-inline-start:"/Users/andredavcev/Files/Firefly/app/src/app/components/list/list.component.html"*/'<ion-list no-lines>\n    <ion-item-sliding *ngFor="let row of flattened; let i = index">\n        <button ion-item (click)="eventClicked(data[i])">\n            <ion-avatar item-start>\n                <img [src]="row.icon">\n            </ion-avatar>\n\n            <h3>{{row.title}}</h3>\n            <p>{{row.subtitle}}</p>\n        </button>\n\n        <ion-item-options>\n            <button ion-button color="secondary" (click)="eventDeleted(data[i])">\n                <ion-icon name="trash"></ion-icon>\n                {{\'general.delete\' | translate}}\n            </button>\n        </ion-item-options>\n    </ion-item-sliding>\n</ion-list>'/*ion-inline-end:"/Users/andredavcev/Files/Firefly/app/src/app/components/list/list.component.html"*/,
            changeDetection: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ChangeDetectionStrategy"].Default,
        }),
        __metadata("design:paramtypes", [])
    ], ComponentList);
    return ComponentList;
}());

//# sourceMappingURL=list.component.js.map

/***/ }),

/***/ 1025:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ServiceUtil; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var ServiceUtil = /** @class */ (function () {
    function ServiceUtil() {
    }
    ServiceUtil.property = function (value, property) {
        if (value == null || property == null) {
            return null;
        }
        else {
            var keys = property.split('.');
            var key = void 0;
            var process_1 = true;
            for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
                var key_1 = keys_1[_i];
                value = value[key_1];
                if (value == null) {
                    return value;
                }
            }
            return value;
        }
    };
    ServiceUtil = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])()
    ], ServiceUtil);
    return ServiceUtil;
}());

//# sourceMappingURL=util.service.js.map

/***/ }),

/***/ 990:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ModulePagePublisher", function() { return ModulePagePublisher; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__ = __webpack_require__(109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__publisher__ = __webpack_require__(1021);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__publisher_clusters_publisher_clusters__ = __webpack_require__(1001);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__publisher_beacons_publisher_beacons__ = __webpack_require__(1022);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_components_list_list_module__ = __webpack_require__(1023);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







var ModulePagePublisher = /** @class */ (function () {
    function ModulePagePublisher() {
    }
    ModulePagePublisher = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__["b" /* TranslateModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["IonicPageModule"].forChild(__WEBPACK_IMPORTED_MODULE_3__publisher__["a" /* PagePublisher */]),
                __WEBPACK_IMPORTED_MODULE_6__app_components_list_list_module__["a" /* ModuleList */]
            ],
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__publisher__["a" /* PagePublisher */],
                __WEBPACK_IMPORTED_MODULE_4__publisher_clusters_publisher_clusters__["a" /* PagePublisherClusters */],
                __WEBPACK_IMPORTED_MODULE_5__publisher_beacons_publisher_beacons__["a" /* PagePublisherBeacons */]
            ]
        })
    ], ModulePagePublisher);
    return ModulePagePublisher;
}());

//# sourceMappingURL=publisher.module.js.map

/***/ })

});
//# sourceMappingURL=2.js.map