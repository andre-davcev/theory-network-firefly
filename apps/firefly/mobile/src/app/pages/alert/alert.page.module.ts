import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ModulePage } from '@firefly/app/modules';
import { PageAlert } from './alert.page';
import { RoutesPageAlert } from './alert.page.routes';
import { ModuleComponentSlide } from '@firefly/mobile';
import { ModulePageAlertDetail } from '../alert-detail';
@NgModule
({
    imports :
    [
        ModulePage,
        RouterModule.forChild(RoutesPageAlert),
        ModuleComponentSlide,
        ModulePageAlertDetail
    ],

    declarations : [PageAlert],
    exports: [PageAlert]
})

export class ModulePageAlert
{

}
