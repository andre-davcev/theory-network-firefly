import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { ModuleComponentMap, ModuleDirectiveLoading } from '@firefly/shared';

import { ComponentItemMap } from './item-map.component';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    ModuleComponentMap,
    ModuleDirectiveLoading
  ],

  declarations: [ComponentItemMap],
  exports: [ComponentItemMap]
})
export class ModuleComponentItemMap {}
