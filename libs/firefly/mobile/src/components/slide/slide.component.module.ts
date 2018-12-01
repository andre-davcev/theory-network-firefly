import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { ComponentSlide } from './slide.component';
import { ModuleComponentItemMap } from '../item-map';

@NgModule
({
    imports:
    [
        CommonModule,
        IonicModule,
        FlexLayoutModule,
        RouterModule,
        TranslateModule,
        ModuleComponentItemMap
    ],

    declarations : [ComponentSlide],
    exports      : [ComponentSlide]
})
export class ModuleComponentSlide { }
