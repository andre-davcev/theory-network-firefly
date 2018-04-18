import {NgModule} from '@angular/core';

import {TranslateModule} from '@ngx-translate/core';

import {IonicPageModule} from 'ionic-angular';

import {PageFindStream} from './find.stream';

@NgModule
({
    imports :
    [
        TranslateModule,
        IonicPageModule.forChild(PageFindStream)
    ],
    
    declarations : [PageFindStream]
})

export class ModulePageFindStream
{ 

}