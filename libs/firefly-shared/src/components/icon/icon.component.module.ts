import { NgModule } from '@angular/core';

import { ComponentIcon } from './icon.component';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule
({
    imports:
    [
        CommonModule,
        IonicModule,
        FontAwesomeModule
    ],

    declarations: [ComponentIcon],
    exports: [ComponentIcon]
})
export class ModuleComponentIcon { }
