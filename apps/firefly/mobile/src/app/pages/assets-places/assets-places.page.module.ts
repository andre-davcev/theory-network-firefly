import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ModulePage } from '@firefly/app/modules';

import { PageAssetsPlaces } from './assets-places.page';
import { RoutesPageAssetsPlaces } from './assets-places.page.routes';
import { ModuleComponentButtonAdd } from '@firefly/core';

@NgModule
({
    imports :
    [
        ModulePage,
        ModuleComponentButtonAdd,
        RouterModule.forChild(RoutesPageAssetsPlaces)
    ],

    declarations : [PageAssetsPlaces],
    exports : [PageAssetsPlaces]
})

export class ModulePageAssetsPlaces { }
