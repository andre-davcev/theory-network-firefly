import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

export const routes: Routes =
[
    { path: '', redirectTo: '/auth', pathMatch: 'full' },

    { path: 'auth', loadChildren: './pages/auth/auth.page.module#ModulePageLogin' },
    { path: 'home', loadChildren: './pages/home/home.page.module#ModulePageHome' }
];

@NgModule
({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class ModuleRoutingApp {}
