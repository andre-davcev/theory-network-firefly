import { Routes } from '@angular/router';

import { PagePublisher } from './publisher.page';
import { ResolverPagePublisher } from './publisher.page.resolver';

export const RoutesPagePublisher: Routes =
[
    { path : '', component : PagePublisher, resolve: { loader: ResolverPagePublisher } }
];
