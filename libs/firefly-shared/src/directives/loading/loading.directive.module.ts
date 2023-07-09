import { NgModule } from '@angular/core';

import { ModuleComponentLoading } from '../../components';
import { DirectiveLoading } from './loading.directive';

@NgModule({
  imports: [ModuleComponentLoading],
  declarations: [DirectiveLoading],
  exports: [DirectiveLoading]
})
export class ModuleDirectiveLoading {}
