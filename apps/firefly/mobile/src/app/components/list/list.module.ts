import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentList } from './list.component';

@NgModule
({
    imports:
    [
        CommonModule,
        IonicModule,
        TranslateModule
    ],

    declarations : [ComponentList],
    exports      : [ComponentList]
})
export class ModuleList { }
