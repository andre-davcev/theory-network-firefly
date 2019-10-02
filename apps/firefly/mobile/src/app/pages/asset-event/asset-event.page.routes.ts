import { Routes } from '@angular/router';

import { PageAssetEvent } from './asset-event.page';
import { ResolverPageAssetEvent } from './asset-event.page.resolver';

export const RoutesPageAssetEvent: Routes =
[
    { path: ':id', component : PageAssetEvent, resolve: { loader: ResolverPageAssetEvent } }
];
