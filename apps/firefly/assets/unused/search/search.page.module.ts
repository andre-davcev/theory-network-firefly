import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ModulePage } from '@firefly/app/modules';

import { RoutesPageSearch } from './search.page.routes';
import { PageSearch } from './search.page';

@NgModule
({
    imports :
    [
        ModulePage,
        RouterModule.forChild(RoutesPageSearch)
    ],

    declarations : [PageSearch],
    exports: [PageSearch]
})

export class ModulePageSearch
{

}
