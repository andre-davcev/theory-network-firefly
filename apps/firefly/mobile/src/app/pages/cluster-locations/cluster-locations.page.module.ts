import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { ModuleComponentMap } from '@firefly/core';

import { ModulePage } from '@firefly/app/modules';

import { PagePublisherClusterLocations } from './cluster-locations.page';

@NgModule
({
    imports :
    [
        ReactiveFormsModule,
        ModulePage,
        ModuleComponentMap
    ],

    declarations : [PagePublisherClusterLocations],
    exports : [PagePublisherClusterLocations]
})

export class ModulePagePublisherClusterLocations { }
