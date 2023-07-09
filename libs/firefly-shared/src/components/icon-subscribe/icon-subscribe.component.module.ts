import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { IonicModule } from '@ionic/angular';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslateModule } from '@ngx-translate/core';

import { ComponentIconSubscribe } from './icon-subscribe.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    FontAwesomeModule,
    FlexLayoutModule,
    TranslateModule
  ],

  declarations: [ComponentIconSubscribe],

  exports: [ComponentIconSubscribe]
})
export class ModuleComponentIconSubscribe {}
