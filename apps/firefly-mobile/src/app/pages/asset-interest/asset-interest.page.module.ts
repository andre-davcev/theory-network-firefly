import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ModuleComponentItemHeader, ModuleComponentItemDescription, ModuleComponentItemMap, ModuleComponentItemImage } from '@firefly/mobile';

import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { ModuleComponentButtonAdd } from '@firefly/shared';
import { ModulePipeTimestamp } from '@theory/firebase';

import { ModulePage } from '../../modules';
import { ModulePageEventSelector } from '../event-selector';
import { PageAssetInterest } from './asset-interest.page';
import { RoutesPageAssetInterest } from './asset-interest.page.routes';
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
        ModulePageEventSelector,
        NgxsFormPluginModule,
        ModulePipeTimestamp
    ],

    declarations : [PageAssetInterest],
    exports : [PageAssetInterest],
    entryComponents:
    [
        PageAssetInterest
    ]
})

export class ModulePageAssetInterest { }
