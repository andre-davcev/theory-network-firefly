import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ModuleComponentLogo } from '@firefly/shared';

import { ModulePage } from '../../modules';
import { PageAuth } from './auth.page';
import { RoutesPageAuth } from './auth.page.routes';

@NgModule({
  imports: [
    ModulePage,
    ModuleComponentLogo,
    RouterModule.forChild(RoutesPageAuth)
  ],

  declarations: [PageAuth],
  exports: [PageAuth]
})
export class ModulePageAuth {}
