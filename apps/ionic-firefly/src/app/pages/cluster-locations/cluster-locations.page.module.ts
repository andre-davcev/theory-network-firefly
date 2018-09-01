import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { PagePublisherClusterLocations } from './cluster-locations.page';
import { ModuleComponentMap } from '../../components/map/map.component.module';

@NgModule
({
    imports :
    [
        TranslateModule,
        ModuleComponentMap
    ],

    declarations :
    [
        PagePublisherClusterLocations
    ]
})

export class ModulePagePublisherClusterLocations { }
