import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ComponentItemImage } from './item-image.component';

@NgModule
({
    imports :
    [
        CommonModule,
        FlexLayoutModule,
        ReactiveFormsModule,
        IonicModule
    ],

    declarations : [ComponentItemImage],
    exports      : [ComponentItemImage]
})
export class ModuleComponentItemImage { }
