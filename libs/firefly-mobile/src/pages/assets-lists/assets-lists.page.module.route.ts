import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ModulePageAssetsLists } from './assets-lists.page.module';
import { RoutesPageAssetsLists } from './assets-lists.page.routes';

@NgModule({
  imports: [ModulePageAssetsLists, RouterModule.forChild(RoutesPageAssetsLists)]
})
export class ModulePageAssetsListsRoute {}
