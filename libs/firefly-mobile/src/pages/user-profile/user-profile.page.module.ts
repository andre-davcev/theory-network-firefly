import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';

import { ModuleComponentIcon } from '@firefly/shared';
import { ModuleDirectiveElevation } from '@theory/google';

import { ModuleComponentItemHeader } from '../../components';
import { ModulePage } from '../../modules';
import { PageUserProfile } from './user-profile.page';
import { RoutesPageUserProfile } from './user-profile.page.routes';

@NgModule({
  imports: [
    ModulePage,
    RouterModule.forChild(RoutesPageUserProfile),
    ModuleDirectiveElevation,
    ModuleComponentIcon,
    ReactiveFormsModule,
    ModuleComponentItemHeader,
    NgxsFormPluginModule
  ],

  declarations: [PageUserProfile],
  exports: [PageUserProfile]
})
export class ModulePageUserProfile {}
