import { NgModule } from '@angular/core';
import { RouterModule} from '@angular/router';

import { ModuleComponentIconSubscribe, ModuleComponentIconMessage, ModuleComponentButtonAdd } from '@firefly/core';
import { ModulePage } from '@firefly/app/modules';

import { RoutesPageStream } from './stream.page.routes';
import { PageStream } from './stream.page';
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
        RouterModule.forChild(RoutesPageStream),
        ModuleComponentButtonAdd
    ],

    declarations : [PageStream],
    exports: [PageStream]
})

export class ModulePageStream
{

}
