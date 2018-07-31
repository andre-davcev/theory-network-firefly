import { NgModule, Optional, SkipSelf } from '@angular/core';

import { IonicModule } from '@ionic/angular';
import { throwIfAlreadyLoaded } from '@theory/utils';
import { TnCoreModule } from '@theory/web';

@NgModule({
  imports: [TnCoreModule, IonicModule.forRoot()]
})
export class TnIonicCoreModule {
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: TnIonicCoreModule
  ) {
    throwIfAlreadyLoaded(parentModule, 'TnIonicCoreModule');
  }
}
