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
var Keyboard = (function () {
    function Keyboard() {
        this.keyboard = false;
        this.keyboardShown = false;
    }
    Keyboard.prototype.keyboardShow = function () {
        this.keyboard = true;
        this.keyboardShown = true;
    };
    Keyboard.prototype.keyboardHide = function () {
        this.keyboard = false;
    };
    return Keyboard;
}());
Keyboard = __decorate([
    core_1.Directive({
        selector: '[tn-keyboard]',
        host: {
            '(native.keyboardshow)': 'keyboardShow()',
            '(native.keyboardhide)': 'keyboardHide()',
            '[class.tn-keyboard]': 'keyboard',
            '[class.tn-keyboard-hidden]': '!keyboard',
            '[class.tn-keyboard-shown]': 'keyboardShown'
        }
    }),
    __metadata("design:paramtypes", [])
], Keyboard);
exports.Keyboard = Keyboard;
//# sourceMappingURL=keyboard.js.map