import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ModuleComponentList } from '@firefly/mobile';
import { ModulePage, PagePublisherClusters } from '@firefly/app';

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
