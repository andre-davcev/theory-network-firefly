import { Routes } from '@angular/router';

import { PagesHome, PageHome } from './home.page';

export const RoutesPageHome: Routes =
[
    { path : '', component : PageHome},

    { path: PagesHome.Search,        loadChildren: '@firefly/page/search#ModulePageSearch' },
    { path: PagesHome.Subscriptions, loadChildren: '@firefly/page/subscriptions#ModulePageSubscriptions' },
    { path: PagesHome.Publish,       loadChildren: '@firefly/page/cluster#ModulePagePublisherCluster' },
    { path: PagesHome.Settings,      loadChildren: '@firefly/page/user#ModulePageUser' }
];
