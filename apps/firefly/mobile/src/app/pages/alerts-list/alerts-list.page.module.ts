import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ModulePage } from '@firefly/app/modules';
import { PageAlertsList } from './alerts-list.page';
import { RoutesPageAlertsList } from './alerts-list.page.routes';
import { ModulePageAlertDetail } from '../alert-detail';
import { ModuleComponentIconMessage } from '@firefly/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { ModuleDirectiveElevation } from '@theory/google';
@NgModule
({
    imports :
    [
        ReactiveFormsModule,
        ModulePage,
        RouterModule.forChild(RoutesPageAlertsList),
        ModulePageAlertDetail,
        ModuleComponentIconMessage,
        NgxsFormPluginModule,
        ModuleDirectiveElevation
    ],

    declarations : [PageAlertsList],
    exports: [PageAlertsList]
})

export class ModulePageAlertsList
{

}
