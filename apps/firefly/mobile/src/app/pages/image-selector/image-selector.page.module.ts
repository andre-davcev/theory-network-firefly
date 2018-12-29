import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ModuleDirectiveElevation } from '@theory/google';

import { ModulePage } from '@firefly/app/modules';
import { PageImageSelector } from './image-selector.page';
import { RoutesPageImageSelector } from './image-selector.page.routes';
import { ModulePageImageCatalog } from '../image-catalog';
import { ModulePageImageAssets } from '../image-assets';
import { ModulePageImageLibrary } from '../image-library';

@NgModule
({
    imports :
    [
        ModulePage,
        ModulePageImageCatalog,
        ModulePageImageAssets,
        ModulePageImageLibrary,
        ModuleDirectiveElevation,
        RouterModule.forChild(RoutesPageImageSelector)
    ],

    declarations : [PageImageSelector],
    exports: [PageImageSelector]
})

export class ModulePageImageSelector { }
