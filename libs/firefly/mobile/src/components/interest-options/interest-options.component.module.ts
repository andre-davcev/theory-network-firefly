import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslateModule } from '@ngx-translate/core';

import { ComponentInterestOptions } from './interest-options.component';

@NgModule
({
    imports:
    [
        CommonModule,
        IonicModule,
        FlexLayoutModule,
        TranslateModule
    ],

    declarations : [ComponentInterestOptions],
    exports      : [ComponentInterestOptions]
})
export class ModuleComponentInterestOptions { }
