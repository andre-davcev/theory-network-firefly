import {Http, Response} from '@angular/http';
import {Observable}     from 'rxjs/Rx';
import {Platform}       from 'ionic-angular';
import {Globalization}  from '@ionic-native/globalization';
import {Geolocation}    from '@ionic-native/geolocation';
import {StatusBar}      from '@ionic-native/status-bar';
import {Keyboard}       from '@ionic-native/keyboard';
//ToDo: $log

import {TNObject}          from '../base/theory.base.object';
import {TNFirebaseUtility} from '../firebase/theory.firebase.utility';
import {TNConfiguration}   from '../utility/theory.utility.configuration';

export class MobileConfiguration extends TNConfiguration
{
    statusBar:StatusBar;
    geolocation:Geolocation;

    constructor(http:Http, platform:Platform, firebaseUtility:TNFirebaseUtility, globalization:Globalization, statusBar:StatusBar, geolocation:Geolocation, options?:Object)
    {
        super(http, platform, firebaseUtility, globalization,
        {
            statusBarStyle : 0,  // -1 - Use Hex
            //  0 - Default
            //  1 - Light
            //  2 - Black, translucent
            //  3 - Black, opaque
            statusBarHide : false,

            statusBarHex : '#FFFFFF',

            getLocation : false,

            locationFound : false
        });

        this.statusBar   = statusBar;
        this.geolocation = geolocation;

        this.options(options);
    }

    initialize(options:Object)
    {
        super.initialize(options);

        let
        properties = this.properties,

        observable = Observable.create((observer) =>
        {
            this.platform.ready().then(() => 
            {
                if (this.platform.is('cordova'))
                {
                    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard for form inputs)
/*
                    if (window['cordova'].plugins.Keyboard != null)
                    {
                        Keyboard.hideKeyboardAccessoryBar(true);
                    }
*/
                }

                if (window['StatusBar'] != null)
                {
                    // org.apache.cordova.statusbar required
                    if (properties['statusBarStyle'] === -1)
                    {
                        this.statusBar.backgroundColorByHexString(properties['statusBarHex']);
                    }
                    else
                    {
                        let
                        statusBarStyle = properties['statusBarStyle'];

                        if (statusBarStyle === 0)
                        {
                            this.statusBar.styleDefault();
                        }
                        else if (statusBarStyle === 1)
                        {
                            this.statusBar.styleLightContent();
                        }
                        else if (statusBarStyle === 2)
                        {
                            this.statusBar.styleBlackTranslucent();
                        }
                        else if (statusBarStyle === 3)
                        {
                            this.statusBar.styleBlackOpaque();
                        }
                    }

                    if (properties['statusBarHide'])
                    {
                        this.statusBar.hide();
                    }
                }

                observer.next();
                observer.complete();
            });
        });

        this.addDependency(observable);
    }

    load(options?:Object)
    {
        return super.load(options).map(() =>
        {
            let
            properties = this.properties;

            if (properties['getLocation'] && !properties['positionFound'])
            {
                properties['positionFound'] = true;

                this.geolocation.getCurrentPosition().then((position) =>
                {
                    this.properties['model'].services.position.data =
                    {
                        latitude  : position.coords.latitude,
                        longitude : position.coords.longitude
                    };
                }).

                catch((error) =>
                {
                    console.log('Unable to get current geolocation position');
                });
            }
        });
    }

    getDependencies(options:Object)
    {
        let
        scope       = options['scope'],
        services    = this.properties['model'].services,
        observables = [],
        observable;

        for (let dependency of options['dependencies'])
        {
            let
            service = services[dependency],
            data    = service.data;

            if (data != null && ((service.providerType === 'firebase' && !data.reload()) || (service.providerType !== 'firebase' && !service.reload)))
            {
                if (service.providerType === 'firebase')
                {
                    scope[service.proper] = service.data;

                    let
                    parent = service.parent;

                    while (parent)
                    {
                        scope[parent.proper] = parent.data;

                        parent = parent.parent;
                    }
                }
                else
                {
                    scope[dependency] = service.data;
                }
            }
            else
            {
                observable = this.get({name : dependency}).map((data) =>
                {
                    if (service.providerType === 'firebase')
                    {
                        scope[service.proper] = service.data;

                        let
                        parent = service.parent;

                        while (parent)
                        {
                            scope[parent.proper] = parent.data;

                            parent = parent.parent;
                        }
                    }
                    else
                    {
                        scope[dependency] = service.data;
                    }
                });

                observables.push(observable);
            }
        }

        return Observable.forkJoin(observables);
    }

    view(options:Object)
    {
        let
        observable = Observable.create((observer) =>
        {
            let
            scope = options['scope'],
            state = options['state'],
            model = this.properties['model'],
            name  = state,
            view  = model.views[name],
            keys  = options['keys'],
            scopeKey;

            TNObject.extend(scope, options['stateParams']);

            TNObject.extend(scope,
            {
                name       : name,
                dictionary : model.dictionary.views[name]
            });

            for (let serviceKey of Object.keys(keys))
            {
                scopeKey = keys[serviceKey];

                this.setKey({name : serviceKey, key : scope[scopeKey]});
            }

            if (view)
            {
                this.getDependencies({scope : scope, dependencies : view.dependencies}).subscribe(() =>
                {
                    for (let directive of view.directives)
                    {
                        TNObject.extend(model.dictionary.views[name], model.dictionary.directives[directive]);
                    }

                    this.getDependencies({scope : scope, dependencies : view.silent});

                    observer.next();
                    observer.complete();
                });
            }
            else
            {
                observer.next();
                observer.complete();
            }
        });

        return observable;
    }
}