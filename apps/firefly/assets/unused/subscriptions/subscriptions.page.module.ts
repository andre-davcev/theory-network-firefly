import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ModulePage } from '@firefly/app/modules';

import { PageSubscriptions } from './subscriptions.page';
import { RoutesPageSubscriptions } from './subscriptions.page.routes';
import { ModuleComponentIconMessage } from '@firefly/core';
import { ModuleDirectiveElevation } from '@theory/google';

@NgModule
({
    imports :
    [
        ModulePage,
        ModuleComponentIconMessage,
        ModuleDirectiveElevation,
        RouterModule.forChild(RoutesPageSubscriptions)
    ],

    declarations : [PageSubscriptions],
    exports: [PageSubscriptions]
})

export class ModulePageSubscriptions
{

}
