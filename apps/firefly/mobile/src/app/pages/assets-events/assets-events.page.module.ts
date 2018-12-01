import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ModulePage } from '@firefly/app/modules';

import { PageAssetsEvents } from './assets-events.page';
import { RoutesPageAssetsEvents } from './assets-events.page.routes';

@NgModule
({
    imports :
    [
        ModulePage,
        RouterModule.forChild(RoutesPageAssetsEvents)
    ],

    declarations : [PageAssetsEvents],
    exports : [PageAssetsEvents]
})
export class ModulePageAssetsEvents { }
