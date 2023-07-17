import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';

const modules = [CommonModule, TranslateModule, FlexLayoutModule, IonicModule];

@NgModule({
  imports: modules,
  exports: modules
})
export class ModulePage {}
