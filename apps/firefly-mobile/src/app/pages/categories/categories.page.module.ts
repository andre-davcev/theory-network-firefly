import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { ModuleDirectiveElevation } from '@theory/google';
import { ModuleComponentIcon } from '@firefly/shared';

import { ModulePage } from '../../modules';
import { RoutesPageCategories } from './categories.page.routes';
import { PageCategories } from './categories.page';

@NgModule
({
    imports :
    [
        ModulePage,
        CommonModule,
        RouterModule.forChild(RoutesPageCategories),
        TranslateModule,
        ModuleDirectiveElevation,
        ModuleComponentIcon
    ],

    declarations : [PageCategories],
    exports : [PageCategories]
})
export class ModulePagePublisher {}
