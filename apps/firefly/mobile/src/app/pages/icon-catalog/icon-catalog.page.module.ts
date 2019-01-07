import {NgModule} from '@angular/core';

import { ModulePage } from '@firefly/app/modules';

import { ModuleComponentImageGrid } from '@theory/ionic';
import { PageIconCatalog } from './icon-catalog.page';

@NgModule
({
    imports :
    [
        ModulePage,
        ModuleComponentImageGrid
    ],

    declarations : [PageIconCatalog],
    exports: [PageIconCatalog]
})

export class ModulePageIconCatalog
{

}
