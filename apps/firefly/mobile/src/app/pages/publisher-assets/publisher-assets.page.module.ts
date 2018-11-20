import { NgModule } from '@angular/core';

import { ModulePage } from '@firefly/app/modules';

import { PagePublisherAssets } from './publisher-assets.page';

@NgModule
({
    imports :
    [
        ModulePage
    ],

    declarations : [PagePublisherAssets],
    exports: [PagePublisherAssets]
})

export class ModulePagePublisherAssets { }
