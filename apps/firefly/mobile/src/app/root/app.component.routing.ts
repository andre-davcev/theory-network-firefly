import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Pages } from '../pages/pages.enum';

export const routes: Routes =
[
    { path: '', redirectTo: '/login', pathMatch: 'full' },

    { path: Pages.Login, loadChildren: () => import(`@firefly/page/login`).then(m => m.ModulePageLogin) },
    { path: Pages.Home,  loadChildren: () => import(`@firefly/page/home`).then(m  => m.ModulePageHome) },

    { path: Pages.AssetsBeacons,  loadChildren: () => import(`@firefly/page/assets-beacons`).then(m  => m.ModulePageAssetsBeacons)},
    { path: Pages.AssetsClusters, loadChildren: () => import(`@firefly/page/assets-clusters`).then(m => m.ModulePageAssetsClusters) },
    { path: Pages.AssetCluster,   loadChildren: () => import(`@firefly/page/asset-cluster`).then(m   => m.ModulePageAssetCluster) },
    { path: Pages.AssetsCoupons,  loadChildren: () => import(`@firefly/page/assets-coupons`).then(m  => m.ModulePageAssetsCoupons) },
    { path: Pages.AssetsEvents,   loadChildren: () => import(`@firefly/page/assets-events`).then(m   => m.ModulePageAssetsEventsRoute) },
    { path: Pages.AssetsIcons,    loadChildren: () => import(`@firefly/page/assets-icons`).then(m    => m.ModulePageAssetsIcons)},
    { path: Pages.AssetsImages,   loadChildren: () => import(`@firefly/page/assets-images`).then(m   => m.ModulePageAssetsImages)},
    { path: Pages.AssetsPlaces,   loadChildren: () => import(`@firefly/page/assets-places`).then(m   => m.ModulePageAssetsPlaces) },

    { path: Pages.IconSelector,   loadChildren: () => import(`@firefly/page/icon-selector`).then(m => m.ModulePageIconSelector) },

    { path: Pages.Search,        loadChildren: () => import(`@firefly/page/search`).then(m        => m.ModulePageSearch) },
    { path: Pages.Subscriptions, loadChildren: () => import(`@firefly/page/subscriptions`).then(m => m.ModulePageSubscriptions)},
    { path: Pages.AssetEvent,    loadChildren: () => import(`@firefly/page/asset-event`).then(m   => m.ModulePageAssetEvent)},
    { path: Pages.User,          loadChildren: () => import(`@firefly/page/user`).then(m          => m.ModulePageUser) }
];

@NgModule
({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class ModuleRoutingApp {}
