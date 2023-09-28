import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Pages } from '@firefly/shared';

export const routes: Routes = [
  { path: '', redirectTo: '/auth', pathMatch: 'full' },

  {
    path: Pages.Auth,
    loadChildren: () => import('@firefly/mobile').then((m) => m.ModulePageAuth)
  },
  {
    path: Pages.Home,
    loadChildren: () => import('@firefly/mobile').then((m) => m.ModulePageHome)
  },
  {
    path: Pages.Calendar,
    loadChildren: () =>
      import('@firefly/mobile').then((m) => m.ModulePageCalendar)
  },

  {
    path: Pages.AssetsInterests,
    loadChildren: () =>
      import('@firefly/mobile').then((m) => m.ModulePageAssetsInterestsRoute)
  },
  {
    path: Pages.AssetInterest,
    loadChildren: () =>
      import('@firefly/mobile').then((m) => m.ModulePageAssetInterest)
  },
  {
    path: Pages.AssetsEvents,
    loadChildren: () =>
      import('@firefly/mobile').then((m) => m.ModulePageAssetsEventsRoute)
  },
  {
    path: Pages.EventDetail,
    loadChildren: () =>
      import('@firefly/mobile').then((m) => m.ModulePageEventDetail)
  },

  {
    path: Pages.EventSelector,
    loadChildren: () =>
      import('@firefly/mobile').then((m) => m.ModulePageEventSelector)
  },
  {
    path: Pages.NotificationDetail,
    loadChildren: () =>
      import('@firefly/mobile').then((m) => m.ModulePageNotificationDetail)
  },
  {
    path: Pages.InterestDetail,
    loadChildren: () =>
      import('@firefly/mobile').then((m) => m.ModulePageInterestDetail)
  },
  {
    path: Pages.UserProfile,
    loadChildren: () =>
      import('@firefly/mobile').then((m) => m.ModulePageUserProfile)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class ModuleRoutingApp {}
