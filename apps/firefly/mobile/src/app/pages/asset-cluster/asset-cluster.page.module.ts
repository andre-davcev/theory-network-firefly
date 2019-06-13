import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ModuleComponentItemHeader, ModuleComponentItemDescription, ModuleComponentItemMap } from '@firefly/mobile';
import { ModulePage } from '@firefly/app/modules';

import { PageAssetCluster } from './asset-cluster.page';
import { RoutesPageAssetCluster } from './asset-cluster.page.routes';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
@NgModule
({
    imports :
    [
        ReactiveFormsModule,
        RouterModule,
        ModulePage,
        ModuleComponentItemHeader,
        ModuleComponentItemMap,
        ModuleComponentItemDescription,
        RouterModule.forChild(RoutesPageAssetCluster),
        NgxsFormPluginModule
    ],

    declarations : [PageAssetCluster],
    exports : [PageAssetCluster]
})

export class ModulePageAssetCluster { }
