var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Input } from '@angular/core';
import { HostBinding } from '@angular/core';
var ComponentApp = /** @class */ (function () {
    function ComponentApp() {
        this._classPrefix = 'app-';
        this.classes = {};
        this._subscriptions = [];
    }
    ComponentApp.prototype.ngOnChanges = function (changes) {
        if (changes.class) {
            if (changes.class.firstChange && changes.class.currentValue != null) {
                this.classesAdd(changes.class.currentValue.trim().split(' '));
            }
        }
    };
    ComponentApp.prototype.ngOnDestroy = function () {
        for (var _i = 0, _a = this._subscriptions; _i < _a.length; _i++) {
            var subscription = _a[_i];
            subscription.unsubscribe();
        }
    };
    ComponentApp.prototype.subscriptionsAdd = function () {
        var subscriptions = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            subscriptions[_i] = arguments[_i];
        }
        this._subscriptions.concat(subscriptions);
    };
    ComponentApp.prototype.getClass = function (className) {
        return "" + this._classPrefix + className;
    };
    ComponentApp.prototype.classesAdd = function () {
        var classes = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            classes[_i] = arguments[_i];
        }
        for (var _a = 0, classes_1 = classes; _a < classes_1.length; _a++) {
            var elementClass = classes_1[_a];
            if (elementClass != null) {
                this.classes[elementClass] = '';
            }
        }
        this.classesRender();
    };
    ComponentApp.prototype.classesRemove = function () {
        var classes = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            classes[_i] = arguments[_i];
        }
        for (var _a = 0, classes_2 = classes; _a < classes_2.length; _a++) {
            var elementClass = classes_2[_a];
            if (elementClass != null) {
                delete this.classes[elementClass];
            }
        }
        this.classesRender();
    };
    ComponentApp.prototype.classesRender = function () {
        this.class = Object.keys(this.classes).join(' ');
    };
    Object.defineProperty(ComponentApp.prototype, "classPrefix", {
        get: function () {
            return this._classPrefix;
        },
        set: function (classPrefix) {
            this._classPrefix = classPrefix;
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        HostBinding('class'),
        Input(),
        __metadata("design:type", String)
    ], ComponentApp.prototype, "class", void 0);
    return ComponentApp;
}());
export { ComponentApp };
//# sourceMappingURL=component-app.class.js.map