///<reference path="../node_modules/typescript/lib/lib.es6.d.ts"/>

import {NgModule}            from '@angular/core';
import {ModuleWithProviders} from '@angular/core';

export {TNObject} from './base/object';

export {TNModuleInput}       from './components/input/input.module';
export {TNModuleRating}      from './components/rating/rating.module';
export {TNComponentOptions}  from './components/component.options';
export {TNComponent}         from './components/component';
export {TNIcon}              from './components/icon/icon';
export {TNInput}             from './components/input/input';
export {TNInputEmail}        from './components/input/email/email';
export {TNInputPassword}     from './components/input/password/password';
export {TNInputText}         from './components/input/text/text';
export {TNRatingPopoverPage} from './components/rating/rating.popover';
export {TNRating}            from './components/rating/rating';

export {TNConfig}              from './config/config.config';
export {TNMobileConfigOptions} from './config/config.mobile.options';
export {MobileConfiguration}   from './config/config.mobile';
export {TNConfigOptions}       from './config/config.options';
export {TNConfigProvider}      from './config/config.provider';
export {TNConfigService}       from './config/config.service';
export {TNConfiguration}       from './config/config';
export {TNConfigView}          from './config/config.view';
export {TNModelProvider}       from './config/model.provider';
export {TNModelService}        from './config/model.service';
export {TNModelSettings}       from './config/model.settings';
export {TNModel}               from './config/model';
export {TNModelView}           from './config/model.view';
export {TNStatusBarStyle}      from './config/status.bar.style';

export {TNModuleKeyboard} from './directives/keyboard/keyboard.module';
export {TNKeyboard}       from './directives/keyboard/keyboard';

export {TNPage} from './ionic/page';

export {TNRegex} from './utility/regex';

import {TNModuleInput}    from './components/input/input.module';
import {TNModuleRating}   from './components/rating/rating.module';
import {TNModuleKeyboard} from './directives/keyboard/keyboard.module';

@NgModule
({
    imports :
    [
        TNModuleInput,
        TNModuleRating,
        TNModuleKeyboard
    ],

    declarations : [],
    
    exports :
    [
        TNModuleInput,
        TNModuleRating,
        TNModuleKeyboard
    ]
})

export class TheoryNetworkModule
{

}