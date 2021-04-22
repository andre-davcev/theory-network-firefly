import { NgModule } from '@angular/core';

import { ModuleDirectiveElevation } from '@theory/google';

import { ModulePage } from '@firefly/app/modules';
import { PageEventSelector } from './event-selector.page';
import { ModulePageEventAssets } from '../event-assets';
import { ModulePageEventLibrary } from '../event-library';

@NgModule
({
    imports :
    [
        ModulePage,
        ModulePageEventAssets,
        ModulePageEventLibrary,
        ModuleDirectiveElevation,
        //RouterModule.forChild(RoutesPageEventSelector)
    ],

    declarations : [PageEventSelector],
    exports: [PageEventSelector],
    entryComponents: [PageEventSelector]
})

export class ModulePageEventSelector { }
