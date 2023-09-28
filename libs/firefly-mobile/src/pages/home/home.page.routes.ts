import { Routes } from '@angular/router';

import { Pages } from '@firefly/shared';

import { PageHome } from './home.page';
import { ResolverPageHome } from './home.page.resolver';

export const RoutesPageHome: Routes = [
  {
    path: '',
    component: PageHome,
    resolve: { loader: ResolverPageHome },
    children: [
      { path: '', redirectTo: Pages.Stream, pathMatch: 'full' },

      {
        path: Pages.Stream,
        loadChildren: () => import('../stream').then((m) => m.ModulePageStream)
      },
      {
        path: Pages.Notifications,
        loadChildren: () =>
          import('../notifications').then((m) => m.ModulePageNotifications)
      }
    ]
  }
];
