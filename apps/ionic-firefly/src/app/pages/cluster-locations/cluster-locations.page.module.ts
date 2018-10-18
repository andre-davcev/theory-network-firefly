import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { ModuleComponentMap } from '@firefly/core';
import { ModulePage, PagePublisherClusterLocations } from '@firefly/app';

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
