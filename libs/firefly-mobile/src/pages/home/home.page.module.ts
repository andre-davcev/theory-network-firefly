import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ModuleComponentSlide } from '@firefly/mobile';
import { ModuleDirectiveElevation } from '@theory/google';

import { ModulePage } from '../../modules';
import { ModulePageLogin } from '../login';
import { ModulePageNotifications } from '../notifications';
import { PageHome } from './home.page';
import { RoutesPageHome } from './home.page.routes';

@NgModule({
  imports: [
    ModulePage,
    RouterModule.forChild(RoutesPageHome),
    ModuleComponentSlide,
    ModuleDirectiveElevation,
    ModulePageLogin,
    ModulePageNotifications
  ],

  declarations: [PageHome],
  exports: [PageHome]
})
export class ModulePageHome {}
