import {NgModule} from '@angular/core';

import {IonicPageModule} from 'ionic-angular';

import {TranslateModule} from '@ngx-translate/core';

import { PageSearch } from './search.page';

@NgModule
({
    imports :
    [
        TranslateModule,
        IonicPageModule.forChild(PageSearch)
    ],

    declarations :
    [
        PageSearch
    ]
})

export class ModulePageSearch
{

}
