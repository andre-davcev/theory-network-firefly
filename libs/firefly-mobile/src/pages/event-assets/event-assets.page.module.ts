import { NgModule } from '@angular/core';

import { ModulePipeTimestamp } from '@theory/firebase';
import { ModuleComponentImageGrid } from '@theory/ionic';

import { ModulePage } from '../../modules';
import { PageEventAssets } from './event-assets.page';

@NgModule({
  imports: [ModulePage, ModuleComponentImageGrid, ModulePipeTimestamp],

  declarations: [PageEventAssets],
  exports: [PageEventAssets]
})
export class ModulePageEventAssets {}
