import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ModulePage } from '@firefly/app/modules';

import { PageAssetsCoupons } from './assets-coupons.page';
import { RoutesPageAssetsCoupons } from './assets-coupons.page.routes';

@NgModule
({
    imports :
    [
        ModulePage,
        RouterModule.forChild(RoutesPageAssetsCoupons)
    ],

    declarations : [PageAssetsCoupons],
    exports : [PageAssetsCoupons]
})

export class ModulePageAssetsCoupons { }
