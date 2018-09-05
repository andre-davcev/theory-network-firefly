import { NgModule } from '@angular/core';

import { CoreModule } from './core/core.module';
import { SharedModule } from './features/shared/shared.module';
import { ModuleRoutingApp } from './app-routing.module';
import { ComponentApp } from './app.component';

@NgModule
({
    imports :
    [
        CoreModule,
        SharedModule,
        ModuleRoutingApp
    ],

    declarations :
    [
        ComponentApp
    ],

    bootstrap: [ComponentApp]
})
export class AppModule {}
