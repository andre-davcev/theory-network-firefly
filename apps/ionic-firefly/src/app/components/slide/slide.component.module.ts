import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FlexLayoutModule } from '@angular/flex-layout';

import { ComponentSlide } from './slide.component';

@NgModule
({
    imports:
    [
        CommonModule,
        IonicModule,
        FlexLayoutModule
    ],

    declarations : [ComponentSlide],
    exports      : [ComponentSlide]
})
export class ModuleComponentSlide { }
