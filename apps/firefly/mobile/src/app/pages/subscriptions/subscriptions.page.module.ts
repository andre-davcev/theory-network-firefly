import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ModulePage } from '@firefly/app/modules';

import { PageSubscriptions } from './subscriptions.page';
import { RoutesPageSubscriptions } from './subscriptions.page.routes';

@NgModule
({
    imports :
    [
        ModulePage,
        RouterModule.forChild(RoutesPageSubscriptions)
    ],

    declarations : [PageSubscriptions],
    exports: [PageSubscriptions]
})

export class ModulePageSubscriptions
{

}
