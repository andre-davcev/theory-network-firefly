import {NgModule} from '@angular/core';

import {IonicPageModule} from 'ionic-angular';

import {PageTutorial} from './tutorial';

@NgModule
({
    declarations : [PageTutorial],
    imports      : [IonicPageModule.forChild(PageTutorial)]
})

export class ModulePageTutorial
{ 

}