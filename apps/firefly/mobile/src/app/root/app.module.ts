import { NgModule } from '@angular/core';

import { CoreModule, ModulePage } from '@firefly/app/modules';

import { ModuleRoutingApp } from './app.component.routing';
import { ComponentApp } from './app.component';
import { ModuleComponentIcon } from '@firefly/core';

@NgModule
({
    imports :
    [
        CoreModule,

        ModulePage,
        ModuleRoutingApp,
        ModuleComponentIcon
    ],

    declarations : [ComponentApp],

    bootstrap: [ComponentApp]
})
export class AppModule { }
