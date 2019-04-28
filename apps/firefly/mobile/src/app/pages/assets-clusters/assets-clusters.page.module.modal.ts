import { NgModule } from '@angular/core';

import { ModulePage } from '@firefly/app/modules';
import { ModuleDirectiveElevation } from '@theory/google';

import { PageAssetsClusters } from './assets-clusters.page';

@NgModule
({
    imports :
    [
        ModulePage,
        ModuleDirectiveElevation
    ],

    declarations    : [PageAssetsClusters],
    exports         : [PageAssetsClusters],
    entryComponents : [PageAssetsClusters]
})
export class ModulePageAssetsClustersModal { }
