import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { ModuleDirectiveElevation } from '@theory/google';

import { ComponentSlide } from './slide.component';
import { ModuleComponentButtonAction } from '@firefly/core';

@NgModule
({
    imports:
    [
        CommonModule,
        IonicModule,
        FlexLayoutModule,
        RouterModule,
        TranslateModule,
        ModuleDirectiveElevation,
        ModuleComponentButtonAction
    ],

    declarations : [ComponentSlide],
    exports      : [ComponentSlide]
})
export class ModuleComponentSlide { }
