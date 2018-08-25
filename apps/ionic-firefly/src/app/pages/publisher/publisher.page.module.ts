import {NgModule} from '@angular/core';

import {TranslateModule} from '@ngx-translate/core';

import {IonicPageModule} from 'ionic-angular';

import {PagePublisher}         from './publisher';
import {PagePublisherBeacons}  from '../publisher.beacons/publisher.beacons';
import { ModuleList } from '../../app/components/list/list.module';

@NgModule
({
    imports :
    [
        TranslateModule,
        IonicPageModule.forChild(PagePublisher),
        ModuleList
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
