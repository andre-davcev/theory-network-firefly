import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

export const routes: Routes =
[
    { path: '', redirectTo: '/login', pathMatch: 'full' },

    { path: 'login', loadChildren: '@firefly/app/page/login#ModulePageLogin' },
    { path: 'home',  loadChildren: '@firefly/app/page/home#ModulePageHome' }
];

@NgModule
({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class ModuleRoutingApp {}
