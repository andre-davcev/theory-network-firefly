import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import { ComponentIconMessage } from './icon-message.component';

@NgModule
({
    imports:
    [
        CommonModule,
        FlexLayoutModule
    ],
    declarations: [ComponentIconMessage],
    exports: [ComponentIconMessage]
})
export class ModuleComponentIconMessage { }
