import {NgModule} from '@angular/core';

import {IonicPageModule} from 'ionic-angular';

import {TranslateModule} from '@ngx-translate/core';

import {FFIcon} from '../../app/directives/icon/icon';

import {PageStream} from './stream.page';

@NgModule
({
    imports :
    [
        TranslateModule,
        IonicPageModule.forChild(PageStream)
    ],

    declarations :
    [
        FFIcon,

        PageStream
    ]
})

export class ModulePageStream
{

}
