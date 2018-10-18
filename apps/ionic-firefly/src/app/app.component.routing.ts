import { Routes } from '@angular/router';

export const RoutesAppComponent: Routes =
[
    { path: '', redirectTo: '/login', pathMatch: 'full' },

    { path: 'login', loadChildren: '@firefly/app#ModulePageLogin' },
    { path: 'home',  loadChildren: '@firefly/app#ModulePageHome' }
];
