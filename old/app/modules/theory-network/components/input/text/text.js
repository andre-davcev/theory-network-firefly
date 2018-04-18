"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var input_1 = require("../input");
var InputText = (function (_super) {
    __extends(InputText, _super);
    function InputText() {
        return _super.call(this) || this;
    }
    return InputText;
}(input_1.TNInput));
InputText = __decorate([
    core_1.Component({
        selector: 'tn-input-text',
        template: "\n    <form class=\"tn-input-container tn-text {{hostClasses}}\" name=\"form\" [class.tn-input-status-verified]=\"isVerified()\" [class.tn-input-status-error]=\"isError()\" [class.tn-input-status-rounded]=\"roundedIcons\" [formGroup]=\"form\">\n        <input class=\"tn-input\" type=\"text\" formControlName=\"input\" ngControl=\"input\" [ngModel]=\"value\" (ngModelChange)=\"onChange($event)\" placeholder=\"{{placeholder}}\" tn-trim=\"trim\" tn-pattern=\"pattern\" #input> \n\n        <ion-spinner icon=\"spiral\" *ngIf=\"isVerifying()\"></ion-spinner>\n        <div class=\"tn-input-clear\" *ngIf=\"clear && showClear\" (click)=\"clearValue()\"></div>\n    </form>\n    "
    }),
    __metadata("design:paramtypes", [])
], InputText);
exports.InputText = InputText;
//# sourceMappingURL=text.js.map