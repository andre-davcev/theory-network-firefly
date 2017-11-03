import {NgModule}            from '@angular/core';
import {ModuleWithProviders} from '@angular/core';

export {TNPage} from './page';

@NgModule
({
    imports      : [],
    declarations : [],
    exports      : []
})

export class TNIonicModule
{
    static forRoot():ModuleWithProviders
    {
        return {
            ngModule  : TNIonicModule,
            providers : []
        }
    }
}