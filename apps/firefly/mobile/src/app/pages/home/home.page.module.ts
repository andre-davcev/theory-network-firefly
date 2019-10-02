import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { ModuleComponentSlide } from '@firefly/mobile';
import { ModulePage } from '@firefly/app/modules';

import { RoutesPageHome } from './home.page.routes';
import { PageHome } from './home.page';
import { NgxsModule } from '@ngxs/store';
import {
    StateUserAlerts,
    StateUserStream,
    StateAlert,
    StateCluster,
    StateClusterEvents,
    StateClusterSubscribers,
    StateEvent,
    StateEventClusters,
    StateIcon,
    StateIconClusters,
    StateImage,
    StateImageEvents,
    StateStreamItem,
    StateSubscription,
    StateUser,
    StateUserClusters,
    StateUserEvents,
    StateUserIcons,
    StateUserImages,
    StateUserSubscriptions
} from '@firefly/core';

@NgModule
({
    imports :
    [
        ModulePage,
        CommonModule,
        RouterModule.forChild(RoutesPageHome),
        ModuleComponentSlide,
        TranslateModule,
        NgxsModule.forFeature
        ([
            StateAlert,
            StateCluster,
            StateClusterEvents,
            StateClusterSubscribers,
            StateEvent,
            StateEventClusters,
            StateIcon,
            StateIconClusters,
            StateImage,
            StateImageEvents,
            StateStreamItem,
            StateSubscription,
            StateUser,
            StateUserAlerts,
            StateUserClusters,
            StateUserEvents,
            StateUserIcons,
            StateUserImages,
            StateUserStream,
            StateUserSubscriptions,
        ])
    ],

    declarations : [PageHome],
    exports : [PageHome]
})
export class ModulePageHome {}
