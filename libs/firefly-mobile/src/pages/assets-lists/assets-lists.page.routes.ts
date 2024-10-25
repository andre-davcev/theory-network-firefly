import { Routes } from '@angular/router';

import { PageAssetsLists } from './assets-lists.page';
import { ResolverPageAssetsLists } from './assets-lists.page.resolver';

export const RoutesPageAssetsLists: Routes = [
  {
    path: '',
    component: PageAssetsLists,
    resolve: { loader: ResolverPageAssetsLists }
  }
];
