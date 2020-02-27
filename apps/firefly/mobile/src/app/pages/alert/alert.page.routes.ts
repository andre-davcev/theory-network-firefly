import { Routes } from '@angular/router';

import { PageAlert } from './alert.page';
import { ResolverPageAlert } from './alert.page.resolver';

export const RoutesPageAlert: Routes =
[
    { path : '', component : PageAlert, resolve: { loader: ResolverPageAlert }}
];
