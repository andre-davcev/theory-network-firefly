import { NgModule } from '@angular/core';

import {
  ModuleComponentButtonAdd,
  ModuleComponentIconMessage
} from '@firefly/shared';
import { ModuleDirectiveElevation } from '@theory/google';

import { ModulePage } from '../../modules';
import { PageAssetsLists } from './assets-lists.page';

@NgModule({
  imports: [
    ModulePage,
    ModuleDirectiveElevation,
    ModuleComponentIconMessage,
    ModuleComponentButtonAdd
  ],
  declarations: [PageAssetsLists],
  exports: [PageAssetsLists]
})
export class ModulePageAssetsLists {}
