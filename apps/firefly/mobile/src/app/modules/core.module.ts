import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { RouteReuseStrategy, RouterModule } from '@angular/router';
import { IonicRouteStrategy, IonicModule } from '@ionic/angular';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { StateLanguage, StateLocation, StateDevice } from '@theory/capacitor';
import {
  StateUser,
  FirebaseEnvironment,
  MapboxEnvironment,
  StateInterest,
  StateEvent,
  StateAlert,
  StateIcon,
  StateImage,
  StateSubscription,
  StateUserAlerts,
  StateUserInterests,
  StateUserEvents,
  StateUserIcons,
  StateUserImages,
  StateUserStream,
  StateUserSubscriptions
} from '@firefly/core';
import { StateNotifications } from '@firefly/mobile';
import { environment } from '@firefly/app/env';
import { StateMobile } from '@firefly/mobile';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { StateMap } from '@theory/mapbox';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';
import { StateStorage } from '@theory/firebase';

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
            StateMap,
            StateStorage,

            StateInterest,
            StateEvent,
            StateAlert,
            StateIcon,
            StateImage,
            StateSubscription,
            StateUser,
            StateUserAlerts,
            StateUserInterests,
            StateUserEvents,
            StateUserIcons,
            StateUserImages,
            StateUserStream,
            StateUserSubscriptions
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
        { provide: MapboxEnvironment,   useValue: environment.apis.mapbox }
        // { provide: ErrorHandler,       useClass: ErrorHandlerApp }
    ]
})
export class CoreModule { }
