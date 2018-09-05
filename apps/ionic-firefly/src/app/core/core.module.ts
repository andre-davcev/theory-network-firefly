import { NgModule, ErrorHandler } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { Globalization } from '@ionic-native/globalization';
import { Facebook } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';
import { Firebase } from '@ionic-native/firebase';
import { RouteReuseStrategy } from '@angular/router';
import { IonicRouteStrategy } from '@ionic/angular';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';

import { AppIonicCoreModule } from '@theory/ionic';
import { environment } from '../../environments/environment';
import { ErrorHandlerApp } from '../classes/error-handler-app.class';
import { StateApp } from '../state/app/app.state';
import { StateLanguage } from '../state/language/language.state';
import { StateLocation } from '../state/location/location.state';
import { StateDevice } from '../state/device/device.state';
import { StateUser } from '../state/user/user.state';
import { StateNotifications } from '../state/notifications/notifications.state';
import { StateCluster } from '../state/cluster/cluster.state';
import { StatePlaces } from '../state/places/places.state';
import { StateIcons } from '../state/icons/icons.state';
import { Pro } from '@ionic/pro';

Pro.init('YOUR_APP_ID',
{
    appVersion: '1.0.0'
});

@NgModule
({
    imports :
    [
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
            StateIcons
        ]),

        NgxsReduxDevtoolsPluginModule.forRoot({disabled: environment.production}),
        NgxMapboxGLModule.withConfig({accessToken: environment.apis.maps.accessToken})
    ],

    providers :
    [
        Globalization,
        Facebook,
        GooglePlus,
        Firebase,
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
        { provide: ErrorHandler,       useClass: ErrorHandlerApp }
    ]
})
export class ModuleCore {}
