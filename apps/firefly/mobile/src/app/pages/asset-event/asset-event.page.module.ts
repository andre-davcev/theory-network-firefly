import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ModuleComponentItemHeader, ModuleComponentItemDescription, ModuleComponentItemImage, ModuleComponentItemMap } from '@firefly/mobile';
import { ModulePage } from '@firefly/app/modules';

import { PageAssetEvent } from './asset-event.page';
import { RoutesPageAssetEvent } from './asset-event.page.routes';
import { NgxsModule } from '@ngxs/store';
import { StateEvent } from '@firefly/core';
import { PageEventLocation, ModulePageEventLocation } from '../event-location';

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
        NgxsModule.forFeature([StateEvent]),
        ModulePageEventLocation
    ],

    declarations : [PageAssetEvent],
    exports : [PageAssetEvent],
    entryComponents: [PageEventLocation]
})

export class ModulePageAssetEvent { }
