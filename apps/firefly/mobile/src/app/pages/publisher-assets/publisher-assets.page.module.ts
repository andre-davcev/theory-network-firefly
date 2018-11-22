import { NgModule } from '@angular/core';

import { ModulePage } from '@firefly/app/modules';

import { PagePublisherAssets } from './publisher-assets.page';
import { ModuleDirectiveElevation } from '@theory/google';

@NgModule
({
    imports :
    [
        ModulePage,
        ModuleDirectiveElevation
    ],

    declarations : [PagePublisherAssets],
    exports: [PagePublisherAssets]
})

export class ModulePagePublisherAssets { }
