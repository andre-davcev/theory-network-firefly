import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ModuleComponentList } from '@firefly/mobile';
import { ModulePage } from '@firefly/app/modules';

import { PagePublisherClusters } from './publisher-clusters.page';

@NgModule
({
    imports :
    [
        RouterModule,
        ModulePage,
        ModuleComponentList
    ],

    declarations : [PagePublisherClusters],
    exports: [PagePublisherClusters]
})

export class ModulePagePublisherClusters
{

}
