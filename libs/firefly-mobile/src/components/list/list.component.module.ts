import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';

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
export class ModuleComponentList { }
