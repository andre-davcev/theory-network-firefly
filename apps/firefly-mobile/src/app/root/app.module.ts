import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ModuleComponentIcon } from '@firefly/shared';

import { CoreModule, ModulePage } from '../modules';
import { ModulePageLogin } from '../pages';
import { ComponentApp } from './app.component';
import { ModuleRoutingApp } from './app.component.routing';

@NgModule({
  imports: [
    CoreModule,
    BrowserAnimationsModule,

    ModulePage,
    ModuleRoutingApp,
    ModuleComponentIcon,
    ModulePageLogin
  ],

  declarations: [ComponentApp],

  bootstrap: [ComponentApp]
})
export class AppModule {}
