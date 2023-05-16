import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Page } from './shared';

export const routes: Routes =
[
    { path: Page.Home, loadChildren: () => import('./pages').then(m => m.HomeComponentModule) },
    { path: Page.Unknown, redirectTo: Page.Home}
];

@NgModule
({
    imports: [RouterModule.forRoot(routes, { initialNavigation: 'enabledBlocking' })],
    exports: [RouterModule]
})
export class AppRoutingModule {}
