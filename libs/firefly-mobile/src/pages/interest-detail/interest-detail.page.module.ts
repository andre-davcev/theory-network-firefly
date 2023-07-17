import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';

import {
  ModuleComponentItemDescription,
  ModuleComponentItemHeader,
  ModuleComponentItemMap
} from '@firefly/mobile';
import { ModuleComponentButtonAdd } from '@firefly/shared';
import { ModulePipeTimestamp } from '@theory/firebase';

import { ModulePage } from '../../modules';
import { ModulePageEventSelector } from '../event-selector';
import { PageInterestDetail } from './interest-detail.page';
import { RoutesPageInterestDetail } from './interest-detail.page.routes';
@NgModule({
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
export class ModulePageInterestDetail {}
