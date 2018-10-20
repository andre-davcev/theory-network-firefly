import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { ModulePage } from '@firefly/app/modules';

import { PagePublisherClusterCategories } from './cluster-categories.page';

@NgModule
({
    imports :
    [
        ModulePage,
        ReactiveFormsModule
    ],

    declarations : [PagePublisherClusterCategories],
    exports : [PagePublisherClusterCategories]
})

export class ModulePagePublisherClusterCategories { }
