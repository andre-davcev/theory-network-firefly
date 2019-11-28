import { NgModule } from '@angular/core';

import { ModuleComponentImageGrid } from '@theory/ionic';
import { ModulePage } from '@firefly/app/modules';

import { PageImageLibrary } from './image-library.page';

@NgModule
({
    imports :
    [
        ModulePage,
        ModuleComponentImageGrid
    ],

    declarations : [PageImageLibrary],
    exports: [PageImageLibrary]
})

export class ModulePageImageLibrary
{

}
