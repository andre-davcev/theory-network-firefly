import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { PageHome } from './home.page';
import { ModulePage } from '../page.module';
import { ModuleComponentSlide } from '../../components/slide/slide.component.module';
import { PageStream } from '../stream/stream.page';
import { PageSearch } from '../search/search.page';
import { PagePublisherCluster } from '../cluster/cluster.page';
import { PageSubscriptions } from '../subscriptions/subscriptions.page';
import { PageUser } from '../user/user.page';
import { ModulePageStream } from '../stream/stream.page.module';
import { ModulePageSearch } from '../search/search.page.module';
import { ModulePageSubscriptions } from '../subscriptions/subscriptions.page.module';
import { ModulePageUser } from '../user/user.page.module';
import { ModulePagePublisherCluster } from '../cluster/cluster.page.module';

export const routes: Routes =
[
    {path : '', component : PageHome
}];

@NgModule
({
    imports :
    [
        ModulePage,
        RouterModule.forChild(routes),
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
