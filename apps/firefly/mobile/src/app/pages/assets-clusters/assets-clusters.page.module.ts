import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ModulePage } from '@firefly/app/modules';
import { ModuleDirectiveElevation } from '@theory/google';

import { PageAssetsClusters } from './assets-clusters.page';
import { RoutesPageAssetsClusters } from './assets-clusters.page.routes';

@NgModule
({
    imports :
    [
        ModulePage,
        ModuleDirectiveElevation,
        RouterModule.forChild(RoutesPageAssetsClusters)
    ],

    declarations : [PageAssetsClusters],
    exports : [PageAssetsClusters]
})
export class ModulePageAssetsClusters { }
