import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Pages } from '@firefly/mobile';

export const routes: Routes =
[
    { path: '', redirectTo: '/auth', pathMatch: 'full' },

    { path: Pages.Auth, loadChildren: '@firefly/page/auth#ModulePageAuth' },
    { path: Pages.Home, loadChildren: '@firefly/page/home#ModulePageHome' },

    { path: Pages.Publisher,      loadChildren: '@firefly/page/publisher#ModulePagePublisher' },
    { path: Pages.AssetsBeacons,  loadChildren: '@firefly/page/assets-beacons#ModulePageAssetsBeacons' },
    { path: Pages.AssetsInterests, loadChildren: '@firefly/page/assets-interests#ModulePageAssetsInterestsRoute' },
    { path: Pages.AssetInterest,   loadChildren: '@firefly/page/asset-interest#ModulePageAssetInterest'},
    { path: Pages.AssetsCoupons,  loadChildren: '@firefly/page/assets-coupons#ModulePageAssetsCoupons' },
    { path: Pages.AssetsEvents,   loadChildren: '@firefly/page/assets-events#ModulePageAssetsEventsRoute' },
    { path: Pages.AssetsIcons,    loadChildren: '@firefly/page/assets-icons#ModulePageAssetsIcons' },
    { path: Pages.AssetIcon,      loadChildren: '@firefly/page/asset-icon#ModulePageAssetIcon' },
    { path: Pages.AssetsImages,   loadChildren: '@firefly/page/assets-images#ModulePageAssetsImages' },
    { path: Pages.AssetImage,     loadChildren: '@firefly/page/asset-image#ModulePageAssetImage' },
    { path: Pages.AssetsPlaces,   loadChildren: '@firefly/page/assets-places#ModulePageAssetsPlaces' },

    { path: Pages.IconSelector,   loadChildren: '@firefly/page/icon-selector#ModulePageIconSelector' },
    //{ path: Pages.ImageSelector,   loadChildren: '@firefly/page/image-selector#ModulePageImageSelector' },

    { path: Pages.AlertsList,    loadChildren: '@firefly/page/alerts-list#ModulePageAlertsList' },
    { path: Pages.AlertDetail,   loadChildren: '@firefly/page/alert-detail#ModulePageAlertDetail' },

    { path: Pages.Search,        loadChildren: '@firefly/page/search#ModulePageSearch' },
    { path: Pages.Subscriptions, loadChildren: '@firefly/page/subscriptions#ModulePageSubscriptions' },
    { path: Pages.AssetEvent,    loadChildren: '@firefly/page/asset-event#ModulePageAssetEvent' },
    { path: Pages.User,          loadChildren: '@firefly/page/user#ModulePageUser' }

];

@NgModule
({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class ModuleRoutingApp {}
