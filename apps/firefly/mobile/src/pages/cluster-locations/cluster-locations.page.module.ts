import {NgModule} from '@angular/core';

import {TranslateModule} from '@ngx-translate/core';

import {IonicPageModule} from 'ionic-angular';

import {PagePublisherClusterLocations} from './cluster-locations.page';

@NgModule
({
    imports :
    [
        IonicPageModule.forChild(PagePublisherClusterLocations),
        TranslateModule
    ],

    declarations :
    [
      PagePublisherClusterLocations
    ]
})

export class ModulePagePublisherCluster
{

}
