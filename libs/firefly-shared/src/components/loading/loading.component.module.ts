
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentLoading } from './loading.component';
import { IonicModule } from '@ionic/angular';

@NgModule
({
    imports:
    [
        CommonModule,
        IonicModule
    ],

    declarations :
    [
        ComponentLoading,
    ],

    exports:
    [
        ComponentLoading
    ]
})
export class ModuleComponentLoading { }
