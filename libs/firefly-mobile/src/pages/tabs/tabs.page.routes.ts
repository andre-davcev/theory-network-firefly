import { Routes } from '@angular/router';

import { Pages } from '../../../../firefly-shared/src';
import { PageTabs } from './tabs.page';
import { ResolverPageTabs } from './tabs.page.resolver';

export const RoutesPageTabs: Routes = [
  {
    path: '',
    component: PageTabs,
    resolve: { loader: ResolverPageTabs },
    children: [
      {
        path: Pages.Lists,
        loadChildren: () => import('../stream').then((m) => m.ModulePageStream)
      },
      {
        path: '',
        redirectTo: `/${Pages.Tabs}/${Pages.Lists}`,
        pathMatch: 'full'
      }
    ]
  }
];
