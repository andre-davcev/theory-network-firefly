import { Routes } from '@angular/router';

import { PageHome } from './home.page';
import { Pages } from '../pages.enum';

export const RoutesPageHome: Routes =
[
    { path : '', component : PageHome},

    { path: Pages.Search,        loadChildren: '@firefly/page/search#ModulePageSearch' },
    { path: Pages.Subscriptions, loadChildren: '@firefly/page/subscriptions#ModulePageSubscriptions' },
    { path: Pages.PublishEvent,  loadChildren: '@firefly/page/publish-event#ModulePagePublishEvent' },
    { path: Pages.Assets,        loadChildren: '@firefly/page/assets#ModulePageAssets' },
    { path: Pages.User,          loadChildren: '@firefly/page/user#ModulePageUser' },
    { path: Pages.Stream,        loadChildren: '@firefly/page/stream#ModulePageStream' },
    { path: Pages.Alert,         loadChildren: '@firefly/page/alert#ModulePageAlert'}
];
