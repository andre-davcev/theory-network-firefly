import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

const modules =
[
    CommonModule,
    TranslateModule,
    FlexLayoutModule,
    IonicModule
];

@NgModule
({
    imports : modules,
    exports : modules
})

export class ModulePage { }
