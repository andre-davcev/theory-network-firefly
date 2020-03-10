import {NgModule} from '@angular/core';

import { ModuleComponentImageGrid } from '@theory/ionic';
import { ModulePage } from '@firefly/app/modules';

import { PageEventAssets } from './event-assets.page';

@NgModule
({
    imports :
    [
        ModulePage,
        ModuleComponentImageGrid
    ],

    declarations : [PageEventAssets],
    exports: [PageEventAssets]
})

export class ModulePageEventAssets
{

}
