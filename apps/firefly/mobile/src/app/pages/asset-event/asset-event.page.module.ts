import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ModuleComponentItemHeader, ModuleComponentItemDescription, ModuleComponentItemMap } from '@firefly/mobile';
import { ModulePage } from '@firefly/app/modules';

import { PageAssetEvent } from './asset-event.page';
import { RoutesPageAssetEvent } from './asset-event.page.routes';

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
        RouterModule.forChild(RoutesPageAssetEvent)
    ],

    declarations : [PageAssetEvent],
    exports : [PageAssetEvent]
})

export class ModulePageAssetEvent { }
