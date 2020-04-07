import { Routes } from '@angular/router';

import { PageAssetsIcons } from './assets-icons.page';
import { ResolverPageAssetsIcons } from './assets-icons.page.resolver';

export const RoutesPageAssetsIcons: Routes =
[
    { path : '', component : PageAssetsIcons, resolve: { loader: ResolverPageAssetsIcons } }
];
