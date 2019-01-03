import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentImageGrid } from './image-grid.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  imports: [
    CommonModule,
    IonicModule
  ],
  declarations: [ComponentImageGrid],
  exports: [ComponentImageGrid]
})
export class ModuleComponentImageGrid { }
