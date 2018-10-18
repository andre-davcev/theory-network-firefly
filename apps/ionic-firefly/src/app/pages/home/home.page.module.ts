import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { ModuleComponentSlide } from '@firefly/mobile';
import {
  ModulePage,
  ModulePageStream,
  ModulePageSearch,
  ModulePageSubscriptions,
  ModulePageUser,
  ModulePagePublisherCluster,
  RoutesPageHome,
  PageHome,
  PageStream,
  PageSearch,
  PagePublisherCluster,
  PageSubscriptions,
  PageUser
} from '@firefly/app';

@NgModule
({
    imports :
    [
        ModulePage,
        RouterModule.forChild(RoutesPageHome),
        ModuleComponentSlide,
        TranslateModule,
        ModulePageStream,
        ModulePageSearch,
        ModulePagePublisherCluster,
        ModulePageSubscriptions,
        ModulePageUser
    ],

    entryComponents :
    [
        PageStream,
        PageSearch,
        PagePublisherCluster,
        PageSubscriptions,
        PageUser
    ],

    declarations: [PageHome]
})
export class ModulePageHome {}
