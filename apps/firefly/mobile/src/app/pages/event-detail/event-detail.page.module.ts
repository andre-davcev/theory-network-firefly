import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ModulePage } from '@firefly/app/modules';
import { PageEventDetail } from './event-detail.page';
import { RoutesPageEventDetail } from './event-detail.page.routes';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { ModuleComponentItemMap } from '@firefly/mobile';
import { ModuleComponentButtonAction } from '@firefly/core';

@NgModule
({
    imports :
    [
        ModulePage,
        ModuleComponentItemMap,
        ModuleComponentButtonAction,
        RouterModule.forChild(RoutesPageEventDetail),
        NgxsFormPluginModule
    ],

    declarations : [PageEventDetail],
    exports : [PageEventDetail],
    entryComponents:
    [

    ]
})

export class ModulePageEventDetail { }
