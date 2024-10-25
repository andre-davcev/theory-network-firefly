import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';

import { ModuleComponentButtonAdd } from '@firefly/shared';
import { ModulePipeTimestamp } from '@theory/firebase';

import {
  ModuleComponentItemDescription,
  ModuleComponentItemHeader,
  ModuleComponentItemMap
} from '../../components';
import { ModulePage } from '../../modules';
import { ModulePageEventSelector } from '../event-selector';
import { PageListDetail } from './list-detail.page';
import { RoutesPageListDetail } from './list-detail.page.routes';
@NgModule({
  imports: [
    ReactiveFormsModule,
    RouterModule,
    ModulePage,
    ModuleComponentItemHeader,
    ModuleComponentItemMap,
    ModuleComponentItemDescription,
    ModuleComponentButtonAdd,
    RouterModule.forChild(RoutesPageListDetail),
    ModulePageEventSelector,
    NgxsFormPluginModule,
    ModulePipeTimestamp
  ],
  declarations: [PageListDetail],
  exports: [PageListDetail]
})
export class ModulePageListDetail {}
