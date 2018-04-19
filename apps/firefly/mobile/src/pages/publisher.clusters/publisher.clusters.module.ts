import {NgModule} from '@angular/core';

import {TranslateModule} from '@ngx-translate/core';

import {IonicPageModule} from 'ionic-angular';

import {PagePublisherClusters} from './publisher.clusters';

@NgModule
({
    imports :
    [
        TranslateModule,
        IonicPageModule.forChild(PagePublisherClusters)
    ],

    declarations : [PagePublisherClusters]
})

export class ModulePagePublisherClusters
{ 

}