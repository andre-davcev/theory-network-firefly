import { NgModule } from '@angular/core';

import { ComponentTutorial } from './tuturial.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ModuleDirectiveElevation } from '@theory/google';
import { ModuleComponentParagraph } from '@theory/core';

import { ModuleComponentButtonAction } from '../button-action';

@NgModule
({
    imports:
    [
        CommonModule,
        FlexLayoutModule,
        IonicModule,
        ModuleDirectiveElevation,
        ModuleComponentParagraph,
        ModuleComponentButtonAction
    ],
    declarations: [ComponentTutorial],
    exports: [ComponentTutorial]
})
export class ModuleComponentTutorial { }
