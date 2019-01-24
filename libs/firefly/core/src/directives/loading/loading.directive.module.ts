import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentLoading } from './loading.component';
import { DirectiveLoading } from './loading.directive';
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
        DirectiveLoading
    ],

    entryComponents:
    [
        ComponentLoading
    ],

    exports:
    [
        ComponentLoading,
        DirectiveLoading
    ]
})
export class ModuleDirectiveLoading { }
