import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

export const routes: Routes =
[
    { path: '', redirectTo: '/login', pathMatch: 'full' },

    { path: 'login', loadChildren: './pages/login/login.page.module#ModulePageLogin' },
    { path: 'home',  loadChildren: './pages/home/home.page.module#ModulePageHome' }
];

@NgModule
({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class ModuleRoutingApp {}
