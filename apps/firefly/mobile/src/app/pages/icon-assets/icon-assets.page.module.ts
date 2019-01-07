import {NgModule} from '@angular/core';

import { ModuleComponentImageGrid } from '@theory/ionic';
import { ModulePage } from '@firefly/app/modules';

import { PageIconAssets } from './icon-assets.page';

@NgModule
({
    imports :
    [
        ModulePage,
        ModuleComponentImageGrid
    ],

    declarations : [PageIconAssets],
    exports: [PageIconAssets]
})

export class ModulePageIconAssets
{

}
