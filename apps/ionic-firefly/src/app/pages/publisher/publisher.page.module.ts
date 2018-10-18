import { NgModule } from '@angular/core';

import { ModuleComponentList } from '@firefly/mobile';
import { ModulePage, PagePublisher, PagePublisherBeacons } from '@firefly/app';

@NgModule
({
    imports :
    [
        ModulePage,
        ModuleComponentList
    ],

    declarations :
    [
        PagePublisher,
        PagePublisherBeacons
    ]
})

export class ModulePagePublisher
{

}
