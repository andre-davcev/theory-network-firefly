import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

import { ModuleComponentButtonAction } from '@firefly/shared';
import { ModulePipeTimestamp } from '@theory/firebase';
import { ModuleDirectiveElevation } from '@theory/google';

import { ComponentSlide } from './slide.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    FlexLayoutModule,
    RouterModule,
    TranslateModule,
    ModuleDirectiveElevation,
    ModuleComponentButtonAction,
    ModulePipeTimestamp
  ],

  declarations: [ComponentSlide],
  exports: [ComponentSlide]
})
export class ModuleComponentSlide {}
