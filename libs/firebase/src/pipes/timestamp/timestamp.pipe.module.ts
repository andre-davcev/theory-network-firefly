import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { PipeTimestamp } from './timestamp.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [PipeTimestamp],
  exports: [PipeTimestamp],
  providers: [DatePipe]
})
export class ModulePipeTimestamp {}
