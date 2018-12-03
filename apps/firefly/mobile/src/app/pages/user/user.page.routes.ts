import { Routes } from '@angular/router';

import { PagesAssets } from '@firefly/page/publisher-assets';
import { PageUser } from './user.page';

export const RoutesPageUser: Routes =
[
    { path : '', component : PageUser},

    { path: PagesAssets.Beacons,  loadChildren: '@firefly/page/assets-beacons#ModulePageAssetsBeacons' },
    { path: PagesAssets.Clusters, loadChildren: '@firefly/page/assets-clusters#ModulePageAssetsClusters' },
    { path: PagesAssets.Coupons,  loadChildren: '@firefly/page/assets-coupons#ModulePageAssetsCoupons' },
    { path: PagesAssets.Events,   loadChildren: '@firefly/page/assets-events#ModulePageAssetsEvents' },
    { path: PagesAssets.Icons,    loadChildren: '@firefly/page/assets-icons#ModulePageAssetsIcons' },
    { path: PagesAssets.Images,   loadChildren: '@firefly/page/assets-images#ModulePageAssetsImages' },
    { path: PagesAssets.Places,   loadChildren: '@firefly/page/assets-places#ModulePageAssetsPlaces' }
];
