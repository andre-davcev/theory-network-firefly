import { Routes } from '@angular/router';

import { Pages } from '@firefly/shared';
import { PageListDetail } from './list-detail.page';
import { ResolverPageListDetail } from './list-detail.page.resolver';

export const RoutesPageListDetail: Routes = [
  {
    path: '',
    component: PageListDetail,
    resolve: { loader: ResolverPageListDetail }
  },
  {
    path: `${Pages.NotificationDetail}`,
    loadChildren: () =>
      import('@firefly/mobile').then((m) => m.ModulePageNotificationDetail)
  },
  {
    path: `${Pages.EventDetail}`,
    loadChildren: () =>
      import('@firefly/mobile').then((m) => m.ModulePageEventDetail)
  }
];
