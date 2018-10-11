import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { PagePublisherClusterCategories } from './cluster-categories.page';
import { ModulePage } from '../page.module';

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
