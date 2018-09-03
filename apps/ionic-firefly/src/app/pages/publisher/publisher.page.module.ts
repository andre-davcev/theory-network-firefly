import { NgModule } from '@angular/core';

import { ModuleComponentList } from '../../components/list/list.component.module';
import { PagePublisher } from './publisher.page';
import { PagePublisherBeacons } from '../publisher-beacons/publisher-beacons.page';
import { ModulePage } from '../page.module';

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
