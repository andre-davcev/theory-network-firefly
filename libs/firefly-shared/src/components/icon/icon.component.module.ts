import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { ComponentIcon } from './icon.component';

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
