webpackJsonp([17],{

/***/ 123:
/***/ (function(module, exports, __webpack_require__) {

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
var core_1 = __webpack_require__(1);
var forms_1 = __webpack_require__(33);
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

/***/ }),

/***/ 152:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
var input_module_1 = __webpack_require__(314);
exports.ModuleInput = input_module_1.ModuleInput;
var component_1 = __webpack_require__(318);
exports.Component = component_1.Component;
var icon_1 = __webpack_require__(545);
exports.Icon = icon_1.Icon;
var input_1 = __webpack_require__(123);
exports.TNInput = input_1.TNInput;
var email_1 = __webpack_require__(315);
exports.InputEmail = email_1.InputEmail;
var password_1 = __webpack_require__(316);
exports.InputPassword = password_1.InputPassword;
var text_1 = __webpack_require__(317);
exports.InputText = text_1.InputText;
var component_app_1 = __webpack_require__(546);
exports.AppComponent = component_app_1.AppComponent;
var status_bar_style_enum_1 = __webpack_require__(547);
exports.StatusBarStyle = status_bar_style_enum_1.StatusBarStyle;
var keyboard_module_1 = __webpack_require__(319);
exports.ModuleKeyboard = keyboard_module_1.ModuleKeyboard;
var keyboard_1 = __webpack_require__(320);
exports.Keyboard = keyboard_1.Keyboard;
var version_util_1 = __webpack_require__(548);
exports.VersionUtil = version_util_1.VersionUtil;
var input_module_2 = __webpack_require__(314);
var keyboard_module_2 = __webpack_require__(319);
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

/***/ }),

/***/ 255:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Temp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var Temp = /** @class */ (function () {
    function Temp() {
        this.alerts = [
            {
                image: 'temp/images/alerts/rusted.root.jpg',
                title: 'Rusted Root',
                short: "Sahlen's Music Stage",
                date: 'May 12, 2017 at 7:00pm',
                viewed: false
            },
            {
                image: 'temp/images/alerts/foster.the.people.jpg',
                title: 'Foster The People',
                short: "Ommegang Brewery Cooperstown",
                date: 'June 10, 2017 at 7:00pm',
                viewed: false
            },
            {
                image: 'temp/images/alerts/blondie.jpg',
                title: 'Blondie',
                short: "Artpark",
                date: 'July 25, 2016 at 6:30pm',
                viewed: false
            }
        ];
        this.subscriptions = [
            {
                name: 'Pokemon Go Rochester Nests',
                tagline: 'Get alerts for all your favorite Pokemon nests',
                description: '',
                icon: 'temp/icons/icon.java.1.png',
                photo: 'temp/images/subscriptions/pokemon-go.jpg',
                categories: '',
                private: false,
                locations: [],
                subscribed: true,
                draft: false,
                userId: ''
            },
            {
                name: 'Lilac Festival',
                tagline: 'Alerts about all the Lilac Festival events and activities',
                description: '',
                icon: 'temp/icons/icon.java.2.png',
                photo: 'temp/images/subscriptions/lilac-festival.jpg',
                categories: '',
                private: false,
                locations: [],
                subscribed: false,
                draft: false,
                userId: ''
            },
            {
                name: 'Music Festivals Rochester',
                tagline: 'Get alerts about Rochester music festivals',
                description: '',
                icon: 'temp/icons/icon.java.3.png',
                photo: 'temp/images/subscriptions/lollapalooza.png',
                categories: '',
                private: false,
                locations: [],
                subscribed: false,
                draft: false,
                userId: ''
            }
        ];
    }
    Temp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [])
    ], Temp);
    return Temp;
}());

//# sourceMappingURL=temp.js.map

/***/ }),

/***/ 256:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Alerts; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__temp__ = __webpack_require__(255);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var Alerts = /** @class */ (function () {
    function Alerts(temp) {
        this.alerts = temp.alerts;
        var unviewed = this.alerts.length;
        for (var _i = 0, _a = this.alerts; _i < _a.length; _i++) {
            var alert_1 = _a[_i];
            if (alert_1.viewed) {
                unviewed++;
            }
        }
        this.unviewed = unviewed;
    }
    Alerts.prototype.view = function (index) {
        console.log(this.alerts);
        console.log(index);
        if (!this.alerts[index].viewed) {
            this.unviewed--;
            this.alerts[index].viewed = true;
        }
        if (this.unviewed == 0) {
            this.unviewed = -1;
        }
    };
    Alerts.prototype.delete = function (index) {
        var size = this.alerts.length;
        this.alerts.splice(index, 1);
        if (size > 1) {
            if (index == (size - 1)) {
                this.view(index - 1);
            }
            else {
                this.view(index);
            }
        }
    };
    Alerts = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__temp__["a" /* Temp */]])
    ], Alerts);
    return Alerts;
}());

//# sourceMappingURL=alerts.js.map

/***/ }),

/***/ 257:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return UserAuthenticate; });
/* unused harmony export UserAuthenticateCheck */
/* unused harmony export UserGet */
/* unused harmony export UserCreate */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginEmail; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return LoginFacebook; });
/* unused harmony export LoginFacebookBrowser */
/* unused harmony export LoginFacebookDevice */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return LoginGoogle; });
/* unused harmony export LoginGoogleBrowser */
/* unused harmony export LoginGoogleDevice */
/* unused harmony export UserLogout */
/* unused harmony export UserSet */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return StateUser; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ngxs_store__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_operators__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_operators___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_operators__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_observable_of__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_observable_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_observable_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_firebase__ = __webpack_require__(822);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__enums_platform_enum__ = __webpack_require__(454);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_angularfire2_auth__ = __webpack_require__(455);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_angularfire2_firestore__ = __webpack_require__(156);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_facebook__ = __webpack_require__(467);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_google_plus__ = __webpack_require__(469);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__language_state__ = __webpack_require__(470);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__enums_auth_provider__ = __webpack_require__(396);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};














// Actions
var UserAuthenticate = /** @class */ (function () {
    function UserAuthenticate() {
    }
    return UserAuthenticate;
}());

var UserAuthenticateCheck = /** @class */ (function () {
    function UserAuthenticateCheck(payload) {
        this.payload = payload;
    }
    return UserAuthenticateCheck;
}());

var UserGet = /** @class */ (function () {
    function UserGet(payload) {
        this.payload = payload;
    }
    return UserGet;
}());

var UserCreate = /** @class */ (function () {
    function UserCreate() {
    }
    return UserCreate;
}());

var LoginEmail = /** @class */ (function () {
    function LoginEmail(payload) {
        this.payload = payload;
    }
    return LoginEmail;
}());

var LoginFacebook = /** @class */ (function () {
    function LoginFacebook() {
    }
    return LoginFacebook;
}());

var LoginFacebookBrowser = /** @class */ (function () {
    function LoginFacebookBrowser() {
    }
    return LoginFacebookBrowser;
}());

var LoginFacebookDevice = /** @class */ (function () {
    function LoginFacebookDevice() {
    }
    return LoginFacebookDevice;
}());

var LoginGoogle = /** @class */ (function () {
    function LoginGoogle() {
    }
    return LoginGoogle;
}());

var LoginGoogleBrowser = /** @class */ (function () {
    function LoginGoogleBrowser() {
    }
    return LoginGoogleBrowser;
}());

var LoginGoogleDevice = /** @class */ (function () {
    function LoginGoogleDevice() {
    }
    return LoginGoogleDevice;
}());

var UserLogout = /** @class */ (function () {
    function UserLogout() {
    }
    return UserLogout;
}());

var UserSet = /** @class */ (function () {
    function UserSet(payload) {
        this.payload = payload;
    }
    return UserSet;
}());

var StateUser = /** @class */ (function () {
    function StateUser(auth, firestore, facebook, googlePlus, platform) {
        this.auth = auth;
        this.firestore = firestore;
        this.facebook = facebook;
        this.googlePlus = googlePlus;
        this.platform = platform;
    }
    StateUser.authData = function (state) { return state.authData; };
    StateUser.user = function (state) { return state.authenticated; };
    StateUser.authenticated = function (state) { return state.user; };
    StateUser.error = function (state) { return state.error; };
    StateUser.errored = function (state) { return state.error != null; };
    StateUser.userFound = function (state) { return state.user != null; };
    StateUser.prototype.userAuthenticate = function (_a) {
        var patchState = _a.patchState, dispatch = _a.dispatch;
        return this.auth.authState.pipe(Object(__WEBPACK_IMPORTED_MODULE_2_rxjs_operators__["switchMap"])(function (authData) {
            if (authData == null) {
                patchState({ authenticated: false, authData: authData });
                return dispatch(new __WEBPACK_IMPORTED_MODULE_11__language_state__["a" /* LanguageGet */]());
            }
            else {
                console.log(authData);
                patchState({ authData: authData });
                return dispatch(new UserGet(authData));
            }
        }), Object(__WEBPACK_IMPORTED_MODULE_2_rxjs_operators__["catchError"])(function (error) { return Object(__WEBPACK_IMPORTED_MODULE_3_rxjs_observable_of__["of"])(patchState({ error: error })); }));
    };
    StateUser.prototype.userAuthenticateCheck = function (_a, _b) {
        var patchState = _a.patchState, dispatch = _a.dispatch;
        var payload = _b.payload;
        return this.language$.pipe(Object(__WEBPACK_IMPORTED_MODULE_2_rxjs_operators__["filter"])(function (language) { return language != null; }), Object(__WEBPACK_IMPORTED_MODULE_2_rxjs_operators__["take"])(1), Object(__WEBPACK_IMPORTED_MODULE_2_rxjs_operators__["tap"])(function (language) {
            var authData = payload;
            if (authData == null) {
                patchState({ authData: undefined, authenticated: false, error: { name: 'Failed Login', message: 'Unable to login' } });
            }
            else {
                var user = {
                    uid: authData.uid,
                    language: language
                };
                console.log(authData);
                var providerData = authData.providerData[0];
                var displayName = providerData.displayName;
                var email = providerData.email;
                var phoneNumber = providerData.phoneNumber;
                var photoURL = providerData.photoURL;
                var providerId = providerData.providerId;
                if (displayName != null) {
                    user.displayName = displayName;
                }
                if (email != null) {
                    user.email = email;
                }
                if (phoneNumber != null) {
                    user.phoneNumber = phoneNumber;
                }
                if (photoURL != null) {
                    user.photoURL = photoURL;
                }
                user.uidInternal = providerId + ':' + providerId === __WEBPACK_IMPORTED_MODULE_12__enums_auth_provider__["a" /* AuthProvider */].Email ? email : user.uid;
                patchState({ authData: authData, authenticated: true, user: user });
            }
        }));
    };
    StateUser.prototype.userGet = function (_a, _b) {
        var patchState = _a.patchState, dispatch = _a.dispatch;
        var payload = _b.payload;
        var providerData = payload.providerData[0];
        var providerId = providerData.providerId;
        var uidInternal = providerId + ':' + (providerId === __WEBPACK_IMPORTED_MODULE_12__enums_auth_provider__["a" /* AuthProvider */].Email ? providerData.email : providerData.uid);
        return this.firestore.doc("user/" + uidInternal).valueChanges().pipe(Object(__WEBPACK_IMPORTED_MODULE_2_rxjs_operators__["filter"])(function (user) { return user != null; }), Object(__WEBPACK_IMPORTED_MODULE_2_rxjs_operators__["take"])(1), Object(__WEBPACK_IMPORTED_MODULE_2_rxjs_operators__["tap"])(function (user) {
            if (user == null) {
                patchState({ error: { name: 'Could not find user', message: 'Could not find user' } });
            }
            else {
                dispatch(new __WEBPACK_IMPORTED_MODULE_11__language_state__["b" /* LanguageSet */](user.language));
                patchState({ user: user, authenticated: true });
            }
        }), Object(__WEBPACK_IMPORTED_MODULE_2_rxjs_operators__["catchError"])(function (error) { return Object(__WEBPACK_IMPORTED_MODULE_3_rxjs_observable_of__["of"])(patchState({ error: error })); }));
    };
    StateUser.prototype.loginEmail = function (_a, _b) {
        var patchState = _a.patchState, dispatch = _a.dispatch;
        var payload = _b.payload;
        return __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"].fromPromise(__WEBPACK_IMPORTED_MODULE_5_firebase__["auth"]().signInWithEmailAndPassword(payload.id, payload.password)).pipe(Object(__WEBPACK_IMPORTED_MODULE_2_rxjs_operators__["switchMap"])(function (authData) { return dispatch(new UserAuthenticateCheck(authData)); }), Object(__WEBPACK_IMPORTED_MODULE_2_rxjs_operators__["catchError"])(function (error) { return Object(__WEBPACK_IMPORTED_MODULE_3_rxjs_observable_of__["of"])(patchState({ error: error })); }));
    };
    StateUser.prototype.loginFacebook = function (_a) {
        var dispatch = _a.dispatch;
        return this.platform.is(__WEBPACK_IMPORTED_MODULE_6__enums_platform_enum__["a" /* PlatformEnum */].Cordova) ? dispatch(new LoginFacebookDevice()) : dispatch(new LoginFacebookBrowser());
    };
    StateUser.prototype.loginFacebookBrowser = function (_a) {
        var patchState = _a.patchState, dispatch = _a.dispatch;
        return __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"].fromPromise(this.auth.auth.signInWithPopup(new __WEBPACK_IMPORTED_MODULE_5_firebase__["auth"].FacebookAuthProvider())).pipe(Object(__WEBPACK_IMPORTED_MODULE_2_rxjs_operators__["switchMap"])(function (response) { return dispatch(new UserAuthenticateCheck(response.user)); }), Object(__WEBPACK_IMPORTED_MODULE_2_rxjs_operators__["catchError"])(function (error) { return Object(__WEBPACK_IMPORTED_MODULE_3_rxjs_observable_of__["of"])(patchState({ error: error })); }));
    };
    StateUser.prototype.loginFacebookDevice = function (_a) {
        var patchState = _a.patchState, dispatch = _a.dispatch;
        return __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"].fromPromise(this.facebook.login(['email'])).pipe(Object(__WEBPACK_IMPORTED_MODULE_2_rxjs_operators__["switchMap"])(function (response) {
            var credential = __WEBPACK_IMPORTED_MODULE_5_firebase__["auth"].FacebookAuthProvider.credential(response.authResponse.accessToken);
            return __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"].fromPromise(__WEBPACK_IMPORTED_MODULE_5_firebase__["auth"]().signInWithCredential(credential));
        }), Object(__WEBPACK_IMPORTED_MODULE_2_rxjs_operators__["switchMap"])(function (response) {
            var credential = __WEBPACK_IMPORTED_MODULE_5_firebase__["auth"].FacebookAuthProvider.credential(response.authResponse.accessToken);
            return __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"].fromPromise(__WEBPACK_IMPORTED_MODULE_5_firebase__["auth"]().signInWithCredential(credential));
        }), Object(__WEBPACK_IMPORTED_MODULE_2_rxjs_operators__["switchMap"])(function (response) {
            var authData = response;
            return dispatch(new UserAuthenticateCheck(authData));
        }), Object(__WEBPACK_IMPORTED_MODULE_2_rxjs_operators__["catchError"])(function (error) { return Object(__WEBPACK_IMPORTED_MODULE_3_rxjs_observable_of__["of"])(patchState({ error: error })); }));
    };
    StateUser.prototype.loginGoogle = function (_a) {
        var dispatch = _a.dispatch;
        return this.platform.is(__WEBPACK_IMPORTED_MODULE_6__enums_platform_enum__["a" /* PlatformEnum */].Cordova) ? dispatch(new LoginGoogleDevice()) : dispatch(new LoginGoogleBrowser());
    };
    StateUser.prototype.loginGoogleBrowser = function (_a) {
        var patchState = _a.patchState, dispatch = _a.dispatch;
        return __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"].fromPromise(this.auth.auth.signInWithPopup(new __WEBPACK_IMPORTED_MODULE_5_firebase__["auth"].GoogleAuthProvider())).pipe(Object(__WEBPACK_IMPORTED_MODULE_2_rxjs_operators__["switchMap"])(function (response) { return dispatch(new UserAuthenticateCheck(response.user)); }), Object(__WEBPACK_IMPORTED_MODULE_2_rxjs_operators__["catchError"])(function (error) { return Object(__WEBPACK_IMPORTED_MODULE_3_rxjs_observable_of__["of"])(patchState({ error: error })); }));
    };
    StateUser.prototype.loginGoogleDevice = function (_a) {
        var patchState = _a.patchState, dispatch = _a.dispatch;
        return __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"].fromPromise(this.facebook.login(['email'])).pipe(Object(__WEBPACK_IMPORTED_MODULE_2_rxjs_operators__["switchMap"])(function (response) {
            var credential = __WEBPACK_IMPORTED_MODULE_5_firebase__["auth"].FacebookAuthProvider.credential(response.authResponse.accessToken);
            return __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"].fromPromise(__WEBPACK_IMPORTED_MODULE_5_firebase__["auth"]().signInWithCredential(credential));
        }), Object(__WEBPACK_IMPORTED_MODULE_2_rxjs_operators__["switchMap"])(function (response) {
            var credential = __WEBPACK_IMPORTED_MODULE_5_firebase__["auth"].FacebookAuthProvider.credential(response.authResponse.accessToken);
            return __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"].fromPromise(__WEBPACK_IMPORTED_MODULE_5_firebase__["auth"]().signInWithCredential(credential));
        }), Object(__WEBPACK_IMPORTED_MODULE_2_rxjs_operators__["switchMap"])(function (response) {
            var authData = response;
            return dispatch(new UserAuthenticateCheck(authData));
        }), Object(__WEBPACK_IMPORTED_MODULE_2_rxjs_operators__["catchError"])(function (error) { return Object(__WEBPACK_IMPORTED_MODULE_3_rxjs_observable_of__["of"])(patchState({ error: error })); }));
    };
    StateUser.prototype.userLogout = function (_a) {
        var patchState = _a.patchState, dispatch = _a.dispatch;
        return __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"].of(this.auth.auth.signOut()).pipe(Object(__WEBPACK_IMPORTED_MODULE_2_rxjs_operators__["tap"])(function () {
            patchState({
                authenticated: false,
                authData: undefined,
                user: undefined
            });
            dispatch(new UserLogout());
        }), Object(__WEBPACK_IMPORTED_MODULE_2_rxjs_operators__["catchError"])(function (error) { return Object(__WEBPACK_IMPORTED_MODULE_3_rxjs_observable_of__["of"])(patchState({ error: error })); }));
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__ngxs_store__["d" /* Select */])(__WEBPACK_IMPORTED_MODULE_11__language_state__["c" /* StateLanguage */].language),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"])
    ], StateUser.prototype, "language$", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__ngxs_store__["a" /* Action */])(UserAuthenticate),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], StateUser.prototype, "userAuthenticate", null);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__ngxs_store__["a" /* Action */])(UserAuthenticateCheck),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, UserAuthenticateCheck]),
        __metadata("design:returntype", void 0)
    ], StateUser.prototype, "userAuthenticateCheck", null);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__ngxs_store__["a" /* Action */])(UserGet),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, UserGet]),
        __metadata("design:returntype", void 0)
    ], StateUser.prototype, "userGet", null);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__ngxs_store__["a" /* Action */])(LoginEmail),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, LoginEmail]),
        __metadata("design:returntype", void 0)
    ], StateUser.prototype, "loginEmail", null);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__ngxs_store__["a" /* Action */])(LoginFacebook),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], StateUser.prototype, "loginFacebook", null);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__ngxs_store__["a" /* Action */])(LoginFacebookBrowser),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], StateUser.prototype, "loginFacebookBrowser", null);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__ngxs_store__["a" /* Action */])(LoginFacebookDevice),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], StateUser.prototype, "loginFacebookDevice", null);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__ngxs_store__["a" /* Action */])(LoginGoogle),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], StateUser.prototype, "loginGoogle", null);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__ngxs_store__["a" /* Action */])(LoginGoogleBrowser),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], StateUser.prototype, "loginGoogleBrowser", null);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__ngxs_store__["a" /* Action */])(LoginGoogleDevice),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], StateUser.prototype, "loginGoogleDevice", null);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__ngxs_store__["a" /* Action */])(UserLogout),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], StateUser.prototype, "userLogout", null);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__ngxs_store__["e" /* Selector */])(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], StateUser, "authData", null);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__ngxs_store__["e" /* Selector */])(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], StateUser, "user", null);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__ngxs_store__["e" /* Selector */])(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], StateUser, "authenticated", null);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__ngxs_store__["e" /* Selector */])(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], StateUser, "error", null);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__ngxs_store__["e" /* Selector */])(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], StateUser, "errored", null);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__ngxs_store__["e" /* Selector */])(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], StateUser, "userFound", null);
    StateUser = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__ngxs_store__["f" /* State */])({
            name: 'user',
            defaults: {
                authData: undefined,
                user: undefined,
                error: undefined,
                authenticated: false
            }
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_7_angularfire2_auth__["a" /* AngularFireAuth */], __WEBPACK_IMPORTED_MODULE_8_angularfire2_firestore__["a" /* AngularFirestore */], __WEBPACK_IMPORTED_MODULE_9__ionic_native_facebook__["a" /* Facebook */], __WEBPACK_IMPORTED_MODULE_10__ionic_native_google_plus__["a" /* GooglePlus */], __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["Platform"]])
    ], StateUser);
    return StateUser;
}());

//# sourceMappingURL=user.state.js.map

/***/ }),

/***/ 268:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 268;

/***/ }),

/***/ 313:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/alerts/alerts.module": [
		979,
		13
	],
	"../pages/auth/auth.module": [
		980,
		4
	],
	"../pages/cluster/cluster.page.module": [
		981,
		0
	],
	"../pages/find.categories/find.categories.module": [
		982,
		12
	],
	"../pages/find.discover/find.discover.module": [
		983,
		11
	],
	"../pages/find.stream/find.stream.module": [
		984,
		10
	],
	"../pages/find/find.module": [
		985,
		1
	],
	"../pages/publisher.beacon.minor/publisher.beacon.minor.module": [
		986,
		16
	],
	"../pages/publisher.beacon/publisher.beacon.module": [
		987,
		9
	],
	"../pages/publisher.beacons/publisher.beacons.module": [
		988,
		15
	],
	"../pages/publisher.clusters/publisher.clusters.module": [
		989,
		8
	],
	"../pages/publisher/publisher.module": [
		990,
		2
	],
	"../pages/tabs/tabs.module": [
		991,
		14
	],
	"../pages/tutorial/tutorial.module": [
		992,
		7
	],
	"../pages/user.profile/user.profile.module": [
		993,
		6
	],
	"../pages/user.settings/user.settings.module": [
		994,
		5
	],
	"../pages/user/user.module": [
		995,
		3
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 313;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 314:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
var common_1 = __webpack_require__(62);
var forms_1 = __webpack_require__(33);
var forms_2 = __webpack_require__(33);
var ionic_angular_1 = __webpack_require__(49);
var email_1 = __webpack_require__(315);
var password_1 = __webpack_require__(316);
var text_1 = __webpack_require__(317);
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

/***/ }),

/***/ 315:
/***/ (function(module, exports, __webpack_require__) {

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
var core_1 = __webpack_require__(1);
var input_1 = __webpack_require__(123);
var InputEmail = (function (_super) {
    __extends(InputEmail, _super);
    function InputEmail() {
        return _super.call(this) || this;
    }
    InputEmail.prototype.ngOnInit = function () {
        _super.prototype.ngOnInit.call(this);
    };
    return InputEmail;
}(input_1.TNInput));
InputEmail = __decorate([
    core_1.Component({
        selector: 'tn-input-email',
        template: "\n    <form class=\"tn-input-container tn-email {{hostClasses}}\" name=\"form\" [class.tn-input-status-verified]=\"isVerified()\" [class.tn-input-status-error]=\"isError()\" [class.tn-input-status-rounded]=\"roundedIcons\" [formGroup]=\"form\">\n        <input class=\"tn-input\" type=\"email\" formControlName=\"input\" ngControl=\"input\" [ngModel]=\"value\" (ngModelChange)=\"onChange($event)\" placeholder=\"{{placeholder}}\" tn-trim=\"trim\" tn-pattern=\"pattern\" #input>\n\n        <ion-spinner icon=\"spiral\" *ngIf=\"isVerifying()\"></ion-spinner>\n        <div class=\"tn-input-clear\" *ngIf=\"clear && showClear\" (click)=\"clearValue()\"></div>\n    </form>\n    "
    }),
    __metadata("design:paramtypes", [])
], InputEmail);
exports.InputEmail = InputEmail;
//# sourceMappingURL=email.js.map

/***/ }),

/***/ 316:
/***/ (function(module, exports, __webpack_require__) {

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
var core_1 = __webpack_require__(1);
var input_1 = __webpack_require__(123);
var InputPassword = (function (_super) {
    __extends(InputPassword, _super);
    function InputPassword() {
        return _super.call(this) || this;
    }
    return InputPassword;
}(input_1.TNInput));
InputPassword = __decorate([
    core_1.Component({
        selector: 'tn-input-password',
        template: "\n    <form class=\"tn-input-container tn-password {{hostClasses}}\" name=\"form\" [class.tn-input-status-verified]=\"isVerified()\" [class.tn-input-status-error]=\"isError()\" [class.tn-input-status-rounded]=\"roundedIcons\" [formGroup]=\"form\">\n        <input class=\"tn-input\" type=\"password\" formControlName=\"input\" ngControl=\"input\" [ngModel]=\"value\" (ngModelChange)=\"onChange($event)\" placeholder=\"{{placeholder}}\" tn-trim=\"trim\" tn-pattern=\"pattern\" #input>\n\n        <ion-spinner icon=\"spiral\" *ngIf=\"isVerifying()\"></ion-spinner>\n        <div class=\"tn-input-clear\" *ngIf=\"clear && showClear\" (click)=\"clearValue()\"></div>\n    </form>\n    "
    }),
    __metadata("design:paramtypes", [])
], InputPassword);
exports.InputPassword = InputPassword;
//# sourceMappingURL=password.js.map

/***/ }),

/***/ 317:
/***/ (function(module, exports, __webpack_require__) {

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
var core_1 = __webpack_require__(1);
var input_1 = __webpack_require__(123);
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

/***/ }),

/***/ 318:
/***/ (function(module, exports, __webpack_require__) {

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
var core_1 = __webpack_require__(1);
var core_2 = __webpack_require__(1);
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

/***/ }),

/***/ 319:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
var keyboard_1 = __webpack_require__(320);
var ModuleKeyboard = (function () {
    function ModuleKeyboard() {
    }
    return ModuleKeyboard;
}());
ModuleKeyboard = __decorate([
    core_1.NgModule({
        imports: [],
        declarations: [keyboard_1.Keyboard],
        exports: []
    })
], ModuleKeyboard);
exports.ModuleKeyboard = ModuleKeyboard;
//# sourceMappingURL=keyboard.module.js.map

/***/ }),

/***/ 320:
/***/ (function(module, exports, __webpack_require__) {

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
var core_1 = __webpack_require__(1);
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

/***/ }),

/***/ 396:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthProvider; });
var AuthProvider;
(function (AuthProvider) {
    AuthProvider["Email"] = "password";
    AuthProvider["Phone"] = "phone";
    AuthProvider["Google"] = "google.com";
    AuthProvider["Facebook"] = "facebook.com";
    AuthProvider["Twitter"] = "twitter.com";
    AuthProvider["GitHub"] = "github.com";
})(AuthProvider || (AuthProvider = {}));
//# sourceMappingURL=auth.provider.js.map

/***/ }),

/***/ 454:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PlatformEnum; });
var PlatformEnum;
(function (PlatformEnum) {
    PlatformEnum["Android"] = "android";
    PlatformEnum["Cordova"] = "cordova";
    PlatformEnum["Core"] = "core";
    PlatformEnum["iOS"] = "ios";
    PlatformEnum["iPad"] = "ipad";
    PlatformEnum["iPhone"] = "iphone";
    PlatformEnum["Mobile"] = "mobile";
    PlatformEnum["MobileWeb"] = "mobileweb";
    PlatformEnum["Phablet"] = "phablet";
    PlatformEnum["Tablet"] = "tablet";
    PlatformEnum["Windows"] = "windows"; // Device running Windows
})(PlatformEnum || (PlatformEnum = {}));
//# sourceMappingURL=platform.enum.js.map

/***/ }),

/***/ 470:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LanguageGet; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return LanguageSet; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return StateLanguage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ngxs_store__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_operators__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_operators___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_operators__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_observable_of__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_observable_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_observable_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_globalization__ = __webpack_require__(471);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ionic_angular__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ngx_translate_core__ = __webpack_require__(109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__enums_platform_enum__ = __webpack_require__(454);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var LanguageGet = /** @class */ (function () {
    function LanguageGet() {
    }
    return LanguageGet;
}());

var LanguageSet = /** @class */ (function () {
    function LanguageSet(payload) {
        this.payload = payload;
    }
    return LanguageSet;
}());

var StateLanguage = /** @class */ (function () {
    function StateLanguage(globalization, platform, translate) {
        this.globalization = globalization;
        this.platform = platform;
        this.translate = translate;
    }
    StateLanguage.language = function (state) { return state.language; };
    StateLanguage.error = function (state) { return state.error; };
    StateLanguage.errored = function (state) { return state.error != null; };
    StateLanguage.prototype.languageGet = function (_a) {
        var patchState = _a.patchState, dispatch = _a.dispatch;
        var observable;
        if (this.platform.is(__WEBPACK_IMPORTED_MODULE_7__enums_platform_enum__["a" /* PlatformEnum */].Cordova)) {
            observable = __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"].fromPromise(this.globalization.getLocaleName());
        }
        else {
            observable = __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"].of({ value: navigator.language });
        }
        return observable.pipe(Object(__WEBPACK_IMPORTED_MODULE_2_rxjs_operators__["switchMap"])(function (language) { return dispatch(new LanguageSet(language.value)); }), Object(__WEBPACK_IMPORTED_MODULE_2_rxjs_operators__["catchError"])(function (error) { return Object(__WEBPACK_IMPORTED_MODULE_3_rxjs_observable_of__["of"])(patchState({ error: error })); }));
    };
    StateLanguage.prototype.languageSet = function (_a, _b) {
        var patchState = _a.patchState;
        var payload = _b.payload;
        var language = payload;
        this.translate.use(language);
        return Object(__WEBPACK_IMPORTED_MODULE_3_rxjs_observable_of__["of"])(patchState({ language: language }));
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__ngxs_store__["a" /* Action */])(LanguageGet),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], StateLanguage.prototype, "languageGet", null);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__ngxs_store__["a" /* Action */])(LanguageSet),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, LanguageSet]),
        __metadata("design:returntype", void 0)
    ], StateLanguage.prototype, "languageSet", null);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__ngxs_store__["e" /* Selector */])(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], StateLanguage, "language", null);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__ngxs_store__["e" /* Selector */])(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], StateLanguage, "error", null);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__ngxs_store__["e" /* Selector */])(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], StateLanguage, "errored", null);
    StateLanguage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__ngxs_store__["f" /* State */])({
            name: 'language',
            defaults: {
                language: undefined,
                error: undefined
            }
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4__ionic_native_globalization__["a" /* Globalization */], __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["Platform"], __WEBPACK_IMPORTED_MODULE_6__ngx_translate_core__["c" /* TranslateService */]])
    ], StateLanguage);
    return StateLanguage;
}());

//# sourceMappingURL=language.state.js.map

/***/ }),

/***/ 514:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppVersion; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_theory_network__ = __webpack_require__(152);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_theory_network___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_theory_network__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__environments_environment__ = __webpack_require__(515);
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



var AppVersion = /** @class */ (function (_super) {
    __extends(AppVersion, _super);
    function AppVersion() {
        var _this = _super.call(this) || this;
        _this.setVersion(__WEBPACK_IMPORTED_MODULE_2__environments_environment__["a" /* environment */].version);
        return _this;
    }
    AppVersion = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [])
    ], AppVersion);
    return AppVersion;
}(__WEBPACK_IMPORTED_MODULE_1_theory_network__["VersionUtil"]));

//# sourceMappingURL=version.js.map

/***/ }),

/***/ 515:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
var environment = {
    production: false,
    language: 'en',
    version: '0.0.0',
    pathJson: 'data',
    firebase: {
        apiKey: 'AIzaSyD0SxN-pAm8XbaseGjjuToejWrQSJTdwYs',
        authDomain: '1388625286411.firebaseapp.com',
        databaseURL: 'https://1388625286411.firebaseio.com',
        projectId: 'project-4334231676697990915',
        storageBucket: 'project-4334231676697990915.appspot.com',
        messagingSenderId: '671375922961'
    }
};
//# sourceMappingURL=environment.js.map

/***/ }),

/***/ 516:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Page; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_theory_network__ = __webpack_require__(152);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_theory_network___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_theory_network__);
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

var Page = /** @class */ (function (_super) {
    __extends(Page, _super);
    function Page() {
        return _super.call(this) || this;
    }
    return Page;
}(__WEBPACK_IMPORTED_MODULE_0_theory_network__["AppComponent"]));

//# sourceMappingURL=page.js.map

/***/ }),

/***/ 517:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PageTabs; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_alerts__ = __webpack_require__(256);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__page__ = __webpack_require__(516);
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




var PageTabs = /** @class */ (function (_super) {
    __extends(PageTabs, _super);
    function PageTabs(navParams, alerts) {
        var _this = _super.call(this) || this;
        _this.alerts = alerts;
        _this.tabs = [
            'PageFind',
            'PageAlerts',
            'PagePublisher',
            'PageUser'
        ];
        _this.selected = navParams.data.tabIndex || 0;
        return _this;
    }
    PageTabs = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-page-tabs',template:/*ion-inline-start:"/Users/andredavcev/Files/Firefly/app/src/pages/tabs/tabs.html"*/'<ion-tabs [selectedIndex]="selected" [color]="dark">\n    <ion-tab [root]="tabs[0]" tabTitle="{{\'tabs.app.find\' | translate}}"      tabIcon="bug"></ion-tab>\n    <ion-tab [root]="tabs[1]" tabTitle="{{\'tabs.app.alerts\' | translate}}"    tabIcon="pin" [tabBadge]="alerts.unviewed" tabBadgeStyle="secondary"></ion-tab>\n    <ion-tab [root]="tabs[2]" tabTitle="{{\'tabs.app.publisher\' | translate}}" tabIcon="logo-rss"></ion-tab>\n    <ion-tab [root]="tabs[3]" tabTitle="{{\'tabs.app.user\' | translate}}"      tabIcon="person"></ion-tab>\n</ion-tabs>'/*ion-inline-end:"/Users/andredavcev/Files/Firefly/app/src/pages/tabs/tabs.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"], __WEBPACK_IMPORTED_MODULE_2__services_alerts__["a" /* Alerts */]])
    ], PageTabs);
    return PageTabs;
}(__WEBPACK_IMPORTED_MODULE_3__page__["a" /* Page */]));

//# sourceMappingURL=tabs.js.map

/***/ }),

/***/ 518:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PageLogin; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_operators__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_operators___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_operators__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_theory_network__ = __webpack_require__(152);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_theory_network___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_theory_network__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__enums_auth_provider__ = __webpack_require__(396);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_observable_timer__ = __webpack_require__(194);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_observable_timer___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_observable_timer__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_observable_forkJoin__ = __webpack_require__(120);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_observable_forkJoin___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_rxjs_observable_forkJoin__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_observable_of__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_observable_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_rxjs_observable_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ngxs_store__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ngxs_user_state__ = __webpack_require__(257);
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












var PageLogin = /** @class */ (function (_super) {
    __extends(PageLogin, _super);
    function PageLogin(nav, platform, store) {
        var _this = _super.call(this) || this;
        _this.nav = nav;
        _this.platform = platform;
        _this.store = store;
        _this.AuthProvider = __WEBPACK_IMPORTED_MODULE_5__enums_auth_provider__["a" /* AuthProvider */];
        _this.ready = false;
        return _this;
    }
    PageLogin.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.subscriptionsAdd(this.userFound$.pipe(Object(__WEBPACK_IMPORTED_MODULE_3_rxjs_operators__["filter"])(function (userFound) { return userFound; }), Object(__WEBPACK_IMPORTED_MODULE_3_rxjs_operators__["take"])(1)).
            subscribe(function (userFound) {
            _this.nav.push('PageTabs');
        }), Object(__WEBPACK_IMPORTED_MODULE_7_rxjs_observable_forkJoin__["forkJoin"])(Object(__WEBPACK_IMPORTED_MODULE_6_rxjs_observable_timer__["timer"])(1875), this.store.dispatch(new __WEBPACK_IMPORTED_MODULE_10__ngxs_user_state__["e" /* UserAuthenticate */]()).pipe(Object(__WEBPACK_IMPORTED_MODULE_3_rxjs_operators__["switchMap"])(function () { return _this.userAuthenticated$; }), Object(__WEBPACK_IMPORTED_MODULE_3_rxjs_operators__["switchMap"])(function (authenticated) { return authenticated ? _this.userFound$.pipe(Object(__WEBPACK_IMPORTED_MODULE_3_rxjs_operators__["filter"])(function (found) { return found; })) : Object(__WEBPACK_IMPORTED_MODULE_8_rxjs_observable_of__["of"])(authenticated); }), Object(__WEBPACK_IMPORTED_MODULE_3_rxjs_operators__["take"])(1))).
            subscribe(function () { return _this.ready = true; }));
    };
    PageLogin.prototype.login = function (provider) {
        if (provider === __WEBPACK_IMPORTED_MODULE_5__enums_auth_provider__["a" /* AuthProvider */].Facebook) {
            this.store.dispatch(new __WEBPACK_IMPORTED_MODULE_10__ngxs_user_state__["b" /* LoginFacebook */]());
        }
        else if (provider === __WEBPACK_IMPORTED_MODULE_5__enums_auth_provider__["a" /* AuthProvider */].Google) {
            this.store.dispatch(new __WEBPACK_IMPORTED_MODULE_10__ngxs_user_state__["c" /* LoginGoogle */]());
        }
        else if (provider === __WEBPACK_IMPORTED_MODULE_5__enums_auth_provider__["a" /* AuthProvider */].Email) {
            this.store.dispatch(new __WEBPACK_IMPORTED_MODULE_10__ngxs_user_state__["a" /* LoginEmail */]({ id: 'andre.davcev@gmail.com', password: 'weakpassword' }));
        }
    };
    PageLogin.prototype.create = function () {
        //        this.store.dispatch(new UserCreate({id: 'andre.davcev@gmail.com', password: 'weakpassword'}));
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_9__ngxs_store__["d" /* Select */])(__WEBPACK_IMPORTED_MODULE_10__ngxs_user_state__["d" /* StateUser */].authenticated),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"])
    ], PageLogin.prototype, "userAuthenticated$", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_9__ngxs_store__["d" /* Select */])(__WEBPACK_IMPORTED_MODULE_10__ngxs_user_state__["d" /* StateUser */].userFound),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"])
    ], PageLogin.prototype, "userFound$", void 0);
    PageLogin = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-page-auth',template:/*ion-inline-start:"/Users/andredavcev/Files/Firefly/app/src/pages/auth/auth.html"*/'<div class="ff-splash" [class.ff-login]="ready">\n    <div class="tn-container ff-container-app-title tn-align tn-animate tn-transform">\n        <div class="tn-align-item tn-align-fixed">\n            <div class="ff-container-logo tn-align">\n                <firefly class="ff-color-primary tn-animate tn-transform tn-align-item" [class.ff-animate]="!ready"></firefly>\n            </div>\n\n            <img class="ff-app-title tn-animate tn-transform" src="img/app.title@2x.png">\n            <span class="ff-tagline tn-animate tn-transform tn-opacity">{{ \'pages.auth.tagline\' | translate }}</span>\n        </div>\n    </div>\n\n    <div class="tn-container ff-container-auth tn-animate tn-opacity tn-transform">\n        <div class="ff-auth-email">\n<!--\n            <div class="ff-container-inputs">\n                <tn-input-email [tn-host-classes]="\'tn-ico fa-icon fa-envelope-o\'" [(tn-value)]="user.email.value" [tn-placeholder]="\'pages.auth.placeholderEmail\' | translate" [tn-clear]="user.email.clear" [tn-validate]="user.email.validate" [tn-verifying]="user.email.verifying" [tn-required]="true" [tn-spinner-classes]="spinner-light" [tn-valid]="user.email.valid" [tn-valid-input]="user.email.validInput" (tn-change)="user.email.changed"></tn-input-email>\n\n                <div class="ff-divider"></div>\n\n                <tn-input-password [tn-host-classes]="\'tn-ico fa-icon fa-lock\'" [(tn-value)]="user.password.value" [tn-placeholder]="\'pages.auth.placeholderPassword\' | translate" [tn-required]="true" [tn-clear]="user.password.clear" [tn-validate]="user.password.validate" [tn-valid-input]="user.password.validInput"></tn-input-password>\n            </div>\n-->\n\n            <button class="tn-button ff-button" (click)="login(AuthProvider.Email)">\n                <span class="ff-text">{{\'pages.auth.signIn\' | translate}}</span>\n            </button>\n        </div>\n\n        <div class="ff-divider tn-align">\n            <span class="tn-align-item tn-align-fixed">{{\'pages.auth.divider\' | translate}}</span>\n        </div>\n\n        <div class="tn-container-reset ff-buttons">\n            <button class="tn-button tn-provider tn-facebook" (click)="create()" [disabled]="(userAuthenticating$ | async)">\n                <span class="tn-item">{{\'pages.auth.create\' | translate}}</span>\n            </button>\n\n            <button class="tn-button tn-provider tn-facebook" (click)="login(AuthProvider.Facebook)" [disabled]="(userAuthenticating$ | async)">\n                <span class="tn-item">{{\'pages.auth.facebook\' | translate}}</span>\n            </button>\n\n            <button class="tn-button tn-provider tn-google" (click)="login(AuthProvider.Google)" [disabled]="(userAuthenticating$ | async)">\n                <span class="tn-item">{{\'pages.auth.google\' | translate}}</span>\n            </button>\n<!--\n            <button class="tn-button tn-provider tn-twitter" (click)="login(AuthProvider.Twitter)" [disabled]="(userAuthenticating$ | async)">\n                <span class="tn-item">{{\'pages.auth.twitter\' | translate}}</span>\n            </button>\n        -->\n        </div>\n<!--\n        <div class="ff-footer tn-flex">\n            <div class="ff-item tn-align-left">\n                <a class="ff-item ff-link">{{\'pages.auth.forgotPassword\' | translate}}</a>\n                <span class="ff-item">|</span>\n                <a class="ff-item ff-link">{{\'pages.auth.forgotName\' | translate}}</a>\n            </div>\n\n            <div class="ff-item tn-align-right">\n                <span class="ff-item">{{\'pages.auth.newUser\' | translate}}</span>\n                <a class="ff-item ff-link ff-underline">{{\'pages.auth.signUp\' | translate}}</a>\n            </div>\n        </div>\n-->\n    </div>\n</div>'/*ion-inline-end:"/Users/andredavcev/Files/Firefly/app/src/pages/auth/auth.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["Platform"], __WEBPACK_IMPORTED_MODULE_9__ngxs_store__["h" /* Store */]])
    ], PageLogin);
    return PageLogin;
}(__WEBPACK_IMPORTED_MODULE_4_theory_network__["AppComponent"]));

//# sourceMappingURL=auth.js.map

/***/ }),

/***/ 519:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ServiceBeacons; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angularfire2_firestore__ = __webpack_require__(156);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ServiceBeacons = /** @class */ (function () {
    function ServiceBeacons(firestore) {
        this.firestore = firestore;
    }
    ServiceBeacons.prototype.beaconsGet = function () {
        this.beacons = this.firestore.collection('beacons');
        this.beaconsObservable = this.beacons.valueChanges();
        return this.beaconsObservable;
    };
    Object.defineProperty(ServiceBeacons.prototype, "beacons", {
        get: function () {
            return this._beacons;
        },
        set: function (beacons) {
            this._beacons = beacons;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ServiceBeacons.prototype, "beaconsObservable", {
        get: function () {
            return this._beaconsObservable;
        },
        set: function (beaconsObservable) {
            this._beaconsObservable = beaconsObservable;
        },
        enumerable: true,
        configurable: true
    });
    ServiceBeacons = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_angularfire2_firestore__["a" /* AngularFirestore */]])
    ], ServiceBeacons);
    return ServiceBeacons;
}());

//# sourceMappingURL=beacons.js.map

/***/ }),

/***/ 520:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(521);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(525);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 525:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export HttpLoaderFactory */
/* unused harmony export IonicPro */
/* unused harmony export AppErrorHandler */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__(269);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(258);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_pro__ = __webpack_require__(969);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_pro___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__ionic_pro__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_geolocation__ = __webpack_require__(511);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_globalization__ = __webpack_require__(471);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_keyboard__ = __webpack_require__(512);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_splash_screen__ = __webpack_require__(513);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_status_bar__ = __webpack_require__(970);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_native_facebook__ = __webpack_require__(467);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ionic_native_google_plus__ = __webpack_require__(469);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_angularfire2__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__ngx_translate_core__ = __webpack_require__(109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__ngx_translate_http_loader__ = __webpack_require__(971);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__core_core_module__ = __webpack_require__(973);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__app__ = __webpack_require__(974);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__services_alerts__ = __webpack_require__(256);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__services_beacons__ = __webpack_require__(519);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__services_temp__ = __webpack_require__(255);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__services_version__ = __webpack_require__(514);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__directives_version__ = __webpack_require__(975);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__environments_environment__ = __webpack_require__(515);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__angular_common__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__ngxs_store__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__ngxs_devtools_plugin__ = __webpack_require__(976);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__ngxs_app_state__ = __webpack_require__(977);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__ngxs_location_state__ = __webpack_require__(978);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__ngxs_language_state__ = __webpack_require__(470);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__ngxs_user_state__ = __webpack_require__(257);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



































function HttpLoaderFactory(http) {
    return new __WEBPACK_IMPORTED_MODULE_15__ngx_translate_http_loader__["a" /* TranslateHttpLoader */](http);
}
var IonicPro = __WEBPACK_IMPORTED_MODULE_5__ionic_pro__["Pro"].init('1e5146ca', {
    appVersion: __WEBPACK_IMPORTED_MODULE_23__environments_environment__["a" /* environment */].version
});
var AppErrorHandler = /** @class */ (function () {
    function AppErrorHandler() {
    }
    AppErrorHandler.prototype.handleError = function (error) {
        console.log(error);
        IonicPro.monitoring.handleNewError(error);
    };
    return AppErrorHandler;
}());

var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["NgModule"])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_24__angular_common__["CommonModule"],
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["b" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_13_angularfire2__["a" /* AngularFireModule */].initializeApp(__WEBPACK_IMPORTED_MODULE_23__environments_environment__["a" /* environment */].firebase),
                __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["a" /* IonicStorageModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["IonicModule"].forRoot(__WEBPACK_IMPORTED_MODULE_17__app__["a" /* App */], {
                    tabsHideOnSubPages: true
                }, {
                    links: [
                        { loadChildren: '../pages/alerts/alerts.module#ModulePageAlerts', name: 'PageAlerts', segment: 'alerts', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/auth/auth.module#ModulePageLogin', name: 'PageLogin', segment: 'auth', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/cluster/cluster.page.module#ModulePagePublisherCluster', name: 'PagePublisherCluster', segment: 'cluster.page', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/find.categories/find.categories.module#ModulePageFindCategories', name: 'PageFindCategories', segment: 'find.categories', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/find.discover/find.discover.module#ModulePageFindDiscover', name: 'PageFindDiscover', segment: 'find.discover', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/find.stream/find.stream.module#ModulePageFindStream', name: 'PageFindStream', segment: 'find.stream', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/find/find.module#ModulePageFind', name: 'PageFind', segment: 'find', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/publisher.beacon.minor/publisher.beacon.minor.module#ModulePagePublisherBeacons', name: 'PagePublisherBeaconMinor', segment: 'publisher.beacon.minor', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/publisher.beacon/publisher.beacon.module#ModulePagePublisherBeacon', name: 'PagePublisherBeacon', segment: 'publisher.beacon', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/publisher.beacons/publisher.beacons.module#ModulePagePublisherBeacons', name: 'PagePublisherBeacons', segment: 'publisher.beacons', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/publisher.clusters/publisher.clusters.module#ModulePagePublisherClusters', name: 'PagePublisherClusters', segment: 'publisher.clusters', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/publisher/publisher.module#ModulePagePublisher', name: 'PagePublisher', segment: 'publisher', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/tabs/tabs.module#ModulePageTabs', name: 'PageTabs', segment: 'tabs', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/tutorial/tutorial.module#ModulePageTutorial', name: 'PageTutorial', segment: 'tutorial', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/user.profile/user.profile.module#ModulePageUserProfile', name: 'PageUserProfile', segment: 'user.profile', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/user.settings/user.settings.module#ModulePageUserSettings', name: 'PageUserSettings', segment: 'user.settings', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/user/user.module#ModulePageUser', name: 'PageUser', segment: 'user', priority: 'low', defaultHistory: [] }
                    ]
                }),
                __WEBPACK_IMPORTED_MODULE_16__core_core_module__["a" /* CoreModule */],
                __WEBPACK_IMPORTED_MODULE_14__ngx_translate_core__["b" /* TranslateModule */].forRoot({
                    loader: {
                        provide: __WEBPACK_IMPORTED_MODULE_14__ngx_translate_core__["a" /* TranslateLoader */],
                        useFactory: HttpLoaderFactory,
                        deps: [__WEBPACK_IMPORTED_MODULE_1__angular_common_http__["a" /* HttpClient */]]
                    }
                }),
                __WEBPACK_IMPORTED_MODULE_25__ngxs_store__["c" /* NgxsModule */].forRoot([
                    __WEBPACK_IMPORTED_MODULE_27__ngxs_app_state__["a" /* StateApp */],
                    __WEBPACK_IMPORTED_MODULE_29__ngxs_language_state__["c" /* StateLanguage */],
                    __WEBPACK_IMPORTED_MODULE_28__ngxs_location_state__["a" /* StateLocation */],
                    __WEBPACK_IMPORTED_MODULE_30__ngxs_user_state__["d" /* StateUser */]
                ]),
                __WEBPACK_IMPORTED_MODULE_26__ngxs_devtools_plugin__["a" /* NgxsReduxDevtoolsPluginModule */].forRoot({
                    disabled: __WEBPACK_IMPORTED_MODULE_23__environments_environment__["a" /* environment */].production
                })
                /*
                        NgxsModule.forRoot
                        ([
                            StateApp,
                            StateLanguage,
                            StateLocation,
                            StateUser
                        ]),
                
                        NgxsReduxDevtoolsPluginModule.forRoot
                        ({
                            disabled: environment.production
                        })
                */
            ],
            declarations: [
                __WEBPACK_IMPORTED_MODULE_17__app__["a" /* App */],
                __WEBPACK_IMPORTED_MODULE_22__directives_version__["a" /* DirectiveVersion */]
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["IonicApp"]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_17__app__["a" /* App */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_7__ionic_native_globalization__["a" /* Globalization */],
                __WEBPACK_IMPORTED_MODULE_10__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_6__ionic_native_geolocation__["a" /* Geolocation */],
                __WEBPACK_IMPORTED_MODULE_9__ionic_native_splash_screen__["a" /* SplashScreen */],
                __WEBPACK_IMPORTED_MODULE_8__ionic_native_keyboard__["a" /* Keyboard */],
                __WEBPACK_IMPORTED_MODULE_11__ionic_native_facebook__["a" /* Facebook */],
                __WEBPACK_IMPORTED_MODULE_12__ionic_native_google_plus__["a" /* GooglePlus */],
                __WEBPACK_IMPORTED_MODULE_18__services_alerts__["a" /* Alerts */],
                __WEBPACK_IMPORTED_MODULE_19__services_beacons__["a" /* ServiceBeacons */],
                __WEBPACK_IMPORTED_MODULE_20__services_temp__["a" /* Temp */],
                __WEBPACK_IMPORTED_MODULE_21__services_version__["a" /* AppVersion */],
                [{ provide: __WEBPACK_IMPORTED_MODULE_2__angular_core__["ErrorHandler"], useClass: AppErrorHandler }]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 545:
/***/ (function(module, exports, __webpack_require__) {

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
var core_1 = __webpack_require__(1);
var component_1 = __webpack_require__(318);
var Icon = (function (_super) {
    __extends(Icon, _super);
    function Icon(options) {
        return _super.call(this, {
            elementRef: options.elementRef,
            renderer: options.renderer,
            prefix: options.prefix,
            active: options.active,
            visible: options.visible,
            component: options.component == null ? 'icon' : options.component
        }) || this;
    }
    Icon.prototype.ngOnInit = function () {
        this.setClass(this.name, true);
    };
    return Icon;
}(component_1.Component));
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], Icon.prototype, "name", void 0);
exports.Icon = Icon;
//# sourceMappingURL=icon.js.map

/***/ }),

/***/ 546:
/***/ (function(module, exports, __webpack_require__) {

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
var core_1 = __webpack_require__(1);
var core_2 = __webpack_require__(1);
var AppComponent = (function () {
    function AppComponent() {
        this._classPrefix = 'app-';
        this.classes = {};
        this._subscriptions = [];
    }
    AppComponent.prototype.ngOnChanges = function (changes) {
        if (changes.class) {
            if (changes.class.firstChange && changes.class.currentValue != null) {
                this.classesAdd(changes.class.currentValue.trim().split(' '));
            }
        }
    };
    AppComponent.prototype.ngOnDestroy = function () {
        for (var _i = 0, _a = this._subscriptions; _i < _a.length; _i++) {
            var subscription = _a[_i];
            subscription.unsubscribe();
        }
    };
    AppComponent.prototype.subscriptionsAdd = function () {
        var subscriptions = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            subscriptions[_i] = arguments[_i];
        }
        this._subscriptions.concat(subscriptions);
    };
    AppComponent.prototype.getClass = function (className) {
        return "" + this._classPrefix + className;
    };
    AppComponent.prototype.classesAdd = function () {
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
    AppComponent.prototype.classesRemove = function () {
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
    AppComponent.prototype.classesRender = function () {
        this.class = Object.keys(this.classes).join(' ');
    };
    Object.defineProperty(AppComponent.prototype, "classPrefix", {
        get: function () {
            return this._classPrefix;
        },
        set: function (classPrefix) {
            this._classPrefix = classPrefix;
        },
        enumerable: true,
        configurable: true
    });
    return AppComponent;
}());
__decorate([
    core_2.HostBinding('class'),
    core_1.Input(),
    __metadata("design:type", String)
], AppComponent.prototype, "class", void 0);
exports.AppComponent = AppComponent;
//# sourceMappingURL=component.app.js.map

/***/ }),

/***/ 547:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var StatusBarStyle;
(function (StatusBarStyle) {
    StatusBarStyle[StatusBarStyle["Default"] = 0] = "Default";
    StatusBarStyle[StatusBarStyle["Light"] = 1] = "Light";
    StatusBarStyle[StatusBarStyle["BlackTranslucent"] = 2] = "BlackTranslucent";
    StatusBarStyle[StatusBarStyle["BlackOpaque"] = 3] = "BlackOpaque";
})(StatusBarStyle = exports.StatusBarStyle || (exports.StatusBarStyle = {}));
//# sourceMappingURL=status-bar-style.enum.js.map

/***/ }),

/***/ 548:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var VersionUtil = (function () {
    function VersionUtil() {
    }
    VersionUtil.parse = function (version) {
        var parts = version.trim().split('-');
        var partsMain = parts[0].split('.');
        var final = {
            major: parseInt(partsMain[0], 10),
            minor: parseInt(partsMain[1], 10),
            patch: parseInt(partsMain[2], 10)
        };
        if (parts[1] != null) {
            var partsFeature = parts[1].split('.');
            final.feature = parts[0];
            if (partsFeature[1] != null) {
                final.featureVersion = parseInt(partsFeature[1], 10);
            }
        }
        return final;
    };
    VersionUtil.prototype.getVersion = function () {
        return this._version;
    };
    VersionUtil.prototype.setVersion = function (version) {
        this._version = VersionUtil.parse(version);
        return this.getVersion();
    };
    VersionUtil.prototype.check = function (version) {
        var current = this.getVersion();
        var compare = VersionUtil.parse(version);
        var show = false;
        if (current.major >= compare.major &&
            current.minor >= compare.minor &&
            current.patch >= compare.patch &&
            (compare.feature == null ||
                current.feature == null ||
                current.feature === compare.feature) &&
            (compare.featureVersion == null ||
                (current.featureVersion != null &&
                    current.featureVersion >= compare.featureVersion))) {
            show = true;
        }
        return show;
    };
    return VersionUtil;
}());
exports.VersionUtil = VersionUtil;
//# sourceMappingURL=version.util.js.map

/***/ }),

/***/ 973:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CoreModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angularfire2_auth__ = __webpack_require__(455);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_firestore__ = __webpack_require__(156);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var CoreModule = /** @class */ (function () {
    function CoreModule() {
    }
    CoreModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_angularfire2_auth__["b" /* AngularFireAuthModule */],
                __WEBPACK_IMPORTED_MODULE_2_angularfire2_firestore__["b" /* AngularFirestoreModule */]
            ],
            providers: []
        })
    ], CoreModule);
    return CoreModule;
}());

//# sourceMappingURL=core.module.js.map

/***/ }),

/***/ 974:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return App; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__ = __webpack_require__(109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(513);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_keyboard__ = __webpack_require__(512);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_storage__ = __webpack_require__(258);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_tabs_tabs__ = __webpack_require__(517);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_auth_auth__ = __webpack_require__(518);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var App = /** @class */ (function () {
    function App(events, menu, platform, storage, splashScreen, keyboard, translate) {
        this.events = events;
        this.menu = menu;
        this.platform = platform;
        this.storage = storage;
        this.splashScreen = splashScreen;
        this.keyboard = keyboard;
        this.translate = translate;
        this.loggedInPages = [
            { title: 'Logout', name: 'TabsPage', component: __WEBPACK_IMPORTED_MODULE_6__pages_tabs_tabs__["a" /* PageTabs */], icon: 'log-out' }
        ];
        this.loggedOutPages = [
            { title: 'Login', name: 'LoginPage', component: __WEBPACK_IMPORTED_MODULE_7__pages_auth_auth__["a" /* PageLogin */], icon: 'log-in' }
        ];
        translate.setDefaultLang('en');
        this.rootPage = 'PageLogin';
        /*
                // Check if the user has already seen the tutorial
                this.storage.get('hasSeenTutorial').then((hasSeenTutorial) =>
                {
                    this.rootPage = 'PageLogin';
        
                    if (hasSeenTutorial)
                    {
        //                this.rootPage = 'LoginPage';
                    }
                    else
                    {
        //                this.rootPage = 'TutorialPage';
                    }
        
                    this.platformReady()
                });
        */
    }
    App.prototype.openPage = function (page) {
        var params = {};
        // the nav component was found using @ViewChild(Nav)
        // reset the nav to remove previous pages and only have this page
        // we wouldn't want the back button to show in this scenario
        if (page.index) {
            params = { tabIndex: page.index };
        }
        // If we are already on tabs just change the selected tab
        // don't setRoot again, this maintains the history stack of the
        // tabs even if changing them from the menu
        if (this.nav.getActiveChildNav() && page.index != undefined) {
            // Set the root of the nav with params if it's a tab index
            this.nav.getActiveChildNav().select(page.index);
        }
        else {
            this.nav.setRoot(page.name, params).catch(function (err) {
                console.log("Didn't set nav root: " + err);
            });
        }
    };
    App.prototype.openTutorial = function () {
        //        this.nav.setRoot(TutorialPage);
    };
    App.prototype.platformReady = function () {
        var _this = this;
        if (this.platform.is('cordova')) {
            // Call any initial plugins when ready
            this.platform.ready().then(function () {
                _this.nav.setRoot(_this.rootPage).then(function () {
                    _this.splashScreen.hide();
                });
            });
        }
    };
    App.prototype.isActive = function (page) {
        var childNav = this.nav.getActiveChildNavs()[0];
        // Tabs are a special case because they have their own navigation
        if (childNav) {
            if (childNav.getSelected() && childNav.getSelected().root === page.tabName) {
                return 'primary';
            }
            return;
        }
        if (this.nav.getActive() && this.nav.getActive().name === page.name) {
            return 'primary';
        }
        return;
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["Nav"]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["Nav"])
    ], App.prototype, "nav", void 0);
    App = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({template:/*ion-inline-start:"/Users/andredavcev/Files/Firefly/app/src/app/app.html"*/'<ion-nav [root]="rootPage" #content swipeBackEnabled="false" main name="app" tn-keyboard></ion-nav>\n'/*ion-inline-end:"/Users/andredavcev/Files/Firefly/app/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["Events"], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["MenuController"], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["Platform"], __WEBPACK_IMPORTED_MODULE_5__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_keyboard__["a" /* Keyboard */], __WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__["c" /* TranslateService */]])
    ], App);
    return App;
}());

//# sourceMappingURL=app.js.map

/***/ }),

/***/ 975:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DirectiveVersion; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_version__ = __webpack_require__(514);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var DirectiveVersion = /** @class */ (function () {
    function DirectiveVersion(templateRef, viewContainer, version) {
        this.templateRef = templateRef;
        this.viewContainer = viewContainer;
        this.version = version;
        this.hasView = false;
    }
    Object.defineProperty(DirectiveVersion.prototype, "appVersion", {
        set: function (version) {
            var show = this.version.check(version);
            if (show && !this.hasView) {
                this.viewContainer.createEmbeddedView(this.templateRef);
                this.hasView = true;
            }
            else if (!show && this.hasView) {
                this.viewContainer.clear();
                this.hasView = false;
            }
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], DirectiveVersion.prototype, "appVersion", null);
    DirectiveVersion = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({
            selector: '[appVersion]'
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["TemplateRef"], __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewContainerRef"], __WEBPACK_IMPORTED_MODULE_1__services_version__["a" /* AppVersion */]])
    ], DirectiveVersion);
    return DirectiveVersion;
}());

//# sourceMappingURL=version.js.map

/***/ }),

/***/ 977:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StateApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ngxs_store__ = __webpack_require__(55);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var StateApp = /** @class */ (function () {
    function StateApp() {
    }
    StateApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__ngxs_store__["f" /* State */])({
            name: 'app',
            defaults: {}
        })
    ], StateApp);
    return StateApp;
}());

//# sourceMappingURL=app.state.js.map

/***/ }),

/***/ 978:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export LocationGet */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StateLocation; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ngxs_store__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_operators__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_operators___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_operators__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_geolocation__ = __webpack_require__(511);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_observable_of__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_observable_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_observable_of__);
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




// Actions
var LocationGet = /** @class */ (function () {
    function LocationGet() {
    }
    return LocationGet;
}());

var StateLocation = /** @class */ (function () {
    function StateLocation(geolocation) {
        this.geolocation = geolocation;
    }
    StateLocation.location = function (state) { return state.location; };
    StateLocation.permitted = function (state) { return state.permitted; };
    StateLocation.error = function (state) { return state.error; };
    StateLocation.errored = function (state) { return state.error != null; };
    StateLocation.prototype.locationGet = function (_a) {
        var getState = _a.getState, setState = _a.setState;
        return this.geolocation.watchPosition().pipe(Object(__WEBPACK_IMPORTED_MODULE_1_rxjs_operators__["filter"])(function (position) { return position.coords !== undefined; }), Object(__WEBPACK_IMPORTED_MODULE_1_rxjs_operators__["map"])(function (position) {
            setState(__assign({}, getState(), { location: position, permitted: true }));
        }), Object(__WEBPACK_IMPORTED_MODULE_1_rxjs_operators__["catchError"])(function (error) { return Object(__WEBPACK_IMPORTED_MODULE_3_rxjs_observable_of__["of"])(setState(__assign({}, getState(), { error: error }))); }));
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__ngxs_store__["a" /* Action */])(LocationGet),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], StateLocation.prototype, "locationGet", null);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__ngxs_store__["e" /* Selector */])(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], StateLocation, "location", null);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__ngxs_store__["e" /* Selector */])(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], StateLocation, "permitted", null);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__ngxs_store__["e" /* Selector */])(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], StateLocation, "error", null);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__ngxs_store__["e" /* Selector */])(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], StateLocation, "errored", null);
    StateLocation = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__ngxs_store__["f" /* State */])({
            name: 'location',
            defaults: {
                location: undefined,
                permitted: false,
                error: undefined
            }
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__ionic_native_geolocation__["a" /* Geolocation */]])
    ], StateLocation);
    return StateLocation;
}());

//# sourceMappingURL=location.state.js.map

/***/ })

},[520]);
//# sourceMappingURL=main.js.map