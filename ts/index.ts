///<reference path="../node_modules/typescript/lib/lib.es6.d.ts"/>

import {NgModule}            from '@angular/core';
import {ModuleWithProviders} from '@angular/core';

export {ModuleInput}       from './components/input/input.module';
export {ComponentOptions}  from './components/component.options';
export {Component}         from './components/component';
export {Icon}              from './components/icon/icon';
export {TNInput}           from './components/input/input';
export {InputEmail}        from './components/input/email/email';
export {InputPassword}     from './components/input/password/password';
export {InputText}         from './components/input/text/text';
export {AppComponent}      from './components/component.app';

export {StatusBarStyle}      from './ionic/status-bar-style.enum';

export {ModuleKeyboard} from './directives/keyboard/keyboard.module';
export {Keyboard}       from './directives/keyboard/keyboard';

export {Version}     from './directives/version/version.model';
export {VersionUtil} from './directives/version/version.util';

import {ModuleInput}    from './components/input/input.module';
import {ModuleKeyboard} from './directives/keyboard/keyboard.module';

@NgModule
({
    imports :
    [
        ModuleInput,
        ModuleKeyboard
    ],

    declarations : [],
    
    exports :
    [
        ModuleInput,
        ModuleKeyboard
    ]
})

export class TheoryNetworkModule
{

}