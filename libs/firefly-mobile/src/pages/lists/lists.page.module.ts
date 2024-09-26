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

import { TagsComponentModule } from '@theory/ionic';
import { ModuleComponentItemHeader } from '../../components';
import { ModulePage } from '../../modules';
import { PageLists } from './lists.page';
import { RoutesPageLists } from './lists.page.routes';

@NgModule({
  imports: [
    ModulePage,
    ModuleDirectiveElevation,
    ModuleComponentItemHeader,
    ModuleComponentIconSubscribe,
    MatExpansionModule,
    ModuleComponentIconMessage,
    RouterModule.forChild(RoutesPageLists),
    ModuleComponentButtonAdd,
    ModulePipeTimestamp,
    TagsComponentModule
  ],

  declarations: [PageLists],
  exports: [PageLists]
})
export class ModulePageLists {}
