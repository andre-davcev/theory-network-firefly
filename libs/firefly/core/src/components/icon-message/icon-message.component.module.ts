import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import { ComponentIconMessage } from './icon-message.component';
import { ModuleComponentIcon } from '../icon/icon.component.module';
import { ModuleDirectiveElevation } from '@theory/google';

@NgModule
({
    imports:
    [
        CommonModule,
        FlexLayoutModule,
        ModuleComponentIcon,
        ModuleDirectiveElevation
    ],
    declarations: [ComponentIconMessage],
    exports: [ComponentIconMessage]
})
export class ModuleComponentIconMessage { }
