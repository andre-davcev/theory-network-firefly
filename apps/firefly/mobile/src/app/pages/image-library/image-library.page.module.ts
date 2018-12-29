import {NgModule} from '@angular/core';

import { ModulePage } from '@firefly/app/modules';

import { PageImageLibrary } from './image-library.page';

@NgModule
({
    imports :
    [
        ModulePage
    ],

    declarations : [PageImageLibrary],
    exports: [PageImageLibrary]
})

export class ModulePageImageLibrary
{

}
