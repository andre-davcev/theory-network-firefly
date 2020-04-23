import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentItemEvents } from './item-events.component';
import { IonicModule } from '@ionic/angular';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule
({
    imports :
    [
        CommonModule,
        IonicModule,
        FlexLayoutModule
    ],

    declarations : [ComponentItemEvents],
    exports      : [ComponentItemEvents]
})
export class ModuleComponentItemEvents { }
