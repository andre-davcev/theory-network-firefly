import { NgModule } from '@angular/core';

import { ModuleComponentImageGrid } from '@theory/ionic';
import { ModulePage } from '@firefly/app/modules';

import { PageIconLibrary } from './icon-library.page';

@NgModule
({
    imports :
    [
        ModulePage,
        ModuleComponentImageGrid
    ],

    declarations : [PageIconLibrary],
    exports: [PageIconLibrary]
})

export class ModulePageIconLibrary
{

}
