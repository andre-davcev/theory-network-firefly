import {NgModule} from '@angular/core';

import { ModulePage } from '@firefly/app/modules';

import { PageImageCatalog } from './image-catalog.page';

@NgModule
({
    imports :
    [
        ModulePage
    ],

    declarations : [PageImageCatalog],
    exports: [PageImageCatalog]
})

export class ModulePageImageCatalog
{

}
