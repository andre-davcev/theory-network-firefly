import { NgModule } from '@angular/core';

import { ModulePage } from '@firefly/app/modules';

import { PageSubscriptions } from './subscriptions.page';

@NgModule
({
    imports :
    [
        ModulePage
    ],

    declarations : [PageSubscriptions],
    exports: [PageSubscriptions]
})

export class ModulePageSubscriptions
{

}
