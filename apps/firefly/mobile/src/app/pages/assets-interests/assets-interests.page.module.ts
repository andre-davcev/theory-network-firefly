import { NgModule } from '@angular/core';

import { ModulePage } from '@firefly/app/modules';
import { ModuleDirectiveElevation } from '@theory/google';

import { PageAssetsInterests } from './assets-interests.page';
import { ModuleComponentIconMessage } from '@firefly/core';

@NgModule
({
    imports :
    [
        ModulePage,
        ModuleDirectiveElevation,
        ModuleComponentIconMessage
    ],

    declarations    : [PageAssetsInterests],
    exports         : [PageAssetsInterests],
    entryComponents : [PageAssetsInterests]
})
export class ModulePageAssetsInterests { }
