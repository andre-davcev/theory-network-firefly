import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ModuleComponentItemHeader, ModuleComponentItemDescription, ModuleComponentItemMap } from '@firefly/mobile';
import { ModulePage } from '@firefly/app/modules';

import { PageAssetEvent } from './asset-event.page';
import { RoutesPageAssetEvent } from './asset-event.page.routes';
import { NgxsModule } from '@ngxs/store';
import { StateEvent } from '@firefly/core';

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
        RouterModule.forChild(RoutesPageAssetEvent),
        NgxsModule.forFeature([StateEvent])
    ],

    declarations : [PageAssetEvent],
    exports : [PageAssetEvent]
})

export class ModulePageAssetEvent { }
