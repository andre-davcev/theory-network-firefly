import {NgModule}            from '@angular/core';
import {ModuleWithProviders} from '@angular/core';

export {TNObject} from './object';

@NgModule
({
    imports      : [],
    declarations : [],
    exports      : []
})

export class TNBaseModule
{
    static forRoot():ModuleWithProviders
    {
        return {
            ngModule  : TNBaseModule,
            providers : []
        }
    }
}