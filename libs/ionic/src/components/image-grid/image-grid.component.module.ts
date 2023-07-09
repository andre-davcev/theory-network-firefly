import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { ComponentImageGrid } from './image-grid.component';

@NgModule({
  imports: [CommonModule, IonicModule],
  declarations: [ComponentImageGrid],
  exports: [ComponentImageGrid]
})
export class ModuleComponentImageGrid {}
