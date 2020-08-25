import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ModulePage } from '@firefly/app/modules';
import { PageCalendar } from './calendar.page';
import { RoutesPageCalendar } from './calendar.page.routes';
import { ModuleComponentSlide, ModuleComponentItemEvents } from '@firefly/mobile';
import { ModulePageAlertDetail } from '../alert-detail';
import { ModuleComponentIconMessage, ModuleComponentButtonAdd } from '@firefly/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { ModuleDirectiveElevation } from '@theory/google';
import { ModulePageLogin } from '../login';
@NgModule
({
    imports :
    [
        ReactiveFormsModule,
        ModulePage,
        RouterModule.forChild(RoutesPageCalendar),
        ModuleComponentSlide,
        ModulePageAlertDetail,
        ModuleComponentIconMessage,
        NgxsFormPluginModule,
        ModuleComponentItemEvents,
        ModuleComponentButtonAdd,
        ModulePage,
        ModuleComponentSlide,
        ModuleDirectiveElevation,
        ModulePageLogin
    ],

    declarations : [PageCalendar],
    exports: [PageCalendar]
})

export class ModulePageCalendar
{

}
