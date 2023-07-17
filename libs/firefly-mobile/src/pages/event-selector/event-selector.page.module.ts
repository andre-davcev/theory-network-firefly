import { NgModule } from '@angular/core';

import { ModuleComponentItemEvents } from '@firefly/mobile';
import { ModuleComponentIconMessage } from '@firefly/shared';
import { ModuleDirectiveElevation } from '@theory/google';

import { ModulePage } from '../../modules';
import { PageEventSelector } from './event-selector.page';

@NgModule({
  imports: [
    ModulePage,
    ModuleDirectiveElevation,
    ModuleComponentItemEvents,
    ModuleComponentIconMessage
  ],
  declarations: [PageEventSelector],
  exports: [PageEventSelector]
})
export class ModulePageEventSelector {}
