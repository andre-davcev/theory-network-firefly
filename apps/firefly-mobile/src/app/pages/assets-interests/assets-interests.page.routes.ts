import { Routes } from '@angular/router';

import { PageAssetsInterests } from './assets-interests.page';
import { ResolverPageAssetsInterests } from './assets-interests.page.resolver';

export const RoutesPageAssetsInterests: Routes = [
  {
    path: '',
    component: PageAssetsInterests,
    resolve: { loader: ResolverPageAssetsInterests }
  }
];
