import { Routes } from '@angular/router';

import { PageAssetList } from './asset-list.page';
import { ResolverPageAssetList } from './asset-list.page.resolver';

export const RoutesPageAssetList: Routes = [
  {
    path: '',
    component: PageAssetList,
    resolve: { loader: ResolverPageAssetList }
  }
];
