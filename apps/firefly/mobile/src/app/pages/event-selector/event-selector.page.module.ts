import { NgModule } from '@angular/core';

import { ModuleDirectiveElevation } from '@theory/google';

import { ModulePage } from '@firefly/app/modules';
import { PageEventSelector } from './event-selector.page';
import { ModuleComponentItemEvents } from '@firefly/mobile';

@NgModule
({
    imports :
    [
        ModulePage,
        ModuleDirectiveElevation,
        ModuleComponentItemEvents
    ],

    declarations : [PageEventSelector],
    exports: [PageEventSelector],
    entryComponents: [PageEventSelector]
})

export class ModulePageEventSelector { }
