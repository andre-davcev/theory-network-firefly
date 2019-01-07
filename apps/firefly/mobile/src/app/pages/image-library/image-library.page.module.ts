import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';

import { ModuleComponentImageGrid } from '@theory/ionic';
import { ModulePage } from '@firefly/app/modules';

import { PageImageLibrary } from './image-library.page';
import { StateGrid } from '@firefly/core';

@NgModule
({
    imports :
    [
        ModulePage,
        ModuleComponentImageGrid,
        NgxsModule.forFeature([StateGrid])
    ],

    declarations : [PageImageLibrary],
    exports: [PageImageLibrary]
})

export class ModulePageImageLibrary
{

}
