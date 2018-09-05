import { NgModule } from '@angular/core';

import { UIModule } from '@theory/ionic';

const MODULES = [
  UIModule
];

@NgModule({
  imports: [...MODULES],
  exports: [...MODULES]
})
export class ModuleShared {}
