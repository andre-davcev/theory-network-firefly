import { NgModule, ErrorHandler } from '@angular/core';
import { RouteReuseStrategy } from '@angular/router';
import { IonicRouteStrategy } from '@ionic/angular';

import { CoreModule } from './core/core.module';
import { SharedModule } from './features/shared/shared.module';
import { ModuleRoutingApp } from './app-routing.module';
import { ComponentApp } from './app.component';
import { ErrorHandlerApp } from './classes/error-handler-app.class';

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

@NgModule
({
    imports :
    [
        CoreModule,
        SharedModule,
        ModuleRoutingApp
    ],

    declarations :
    [
        ComponentApp
    ],

    providers :
    [
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
        { provide: ErrorHandler,       useClass: ErrorHandlerApp }
    ],

    bootstrap: [ComponentApp]
})
export class AppModule {}

@NgModule
({
    imports :
    [
        CommonModule,
        BrowserModule,
        HttpClientModule,

        AngularFireModule.initializeApp(environment.apis.firebase),

        AngularFireAuthModule,
        AngularFirestoreModule,

        IonicModule.forRoot(ComponentApp,
        {
            tabsHideOnSubPages: true
        }),

        CoreModule,

        TranslateModule.forRoot
        ({
            loader:
            {
                provide    : TranslateLoader,
                useFactory : HttpLoaderFactory,
                deps       : [HttpClient]
            }
        }),

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

        NgxsReduxDevtoolsPluginModule.forRoot
        ({
            disabled: environment.production
        }),

        ModuleComponents,

        NgxMapboxGLModule.forRoot
        ({
            accessToken: environment.apis.maps.accessToken
        })
    ],

    providers :
    [
        Globalization,
        StatusBar,
        SplashScreen,

        Facebook,
        GooglePlus,

        Firebase,

        Alerts,
        ServiceBeacons,
        Temp,

        FormCluster,
        ClusterService,

        ServiceIcons,
        FormIcon
    ]
})
