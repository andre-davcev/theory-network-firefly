import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslateModule } from '@ngx-translate/core';

import { ComponentHomeOptions } from './home-options.component';

@NgModule
({
    imports:
    [
        CommonModule,
        IonicModule,
        FlexLayoutModule,
        TranslateModule
    ],

    declarations : [ComponentHomeOptions],
    exports      : [ComponentHomeOptions]
})
export class ModuleComponentHomeOptions { }
