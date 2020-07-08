import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ModuleComponentItemHeader, ModuleComponentItemDescription, ModuleComponentItemMap } from '@firefly/mobile';
import { ModulePage } from '@firefly/app/modules';

import { PageInterestDetail } from './interest-detail.page';
import { RoutesPageInterestDetail } from './interest-detail.page.routes';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { ModuleComponentButtonAdd } from '@firefly/core';
import { ModulePageEventSelector } from '../event-selector';
import { ModulePipeTimestamp } from '@theory/firebase';
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
        RouterModule.forChild(RoutesPageInterestDetail),
        ModulePageEventSelector,
        NgxsFormPluginModule,
        ModulePipeTimestamp
    ],

    declarations : [PageInterestDetail],
    exports : [PageInterestDetail],
    entryComponents:
    [
      PageInterestDetail
    ]
})

export class ModulePageInterestDetail { }
