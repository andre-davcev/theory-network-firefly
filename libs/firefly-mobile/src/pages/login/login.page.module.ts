import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import {
  ModuleComponentAuth,
  ModuleComponentButtonAction,
  ModuleComponentIconMessage,
  ModuleComponentLogo,
  ModuleComponentTutorial
} from '@firefly/shared';

import { ModulePage } from '../../modules';
import { PageLogin } from './login.page';

@NgModule({
  imports: [
    ModulePage,
    ReactiveFormsModule,
    ModuleComponentLogo,
    ModuleComponentAuth,
    ModuleComponentTutorial,
    ModuleComponentIconMessage,
    ModuleComponentButtonAction
  ],
  declarations: [PageLogin],
  exports: [PageLogin]
})
export class ModulePageLogin {}
