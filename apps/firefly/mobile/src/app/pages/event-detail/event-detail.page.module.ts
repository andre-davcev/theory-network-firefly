import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ModuleComponentItemHeader, ModuleComponentItemDescription, ModuleComponentItemImage, ModuleComponentItemMap } from '@firefly/mobile';
import { ModulePage } from '@firefly/app/modules';

import { PageEventDetail } from './event-detail.page';
import { RoutesPageEventDetail } from './event-detail.page.routes';
import { PageEventLocation, ModulePageEventLocation } from '../event-location';
import { ModulePageAssetsInterests } from '../assets-interests';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { ModulePipeTimestamp } from '@theory/firebase';

@NgModule
({
    imports :
    [
        ReactiveFormsModule,
        ModulePage,
        ModuleComponentItemHeader,
        ModuleComponentItemMap,
        ModuleComponentItemDescription,
        ModuleComponentItemImage,
        RouterModule.forChild(RoutesPageEventDetail),
        ModulePageEventLocation,
        ModulePageAssetsInterests,
        NgxsFormPluginModule,
        ModulePipeTimestamp
    ],

    declarations : [PageEventDetail],
    exports : [PageEventDetail],
    entryComponents:
    [
        PageEventLocation
    ]
})

export class ModulePageEventDetail { }
