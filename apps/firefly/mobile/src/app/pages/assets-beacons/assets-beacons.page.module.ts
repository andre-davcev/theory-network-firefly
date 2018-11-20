import { NgModule } from '@angular/core';

import { ModulePage } from '@firefly/app/modules';

import { PageAssetsBeacons } from './assets-beacons.page';

@NgModule
({
    imports :
    [
        ModulePage
    ],

    declarations : [PageAssetsBeacons],
    exports : [PageAssetsBeacons]
})
export class ModulePageAssetsBeacons { }
