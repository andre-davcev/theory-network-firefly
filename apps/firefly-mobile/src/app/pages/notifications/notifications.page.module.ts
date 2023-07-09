import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';

import { ModuleDirectiveElevation } from '@theory/google';
import {
  ModuleComponentSlide,
  ModuleComponentItemEvents
} from '@firefly/mobile';
import {
  ModuleComponentIconMessage,
  ModuleComponentButtonAdd
} from '@firefly/shared';

import { ModulePage } from '../../modules';
import { PageNotifications } from './notifications.page';
import { RoutesPageNotifications } from './notifications.page.routes';

@NgModule({
  imports: [
    ReactiveFormsModule,
    ModulePage,
    RouterModule.forChild(RoutesPageNotifications),
    ModuleComponentSlide,
    ModuleComponentIconMessage,
    NgxsFormPluginModule,
    ModuleComponentItemEvents,
    ModuleComponentButtonAdd,
    ModuleDirectiveElevation
  ],

  declarations: [PageNotifications],
  exports: [PageNotifications]
})
export class ModulePageNotifications {}
