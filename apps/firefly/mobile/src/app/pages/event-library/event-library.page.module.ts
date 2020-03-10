import { NgModule } from '@angular/core';

import { ModuleComponentImageGrid } from '@theory/ionic';
import { ModulePage } from '@firefly/app/modules';

import { PageEventLibrary } from './event-library.page';

@NgModule
({
    imports :
    [
        ModulePage,
        ModuleComponentImageGrid
    ],

    declarations : [PageEventLibrary],
    exports: [PageEventLibrary]
})

export class ModulePageEventLibrary
{

}
