import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentItemEvents } from './item-events.component';
import { IonicModule } from '@ionic/angular';

@NgModule
({
    imports :
    [
        CommonModule,
        IonicModule
    ],

    declarations : [ComponentItemEvents],
    exports      : [ComponentItemEvents]
})
export class ModuleComponentItemEvents { }
