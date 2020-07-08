import {NgModule} from '@angular/core';

import { ModuleComponentImageGrid } from '@theory/ionic';
import { ModulePage } from '@firefly/app/modules';

import { PageEventAssets } from './event-assets.page';
import { ModulePipeTimestamp } from '@theory/firebase';

@NgModule
({
    imports :
    [
        ModulePage,
        ModuleComponentImageGrid,
        ModulePipeTimestamp
    ],

    declarations : [PageEventAssets],
    exports: [PageEventAssets]
})

export class ModulePageEventAssets
{

}
