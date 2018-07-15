import {NgModule} from '@angular/core';

import {TranslateModule} from '@ngx-translate/core';

import {IonicPageModule} from 'ionic-angular';

import {PagePublisher}         from './publisher';
import {PagePublisherClusters} from '../publisher.clusters/publisher.clusters';
import {PagePublisherBeacons}  from '../publisher.beacons/publisher.beacons';
import { ModuleList } from '../../app/components/list/list.module';
import { PagePublisherAssets } from '../publisher-assets/publisher-assets';

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
        PagePublisherBeacons,
        PagePublisherAssets
    ]
})

export class ModulePagePublisher
{

}
