import {NgModule} from '@angular/core';

import {TranslateModule} from '@ngx-translate/core';

import {IonicPageModule} from 'ionic-angular';

import {PagePublisherClusterLocations} from './cluster-locations.page';
import { ModuleMap } from '../../app/components/map/map.module';
import { PagePublisherClusterLocationsAdd } from '../cluster-locations-add/cluster-locations-add.page';
import { ModulePagePublisherClusterLocationsAdd } from '../cluster-locations-add/cluster-locations-add.module';

@NgModule
({
    imports :
    [
        IonicPageModule.forChild(PagePublisherClusterLocations),
        TranslateModule,
        ModuleMap
    ],

    declarations :
    [
        PagePublisherClusterLocations
    ]
})

export class ModulePagePublisherClusterLocations
{

}
