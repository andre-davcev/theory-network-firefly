import { Routes } from '@angular/router';

import { PageAssetIcon } from './asset-icon.page';
import { ResolverPageAssetIcon } from './asset-icon.page.resolver';

export const RoutesPageAssetIcon: Routes =
[
    { path : '', component : PageAssetIcon, resolve: { loader: ResolverPageAssetIcon } }
];
