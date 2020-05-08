import { Routes } from '@angular/router';

import { PageCategories } from './categories.page';
import { ResolverPageCategories } from './categories.page.resolver';

export const RoutesPageCategories: Routes =
[
    { path : '', component : PageCategories, resolve: { loader: ResolverPageCategories } }
];
