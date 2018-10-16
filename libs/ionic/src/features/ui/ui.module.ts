import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { UIModule as UIWebModule } from '@theory/web';

const MODULES = [UIWebModule, IonicModule];

@NgModule({
  imports: [...MODULES],
  exports: [...MODULES],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class UIModule {}
