import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { ModuleDirectiveElevation } from '@theory/google';
import { ModulePipeTimestamp } from '@theory/firebase';
import { ModuleComponentButtonAction } from '@firefly/shared';

import { ComponentSlide } from './slide.component';

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
        ModuleComponentButtonAction,
        ModulePipeTimestamp
    ],

    declarations : [ComponentSlide],
    exports      : [ComponentSlide]
})
export class ModuleComponentSlide { }
