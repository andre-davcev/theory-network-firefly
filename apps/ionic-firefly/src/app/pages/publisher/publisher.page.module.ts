import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ModuleComponentList } from '../../components/list/list.component.module';
import { PagePublisher } from './publisher.page';
import { PagePublisherBeacons } from '../publisher-beacons/publisher-beacons.page';

@NgModule
({
    imports :
    [
        TranslateModule,
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
