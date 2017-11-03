import {NgModule}            from '@angular/core';
import {ModuleWithProviders} from '@angular/core';

export {TNConfig}              from './config.config';
export {TNMobileConfigOptions} from './config.mobile.options';
export {MobileConfiguration}   from './config.mobile';
export {TNConfigOptions}       from './config.options';
export {TNConfigProvider}      from './config.provider';
export {TNConfigService}       from './config.service';
export {TNConfiguration}       from './config';
export {TNConfigView}          from './config.view';
export {TNModelProvider}       from './model.provider';
export {TNModelService}        from './model.service';
export {TNModelSettings}       from './model.settings';
export {TNModel}               from './model';
export {TNModelView}           from './model.view';
export {TNStatusBarStyle}      from './status.bar.style';

@NgModule
({
    imports      : [],
    declarations : [],
    exports      : []
})

export class TNConfigModule
{
    static forRoot():ModuleWithProviders
    {
        return {
            ngModule  : TNConfigModule,
            providers : []
        }
    }
}