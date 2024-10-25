import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';

import { ModulePipeTimestamp } from '@theory/firebase';

import {
  ModuleComponentItemDescription,
  ModuleComponentItemHeader,
  ModuleComponentItemImage,
  ModuleComponentItemMap
} from '../../components';
import { ModulePage } from '../../modules';
import { ModulePageAssetsLists } from '../assets-lists';
import { ModulePageEventLocation } from '../event-location';
import { PageEventDetail } from './event-detail.page';
import { RoutesPageEventDetail } from './event-detail.page.routes';

@NgModule({
  imports: [
    ReactiveFormsModule,
    ModulePage,
    ModuleComponentItemHeader,
    ModuleComponentItemMap,
    ModuleComponentItemDescription,
    ModuleComponentItemImage,
    RouterModule.forChild(RoutesPageEventDetail),
    ModulePageEventLocation,
    ModulePageAssetsLists,
    NgxsFormPluginModule,
    ModulePipeTimestamp
  ],
  declarations: [PageEventDetail],
  exports: [PageEventDetail]
})
export class ModulePageEventDetail {}
