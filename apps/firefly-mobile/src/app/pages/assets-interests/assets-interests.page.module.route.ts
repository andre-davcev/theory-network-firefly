import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RoutesPageAssetsInterests } from './assets-interests.page.routes';
import { ModulePageAssetsInterests } from './assets-interests.page.module';

@NgModule({
  imports: [
    ModulePageAssetsInterests,
    RouterModule.forChild(RoutesPageAssetsInterests)
  ]
})
export class ModulePageAssetsInterestsRoute {}
