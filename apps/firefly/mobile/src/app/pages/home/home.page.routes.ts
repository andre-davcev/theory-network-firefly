import { Routes } from '@angular/router';

import { PageHome } from './home.page';
import { Pages } from '@firefly/mobile';
import { ResolverPageHome } from './home.page.resolver';

export const RoutesPageHome: Routes =
[
    { path : '', component : PageHome, resolve: { loader: ResolverPageHome },
      children: [
        { path: '', redirectTo: Pages.Stream, pathMatch: 'full' },

        { path: Pages.Stream, loadChildren: '@firefly/page/stream#ModulePageStream' },
        { path: Pages.Alert,  loadChildren: '@firefly/page/alert#ModulePageAlert' }
    ]}
];
