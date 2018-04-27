import {NgModule} from '@angular/core';

import {TranslateModule} from '@ngx-translate/core';

import {IonicPageModule} from 'ionic-angular';

import {PagePublisherCluster} from './cluster.page';
import { ModuleComponents } from '../../app/components/components.module';

import { FlexLayoutModule } from '@angular/flex-layout';
import { ModuleItemHeader } from '../../app/components/item-header/item-header.module';
import { ModuleItemMap } from '../../app/components/item-map/item-map.module';
import { ModuleItemDescription } from '../../app/components/item-description/item-description.module';

@NgModule
({
    imports :
    [
        IonicPageModule.forChild(PagePublisherCluster),
        TranslateModule,
        ModuleItemHeader,
        ModuleItemMap,
        ModuleItemDescription
    ],

    declarations :
    [
        PagePublisherCluster
    ]
})

export class ModulePagePublisherCluster
{

}
