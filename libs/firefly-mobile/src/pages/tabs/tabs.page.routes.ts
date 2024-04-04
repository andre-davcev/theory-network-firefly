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
        loadChildren: () => import('../lists').then((m) => m.ModulePageLists)
      },
      {
        path: `${Pages.Events}/${Pages.AssetsEvents}`,
        loadChildren: () =>
          import('@firefly/mobile').then((m) => m.ModulePageAssetsEventsRoute)
      },
      {
        path: Pages.Lists,
        loadChildren: () => import('../lists').then((m) => m.ModulePageLists)
      },
      {
        path: Pages.Notifications,
        loadChildren: () =>
          import('../notifications').then((m) => m.ModulePageNotifications)
      },
      {
        path: Pages.Calendar,
        loadChildren: () =>
          import('../calendar').then((m) => m.ModulePageCalendar)
      },
      {
        path: '',
        redirectTo: `/${Pages.Tabs}/${Pages.Events}`,
        pathMatch: 'full'
      }
    ]
  }
];
