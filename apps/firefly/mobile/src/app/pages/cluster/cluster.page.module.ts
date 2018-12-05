import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ModuleComponentItemHeader, ModuleComponentItemDescription, ModuleComponentItemMap } from '@firefly/mobile';
import { ModulePage } from '@firefly/app/modules';

import { PagePublisherCluster } from './cluster.page';
import { RoutesPagePublishEvent } from './cluster.page.routes';

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
        RouterModule.forChild(RoutesPagePublishEvent)
    ],

    declarations : [PagePublisherCluster],
    exports : [PagePublisherCluster]
})

export class ModulePagePublisherCluster { }
