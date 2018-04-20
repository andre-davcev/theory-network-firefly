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
/**
 * Base class for all Theory Network components.
 */
/** @hidden */
var Component = /** @class */ (function () {
    function Component(options) {
        /** @hidden */
        this.active = true;
        /** @hidden */
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
    /** @hidden */
    Component.prototype.setClass = function (className, add) {
        this.renderer.setElementClass(this.nativeElement(), this.class(className), add);
    };
    /** @hidden */
    Component.prototype.setAttribute = function (name, value) {
        this.renderer.setElementAttribute(this.nativeElement(), name, value);
    };
    /** @hidden */
    Component.prototype.setStyle = function (property, value) {
        this.renderer.setElementStyle(this.nativeElement(), property, value);
    };
    /** @hidden */
    Component.prototype.nativeElement = function () {
        return this.elementRef.nativeElement;
    };
    __decorate([
        HostBinding('class.tn-active'),
        Input(),
        __metadata("design:type", Boolean)
    ], Component.prototype, "active", void 0);
    __decorate([
        HostBinding('class.tn-visible'),
        Input(),
        __metadata("design:type", Boolean)
    ], Component.prototype, "visible", void 0);
    return Component;
}());
export { Component };
//# sourceMappingURL=component.class.js.map