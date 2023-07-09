import { Routes } from '@angular/router';

import { PageInterestDetail } from './interest-detail.page';
import { ResolverPageInterestDetail } from './interest-detail.page.resolver';

export const RoutesPageInterestDetail: Routes = [
  {
    path: '',
    component: PageInterestDetail,
    resolve: { loader: ResolverPageInterestDetail }
  }
];
