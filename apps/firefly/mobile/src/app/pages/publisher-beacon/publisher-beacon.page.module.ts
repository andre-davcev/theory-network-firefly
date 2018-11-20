import { NgModule } from '@angular/core';

import { ModulePage } from '@firefly/app/modules';

import { PagePublisherBeacon } from './publisher.beacon.page';

@NgModule
({
    imports :
    [
        ModulePage
    ],

    declarations : [PagePublisherBeacon],
    exports: [PagePublisherBeacon]
})

export class ModulePagePublisherBeacon { }
