import { NgModule } from '@angular/core';

import {
  ModuleComponentButtonAdd,
  ModuleComponentIconMessage
} from '@firefly/shared';
import { ModuleDirectiveElevation } from '@theory/google';

import { ModulePage } from '../../modules';
import { PageAssetsInterests } from './assets-interests.page';

@NgModule({
  imports: [
    ModulePage,
    ModuleDirectiveElevation,
    ModuleComponentIconMessage,
    ModuleComponentButtonAdd
  ],
  declarations: [PageAssetsInterests],
  exports: [PageAssetsInterests]
})
export class ModulePageAssetsInterests {}
