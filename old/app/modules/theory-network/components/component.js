"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var core_2 = require("@angular/core");
var Component = (function () {
    function Component(options) {
        this.active = true;
        this.visible = true;
        this.elementRef = options.elementRef;
        this.renderer = options.renderer;
        this.component = options.component;
        this.prefix = options.prefix == null ? 'tn' : options.prefix;
        this.setClass(this.component, true);
    }
    Component.prototype.class = function (name) {
        return this.prefix + '-' + name;
    };
    Component.prototype.setClass = function (className, add) {
        this.renderer.setElementClass(this.nativeElement(), this.class(className), add);
    };
    Component.prototype.setAttribute = function (name, value) {
        this.renderer.setElementAttribute(this.nativeElement(), name, value);
    };
    Component.prototype.setStyle = function (property, value) {
        this.renderer.setElementStyle(this.nativeElement(), property, value);
    };
    Component.prototype.nativeElement = function () {
        return this.elementRef.nativeElement;
    };
    return Component;
}());
__decorate([
    core_2.HostBinding('class.tn-active'),
    core_1.Input(),
    __metadata("design:type", Boolean)
], Component.prototype, "active", void 0);
__decorate([
    core_2.HostBinding('class.tn-visible'),
    core_1.Input(),
    __metadata("design:type", Boolean)
], Component.prototype, "visible", void 0);
exports.Component = Component;
//# sourceMappingURL=component.js.map