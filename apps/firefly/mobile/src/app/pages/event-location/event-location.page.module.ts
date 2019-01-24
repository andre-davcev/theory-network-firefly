import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ModuleDirectiveElevation } from '@theory/google';
import { ModulePage } from '@firefly/app/modules';

import { RoutesPageEventLocation } from './event-location.page.routes';
import { PageEventLocation } from './event-location.page';
import { ModuleComponentMap } from '@firefly/core';
import { TranslateModule } from '@ngx-translate/core';

@NgModule
({
    imports :
    [
        ModulePage,
        ModuleDirectiveElevation,
        ModuleComponentMap,
        TranslateModule,
        RouterModule.forChild(RoutesPageEventLocation)
    ],

    declarations : [PageEventLocation],
    exports : [PageEventLocation]
})

export class ModulePageEventLocation { }
