import { Routes } from '@angular/router';

import { PageAssetInterest } from './asset-interest.page';
import { ResolverPageAssetInterest } from './asset-interest.page.resolver';

export const RoutesPageAssetInterest: Routes =
[
    { path: '', component : PageAssetInterest, resolve: { loader: ResolverPageAssetInterest } }
];
