import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { ComponentLogo } from './logo.component';
import { ModuleComponentIconFirefly } from '../icon-firefly';

@NgModule
({
    imports:
    [
        CommonModule,
        TranslateModule,
        FlexLayoutModule,
        ModuleComponentIconFirefly
    ],
    declarations: [ComponentLogo],
    exports: [ComponentLogo]
})
export class ModuleComponentLogo { }
