import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ModuleComponentList } from '../../components/list/list.component.module';
import { PagePublisherClusters } from './publisher-clusters.page';
import { ModulePage } from '../page.module';

@NgModule
({
    imports :
    [
        RouterModule,
        ModulePage,
        ModuleComponentList
    ],

    declarations : [PagePublisherClusters]
})

export class ModulePagePublisherClusters
{

}
