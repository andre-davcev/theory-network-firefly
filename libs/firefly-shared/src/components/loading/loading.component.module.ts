import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { ComponentLoading } from './loading.component';

@NgModule({
  imports: [CommonModule, IonicModule],

  declarations: [ComponentLoading],

  exports: [ComponentLoading]
})
export class ModuleComponentLoading {}
