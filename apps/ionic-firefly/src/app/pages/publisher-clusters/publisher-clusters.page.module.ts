import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { ModuleComponentList } from '../../components/list/list.component.module';
import { PagePublisherClusters } from './publisher-clusters.page';

@NgModule
({
    imports :
    [
        TranslateModule,
        ModuleComponentList
    ],

    declarations : [PagePublisherClusters]
})

export class ModulePagePublisherClusters
{

}
