import {NgModule} from '@angular/core';

import {TranslateModule} from '@ngx-translate/core';

import {IonicPageModule} from 'ionic-angular';

import {PagePublisherClusterLocations} from './cluster-locations.page';
import { MapModule } from '../../app/components/map/map.module';

@NgModule
({
    imports :
    [
        IonicPageModule.forChild(PagePublisherClusterLocations),
        TranslateModule,
        MapModule
    ],

    declarations :
    [
        PagePublisherClusterLocations
    ]
})

export class ModulePagePublisherCluster
{

}
