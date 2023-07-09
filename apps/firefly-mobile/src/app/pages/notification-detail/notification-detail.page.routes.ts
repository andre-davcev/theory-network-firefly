import { Routes } from '@angular/router';

import { PageNotificationDetail } from './notification-detail.page';
import { ResolverPageNotificationDetail } from './notification-detail.page.resolver';

export const RoutesPageNotificationDetail: Routes = [
  {
    path: ':id',
    component: PageNotificationDetail,
    resolve: { loader: ResolverPageNotificationDetail }
  }
];
