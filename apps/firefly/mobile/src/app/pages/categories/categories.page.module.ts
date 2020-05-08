import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { ModulePage } from '@firefly/app/modules';

import { RoutesPageCategories } from './categories.page.routes';
import { PageCategories } from './categories.page';
import { ModuleDirectiveElevation } from '@theory/google';
import { ModuleComponentIcon } from '@firefly/core';

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
