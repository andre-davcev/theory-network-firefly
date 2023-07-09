import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DirectiveElevation } from './elevation.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [DirectiveElevation],
  exports: [DirectiveElevation]
})
export class ModuleDirectiveElevation {}
