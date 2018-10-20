import { NgModule } from '@angular/core';

import { ModulePage } from '@firefly/app/modules';

import { PagePublisherBeaconMinor } from './publisher-beacon-minor.page';


@NgModule
({
    imports :
    [
        ModulePage
    ],

    declarations : [PagePublisherBeaconMinor],
    exports: [PagePublisherBeaconMinor]
})

export class ModulePagePublisherBeaconMinor
{

}
