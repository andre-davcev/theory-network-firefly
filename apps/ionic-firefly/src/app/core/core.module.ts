import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { RouteReuseStrategy } from '@angular/router';
import { IonicRouteStrategy } from '@ionic/angular';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';
import { Globalization } from '@ionic-native/globalization/ngx';
import { Firebase } from '@ionic-native/firebase/ngx';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//import { Pro } from '@ionic/pro';

import { AppIonicCoreModule } from '@theory/ionic';
import { environment } from '../../environments/environment';
//import { ErrorHandlerApp } from '../classes/error-handler-app.class';
import { StateApp } from '../state/app/app.state';
import { StateLanguage } from '../state/language/language.state';
import { StateLocation } from '../state/location/location.state';
import { StateDevice } from '../state/device/device.state';
import { StateUser } from '../state/user/user.state';
import { StateNotifications } from '../state/notifications/notifications.state';
import { StateCluster } from '../state/cluster/cluster.state';
import { StatePlaces } from '../state/places/places.state';
import { StateIcons } from '../state/icons/icons.state';

import { StateSubscriptions } from '../state/subscriptions/subscriptions.state';

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
            StateApp,
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
