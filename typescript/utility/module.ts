import {NgModule}            from '@angular/core';
import {ModuleWithProviders} from '@angular/core';

export {TNRegex} from './regex';

@NgModule
({
    imports      : [],
    declarations : [],
    exports      : []
})

export class TNUtilModule
{
    static forRoot():ModuleWithProviders
    {
        return {
            ngModule  : TNUtilModule,
            providers : []
        }
    }
}