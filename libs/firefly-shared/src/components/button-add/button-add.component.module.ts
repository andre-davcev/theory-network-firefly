import { NgModule } from '@angular/core';

import { ComponentButtonAdd } from './button-add.component';
import { IonicModule } from '@ionic/angular';

@NgModule
({
    imports: [IonicModule],
    declarations: [ComponentButtonAdd],
    exports: [ComponentButtonAdd]
})
export class ModuleComponentButtonAdd { }
