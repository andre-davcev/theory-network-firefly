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
import { ModulePageLogin } from '../login';
import { PageCalendar } from './calendar.page';
import { RoutesPageCalendar } from './calendar.page.routes';

@NgModule({
  imports: [
    ReactiveFormsModule,
    ModulePage,
    RouterModule.forChild(RoutesPageCalendar),
    ModuleComponentSlide,
    ModuleComponentIconMessage,
    NgxsFormPluginModule,
    ModuleComponentItemEvents,
    ModuleComponentButtonAdd,
    ModulePage,
    ModuleComponentSlide,
    ModuleDirectiveElevation,
    ModulePageLogin
  ],

  declarations: [PageCalendar],
  exports: [PageCalendar]
})
export class ModulePageCalendar {}
