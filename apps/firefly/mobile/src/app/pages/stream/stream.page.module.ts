import { NgModule } from '@angular/core';

import { ModuleComponentIcon } from '@firefly/core';
import { ModulePage } from '@firefly/app/modules';

import { PageStream } from './stream.page';

@NgModule
({
    imports :
    [
        ModulePage,
        ModuleComponentIcon
    ],

    declarations : [PageStream],
    exports: [PageStream]
})

export class ModulePageStream
{

}
