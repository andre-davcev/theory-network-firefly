import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HomeIconComponentModule, NavComponentModule } from '@firefly/web';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.component.routing';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HomeIconComponentModule,
    NavComponentModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
