import {NgModule} from '@angular/core';

import { ModuleComponentImageGrid } from '@theory/ionic';
import { ModulePage } from '@firefly/app/modules';

import { PageImageAssets } from './image-assets.page';

@NgModule
({
    imports :
    [
        ModulePage,
        ModuleComponentImageGrid
    ],

    declarations : [PageImageAssets],
    exports: [PageImageAssets]
})

export class ModulePageImageAssets
{

}
