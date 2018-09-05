import { NgModule } from '@angular/core';

import { ModuleCore } from './core/core.module';
import { ModuleShared } from './features/shared/shared.module';
import { ModuleRoutingApp } from './app-routing.module';
import { ComponentApp } from './app.component';

@NgModule
({
    imports :
    [
        ModuleCore,
        ModuleShared,
        ModuleRoutingApp
    ],

    declarations :
    [
        ComponentApp
    ],

    bootstrap: [ComponentApp]
})
export class AppModule {}
