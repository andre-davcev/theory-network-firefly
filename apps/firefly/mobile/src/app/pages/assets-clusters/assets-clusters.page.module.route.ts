
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PageAssetsClusters } from './assets-clusters.page';
import { RoutesPageAssetsClusters } from './assets-clusters.page.routes';
import { ModulePageAssetsClusters } from './assets-clusters.page.module';

@NgModule
({
    imports :
    [
        ModulePageAssetsClusters,
        RouterModule.forChild(RoutesPageAssetsClusters)
    ]
})
export class ModulePageAssetsClustersRoute { }
