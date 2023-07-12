import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { ModuleComponentIcon } from '@firefly/shared';
import { ModuleDirectiveElevation } from '@theory/google';

import { ModulePage } from '../../modules';
import { PageCategories } from './categories.page';
import { RoutesPageCategories } from './categories.page.routes';

@NgModule({
  imports: [
    ModulePage,
    CommonModule,
    RouterModule.forChild(RoutesPageCategories),
    TranslateModule,
    ModuleDirectiveElevation,
    ModuleComponentIcon
  ],

  declarations: [PageCategories],
  exports: [PageCategories]
})
export class ModulePagePublisher {}
