import {NgModule} from '@angular/core';

import { ModulePage } from '@firefly/app/modules';

import { ModuleComponentImageGrid } from '@theory/ionic';
import { PageImageCatalog } from './image-catalog.page';

@NgModule
({
    imports :
    [
        ModulePage,
        ModuleComponentImageGrid
    ],

    declarations : [PageImageCatalog],
    exports: [PageImageCatalog]
})

export class ModulePageImageCatalog
{

}
