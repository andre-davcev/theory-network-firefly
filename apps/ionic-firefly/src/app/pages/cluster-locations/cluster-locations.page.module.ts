import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { PagePublisherClusterLocations } from './cluster-locations.page';
import { ModuleComponentMap } from '../../components/map/map.component.module';
import { ModulePage } from '../page.module';

@NgModule
({
    imports :
    [
        ReactiveFormsModule,
        ModulePage,
        ModuleComponentMap
    ],

    declarations :
    [
        PagePublisherClusterLocations
    ]
})

export class ModulePagePublisherClusterLocations { }
