import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ModulePage } from '@firefly/app/modules';
import { PageAlert } from './alert.page';
import { RoutesPageAlert } from './alert.page.routes';
import { ModuleComponentSlide, ModuleComponentItemEvents } from '@firefly/mobile';
import { ModulePageAlertDetail } from '../alert-detail';
import { ModuleComponentIconMessage } from '@firefly/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
@NgModule
({
    imports :
    [
        ReactiveFormsModule,
        ModulePage,
        RouterModule.forChild(RoutesPageAlert),
        ModuleComponentSlide,
        ModulePageAlertDetail,
        ModuleComponentIconMessage,
        NgxsFormPluginModule,
        ModuleComponentItemEvents
    ],

    declarations : [PageAlert],
    exports: [PageAlert]
})

export class ModulePageAlert
{

}
