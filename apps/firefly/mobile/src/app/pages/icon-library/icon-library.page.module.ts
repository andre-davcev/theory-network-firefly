import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';

import { ModuleComponentImageGrid } from '@theory/ionic';
import { ModulePage } from '@firefly/app/modules';

import { PageIconLibrary } from './icon-library.page';
import { StateGrid } from '@firefly/core';

@NgModule
({
    imports :
    [
        ModulePage,
        ModuleComponentImageGrid,
        NgxsModule.forFeature([StateGrid])
    ],

    declarations : [PageIconLibrary],
    exports: [PageIconLibrary]
})

export class ModulePageIconLibrary
{

}
