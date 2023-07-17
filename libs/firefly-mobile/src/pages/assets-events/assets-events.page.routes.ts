import { Routes } from '@angular/router';

import { PageAssetsEvents } from './assets-events.page';
import { ResolverPageAssetsEvents } from './assets-events.page.resolver';

export const RoutesPageAssetsEvents: Routes = [
  {
    path: '',
    component: PageAssetsEvents,
    resolve: { loader: ResolverPageAssetsEvents }
  }
];
