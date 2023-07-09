import { NgModule } from '@angular/core';

import { ModuleDirectiveElevation } from '@theory/google';
import {
  ModuleComponentIconMessage,
  ModuleComponentButtonAdd
} from '@firefly/shared';

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
