import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { ModuleComponentSlide } from '@firefly/mobile';
import { ModulePage } from '@firefly/app/modules';
import { ModulePageStream, PageStream } from '@firefly/app/page/stream';
import { ModulePageSearch, PageSearch } from '@firefly/app/page/search';
import { ModulePagePublisherCluster, PagePublisherCluster } from '@firefly/app/page/cluster';
import { ModulePageSubscriptions, PageSubscriptions } from '@firefly/app/page/subscriptions';
import { ModulePageUser, PageUser } from '@firefly/app/page/user';

import { RoutesPageHome } from './home.page.routes';
import { PageHome } from './home.page';

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

    declarations : [PageHome],
    exports : [PageHome]
})
export class ModulePageHome {}
