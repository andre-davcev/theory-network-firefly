import { Routes } from '@angular/router';

import { PageAssetCluster } from './asset-cluster.page';
import { ResolverPageAssetCluster } from './asset-cluster.page.resolver';

export const RoutesPageAssetCluster: Routes =
[
    { path: '', component : PageAssetCluster, resolve: { loader: ResolverPageAssetCluster } }
];
