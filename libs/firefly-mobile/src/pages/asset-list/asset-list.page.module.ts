import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';

import { ModuleComponentButtonAdd } from '@firefly/shared';
import { ModulePipeTimestamp } from '@theory/firebase';

import {
  ModuleComponentItemDescription,
  ModuleComponentItemHeader,
  ModuleComponentItemImage,
  ModuleComponentItemMap
} from '../../components';
import { ModulePage } from '../../modules';
import { ModulePageEventSelector } from '../event-selector';
import { PageAssetList } from './asset-list.page';
import { RoutesPageAssetList } from './asset-list.page.routes';
@NgModule({
  imports: [
    ReactiveFormsModule,
    RouterModule,
    ModulePage,
    ModuleComponentItemHeader,
    ModuleComponentItemMap,
    ModuleComponentItemImage,
    ModuleComponentItemDescription,
    ModuleComponentButtonAdd,
    RouterModule.forChild(RoutesPageAssetList),
    ModulePageEventSelector,
    NgxsFormPluginModule,
    ModulePipeTimestamp
  ],
  declarations: [PageAssetList],
  exports: [PageAssetList]
})
export class ModulePageAssetList {}
