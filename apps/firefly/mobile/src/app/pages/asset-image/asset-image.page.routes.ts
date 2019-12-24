import { Routes } from '@angular/router';

import { PageAssetImage } from './asset-image.page';
import { ResolverPageAssetImage } from './asset-image.page.resolver';

export const RoutesPageAssetImage: Routes =
[
    { path : '', component : PageAssetImage, resolve: { loader: ResolverPageAssetImage } }
];
