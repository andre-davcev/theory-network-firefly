import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ModulePage } from '@firefly/app/modules';
import { PageAlert } from './alert.page';
import { RoutesPageAlert } from './alert.page.routes';

@NgModule
({
    imports :
    [
        ModulePage,
        RouterModule.forChild(RoutesPageAlert)
    ],

    declarations : [PageAlert],
    exports: [PageAlert]
})

export class ModulePageAlert
{

}
