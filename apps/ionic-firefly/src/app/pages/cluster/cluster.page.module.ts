import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ModuleComponentItemHeader, ModuleComponentItemDescription, ModuleComponentItemMap } from '@firefly/mobile';
import { ModulePage, PagePublisherCluster } from '@firefly/app';

@NgModule
({
    imports :
    [
        ReactiveFormsModule,
        RouterModule,
        ModulePage,
        ModuleComponentItemHeader,
        ModuleComponentItemMap,
        ModuleComponentItemDescription
    ],

    declarations :
    [
        PagePublisherCluster
    ],

    exports :
    [
        PagePublisherCluster
    ]
})

export class ModulePagePublisherCluster { }
