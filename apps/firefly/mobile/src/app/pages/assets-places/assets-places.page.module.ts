import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ModulePage } from '@firefly/app/modules';

import { PageAssetsPlaces } from './assets-places.page';
import { RoutesPageAssetsPlaces } from './assets-places.page.routes';

@NgModule
({
    imports :
    [
        ModulePage,
        RouterModule.forChild(RoutesPageAssetsPlaces)
    ],

    declarations : [PageAssetsPlaces],
    exports : [PageAssetsPlaces]
})

export class ModulePageAssetsPlaces { }
