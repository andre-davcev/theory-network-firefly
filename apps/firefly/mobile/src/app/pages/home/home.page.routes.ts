import { Routes } from '@angular/router';

import { PageHome } from './home.page';
import { Pages } from '../pages.enum';

export const RoutesPageHome: Routes =
[
    { path : '', component : PageHome,
      children: [
        { path: '',           redirectTo: Pages.Stream, pathMatch: 'full' },
        { path: Pages.Stream, loadChildren: () => import(`@firefly/page/stream`).then(m => m.ModulePageStream) },
        { path: Pages.Alert,  loadChildren: () => import(`@firefly/page/alert`).then(m => m.ModulePageAlert) }
    ]}
];
