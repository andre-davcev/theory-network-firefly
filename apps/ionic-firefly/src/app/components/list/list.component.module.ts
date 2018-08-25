import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentList } from './list.component';
import { IonicModule } from '@ionic/angular';

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
