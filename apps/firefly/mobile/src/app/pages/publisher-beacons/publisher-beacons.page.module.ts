import { NgModule } from '@angular/core';

import { ModulePage } from '@firefly/app/modules';

import { PagePublisherBeacons } from './publisher-beacons.page';

@NgModule
({

    imports :
    [
        ModulePage
    ],

    declarations : [PagePublisherBeacons],
    exports: [PagePublisherBeacons]
})

export class ModulePagePublisherBeacons
{

}
