import { NgModule } from '@angular/core';

import { ModulePage } from '@firefly/app/modules';

import { PageAssetsImages } from './assets-images.page';

@NgModule
({
    imports :
    [
        ModulePage
    ],

    declarations : [PageAssetsImages],
    exports : [PageAssetsImages]
})

export class ModulePageAssetsImages { }
