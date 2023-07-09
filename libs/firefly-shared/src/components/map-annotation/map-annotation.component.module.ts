import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import { ModuleDirectiveElevation } from '@theory/google';

import { ComponentMapAnnotation } from './map-annotation.component';

@NgModule({
  imports: [CommonModule, FlexLayoutModule, ModuleDirectiveElevation],
  declarations: [ComponentMapAnnotation],
  exports: [ComponentMapAnnotation]
})
export class ModuleComponentMapAnnotation {}
