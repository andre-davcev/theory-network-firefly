import { Routes } from '@angular/router';

import { PageNotifications } from './notifications.page';
import { ResolverPageNotifications } from './notifications.page.resolver';

export const RoutesPageNotifications: Routes =
[
    { path : '', component : PageNotifications, resolve: { loader: ResolverPageNotifications } }
];
