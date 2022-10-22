import { NgModule } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule} from '@angular/router';

import { ModulePipeTimestamp } from '@theory/firebase';
import { ModuleDirectiveElevation } from '@theory/google';
import { ModuleComponentItemHeader } from '@firefly/mobile';
import { ModuleComponentIconSubscribe, ModuleComponentIconMessage, ModuleComponentButtonAdd } from '@firefly/shared';

import { ModulePage } from '../../modules';
import { RoutesPageStream } from './stream.page.routes';
import { PageStream } from './stream.page';


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
        ModuleComponentButtonAdd,
        ModulePipeTimestamp
    ],

    declarations : [PageStream],
    exports: [PageStream]
})

export class ModulePageStream
{

}
