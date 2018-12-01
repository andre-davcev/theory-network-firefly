import { Routes } from '@angular/router';

import { PageHome } from './home.page';
import { PagesAssets } from '../publisher-assets';

export const RoutesPageHome: Routes =
[
    {
        path : '',
        component : PageHome,
        children:
        [
            { path: PagesAssets.Events, loadChildren: '@firefly/app/page/assets-events#ModulePageAssetsEvents' }
        ]
    }
];
