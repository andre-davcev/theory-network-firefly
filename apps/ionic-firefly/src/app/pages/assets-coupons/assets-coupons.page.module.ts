import { NgModule } from '@angular/core';

import { ModulePage } from '@firefly/app/modules';

import { PageAssetsCoupons } from './assets-coupons.page';

@NgModule
({
    imports :
    [
        ModulePage
    ],

    declarations : [PageAssetsCoupons],
    exports : [PageAssetsCoupons]
})

export class ModulePageAssetsCoupons { }
