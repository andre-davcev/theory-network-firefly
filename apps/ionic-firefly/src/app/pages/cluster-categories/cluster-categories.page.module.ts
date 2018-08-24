import {NgModule} from '@angular/core';

import {TranslateModule} from '@ngx-translate/core';

import {IonicPageModule} from 'ionic-angular';

import {PagePublisherClusterCategories} from './cluster-categories.page';

@NgModule
({
    imports :
    [
        IonicPageModule.forChild(PagePublisherClusterCategories),
        TranslateModule
    ],

    declarations :
    [
        PagePublisherClusterCategories
    ]
})

export class ModulePagePublisherCluster
{

}
