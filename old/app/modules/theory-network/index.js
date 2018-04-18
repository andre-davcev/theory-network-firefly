"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var input_module_1 = require("./components/input/input.module");
exports.ModuleInput = input_module_1.ModuleInput;
var component_1 = require("./components/component");
exports.Component = component_1.Component;
var icon_1 = require("./components/icon/icon");
exports.Icon = icon_1.Icon;
var input_1 = require("./components/input/input");
exports.TNInput = input_1.TNInput;
var email_1 = require("./components/input/email/email");
exports.InputEmail = email_1.InputEmail;
var password_1 = require("./components/input/password/password");
exports.InputPassword = password_1.InputPassword;
var text_1 = require("./components/input/text/text");
exports.InputText = text_1.InputText;
var component_app_1 = require("./components/component.app");
exports.AppComponent = component_app_1.AppComponent;
var status_bar_style_enum_1 = require("./ionic/status-bar-style.enum");
exports.StatusBarStyle = status_bar_style_enum_1.StatusBarStyle;
var keyboard_module_1 = require("./directives/keyboard/keyboard.module");
exports.ModuleKeyboard = keyboard_module_1.ModuleKeyboard;
var keyboard_1 = require("./directives/keyboard/keyboard");
exports.Keyboard = keyboard_1.Keyboard;
var version_util_1 = require("./directives/version/version.util");
exports.VersionUtil = version_util_1.VersionUtil;
var input_module_2 = require("./components/input/input.module");
var keyboard_module_2 = require("./directives/keyboard/keyboard.module");
var TheoryNetworkModule = (function () {
    function TheoryNetworkModule() {
    }
    return TheoryNetworkModule;
}());
TheoryNetworkModule = __decorate([
    core_1.NgModule({
        imports: [
            input_module_2.ModuleInput,
            keyboard_module_2.ModuleKeyboard
        ],
        declarations: [],
        exports: [
            input_module_2.ModuleInput,
            keyboard_module_2.ModuleKeyboard
        ]
    })
], TheoryNetworkModule);
exports.TheoryNetworkModule = TheoryNetworkModule;
//# sourceMappingURL=index.js.map