import { NgModule } from '@angular/core';
import { RouteReuseStrategy } from '@angular/router';
import { IonicRouteStrategy } from '@ionic/angular';

import { CoreModule } from './core/core.module';
import { SharedModule } from './features/shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

/*
  Old ionic pro cordova variables

  "cordova-plugin-ionic": {
    "APP_ID": "1e5146ca",
    "CHANNEL_NAME": "Master",
    "UPDATE_METHOD": "background",
    "MAX_STORE": "2",
    "UPDATE_API": "https://api.ionicjs.com"
  }
*/

@NgModule({
  imports: [CoreModule, SharedModule, AppRoutingModule],

  declarations: [AppComponent],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent]
})
export class AppModule {}
