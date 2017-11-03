import {NgModule}            from '@angular/core';
import {ModuleWithProviders} from '@angular/core';

export * from './base/module';
export * from './components/module';
export * from './config/module';
export * from './directives/module';
export * from './ionic/module';
export * from './utility/module';

import {TNBaseModule}       from './base/module';
import {TNComponentModule}  from './components/module';
import {TNConfigModule}     from './config/module';
import {TNDirectivesModule} from './directives/module';
import {TNIonicModule}      from './ionic/module';
import {TNUtilModule}       from './utility/module';

@NgModule
({
    imports :
    [
        TNBaseModule,
        TNComponentModule,
        TNConfigModule,
        TNDirectivesModule,
        TNIonicModule,
        TNUtilModule
    ],

    declarations : [],
    exports      : []
})

export class TheoryNetworkModule
{
    static forRoot():ModuleWithProviders
    {
        return {
            ngModule  : TheoryNetworkModule,
            providers : []
        }
    }
}