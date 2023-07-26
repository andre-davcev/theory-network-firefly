import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';

import {
  ModuleComponentButtonAdd,
  ModuleComponentIconMessage
} from '@firefly/shared';
import { ModuleDirectiveElevation } from '@theory/google';

import {
  ModuleComponentItemEvents,
  ModuleComponentSlide
} from '../../components';
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
