import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ModulePage } from '@firefly/app/modules';
import { PageNotificationDetail } from './notification-detail.page';
import { RoutesPageNotificationDetail } from './notification-detail.page.routes';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { ModuleComponentItemMap, ModuleComponentSlide } from '@firefly/mobile';
import { ModuleComponentButtonAction } from '@firefly/core';

@NgModule
({
    imports :
    [
        ModulePage,
        ModuleComponentItemMap,
        ModuleComponentButtonAction,
        ModuleComponentSlide,
        RouterModule.forChild(RoutesPageNotificationDetail),
        NgxsFormPluginModule
    ],

    declarations : [PageNotificationDetail],
    exports : [PageNotificationDetail],
    entryComponents:
    [

    ]
})

export class ModulePageNotificationDetail { }
