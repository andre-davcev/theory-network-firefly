import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { PagePublisherCluster } from './cluster.page';
import { ModuleComponentItemHeader } from '../../components/item-header/item-header.component.module';
import { ModuleComponentItemMap } from '../../components/item-map/item-map.component.module';
import { ModuleComponentItemDescription } from '../../components/item-description/item-description.component.module';

@NgModule
({
    imports :
    [
        TranslateModule,
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
