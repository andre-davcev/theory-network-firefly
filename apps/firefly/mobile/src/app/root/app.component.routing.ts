import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Pages } from '../pages/pages.enum';

export const routes: Routes =
[
    { path: '', redirectTo: '/login', pathMatch: 'full' },

    { path: Pages.Login, loadChildren: '@firefly/page/login#ModulePageLogin' },
    { path: Pages.Home,  loadChildren: '@firefly/page/home#ModulePageHome' },

    { path: Pages.AssetsBeacons,  loadChildren: '@firefly/page/assets-beacons#ModulePageAssetsBeacons' },
    { path: Pages.AssetsClusters, loadChildren: '@firefly/page/assets-clusters#ModulePageAssetsClusters' },
    { path: Pages.AssetCluster,   loadChildren: '@firefly/page/asset-cluster#ModulePageAssetCluster'},
    { path: Pages.AssetsCoupons,  loadChildren: '@firefly/page/assets-coupons#ModulePageAssetsCoupons' },
    { path: Pages.AssetsEvents,   loadChildren: '@firefly/page/assets-events#ModulePageAssetsEvents' },
    { path: Pages.AssetsIcons,    loadChildren: '@firefly/page/assets-icons#ModulePageAssetsIcons' },
    { path: Pages.AssetsImages,   loadChildren: '@firefly/page/assets-images#ModulePageAssetsImages' },
    { path: Pages.AssetsPlaces,   loadChildren: '@firefly/page/assets-places#ModulePageAssetsPlaces' },

    { path: Pages.IconSelector,   loadChildren: '@firefly/page/icon-selector#ModulePageIconSelector' },
    { path: Pages.ImageSelector,  loadChildren: '@firefly/page/image-selector#ModulePageImageSelector' },

    { path: Pages.Search,        loadChildren: '@firefly/page/search#ModulePageSearch' },
    { path: Pages.Subscriptions, loadChildren: '@firefly/page/subscriptions#ModulePageSubscriptions' },
    { path: Pages.AssetEvent,    loadChildren: '@firefly/page/asset-event#ModulePageAssetEvent' },
    { path: Pages.Assets,        loadChildren: '@firefly/page/assets#ModulePageAssets' },
    { path: Pages.User,          loadChildren: '@firefly/page/user#ModulePageUser' }
];

@NgModule
({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class ModuleRoutingApp {}
