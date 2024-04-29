import { Routes } from '@angular/router';

import { Pages } from '@firefly/shared';

import { PageTabs } from './tabs.page';
import { ResolverPageTabs } from './tabs.page.resolver';

export const RoutesPageTabs: Routes = [
  {
    path: '',
    component: PageTabs,
    resolve: { loader: ResolverPageTabs },
    children: [
      {
        path: Pages.Events,
        loadChildren: () => import('../events').then((m) => m.ModulePageEvents)
      },
      {
        path: `${Pages.Events}/${Pages.AssetsEvents}`,
        loadChildren: () =>
          import('@firefly/mobile').then((m) => m.ModulePageAssetsEventsRoute)
      },
      {
        path: `${Pages.Events}/${Pages.EventDetail}`,
        loadChildren: () =>
          import('@firefly/mobile').then((m) => m.ModulePageAssetsEventsRoute)
      },

      {
        path: Pages.Lists,
        loadChildren: () => import('../lists').then((m) => m.ModulePageLists)
      },
      {
        path: `${Pages.Lists}/${Pages.EventDetail}`,
        loadChildren: () =>
          import('@firefly/mobile').then((m) => m.ModulePageAssetsEventsRoute)
      },
      {
        path: `${Pages.Lists}/${Pages.AssetsInterests}`,
        loadChildren: () =>
          import('@firefly/mobile').then(
            (m) => m.ModulePageAssetsInterestsRoute
          )
      },
      {
        path: `${Pages.Lists}/${Pages.AssetInterest}`,
        loadChildren: () =>
          import('@firefly/mobile').then((m) => m.ModulePageAssetInterest)
      },
      {
        path: `${Pages.Lists}/${Pages.InterestDetail}`,
        loadChildren: () =>
          import('@firefly/mobile').then((m) => m.ModulePageInterestDetail)
      },
      {
        path: `${Pages.Lists}/${Pages.EventSelector}`,
        loadChildren: () =>
          import('@firefly/mobile').then((m) => m.ModulePageEventSelector)
      },

      {
        path: Pages.Notifications,
        loadChildren: () =>
          import('../notifications').then((m) => m.ModulePageNotifications)
      },
      {
        path: `${Pages.Notifications}/${Pages.EventDetail}`,
        loadChildren: () =>
          import('@firefly/mobile').then((m) => m.ModulePageAssetsEventsRoute)
      },

      {
        path: Pages.Calendar,
        loadChildren: () =>
          import('../calendar').then((m) => m.ModulePageCalendar)
      },
      {
        path: `${Pages.Calendar}/${Pages.NotificationDetail}`,
        loadChildren: () =>
          import('@firefly/mobile').then((m) => m.ModulePageNotificationDetail)
      },
      {
        path: `${Pages.Calendar}/${Pages.EventDetail}`,
        loadChildren: () =>
          import('@firefly/mobile').then((m) => m.ModulePageAssetsEventsRoute)
      },

      {
        path: '',
        redirectTo: `/${Pages.Tabs}/${Pages.Events}`,
        pathMatch: 'full'
      }
    ]
  }
];
