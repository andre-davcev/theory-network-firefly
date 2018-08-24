import {NgModule} from '@angular/core';

import {TranslateModule} from '@ngx-translate/core';

import {IonicPageModule} from 'ionic-angular';

import {PagePublisherClusters} from './publisher.clusters';
import { ComponentList } from '../../app/components/list/list.component';
import { ModuleList } from '../../app/components/list/list.module';

@NgModule
({
    imports :
    [
        TranslateModule,
        IonicPageModule.forChild(PagePublisherClusters),
        ModuleList
    ],

    declarations : [PagePublisherClusters]
})

export class ModulePagePublisherClusters
{

}
