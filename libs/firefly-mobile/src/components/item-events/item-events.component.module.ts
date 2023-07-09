import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

import { ModulePipeTimestamp } from '@theory/firebase';

import { ComponentItemEvents } from './item-events.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    FlexLayoutModule,
    TranslateModule,
    ModulePipeTimestamp
  ],

  declarations: [ComponentItemEvents],
  exports: [ComponentItemEvents]
})
export class ModuleComponentItemEvents {}
