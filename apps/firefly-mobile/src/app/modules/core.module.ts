import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouteReuseStrategy, RouterModule } from '@angular/router';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
import { NgxsModule } from '@ngxs/store';
// import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { Calendar } from '@ionic-native/calendar/ngx';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';

import { StateMobile } from '@firefly/mobile';
import {
  StateAlerts,
  StateApp,
  StateCalendar,
  StateCity,
  StateCityStream,
  StateEvent,
  StateInterest,
  StateInterests,
  StateNotifications,
  StateSearch,
  StateSubscription,
  StateUser,
  StateUserAlerts,
  StateUserEvents,
  StateUserInterests,
  StateUserProfile,
  StateUserSubscriptions
} from '@firefly/shared';
import { StateDevice, StateLanguage, StateLocation } from '@theory/capacitor';
import { FirebaseEnvironment, StateStorage } from '@theory/firebase';
import { MapboxEnvironment } from '@theory/mapbox';

import { LaunchNavigator } from '@ionic-native/launch-navigator/ngx';
import { environment } from '../../environments/environment';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  imports: [
    RouterModule,
    ReactiveFormsModule,

    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,

    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),

    IonicModule.forRoot({
      swipeBackEnabled: false,
      scrollAssist: true,
      scrollPadding: true
    }),

    AngularFireModule.initializeApp(environment.apis.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,

    NgxsModule.forRoot([
      StateDevice,
      StateLocation,
      StateLanguage,
      StateMobile,
      StateNotifications,
      StateSearch,
      StateStorage,

      StateInterest,
      StateEvent,
      StateApp,
      StateSubscription,
      StateUser,
      StateCity,
      StateUserAlerts,
      StateUserInterests,
      StateUserEvents,
      StateCityStream,
      StateUserSubscriptions,
      StateUserProfile,

      StateAlerts,
      StateCalendar,
      StateInterests
    ]),

    NgxsRouterPluginModule.forRoot(),
    NgxsFormPluginModule.forRoot(),
    NgxsReduxDevtoolsPluginModule.forRoot({ disabled: environment.production }),
    // NgxsLoggerPluginModule.forRoot(),

    NgxMapboxGLModule.withConfig({
      accessToken: environment.apis.mapbox.accessToken
    })
  ],

  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: FirebaseEnvironment, useValue: environment.apis.firebase },
    { provide: MapboxEnvironment, useValue: environment.apis.mapbox },
    Calendar,
    CallNumber,
    LaunchNavigator
    // { provide: ErrorHandler,       useClass: ErrorHandlerApp }
  ]
})
export class CoreModule {}
