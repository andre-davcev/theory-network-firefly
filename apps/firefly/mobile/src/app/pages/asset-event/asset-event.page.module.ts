import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ModuleComponentItemHeader, ModuleComponentItemDescription, ModuleComponentItemImage, ModuleComponentItemMap } from '@firefly/mobile';
import { ModulePage } from '@firefly/app/modules';

import { PageAssetEvent } from './asset-event.page';
import { RoutesPageAssetEvent } from './asset-event.page.routes';
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
        RouterModule.forChild(RoutesPageAssetEvent),
        ModulePageEventLocation,
        ModulePageAssetsInterests,
        NgxsFormPluginModule,
        ModulePipeTimestamp
    ],

    declarations : [PageAssetEvent],
    exports : [PageAssetEvent],
    entryComponents:
    [
        PageEventLocation
    ]
})

export class ModulePageAssetEvent { }
