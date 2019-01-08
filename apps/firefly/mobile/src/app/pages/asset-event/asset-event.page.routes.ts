import { Routes } from '@angular/router';

import { PageAssetEvent } from './asset-event.page';
import { Pages } from '../pages.enum';

export const RoutesPageAssetEvent: Routes =
[
    { path: '', component : PageAssetEvent },

    { path: Pages.IconSelector,  loadChildren: '@firefly/page/icon-selector#ModulePageIconSelector' },
    { path: Pages.ImageSelector, loadChildren: '@firefly/page/image-selector#ModulePageImageSelector' }
];
