import { Routes } from '@angular/router';

import { Pages } from '@firefly/mobile';

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
        loadChildren: () =>
          import('../../pages').then((m) => m.ModulePageStream)
      },
      {
        path: Pages.Notifications,
        loadChildren: () =>
          import('../../pages').then((m) => m.ModulePageNotifications)
      }
    ]
  }
];
