import { NgModule } from '@angular/core';
import { RouterModule} from '@angular/router';

import { ModuleComponentIconSubscribe, ModuleComponentIconMessage, ModuleComponentButtonAdd } from '@firefly/core';
import { ModulePage } from '@firefly/app/modules';

import { RoutesPageSearch } from './search.page.routes';
import { PageSearch } from './search.page';
import { ModuleDirectiveElevation } from '@theory/google';
import { ModuleComponentItemHeader } from '@firefly/mobile';

import { MatExpansionModule } from '@angular/material/expansion';

@NgModule
({
    imports :
    [
        ModulePage,
        ModuleDirectiveElevation,
        ModuleComponentItemHeader,
        ModuleComponentIconSubscribe,
        MatExpansionModule,
        ModuleComponentIconMessage,
        RouterModule.forChild(RoutesPageSearch),
        ModuleComponentButtonAdd
    ],

    declarations : [PageSearch],
    exports: [PageSearch]
})

export class ModulePageSearch
{

}
