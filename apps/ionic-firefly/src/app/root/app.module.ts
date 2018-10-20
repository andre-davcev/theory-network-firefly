import { NgModule } from '@angular/core';

import { CoreModule, SharedModule } from '@firefly/app/modules';

import { ModuleRoutingApp } from './app.component.routing';
import { ComponentApp } from './app.component';

@NgModule
({
    imports :
    [
        CoreModule,
        SharedModule,
        ModuleRoutingApp
    ],

    declarations : [ComponentApp],

    bootstrap: [ComponentApp]
})
export class AppModule {}
