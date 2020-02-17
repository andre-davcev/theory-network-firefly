import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ModuleComponentItemHeader, ModuleComponentItemDescription, ModuleComponentItemMap } from '@firefly/mobile';
import { ModulePage } from '@firefly/app/modules';

import { PageAssetInterest } from './asset-interest.page';
import { RoutesPageAssetInterest } from './asset-interest.page.routes';
import { ModulePageIconSelector } from '../icon-selector';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { ModuleComponentButtonAdd } from '@firefly/core';
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
        ModuleComponentButtonAdd,
        RouterModule.forChild(RoutesPageAssetInterest),
        ModulePageIconSelector,
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
