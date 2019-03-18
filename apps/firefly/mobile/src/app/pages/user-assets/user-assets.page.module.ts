import { NgModule } from '@angular/core';
//import { RouterModule } from '@angular/router';

import { ModuleDirectiveElevation } from '@theory/google';

import { ModulePage } from '@firefly/app/modules';
import { PageUserAssets } from './user-assets.page';
//import { RoutesPageAssets } from './user-assets.page.routes';
import { ModuleComponentIcon } from '@firefly/core';

@NgModule
({
    imports :
    [
        ModulePage,
        ModuleDirectiveElevation,
        ModuleComponentIcon,
//        RouterModule.forChild(RoutesPageAssets)
    ],

    declarations : [PageUserAssets],
    exports: [PageUserAssets]
})

export class ModulePageUserAssets { }
