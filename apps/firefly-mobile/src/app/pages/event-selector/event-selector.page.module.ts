import { NgModule } from '@angular/core';

import { ModuleDirectiveElevation } from '@theory/google';
import { ModuleComponentItemEvents } from '@firefly/mobile';
import { ModuleComponentIconMessage } from '@firefly/shared';

import { ModulePage } from '../../modules';
import { PageEventSelector } from './event-selector.page';

@NgModule
({
    imports :
    [
        ModulePage,
        ModuleDirectiveElevation,
        ModuleComponentItemEvents,
        ModuleComponentIconMessage
    ],

    declarations : [PageEventSelector],
    exports: [PageEventSelector],
    entryComponents: [PageEventSelector]
})

export class ModulePageEventSelector { }
