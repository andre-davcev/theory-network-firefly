import { Routes } from '@angular/router';

import { PageAssetCluster } from './asset-cluster.page';
import { Pages } from '../pages.enum';

export const RoutesPageAssetCluster: Routes =
[
    { path: '', component : PageAssetCluster },

    { path: Pages.IconSelector,  loadChildren: '@firefly/page/icon-selector#ModulePageIconSelector' },
    { path: Pages.ImageSelector, loadChildren: '@firefly/page/image-selector#ModulePageImageSelector' }
];
