import { NgModule, Optional, SkipSelf } from '@angular/core';

import { IonicModule } from '@ionic/angular';
import { throwIfAlreadyLoaded } from '@theory/core';
import { AppCoreModule } from '@theory/web';

@NgModule({
  imports: [AppCoreModule, IonicModule.forRoot()]
})
export class AppIonicCoreModule {
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: AppIonicCoreModule
  ) {
    throwIfAlreadyLoaded(parentModule, 'AppIonicCoreModule');
  }
}
