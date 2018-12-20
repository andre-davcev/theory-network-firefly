import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ModuleDirectiveElevation } from '@theory/google';

import { ModulePage } from '@firefly/app/modules';
import { PageAssets } from './assets.page';
import { RoutesPageAssets } from './assets.page.routes';

@NgModule
({
    imports :
    [
        ModulePage,
        ModuleDirectiveElevation,
        RouterModule.forChild(RoutesPageAssets)
    ],

    declarations : [PageAssets],
    exports: [PageAssets]
})

export class ModulePageAssets { }
