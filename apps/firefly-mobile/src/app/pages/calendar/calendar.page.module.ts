import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';

import { ModuleDirectiveElevation } from '@theory/google';
import { ModuleComponentSlide, ModuleComponentItemEvents } from '@firefly/mobile';
import { ModuleComponentIconMessage, ModuleComponentButtonAdd } from '@firefly/shared';

import { ModulePage } from '../../modules';
import { PageCalendar } from './calendar.page';
import { RoutesPageCalendar } from './calendar.page.routes';
import { ModulePageLogin } from '../login';

@NgModule
({
    imports :
    [
        ReactiveFormsModule,
        ModulePage,
        RouterModule.forChild(RoutesPageCalendar),
        ModuleComponentSlide,
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
