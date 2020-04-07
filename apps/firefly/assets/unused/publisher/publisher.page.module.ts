import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { ModulePage } from '@firefly/app/modules';

import { RoutesPagePublisher } from './publisher.page.routes';
import { PagePublisher } from './publisher.page';
import { ModuleDirectiveElevation } from '@theory/google';
import { ModuleComponentIcon } from '@firefly/core';

@NgModule
({
    imports :
    [
        ModulePage,
        CommonModule,
        RouterModule.forChild(RoutesPagePublisher),
        TranslateModule,
        ModuleDirectiveElevation,
        ModuleComponentIcon
    ],

    declarations : [PagePublisher],
    exports : [PagePublisher]
})
export class ModulePagePublisher {}
