import {BrowserModule}    from '@angular/platform-browser';
import {HttpModule}       from '@angular/http';
import {HttpClientModule} from '@angular/common/http';
import {HttpClient}       from '@angular/common/http';
import {NgModule}         from '@angular/core';
import {ErrorHandler}     from '@angular/core';

import {IonicApp}          from 'ionic-angular';
import {IonicModule}       from 'ionic-angular';
import {IonicErrorHandler} from 'ionic-angular';

import {IonicStorageModule} from '@ionic/storage';
import {Pro}                from '@ionic/pro';

import {Globalization} from '@ionic-native/globalization';
import {StatusBar}     from '@ionic-native/status-bar';
import {Facebook}      from '@ionic-native/facebook';
import {GooglePlus}    from '@ionic-native/google-plus';

import {AngularFireModule}     from 'angularfire2';
import {AngularFireAuthModule} from 'angularfire2/auth';

import {TranslateModule}     from '@ngx-translate/core';
import {TranslateLoader}     from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

import { NgxMapboxGLModule } from 'ngx-mapbox-gl';

import {CoreModule} from '../core/core.module';
import {App}        from './app';

import {Alerts}          from '../services/alerts';
import {ServiceBeacons}  from '../services/beacons';
import {Temp}            from '../services/temp';

import {environment}      from '../environments/environment';

import {EffectsApp}              from '../redux/app/effects';
import {EffectsUser}             from '../redux/user/effects';
import {EffectsLanguage}         from '../redux/language/effects';
import {EffectsBeaconsPublished} from '../redux/beacons-published/effects';

import {ReducerApp}              from '../redux/app/reducer';
import {ReducerUser}             from '../redux/user/reducer';
import {ReducerLanguage}         from '../redux/language/reducer';
import {ReducerBeaconsPublished} from '../redux/beacons-published/reducer';
import { CommonModule } from '@angular/common';
import { EffectsLocation } from '../redux/location/effects';
import { ReducerLocation } from '../redux/location/reducer';
import { reducers } from '../redux/app/store';

import {NgxsModule}                    from '@ngxs/store';
import {NgxsReduxDevtoolsPluginModule} from '@ngxs/devtools-plugin';

import { StateApp } from '../state/app.state';
import { StateLocation } from '../state/location.state';
import { StateLanguage } from '../state/language.state';
import { StateUser } from '../state/user.state';
import { ModuleComponents } from '@theory/firefly/core/components';
import { FormCluster } from './forms/cluster.form';
import { StateCluster } from '../state/cluster/cluster.state';
import { ClusterService } from '../services/services.cluster';

export function HttpLoaderFactory(http: HttpClient)
{
    return new TranslateHttpLoader(http);
}

export const IonicPro = Pro.init('1e5146ca',
{
    appVersion: environment.version
});

export class AppErrorHandler implements ErrorHandler
{
    handleError(error:any):void
    {
        console.log(error);

        IonicPro.monitoring.handleNewError(error);
    }
}

@NgModule
({
    imports :
    [
        CommonModule,
        BrowserModule,
        HttpClientModule,

        AngularFireModule.initializeApp(environment.firebase),
        IonicStorageModule.forRoot(),

        IonicModule.forRoot(App,
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
            StateUser,
            StateCluster
        ]),

        NgxsReduxDevtoolsPluginModule.forRoot
        ({
            disabled: environment.production
        }),

        ModuleComponents,

        NgxMapboxGLModule.forRoot
        ({
            accessToken: 'pk.eyJ1IjoidGhlb3J5bmV0d29yayIsImEiOiJjamdwem04eGwwMXVsMnZwaGR2YzZxdGxvIn0.1mwIacOT0bTANo6lueSQmg'
        })
    ],

    declarations :
    [
        App
    ],

    bootstrap : [IonicApp],

    entryComponents :
    [
        App
    ],

    providers :
    [
        Globalization,
        StatusBar,

        Facebook,
        GooglePlus,

        Alerts,
        ServiceBeacons,
        Temp,

        FormCluster,
        ClusterService,

        [{provide: ErrorHandler, useClass: AppErrorHandler}]
    ]
})

export class AppModule
{

}
