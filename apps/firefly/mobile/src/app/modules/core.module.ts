import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { RouteReuseStrategy } from '@angular/router';
import { IonicRouteStrategy } from '@ionic/angular';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';
import { Globalization } from '@ionic-native/globalization/ngx';
import { Firebase } from '@ionic-native/firebase/ngx';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppIonicCoreModule } from '@theory/ionic';
import { StateLanguage, StateLocation, StateDevice } from '@theory/capacitor';
import { StateUser, StateCluster, StatePlaces, StateIcons, StateSubscriptions, StateAlerts } from '@firefly/core';
import { StateNotifications } from '@firefly/mobile';
import { environment } from '@firefly/app/env';
import { PhotoLibrary } from '@ionic-native/photo-library';

/*
Pro.init('1e5146ca',
{
    appVersion: '1.0.0'
});
*/

@NgModule
({
    imports :
    [
        BrowserAnimationsModule,
        AppIonicCoreModule,

        AngularFireModule.initializeApp(environment.apis.firebase),
        AngularFireAuthModule,
        AngularFirestoreModule,
        AngularFireStorageModule,

        NgxsModule.forRoot
        ([
            StateLanguage,
            StateLocation,
            StateDevice,
            StateUser,
            StateAlerts,
            StateNotifications,
            StateCluster,
            StatePlaces,
            StateIcons,
            StateSubscriptions
        ]),

        NgxsReduxDevtoolsPluginModule.forRoot({disabled: environment.production}),
        NgxsRouterPluginModule.forRoot(),
        NgxMapboxGLModule.withConfig({accessToken: environment.apis.mapbox.accessToken})
    ],

    providers :
    [
        Globalization,
        PhotoLibrary,
        Firebase,
        { provide: RouteReuseStrategy,    useClass: IonicRouteStrategy },
        { provide: 'FirebaseEnvironment', useValue: environment.apis.firebase },
        { provide: 'PlacesEnvironment',   useValue: environment.apis.places },
        { provide: 'MapboxEnvironment',   useValue: environment.apis.mapbox }
//        { provide: ErrorHandler,       useClass: ErrorHandlerApp }
    ]
})
export class CoreModule {}
