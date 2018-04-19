import {NgModule} from '@angular/core';

import {IonicPageModule} from 'ionic-angular';

import {TranslateModule} from '@ngx-translate/core';

import {FFIcon} from '../../app/directives/icon/icon';

import {PageFind} from './find';

import {PageFindStream}     from '../find.stream/find.stream';
import {PageFindDiscover}   from '../find.discover/find.discover';
import {PageFindCategories} from '../find.categories/find.categories';

@NgModule
({
    imports :
    [
        TranslateModule,
        IonicPageModule.forChild(PageFind)
    ],

    declarations :
    [
        FFIcon,

        PageFind,

        PageFindStream,
        PageFindDiscover,
        PageFindCategories
    ]
})

export class ModulePageFind
{ 

}