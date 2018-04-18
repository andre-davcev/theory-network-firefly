"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var forms_2 = require("@angular/forms");
var ionic_angular_1 = require("ionic-angular");
var email_1 = require("./email/email");
var password_1 = require("./password/password");
var text_1 = require("./text/text");
var ModuleInput = (function () {
    function ModuleInput() {
    }
    return ModuleInput;
}());
ModuleInput = __decorate([
    core_1.NgModule({
        imports: [
            common_1.CommonModule,
            forms_1.FormsModule,
            forms_2.ReactiveFormsModule,
            ionic_angular_1.IonicModule
        ],
        declarations: [
            email_1.InputEmail,
            password_1.InputPassword,
            text_1.InputText
        ],
        exports: [
            email_1.InputEmail,
            password_1.InputPassword,
            text_1.InputText
        ]
    })
], ModuleInput);
exports.ModuleInput = ModuleInput;
//# sourceMappingURL=input.module.js.map