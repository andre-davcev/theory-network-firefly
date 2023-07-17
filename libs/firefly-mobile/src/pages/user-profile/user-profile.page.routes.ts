import { Routes } from '@angular/router';

import { PageUserProfile } from './user-profile.page';
import { ResolverPageUserProfile } from './user-profile.page.resolver';

export const RoutesPageUserProfile: Routes = [
  {
    path: '',
    component: PageUserProfile,
    resolve: { loader: ResolverPageUserProfile }
  }
];
