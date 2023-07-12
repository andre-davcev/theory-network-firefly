import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
//import { RouterModule } from '@angular/router';

import { ModuleComponentMap } from '@firefly/shared';
import { ModuleDirectiveElevation } from '@theory/google';

import { ModulePage } from '../../modules';
import { PageEventLocation } from './event-location.page';
//import { RoutesPageEventLocation } from './event-location.page.routes';

@NgModule({
  imports: [
    ModulePage,
    ModuleDirectiveElevation,
    ModuleComponentMap,
    TranslateModule
    //        RouterModule.forChild(RoutesPageEventLocation)
  ],

  declarations: [PageEventLocation],
  exports: [PageEventLocation]
})
export class ModulePageEventLocation {}
