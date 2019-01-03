import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';

import { ModuleComponentImageGrid } from '@theory/ionic';
import { ModulePage } from '@firefly/app/modules';

import { PageImageLibrary } from './image-library.page';
import { StatePhotos } from '@theory/capacitor/state/photos';

@NgModule
({
    imports :
    [
        ModulePage,
        ModuleComponentImageGrid,
        NgxsModule.forFeature([StatePhotos])
    ],

    declarations : [PageImageLibrary],
    exports: [PageImageLibrary]
})

export class ModulePageImageLibrary
{

}
