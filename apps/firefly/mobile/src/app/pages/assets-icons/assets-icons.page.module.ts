import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ModulePage } from '@firefly/app/modules';

import { PageAssetsIcons } from './assets-icons.page';
import { RoutesPageAssetsIcons } from './assets-icons.page.routes';

@NgModule
({
    imports :
    [
        ModulePage,
        RouterModule.forChild(RoutesPageAssetsIcons)
    ],

    declarations : [PageAssetsIcons],
    exports : [PageAssetsIcons]
})

export class ModulePageAssetsIcons { }
