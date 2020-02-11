import { NgModule } from '@angular/core';

import { CoreModule, ModulePage } from '@firefly/app/modules';

import { ModuleRoutingApp } from './app.component.routing';
import { ComponentApp } from './app.component';
import { ModuleComponentIcon } from '@firefly/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModulePageLogin } from '../pages';

@NgModule
({
    imports :
    [
        CoreModule,
        BrowserAnimationsModule,

        ModulePage,
        ModuleRoutingApp,
        ModuleComponentIcon,
        ModulePageLogin
    ],

    declarations : [ComponentApp],

    bootstrap: [ComponentApp]
})
export class AppModule { }
