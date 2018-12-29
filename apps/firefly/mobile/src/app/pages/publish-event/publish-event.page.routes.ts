import { Routes } from '@angular/router';

import { PagePublishEvent } from './publish-event.page';
import { Pages } from '../pages.enum';

export const RoutesPagePublishEvent: Routes =
[
    { path: '', component : PagePublishEvent },

    { path: Pages.ImageSelector, loadChildren: '@firefly/page/image-selector#ModulePageImageSelector' }
];
