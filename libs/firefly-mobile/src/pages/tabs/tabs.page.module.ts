import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ModuleDirectiveElevation } from '@theory/google';
import { ModulePage } from '../../modules';
import { PageTabs } from './tabs.page';
import { RoutesPageTabs } from './tabs.page.routes';

@NgModule({
  imports: [
    ModulePage,
    ModuleDirectiveElevation,
    RouterModule.forChild(RoutesPageTabs)
  ],

  declarations: [PageTabs],
  exports: [PageTabs]
})
export class ModulePageTabs {}
