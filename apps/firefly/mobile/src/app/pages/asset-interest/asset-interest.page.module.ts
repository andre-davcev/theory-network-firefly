import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ModuleComponentItemHeader, ModuleComponentItemDescription, ModuleComponentItemMap, ModuleComponentItemImage } from '@firefly/mobile';
import { ModulePage } from '@firefly/app/modules';

import { PageAssetInterest } from './asset-interest.page';
import { RoutesPageAssetInterest } from './asset-interest.page.routes';
import { ModulePageIconSelector } from '../icon-selector';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { ModuleComponentButtonAdd } from '@firefly/core';
import { ModulePageEventSelector } from '../event-selector';
@NgModule
({
    imports :
    [
        ReactiveFormsModule,
        RouterModule,
        ModulePage,
        ModuleComponentItemHeader,
        ModuleComponentItemMap,
        ModuleComponentItemImage,
        ModuleComponentItemDescription,
        ModuleComponentButtonAdd,
        RouterModule.forChild(RoutesPageAssetInterest),
        ModulePageIconSelector,
        ModulePageEventSelector,
        NgxsFormPluginModule
    ],

    declarations : [PageAssetInterest],
    exports : [PageAssetInterest],
    entryComponents:
    [
      PageAssetInterest
    ]
})

export class ModulePageAssetInterest { }
