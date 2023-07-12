import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { ModuleDirectiveElevation } from '@theory/google';

import { ModuleComponentIcon } from '../icon/icon.component.module';
import { ComponentIconMessage } from './icon-message.component';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    ModuleComponentIcon,
    ModuleDirectiveElevation
  ],
  declarations: [ComponentIconMessage],
  exports: [ComponentIconMessage]
})
export class ModuleComponentIconMessage {}
