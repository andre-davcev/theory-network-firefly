import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Pages } from '@firefly/mobile';

export const routes: Routes =
[
    { path: '', redirectTo: '/auth', pathMatch: 'full' },

    { path: Pages.Auth, loadChildren: '@firefly/page/auth#ModulePageAuth' },
    { path: Pages.Home, loadChildren: '@firefly/page/home#ModulePageHome' },

    { path: Pages.AssetsInterests, loadChildren: '@firefly/page/assets-interests#ModulePageAssetsInterestsRoute' },
    { path: Pages.AssetInterest,    loadChildren: '@firefly/page/asset-interest#ModulePageAssetInterest'},
    { path: Pages.AssetsEvents,     loadChildren: '@firefly/page/assets-events#ModulePageAssetsEventsRoute' },
    { path: Pages.AssetEvent,       loadChildren: '@firefly/page/asset-event#ModulePageAssetEvent' },
    // { path: Pages.AssetsBeacons,  loadChildren: '@firefly/page/assets-beacons#ModulePageAssetsBeacons' },

    { path: Pages.AlertsList,    loadChildren: '@firefly/page/alerts-list#ModulePageAlertsList' },
    { path: Pages.AlertDetail,   loadChildren: '@firefly/page/alert-detail#ModulePageAlertDetail' },

    { path: Pages.IconSelector,   loadChildren: '@firefly/page/icon-selector#ModulePageIconSelector' },
    { path: Pages.EventSelector,  loadChildren: '@firefly/page/event-selector#ModulePageEventSelector' },

    { path: Pages.EventDetail,  loadChildren: '@firefly/page/event-detail#ModulePageEventDetail' },

    { path: Pages.InterestDetail, loadChildren: '@firefly/page/interest-detail#ModulePageInterestDetail' },

    { path: Pages.UserProfile,    loadChildren: '@firefly/page/user-profile#ModulePageUserProfile' }
];

@NgModule
({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class ModuleRoutingApp {}
