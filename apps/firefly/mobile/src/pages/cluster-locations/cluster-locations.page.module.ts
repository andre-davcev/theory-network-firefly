import {NgModule} from '@angular/core';

import {TranslateModule} from '@ngx-translate/core';

import {IonicPageModule} from 'ionic-angular';

import { LeafletModule } from '@asymmetrik/ngx-leaflet';

import {PagePublisherClusterLocations} from './cluster-locations.page';

@NgModule
({
    imports :
    [
        IonicPageModule.forChild(PagePublisherClusterLocations),
        TranslateModule,
        LeafletModule
    ],

    declarations :
    [
        PagePublisherClusterLocations
    ]
})

export class ModulePagePublisherCluster
{

}
