import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { PagePublisherCluster } from './cluster.page';
import { ModuleComponentItemHeader } from '../../components/item-header/item-header.component.module';
import { ModuleComponentItemMap } from '../../components/item-map/item-map.component.module';
import { ModuleComponentItemDescription } from '../../components/item-description/item-description.component.module';
import { ModulePage } from '../page.module';

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
