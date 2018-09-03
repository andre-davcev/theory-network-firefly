import { NgModule } from '@angular/core';

import { PagePublisherClusterLocations } from './cluster-locations.page';
import { ModuleComponentMap } from '../../components/map/map.component.module';
import { ModulePage } from '../page.module';

@NgModule
({
    imports :
    [
        ModulePage,
        ModuleComponentMap
    ],

    declarations :
    [
        PagePublisherClusterLocations
    ]
})

export class ModulePagePublisherClusterLocations { }
