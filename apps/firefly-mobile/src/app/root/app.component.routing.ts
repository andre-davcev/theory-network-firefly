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
    path: Pages.Tabs,
    loadChildren: () => import('@firefly/mobile').then((m) => m.ModulePageTabs)
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
