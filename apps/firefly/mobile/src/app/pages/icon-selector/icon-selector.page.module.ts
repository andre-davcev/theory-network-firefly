import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ModuleDirectiveElevation } from '@theory/google';

import { ModulePage } from '@firefly/app/modules';
import { PageIconSelector } from './icon-selector.page';
import { RoutesPageIconSelector } from './icon-selector.page.routes';
import { ModulePageIconCatalog } from '../icon-catalog';
import { ModulePageIconAssets } from '../icon-assets';
import { ModulePageIconLibrary } from '../icon-library';

@NgModule
({
    imports :
    [
        ModulePage,
        ModulePageIconCatalog,
        ModulePageIconAssets,
        ModulePageIconLibrary,
        ModuleDirectiveElevation,
        RouterModule.forChild(RoutesPageIconSelector)
    ],

    declarations : [PageIconSelector],
    exports: [PageIconSelector]
})

export class ModulePageIconSelector { }
