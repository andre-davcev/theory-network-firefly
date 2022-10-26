import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';

import { ModulePipeTimestamp } from '@theory/firebase';
import { ModuleComponentButtonAdd } from '@firefly/shared';
import { ModuleComponentItemHeader, ModuleComponentItemDescription, ModuleComponentItemMap } from '@firefly/mobile';

import { ModulePage } from '../../modules';
import { PageInterestDetail } from './interest-detail.page';
import { RoutesPageInterestDetail } from './interest-detail.page.routes';
import { ModulePageEventSelector } from '../event-selector';
@NgModule
({
    imports: [
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
    declarations: [PageInterestDetail],
    exports: [PageInterestDetail]
})

export class ModulePageInterestDetail { }
