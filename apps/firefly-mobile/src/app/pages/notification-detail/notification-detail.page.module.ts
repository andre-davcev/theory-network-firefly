import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';

import { ModuleComponentItemMap, ModuleComponentSlide } from '@firefly/mobile';
import { ModuleComponentButtonAction } from '@firefly/shared';
import { ModuleDirectiveElevation } from '@theory/google';

import { ModulePage } from '../../modules';
import { PageNotificationDetail } from './notification-detail.page';
import { RoutesPageNotificationDetail } from './notification-detail.page.routes';

@NgModule
({
    imports: [
        ModulePage,
        ModuleComponentItemMap,
        ModuleComponentButtonAction,
        ModuleComponentSlide,
        RouterModule.forChild(RoutesPageNotificationDetail),
        NgxsFormPluginModule,
        ModuleDirectiveElevation
    ],
    declarations: [PageNotificationDetail],
    exports: [PageNotificationDetail]
})

export class ModulePageNotificationDetail { }
