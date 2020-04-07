import { Routes } from '@angular/router';

import { PageAssetsImages } from './assets-images.page';
import { ResolverPageAssetsImages } from './assets-images.page.resolver';

export const RoutesPageAssetsImages: Routes =
[
    { path : '', component : PageAssetsImages, resolve: { loader: ResolverPageAssetsImages } }
];
