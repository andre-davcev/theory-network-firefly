import {NgModule} from '@angular/core';

import { ModulePage } from '@firefly/app/modules';

import { PageImageAssets } from './image-assets.page';

@NgModule
({
    imports :
    [
        ModulePage
    ],

    declarations : [PageImageAssets],
    exports: [PageImageAssets]
})

export class ModulePageImageAssets
{

}
