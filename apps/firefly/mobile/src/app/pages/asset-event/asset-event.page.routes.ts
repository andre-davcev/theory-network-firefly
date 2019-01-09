import { Routes } from '@angular/router';

import { PageAssetEvent } from './asset-event.page';
import { Pages } from '../pages.enum';

export const RoutesPageAssetEvent: Routes =
[
    { path: '', component : PageAssetEvent },

    { path: Pages.Clusters,      loadChildren: '@firefly/page/assets-clusters#ModulePageAssetsClusters' },
    { path: Pages.ImageSelector, loadChildren: '@firefly/page/image-selector#ModulePageImageSelector' }
];
