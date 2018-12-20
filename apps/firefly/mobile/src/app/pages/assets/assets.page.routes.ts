import { Routes } from '@angular/router';

import { Pages } from '../pages.enum';
import { PageAssets } from './assets.page';

export const RoutesPageAssets: Routes =
[
    { path : '', component : PageAssets},

    { path: Pages.Beacons,  loadChildren: '@firefly/page/assets-beacons#ModulePageAssetsBeacons' },
    { path: Pages.Clusters, loadChildren: '@firefly/page/assets-clusters#ModulePageAssetsClusters' },
    { path: Pages.Coupons,  loadChildren: '@firefly/page/assets-coupons#ModulePageAssetsCoupons' },
    { path: Pages.Events,   loadChildren: '@firefly/page/assets-events#ModulePageAssetsEvents' },
    { path: Pages.Icons,    loadChildren: '@firefly/page/assets-icons#ModulePageAssetsIcons' },
    { path: Pages.Images,   loadChildren: '@firefly/page/assets-images#ModulePageAssetsImages' },
    { path: Pages.Places,   loadChildren: '@firefly/page/assets-places#ModulePageAssetsPlaces' }
];
