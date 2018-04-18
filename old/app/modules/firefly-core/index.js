"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var firefly_component_module_1 = require("./components/firefly/firefly.component.module");
var firefly_component_module_2 = require("./components/firefly/firefly.component.module");
exports.ModuleIconFirefly = firefly_component_module_2.ModuleIconFirefly;
var firefly_component_1 = require("./components/firefly/firefly.component");
exports.IconFirefly = firefly_component_1.IconFirefly;
var ModuleFireflyCore = (function () {
    function ModuleFireflyCore() {
    }
    return ModuleFireflyCore;
}());
ModuleFireflyCore = __decorate([
    core_1.NgModule({
        imports: [
            firefly_component_module_1.ModuleIconFirefly
        ],
        declarations: [],
        exports: [
            firefly_component_module_1.ModuleIconFirefly
        ]
    })
], ModuleFireflyCore);
exports.ModuleFireflyCore = ModuleFireflyCore;
//# sourceMappingURL=index.js.map