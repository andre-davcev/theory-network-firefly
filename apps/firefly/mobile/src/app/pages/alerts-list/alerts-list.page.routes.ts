import { Routes } from '@angular/router';

import { PageAlertsList } from './alerts-list.page';
import { ResolverPageAlertsList } from './alerts-list.page.resolver';

export const RoutesPageAlertsList: Routes =
[
    { path : '', component : PageAlertsList, resolve: { loader: ResolverPageAlertsList }}
];
