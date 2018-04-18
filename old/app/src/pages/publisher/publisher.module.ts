import {NgModule} from '@angular/core';

import {TranslateModule} from '@ngx-translate/core';

import {IonicPageModule} from 'ionic-angular';

import {PagePublisher}         from './publisher';
import {PagePublisherClusters} from '../publisher.clusters/publisher.clusters';
import {PagePublisherBeacons}  from '../publisher.beacons/publisher.beacons';
import { ModuleComponents } from '../../app/components/components.module';
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
        PagePublisherClusters,
        PagePublisherBeacons
    ]
})

export class ModulePagePublisher
{

}