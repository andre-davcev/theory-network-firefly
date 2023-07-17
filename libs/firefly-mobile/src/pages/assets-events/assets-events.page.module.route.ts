import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RoutesPageAssetsEvents } from './assets-events.page.routes';
import { ModulePageAssetsEvents } from './assets-events.page.module';

@NgModule({
  imports: [
    ModulePageAssetsEvents,
    RouterModule.forChild(RoutesPageAssetsEvents)
  ]
})
export class ModulePageAssetsEventsRoute {}
