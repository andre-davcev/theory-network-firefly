import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NavComponentModule } from '@firefly/web';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.component.routing';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NavComponentModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
