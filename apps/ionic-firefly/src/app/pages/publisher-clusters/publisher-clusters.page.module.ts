import { NgModule } from '@angular/core';

import { ModuleComponentList } from '../../components/list/list.component.module';
import { PagePublisherClusters } from './publisher-clusters.page';
import { ModulePage } from '../page.module';

@NgModule
({
    imports :
    [
        ModulePage,
        ModuleComponentList
    ],

    declarations : [PagePublisherClusters]
})

export class ModulePagePublisherClusters
{

}
