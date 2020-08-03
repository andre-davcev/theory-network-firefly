import { NgModule } from '@angular/core';

import { ComponentTutorial } from './tutorial.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { ModuleComponentButtonAction } from '../button-action';

@NgModule
({
    imports:
    [
        CommonModule,
        FlexLayoutModule,
        IonicModule,
        ModuleComponentButtonAction
    ],
    declarations: [ComponentTutorial],
    exports: [ComponentTutorial]
})
export class ModuleComponentTutorial { }
