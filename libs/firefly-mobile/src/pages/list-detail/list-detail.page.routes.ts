import { Routes } from '@angular/router';

import { PageListDetail } from './list-detail.page';
import { ResolverPageListDetail } from './list-detail.page.resolver';

export const RoutesPageListDetail: Routes = [
  {
    path: '',
    component: PageListDetail,
    resolve: { loader: ResolverPageListDetail }
  }
];
