import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import { ModuleDirectiveElevation } from '@theory/google';

import { ComponentIconMessage } from './icon-message.component';
import { ModuleComponentIcon } from '../icon/icon.component.module';

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
