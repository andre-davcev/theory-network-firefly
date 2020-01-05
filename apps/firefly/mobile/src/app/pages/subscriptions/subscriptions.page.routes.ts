import { Routes } from '@angular/router';

import { PageSubscriptions } from './subscriptions.page';
import { ResolverPageSubscriptions } from './subscriptions.page.resolver';

export const RoutesPageSubscriptions: Routes =
[
    { path : '', component : PageSubscriptions, resolve: { loader: ResolverPageSubscriptions }}
];
