import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Pages } from '@firefly/mobile';

export const routes: Routes = [
  { path: '', redirectTo: '/auth', pathMatch: 'full' },

  {
    path: Pages.Auth,
    loadChildren: () => import('../pages').then((m) => m.ModulePageAuth)
  },
  {
    path: Pages.Home,
    loadChildren: () => import('../pages').then((m) => m.ModulePageHome)
  },
  {
    path: Pages.Calendar,
    loadChildren: () => import('../pages').then((m) => m.ModulePageCalendar)
  },

  {
    path: Pages.AssetsInterests,
    loadChildren: () =>
      import('../pages').then((m) => m.ModulePageAssetsInterestsRoute)
  },
  {
    path: Pages.AssetInterest,
    loadChildren: () =>
      import('../pages').then((m) => m.ModulePageAssetInterest)
  },
  {
    path: Pages.AssetsEvents,
    loadChildren: () =>
      import('../pages').then((m) => m.ModulePageAssetsEventsRoute)
  },
  {
    path: Pages.EventDetail,
    loadChildren: () => import('../pages').then((m) => m.ModulePageEventDetail)
  },

  {
    path: Pages.EventSelector,
    loadChildren: () =>
      import('../pages').then((m) => m.ModulePageEventSelector)
  },
  {
    path: Pages.NotificationDetail,
    loadChildren: () =>
      import('../pages').then((m) => m.ModulePageNotificationDetail)
  },
  {
    path: Pages.InterestDetail,
    loadChildren: () =>
      import('../pages').then((m) => m.ModulePageInterestDetail)
  },
  {
    path: Pages.UserProfile,
    loadChildren: () => import('../pages').then((m) => m.ModulePageUserProfile)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class ModuleRoutingApp {}
