import { NgModule } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule } from '@angular/router';

import {
  ModuleComponentButtonAdd,
  ModuleComponentIconMessage,
  ModuleComponentIconSubscribe
} from '@firefly/shared';
import { ModulePipeTimestamp } from '@theory/firebase';
import { ModuleDirectiveElevation } from '@theory/google';

import { ModuleComponentItemHeader } from '../../components';
import { ModulePage } from '../../modules';
import { PageStream } from './stream.page';
import { RoutesPageStream } from './stream.page.routes';

@NgModule({
  imports: [
    ModulePage,
    ModuleDirectiveElevation,
    ModuleComponentItemHeader,
    ModuleComponentIconSubscribe,
    MatExpansionModule,
    ModuleComponentIconMessage,
    RouterModule.forChild(RoutesPageStream),
    ModuleComponentButtonAdd,
    ModulePipeTimestamp
  ],

  declarations: [PageStream],
  exports: [PageStream]
})
export class ModulePageStream {}
