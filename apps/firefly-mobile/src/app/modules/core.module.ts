import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouteReuseStrategy, RouterModule } from '@angular/router';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
// import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { IonicRouteStrategy, IonicModule } from '@ionic/angular';
import { Calendar } from '@ionic-native/calendar/ngx';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';

import { MapboxEnvironment } from '@theory/mapbox';
import { FirebaseEnvironment, StateStorage  } from '@theory/firebase';
import { StateLanguage, StateLocation, StateDevice } from '@theory/capacitor';
import {
  StateUser,
  StateInterest,
  StateEvent,
  StateSubscription,
  StateUserAlerts,
  StateUserInterests,
  StateUserEvents,
  StateCityStream,
  StateUserSubscriptions,
  StateUserProfile, StateCity, StateApp, StateAlerts, StateInterests, StateCalendar,
  StateNotifications, StateSearch
} from '@firefly/shared';
import { StateMobile } from '@firefly/mobile';

import { environment } from '../../environments/environment';

export function createTranslateLoader(http: HttpClient)
{
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule
({
    imports :
    [
        RouterModule,
        ReactiveFormsModule,

        BrowserModule,
        HttpClientModule,
        BrowserAnimationsModule,

        TranslateModule.forRoot
        ({
            defaultLanguage: 'en',
            loader:
            {
                provide:    TranslateLoader,
                useFactory: (createTranslateLoader),
                deps:       [HttpClient]
            }
        }),

        IonicModule.forRoot
        ({
            swipeBackEnabled: false,
            scrollAssist:     true,
            scrollPadding:    true
        }),

        AngularFireModule.initializeApp(environment.apis.firebase),
        AngularFireAuthModule,
        AngularFirestoreModule,
        AngularFireStorageModule,

        NgxsModule.forRoot
        ([
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
        NgxsReduxDevtoolsPluginModule.forRoot({disabled: environment.production}),
        // NgxsLoggerPluginModule.forRoot(),

        NgxMapboxGLModule.withConfig({accessToken: environment.apis.mapbox.accessToken})
    ],

    providers :
    [
        { provide: RouteReuseStrategy,  useClass: IonicRouteStrategy },
        { provide: FirebaseEnvironment, useValue: environment.apis.firebase },
        { provide: MapboxEnvironment,   useValue: environment.apis.mapbox },
        Calendar,
        CallNumber,
        // { provide: ErrorHandler,       useClass: ErrorHandlerApp }
    ]
})
export class CoreModule { }
