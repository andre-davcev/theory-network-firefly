import {NgModule}            from '@angular/core';
import {ModuleWithProviders} from '@angular/core';

import {TNKeyboard} from './keyboard';

@NgModule
({
    imports      : [],
    declarations : [TNKeyboard],
    exports      : []
})

export class TNDirectivesModule
{
    static forRoot():ModuleWithProviders
    {
        return {
            ngModule  : TNDirectivesModule,
            providers : []
        }
    }
}