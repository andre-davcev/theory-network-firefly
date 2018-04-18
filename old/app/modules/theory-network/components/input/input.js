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
var forms_1 = require("@angular/forms");
var TNInput = (function () {
    function TNInput() {
        this.showClear = false;
        this.state = '';
        this.validators = [];
        this.name = '';
        this.placeholder = '';
        this.hostClasses = '';
        this.required = false;
        this.pattern = '.*';
        this.trim = true;
        this.clear = false;
        this.validate = false;
        this.verifying = false;
        this.valid = false;
        this.validInput = true;
        this.spinner = 'spiral';
        this.spinnerClasses = '';
        this.roundedIcons = false;
        this.change = new core_1.EventEmitter();
    }
    TNInput.prototype.ngOnInit = function () {
        if (this.minLength != null) {
            this.validators.push(forms_1.Validators.minLength(this.minLength));
        }
        if (this.maxLength != null) {
            this.validators.push(forms_1.Validators.maxLength(this.maxLength));
        }
        if (this.required) {
            this.validators.push(forms_1.Validators.required);
        }
        if (this.pattern != null) {
            this.validators.push(forms_1.Validators.pattern(this.pattern));
        }
        this.input = new forms_1.FormControl(this.value, forms_1.Validators.compose(this.validators));
        this.form = new forms_1.FormGroup({
            input: this.input
        });
    };
    TNInput.prototype.clearValue = function () {
        this.showClear = false;
        this.value = '';
        this.inputElement.nativeElement.focus();
    };
    TNInput.prototype.isVerified = function () {
        return this.validate && !this.verifying && this.form.dirty && this.form.valid;
    };
    TNInput.prototype.isError = function () {
        return this.validate && !this.verifying && this.form.dirty && !this.form.valid;
    };
    TNInput.prototype.isVerifying = function () {
        return this.validate && this.verifying;
    };
    TNInput.prototype.onChange = function (value) {
        if (this.trim) {
            this.value = value.trim();
        }
        else {
            this.value = value;
        }
        value = this.value;
        if (this.clear) {
            if (value != null && value.length > 0) {
                this.showClear = true;
            }
            else {
                this.showClear = false;
            }
            this.validInput = this.form.valid;
        }
        this.change.next(value);
    };
    return TNInput;
}());
__decorate([
    core_1.ViewChild('input'),
    __metadata("design:type", core_1.ElementRef)
], TNInput.prototype, "inputElement", void 0);
__decorate([
    core_1.Input('tn-name'),
    __metadata("design:type", String)
], TNInput.prototype, "name", void 0);
__decorate([
    core_1.Input('tn-value'),
    __metadata("design:type", Object)
], TNInput.prototype, "value", void 0);
__decorate([
    core_1.Input('tn-placeholder'),
    __metadata("design:type", String)
], TNInput.prototype, "placeholder", void 0);
__decorate([
    core_1.Input('tn-host-classes'),
    __metadata("design:type", String)
], TNInput.prototype, "hostClasses", void 0);
__decorate([
    core_1.Input('tn-required'),
    __metadata("design:type", Boolean)
], TNInput.prototype, "required", void 0);
__decorate([
    core_1.Input('tn-min-length'),
    __metadata("design:type", Number)
], TNInput.prototype, "minLength", void 0);
__decorate([
    core_1.Input('tn-max-length'),
    __metadata("design:type", Number)
], TNInput.prototype, "maxLength", void 0);
__decorate([
    core_1.Input('tn-pattern'),
    __metadata("design:type", String)
], TNInput.prototype, "pattern", void 0);
__decorate([
    core_1.Input('tn-trim'),
    __metadata("design:type", Boolean)
], TNInput.prototype, "trim", void 0);
__decorate([
    core_1.Input('tn-clear'),
    __metadata("design:type", Boolean)
], TNInput.prototype, "clear", void 0);
__decorate([
    core_1.Input('tn-validate'),
    __metadata("design:type", Boolean)
], TNInput.prototype, "validate", void 0);
__decorate([
    core_1.Input('tn-verifying'),
    __metadata("design:type", Boolean)
], TNInput.prototype, "verifying", void 0);
__decorate([
    core_1.Input('tn-valid'),
    __metadata("design:type", Boolean)
], TNInput.prototype, "valid", void 0);
__decorate([
    core_1.Input('tn-valid-input'),
    __metadata("design:type", Boolean)
], TNInput.prototype, "validInput", void 0);
__decorate([
    core_1.Input('tn-spinner'),
    __metadata("design:type", String)
], TNInput.prototype, "spinner", void 0);
__decorate([
    core_1.Input('tn-spinner-classes'),
    __metadata("design:type", String)
], TNInput.prototype, "spinnerClasses", void 0);
__decorate([
    core_1.Input('tn-rounded-icons'),
    __metadata("design:type", Boolean)
], TNInput.prototype, "roundedIcons", void 0);
__decorate([
    core_1.Output('tn-change'),
    __metadata("design:type", core_1.EventEmitter)
], TNInput.prototype, "change", void 0);
exports.TNInput = TNInput;
//# sourceMappingURL=input.js.map