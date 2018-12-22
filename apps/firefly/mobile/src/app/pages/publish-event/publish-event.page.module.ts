import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ModuleComponentItemHeader, ModuleComponentItemDescription, ModuleComponentItemMap } from '@firefly/mobile';
import { ModulePage } from '@firefly/app/modules';

import { PagePublishEvent } from './publish-event.page';
import { RoutesPagePublishEvent } from './publish-event.page.routes';

@NgModule
({
    imports :
    [
        ReactiveFormsModule,
        RouterModule,
        ModulePage,
        ModuleComponentItemHeader,
        ModuleComponentItemMap,
        ModuleComponentItemDescription,
        RouterModule.forChild(RoutesPagePublishEvent)
    ],

    declarations : [PagePublishEvent],
    exports : [PagePublishEvent]
})

export class ModulePagePublishEvent { }
