import { NgModule } from '@angular/core';

import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

const modules =
[
    CommonModule,
    TranslateModule,
    IonicModule
];

@NgModule
({
    imports : modules,
    exports : modules
})

export class ModulePage { }
