import {Http, Response} from 'angular2/http';
import {Observable}     from 'rxjs/Rx';
import {Platform}       from 'ionic-angular';
import {Geolocation}    from 'ionic-native';
import {StatusBar}      from 'ionic-native';
import {Keyboard}       from 'ionic-native';
//ToDo: $log

import {TNObject}          from '../base/theory.base.object';
import {TNFirebaseUtility} from '../firebase/theory.firebase.utility';
import {TNConfiguration}   from '../utility/theory.utility.configuration';

export class MobileConfiguration extends TNConfiguration
{
    constructor(http:Http, platform:Platform, firebaseUtility:TNFirebaseUtility, options?:Object)
    {
        super(http, platform, firebaseUtility,
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
                    if (window['cordova'].plugins.Keyboard != null)
                    {
                        Keyboard.hideKeyboardAccessoryBar(true);
                    }
                }

                if (window['StatusBar'] != null)
                {
                    // org.apache.cordova.statusbar required
                    if (properties['statusBarStyle'] === -1)
                    {
                        StatusBar.backgroundColorByHexString(properties['statusBarHex']);
                    }
                    else
                    {
                        let
                        statusBarStyle = properties['statusBarStyle'];

                        if (statusBarStyle === 0)
                        {
                            StatusBar.styleDefault();
                        }
                        else if (statusBarStyle === 1)
                        {
                            StatusBar.styleLightContent();
                        }
                        else if (statusBarStyle === 2)
                        {
                            StatusBar.styleBlackTranslucent();
                        }
                        else if (statusBarStyle === 3)
                        {
                            StatusBar.styleBlackOpaque();
                        }
                    }

                    if (properties['statusBarHide'])
                    {
                        StatusBar.hide();
                    }
                }

                observer.onNext();
                observer.onComplete();
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

                Geolocation.getCurrentPosition().then(function(position)
                {
                    this.properties.model.services.position.data =
                    {
                        latitude  : position.coords.latitude,
                        longitude : position.coords.longitude
                    };
                },
                function(error)
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

            for (let serviceKey in Object.keys(keys))
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

                    observer.onNext();
                    observer.onComplete();
                });
            }
            else
            {
                observer.onNext();
                observer.onComplete();
            }
        });

        return observable;
    }
}