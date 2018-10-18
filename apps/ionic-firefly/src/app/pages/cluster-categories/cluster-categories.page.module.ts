import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { ModulePage, PagePublisherClusterCategories } from '@firefly/app';

@NgModule
({
    imports :
    [
        ModulePage,
        ReactiveFormsModule
    ],

    declarations :
    [
        PagePublisherClusterCategories
    ]
})

export class ModulePagePublisherClusterCategories { }
