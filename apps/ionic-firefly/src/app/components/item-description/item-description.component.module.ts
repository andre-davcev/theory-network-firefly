import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentItemDescription } from './item-description.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@NgModule
({
    imports :
    [
        CommonModule,
        FlexLayoutModule,
        ReactiveFormsModule,
        IonicModule
    ],

    declarations : [ComponentItemDescription],
    exports      : [ComponentItemDescription]
})
export class ModuleItemDescription { }
