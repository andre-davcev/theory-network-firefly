import { NgModule } from '@angular/core';

import { ModulePage } from '@firefly/app/modules';

import { PageSearch } from './search.page';

@NgModule
({
    imports :
    [
        ModulePage
    ],

    declarations : [PageSearch],
    exports: [PageSearch]
})

export class ModulePageSearch
{

}
