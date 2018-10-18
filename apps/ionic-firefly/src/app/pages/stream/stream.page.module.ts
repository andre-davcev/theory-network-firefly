import { NgModule } from '@angular/core';

import { ModuleComponentIcon } from '@firefly/core';
import { ModulePage, PageStream } from '@firefly/app';

@NgModule
({
    imports :
    [
        ModulePage,
        ModuleComponentIcon
    ],

    declarations :
    [
        PageStream
    ]
})

export class ModulePageStream
{

}
