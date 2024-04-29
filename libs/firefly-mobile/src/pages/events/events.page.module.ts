import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import {
  ModuleComponentButtonAdd,
  ModuleComponentIconMessage
} from '@firefly/shared';
import { ModulePipeTimestamp } from '@theory/firebase';
import { ModuleDirectiveElevation } from '@theory/google';

import { ModuleComponentItemHeader } from '../../components';
import { ModulePage } from '../../modules';
import { PageEvents } from './events.page';
import { RoutesPageEvents } from './events.page.routes';

@NgModule({
  imports: [
    ModulePage,
    ModuleDirectiveElevation,
    ModuleComponentItemHeader,
    ModuleComponentIconMessage,
    RouterModule.forChild(RoutesPageEvents),
    ModuleComponentButtonAdd,
    ModulePipeTimestamp
  ],

  declarations: [PageEvents],
  exports: [PageEvents]
})
export class ModulePageEvents {}
