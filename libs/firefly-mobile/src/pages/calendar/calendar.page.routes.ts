import { Routes } from '@angular/router';

import { PageCalendar } from './calendar.page';
import { ResolverPageCalendar } from './calendar.page.resolver';

export const RoutesPageCalendar: Routes = [
  {
    path: '',
    component: PageCalendar,
    resolve: { loader: ResolverPageCalendar }
  }
];
