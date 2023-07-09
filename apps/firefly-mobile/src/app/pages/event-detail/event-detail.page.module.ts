import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';

import { ModulePipeTimestamp } from '@theory/firebase';
import {
  ModuleComponentItemHeader,
  ModuleComponentItemDescription,
  ModuleComponentItemImage,
  ModuleComponentItemMap
} from '@firefly/mobile';

import { ModulePage } from '../../modules';
import { PageEventDetail } from './event-detail.page';
import { RoutesPageEventDetail } from './event-detail.page.routes';
import { ModulePageEventLocation } from '../event-location';
import { ModulePageAssetsInterests } from '../assets-interests';

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
    ModulePageAssetsInterests,
    NgxsFormPluginModule,
    ModulePipeTimestamp
  ],
  declarations: [PageEventDetail],
  exports: [PageEventDetail]
})
export class ModulePageEventDetail {}
