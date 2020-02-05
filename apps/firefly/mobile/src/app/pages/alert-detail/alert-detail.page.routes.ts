import { Routes } from '@angular/router';

import { PageAlertDetail } from './alert-detail.page';
import { ResolverPageAlertDetail } from './alert-detail.page.resolver';

export const RoutesPageAlertDetail: Routes =
[
    { path: ':id', component : PageAlertDetail, resolve: { loader: ResolverPageAlertDetail } }
];
