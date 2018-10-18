import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
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
//import { Pro } from '@ionic/pro';

import { AppIonicCoreModule } from '@theory/ionic';
import { StateLanguage, StateLocation, StateUser, StateCluster, StatePlaces, StateIcons, StateSubscriptions } from '@firefly/core';
import { StateDevice, StateNotifications } from '@firefly/mobile';

import { environment } from '../../environments/environment';

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

        NgxsModule.forRoot
        ([
            StateLanguage,
            StateLocation,
            StateDevice,
            StateUser,
            StateNotifications,
            StateCluster,
            StatePlaces,
            StateIcons,
            StateSubscriptions
        ]),

        NgxsReduxDevtoolsPluginModule.forRoot({disabled: environment.production}),
        NgxsRouterPluginModule.forRoot(),
        NgxMapboxGLModule.withConfig({accessToken: environment.apis.maps.accessToken})
    ],

    providers :
    [
        Globalization,
        Firebase,
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
//        { provide: ErrorHandler,       useClass: ErrorHandlerApp }
    ]
})
export class CoreModule {}
