import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ModulePage } from '@firefly/app/modules';

import { PageAssetsIcons } from './assets-icons.page';
import { RoutesPageAssetsIcons } from './assets-icons.page.routes';
import { ModuleComponentIconMessage } from '@firefly/core';

@NgModule
({
    imports :
    [
        ModulePage,
        RouterModule.forChild(RoutesPageAssetsIcons),
        ModuleComponentIconMessage
    ],

    declarations : [PageAssetsIcons],
    exports : [PageAssetsIcons]
})

export class ModulePageAssetsIcons { }
