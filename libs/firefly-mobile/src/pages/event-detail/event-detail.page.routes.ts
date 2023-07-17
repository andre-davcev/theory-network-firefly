import { Routes } from '@angular/router';

import { PageEventDetail } from './event-detail.page';
import { ResolverPageEventDetail } from './event-detail.page.resolver';

export const RoutesPageEventDetail: Routes = [
  {
    path: ':id',
    component: PageEventDetail,
    resolve: { loader: ResolverPageEventDetail }
  }
];
