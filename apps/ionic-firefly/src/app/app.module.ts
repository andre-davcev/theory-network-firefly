import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CoreModule, SharedModule, RoutesAppComponent, ComponentApp } from '@firefly/app';

@NgModule
({
    imports :
    [
        CoreModule,
        SharedModule,
        RouterModule.forRoot(RoutesAppComponent)
    ],

    declarations :
    [
        ComponentApp
    ],

    bootstrap: [ComponentApp]
})
export class AppModule {}
