import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Pages } from '@firefly/mobile';
import { ModulePageAssetInterest, ModulePageAssetsEventsRoute, ModulePageAssetsInterestsRoute, ModulePageAuth, ModulePageCalendar, ModulePageEventDetail, ModulePageEventSelector, ModulePageHome, ModulePageNotificationDetail, ModulePageUserProfile, ModulePageInterestDetail } from '@firefly/page';

export const routes: Routes =
[
    { path: '', redirectTo: '/auth', pathMatch: 'full' },

    { path: Pages.Auth,     loadChildren: () => import('@firefly/page').then(m => ModulePageAuth) },
    { path: Pages.Home,     loadChildren: () => import('@firefly/page').then(m => ModulePageHome) },
    { path: Pages.Calendar, loadChildren: () => import('@firefly/page').then(m => ModulePageCalendar) },

    { path: Pages.AssetsInterests,  loadChildren: () => import('@firefly/page').then(m => ModulePageAssetsInterestsRoute) },
    { path: Pages.AssetInterest,    loadChildren: () => import('@firefly/page').then(m => ModulePageAssetInterest) },
    { path: Pages.AssetsEvents,     loadChildren: () => import('@firefly/page').then(m => ModulePageAssetsEventsRoute) },
    { path: Pages.EventDetail,      loadChildren: () => import('@firefly/page').then(m => ModulePageEventDetail) },

    { path: Pages.EventSelector,      loadChildren: () => import('@firefly/page').then(m => ModulePageEventSelector) },
    { path: Pages.NotificationDetail, loadChildren: () => import('@firefly/page').then(m => ModulePageNotificationDetail) },
    { path: Pages.InterestDetail,     loadChildren: () => import('@firefly/page').then(m => ModulePageInterestDetail) },
    { path: Pages.UserProfile,        loadChildren: () => import('@firefly/page').then(m => ModulePageUserProfile) }
];

@NgModule
({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class ModuleRoutingApp {}
