import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { RouteReuseStrategy } from '@angular/router';
import { IonicRouteStrategy, IonicModule } from '@ionic/angular';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';
import { Globalization } from '@ionic-native/globalization/ngx';
import { PhotoLibrary } from '@ionic-native/photo-library/ngx'
import { Firebase } from '@ionic-native/firebase/ngx';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppCoreModule } from '@theory/web';
import { StateLanguage, StateLocation, StateDevice} from '@theory/capacitor';
import {
  StateUser,
  FirebaseEnvironment,
  MapboxEnvironment
} from '@firefly/core';
import { StateNotifications } from '@firefly/mobile';
import { environment } from '@firefly/app/env';
import { Camera } from '@ionic-native/camera/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { StateMobile } from '@firefly/mobile';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';

@NgModule
({
    imports :
    [
        BrowserAnimationsModule,
        AppCoreModule,
        IonicModule.forRoot
        ({
            swipeBackEnabled: false,
            scrollAssist: true,
            scrollPadding: true
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
            StateUser
        ]),

        NgxsReduxDevtoolsPluginModule.forRoot({disabled: environment.production}),
        NgxsRouterPluginModule.forRoot(),
        NgxsFormPluginModule.forRoot(),
        NgxMapboxGLModule.withConfig({accessToken: environment.apis.mapbox.accessToken}),
//        NgxsLoggerPluginModule.forRoot()
    ],

    providers :
    [
        Globalization,
        Camera,
        Firebase,
        WebView,
        PhotoLibrary,
        { provide: RouteReuseStrategy,  useClass: IonicRouteStrategy },
        { provide: FirebaseEnvironment, useValue: environment.apis.firebase },
        { provide: MapboxEnvironment,   useValue: environment.apis.mapbox }
//        { provide: ErrorHandler,       useClass: ErrorHandlerApp }
    ]
})
export class CoreModule { }
