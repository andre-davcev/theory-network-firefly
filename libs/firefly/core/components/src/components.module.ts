import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentFirefly } from './firefly/firefly.component';

@NgModule({
  imports: [CommonModule],
  declarations: [ComponentFirefly],
  exports: [ComponentFirefly]
})
export class ModuleComponents {}
