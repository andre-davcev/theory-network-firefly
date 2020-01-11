import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ModulePage } from '@firefly/app/modules';

import { PageAssetsImages } from './assets-images.page';
import { RoutesPageAssetsImages } from './assets-images.page.routes';
import { ModuleComponentImageGrid } from '@theory/ionic';

@NgModule
({
    imports :
    [
        ModulePage,
        ModuleComponentImageGrid,
        RouterModule.forChild(RoutesPageAssetsImages)
    ],

    declarations : [PageAssetsImages],
    exports : [PageAssetsImages]
})

export class ModulePageAssetsImages { }
