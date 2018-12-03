import { NgModule } from '@angular/core';

import { ModuleComponentList } from '@firefly/mobile';
import { ModulePage } from '@firefly/app/modules';
import { ModulePagePublisherBeacons } from '@firefly/page/publisher-beacons';

import { PagePublisher } from './publisher.page';

@NgModule
({
    imports :
    [
        ModulePage,
        ModuleComponentList,
        ModulePagePublisherBeacons
    ],

    declarations : [PagePublisher],
    exports : [PagePublisher]
})

export class ModulePagePublisher
{

}
