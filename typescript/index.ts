///<reference path="../node_modules/typescript/lib/lib.es6.d.ts"/>

import {NgModule}            from '@angular/core';
import {ModuleWithProviders} from '@angular/core';

export {TNObject} from './base/object';

export {ModuleInput}       from './components/input/input.module';
export {ModuleRating}      from './components/rating/rating.module';
export {ComponentOptions}  from './components/component.options';
export {Component}         from './components/component';
export {Icon}              from './components/icon/icon';
export {TNInput}           from './components/input/input';
export {InputEmail}        from './components/input/email/email';
export {InputPassword}     from './components/input/password/password';
export {InputText}         from './components/input/text/text';
export {RatingPopoverPage} from './components/rating/rating.popover';
export {Rating}            from './components/rating/rating';
export {AppComponent}      from './components/component.app';

export {Config}              from './config/config.config';
export {MobileConfigOptions} from './config/config.mobile.options';
export {MobileConfiguration} from './config/config.mobile';
export {ConfigOptions}       from './config/config.options';
export {ConfigProvider}      from './config/config.provider';
export {ConfigService}       from './config/config.service';
export {Configuration}       from './config/config';
export {ConfigView}          from './config/config.view';
export {ModelProvider}       from './config/model.provider';
export {ModelService}        from './config/model.service';
export {ModelSettings}       from './config/model.settings';
export {Model}               from './config/model';
export {ModelView}           from './config/model.view';
export {StatusBarStyle}      from './config/status.bar.style';

export {ModuleKeyboard} from './directives/keyboard/keyboard.module';
export {Keyboard}       from './directives/keyboard/keyboard';

export {Version}     from './directives/version/version';
export {VersionUtil} from './directives/version/version.util';

export {FirestoreObject} from './firebase/models/object';
export {FirebaseUtil}    from './firebase/providers/util';

export {Page} from './ionic/page';

export {Regex} from './utility/regex';

import {ModuleInput}    from './components/input/input.module';
import {ModuleRating}   from './components/rating/rating.module';
import {ModuleKeyboard} from './directives/keyboard/keyboard.module';

@NgModule
({
    imports :
    [
        ModuleInput,
        ModuleRating,
        ModuleKeyboard
    ],

    declarations : [],
    
    exports :
    [
        ModuleInput,
        ModuleRating,
        ModuleKeyboard
    ]
})

export class TheoryNetworkModule
{

}