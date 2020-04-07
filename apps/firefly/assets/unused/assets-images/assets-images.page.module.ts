import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ModulePage } from '@firefly/app/modules';

import { PageAssetsImages } from './assets-images.page';
import { RoutesPageAssetsImages } from './assets-images.page.routes';
import { ModuleComponentImageGrid } from '@theory/ionic';
import { ModuleComponentIconMessage, ModuleComponentButtonAdd } from '@firefly/core';

@NgModule
({
    imports :
    [
        ModulePage,
        ModuleComponentImageGrid,
        ModuleComponentIconMessage,
        ModuleComponentButtonAdd,
        RouterModule.forChild(RoutesPageAssetsImages)
    ],

    declarations : [PageAssetsImages],
    exports : [PageAssetsImages]
})

export class ModulePageAssetsImages { }
