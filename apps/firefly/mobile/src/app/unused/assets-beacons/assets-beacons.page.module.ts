import { NgModule } from '@angular/core';

import { ModulePage } from '@firefly/app/modules';

import { PageAssetsBeacons } from './assets-beacons.page';
import { RouterModule } from '@angular/router';
import { RoutesPageAssetsBeacons } from './assets-beacons.page.routes';
import { ModuleComponentButtonAdd } from '@firefly/core';

@NgModule
({
    imports :
    [
        ModulePage,
        ModuleComponentButtonAdd,
        RouterModule.forChild(RoutesPageAssetsBeacons)
    ],

    declarations : [PageAssetsBeacons],
    exports : [PageAssetsBeacons]
})
export class ModulePageAssetsBeacons { }
