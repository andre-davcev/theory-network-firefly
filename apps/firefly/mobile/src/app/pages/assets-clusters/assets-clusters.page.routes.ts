import { Routes } from '@angular/router';

import { PageAssetsClusters } from './assets-clusters.page';
import { ResolverPageAssetsClusters } from './assets-clusters.page.resolver';

export const RoutesPageAssetsClusters: Routes =
[
    { path : '', component : PageAssetsClusters, resolve: { loader: ResolverPageAssetsClusters } }
];
