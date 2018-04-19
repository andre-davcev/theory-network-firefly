webpackJsonp([1],{

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

/***/ 1016:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FFIcon; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_theory_network__ = __webpack_require__(152);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_theory_network___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_theory_network__);
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




var FFIcon = /** @class */ (function (_super) {
    __extends(FFIcon, _super);
    function FFIcon(elementRef, renderer) {
        return _super.call(this, {
            elementRef: elementRef,
            renderer: renderer,
            prefix: 'ff'
        }) || this;
    }
    FFIcon = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({
            selector: 'ff-icon'
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_0__angular_core__["Renderer"]])
    ], FFIcon);
    return FFIcon;
}(__WEBPACK_IMPORTED_MODULE_1_theory_network__["Icon"]));

//# sourceMappingURL=icon.js.map

/***/ }),

/***/ 1017:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PageFind; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__page__ = __webpack_require__(516);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngxs_store__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ngxs_cluster_cluster_state__ = __webpack_require__(1018);
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




var PageFind = /** @class */ (function (_super) {
    __extends(PageFind, _super);
    function PageFind(store) {
        var _this = _super.call(this) || this;
        _this.store = store;
        _this.segment = 'stream';
        var cluster = {
            userId: 'testUser',
            name: 'My First Cluster',
            description: 'My description'
        };
        _this.store.dispatch(new __WEBPACK_IMPORTED_MODULE_3__ngxs_cluster_cluster_state__["a" /* SetCluster */](cluster));
        return _this;
    }
    PageFind = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-page-find',template:/*ion-inline-start:"/Users/andredavcev/Files/Firefly/app/src/pages/find/find.html"*/'<ion-header>\n    <ion-toolbar>\n        <ion-segment [(ngModel)]="segment">\n            <ion-segment-button value="stream">{{\'tabs.find.stream\' | translate}}</ion-segment-button>\n            <ion-segment-button value="discover">{{\'tabs.find.discover\' | translate}}</ion-segment-button>\n            <ion-segment-button value="categories">{{\'tabs.find.categories\' | translate}}</ion-segment-button>\n        </ion-segment>\n    </ion-toolbar>\n</ion-header>\n\n<ion-content [ngSwitch]="segment">\n    <div class="scroll-content" *ngSwitchCase="\'stream\'">\n        <app-page-find-stream></app-page-find-stream>\n    </div>\n\n    <div class="scroll-content" *ngSwitchCase="\'discover\'">\n        <app-page-find-discover></app-page-find-discover>\n    </div>\n\n    <div class="scroll-content" *ngSwitchCase="\'categories\'">\n        <app-page-find-categories></app-page-find-categories>\n    </div>\n</ion-content>'/*ion-inline-end:"/Users/andredavcev/Files/Firefly/app/src/pages/find/find.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__ngxs_store__["h" /* Store */]])
    ], PageFind);
    return PageFind;
}(__WEBPACK_IMPORTED_MODULE_1__page__["a" /* Page */]));

//# sourceMappingURL=find.js.map

/***/ }),

/***/ 1018:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export GetClusters */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SetCluster; });
/* unused harmony export StateCluster */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_operators__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_operators___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rxjs_operators__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_services_cluster__ = __webpack_require__(1019);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ngxs_store__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__user_state__ = __webpack_require__(257);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
//import { ClusterService } from "../../services/services.cluster";








var GetClusters = /** @class */ (function () {
    function GetClusters() {
    }
    return GetClusters;
}());

var SetCluster = /** @class */ (function () {
    function SetCluster(payload) {
        this.payload = payload;
    }
    return SetCluster;
}());

var StateCluster = /** @class */ (function () {
    function StateCluster(clusterService) {
        this.clusterService = clusterService;
    }
    StateCluster.entities = function (state) { return state.entities; };
    StateCluster.prototype.getClusters = function (_a) {
        var _this = this;
        var patchState = _a.patchState, dispatch = _a.dispatch;
        return this.user$.pipe(Object(__WEBPACK_IMPORTED_MODULE_0_rxjs_operators__["map"])(function (user) { return user.uidInternal; }), Object(__WEBPACK_IMPORTED_MODULE_0_rxjs_operators__["switchMap"])(function (uidInternal) {
            return _this.clusterService
                .getClusters(uidInternal)
                .pipe(Object(__WEBPACK_IMPORTED_MODULE_0_rxjs_operators__["map"])(function (clusters) {
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
    StateCluster.prototype.setCluster = function (_a, _b) {
        var patchState = _a.patchState, dispatch = _a.dispatch;
        var payload = _b.payload;
        return this.clusterService
            .setCluster(payload)
            .pipe(Object(__WEBPACK_IMPORTED_MODULE_0_rxjs_operators__["map"])(function (cluster) {
            var entities = {};
            entities[cluster.id] = cluster;
            patchState({
                entities: entities
            });
        }));
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_3__ngxs_store__["d" /* Select */])(__WEBPACK_IMPORTED_MODULE_4__user_state__["d" /* StateUser */].user),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"])
    ], StateCluster.prototype, "user$", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_3__ngxs_store__["a" /* Action */])(GetClusters),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], StateCluster.prototype, "getClusters", null);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_3__ngxs_store__["a" /* Action */])(SetCluster),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, SetCluster]),
        __metadata("design:returntype", void 0)
    ], StateCluster.prototype, "setCluster", null);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_3__ngxs_store__["e" /* Selector */])(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], StateCluster, "entities", null);
    StateCluster = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_3__ngxs_store__["f" /* State */])({
            name: 'cluster',
            defaults: {
                entities: {}
            }
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__services_services_cluster__["a" /* ClusterService */]])
    ], StateCluster);
    return StateCluster;
}());

//# sourceMappingURL=cluster.state.js.map

/***/ }),

/***/ 1019:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ClusterService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angularfire2_firestore__ = __webpack_require__(156);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_observable_fromPromise__ = __webpack_require__(154);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_observable_fromPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_observable_fromPromise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_operators__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_operators___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_operators__);
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ClusterService = /** @class */ (function () {
    function ClusterService(afs) {
        this.afs = afs;
        this.clustersCollection = afs.collection('clusters');
    }
    ClusterService.prototype.getClusters = function (userid) {
        return this.afs.collection('clusters', function (ref) {
            return ref.where('userid', '==', userid);
        })
            .snapshotChanges()
            .map(function (actions) {
            return actions.map(function (a) {
                var data = a.payload.doc.data();
                var id = a.payload.doc.id;
                return __assign({ id: id }, data);
            });
        });
    };
    ClusterService.prototype.updateCluster = function () {
    };
    ClusterService.prototype.setCluster = function (cluster) {
        var id = this.afs.createId();
        cluster.id = id;
        var document = this.clustersCollection.doc(id);
        return Object(__WEBPACK_IMPORTED_MODULE_2_rxjs_observable_fromPromise__["fromPromise"])(document.set(cluster)).pipe(Object(__WEBPACK_IMPORTED_MODULE_3_rxjs_operators__["switchMap"])(function () { return document.valueChanges(); }), Object(__WEBPACK_IMPORTED_MODULE_3_rxjs_operators__["filter"])(function (cluster) { return cluster.dateCreated != null; }), Object(__WEBPACK_IMPORTED_MODULE_3_rxjs_operators__["take"])(1));
    };
    ClusterService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_angularfire2_firestore__["a" /* AngularFirestore */]])
    ], ClusterService);
    return ClusterService;
}());

//# sourceMappingURL=services.cluster.js.map

/***/ }),

/***/ 985:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ModulePageFind", function() { return ModulePageFind; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__ = __webpack_require__(109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_directives_icon_icon__ = __webpack_require__(1016);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__find__ = __webpack_require__(1017);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__find_stream_find_stream__ = __webpack_require__(1000);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__find_discover_find_discover__ = __webpack_require__(999);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__find_categories_find_categories__ = __webpack_require__(998);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};








var ModulePageFind = /** @class */ (function () {
    function ModulePageFind() {
    }
    ModulePageFind = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__["b" /* TranslateModule */],
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["IonicPageModule"].forChild(__WEBPACK_IMPORTED_MODULE_4__find__["a" /* PageFind */])
            ],
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__app_directives_icon_icon__["a" /* FFIcon */],
                __WEBPACK_IMPORTED_MODULE_4__find__["a" /* PageFind */],
                __WEBPACK_IMPORTED_MODULE_5__find_stream_find_stream__["a" /* PageFindStream */],
                __WEBPACK_IMPORTED_MODULE_6__find_discover_find_discover__["a" /* PageFindDiscover */],
                __WEBPACK_IMPORTED_MODULE_7__find_categories_find_categories__["a" /* PageFindCategories */]
            ]
        })
    ], ModulePageFind);
    return ModulePageFind;
}());

//# sourceMappingURL=find.module.js.map

/***/ }),

/***/ 998:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PageFindCategories; });
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


var PageFindCategories = /** @class */ (function (_super) {
    __extends(PageFindCategories, _super);
    function PageFindCategories() {
        return _super.call(this) || this;
    }
    PageFindCategories = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-page-find-categories',template:/*ion-inline-start:"/Users/andredavcev/Files/Firefly/app/src/pages/find.categories/find.categories.html"*/''/*ion-inline-end:"/Users/andredavcev/Files/Firefly/app/src/pages/find.categories/find.categories.html"*/
        }),
        __metadata("design:paramtypes", [])
    ], PageFindCategories);
    return PageFindCategories;
}(__WEBPACK_IMPORTED_MODULE_1__page__["a" /* Page */]));

//# sourceMappingURL=find.categories.js.map

/***/ }),

/***/ 999:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PageFindDiscover; });
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


var PageFindDiscover = /** @class */ (function (_super) {
    __extends(PageFindDiscover, _super);
    function PageFindDiscover() {
        var _this = _super.call(this) || this;
        _this.latitude = 43.1269154;
        _this.longitude = -77.5947578;
        return _this;
    }
    PageFindDiscover = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-page-find-discover',template:/*ion-inline-start:"/Users/andredavcev/Files/Firefly/app/src/pages/find.discover/find.discover.html"*/''/*ion-inline-end:"/Users/andredavcev/Files/Firefly/app/src/pages/find.discover/find.discover.html"*/
        }),
        __metadata("design:paramtypes", [])
    ], PageFindDiscover);
    return PageFindDiscover;
}(__WEBPACK_IMPORTED_MODULE_1__page__["a" /* Page */]));

//# sourceMappingURL=find.discover.js.map

/***/ })

});
//# sourceMappingURL=1.js.map