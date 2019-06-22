import { NgModule } from '@angular/core';
import { RouterModule} from '@angular/router';

import { ModuleComponentIcon, ModuleComponentIconSubscribe } from '@firefly/core';
import { ModulePage } from '@firefly/app/modules';

import { RoutesPageStream } from './stream.page.routes';
import { PageStream } from './stream.page';
import { ModuleDirectiveElevation } from '@theory/google';
import { ModuleComponentItemHeader } from '@firefly/mobile';

@NgModule
({
    imports :
    [
        ModulePage,
        ModuleComponentIcon,
        ModuleDirectiveElevation,
        ModuleComponentItemHeader,
        ModuleComponentIconSubscribe,
        RouterModule.forChild(RoutesPageStream)
    ],

    declarations : [PageStream],
    exports: [PageStream]
})

export class ModulePageStream
{

}
