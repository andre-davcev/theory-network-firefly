import {Http, Response} from 'angular2/http';
import {Observable}     from 'rxjs/Rx';
import {Platform}       from 'ionic-angular';
import {Globalization}  from 'ionic-native';
//ToDo: $locale
//ToDo: $log

import {TNObject}          from '../base/theory.base.object';
import {TNFirebaseUtility} from '../firebase/theory.firebase.utility';

export class TNConfiguration extends TNObject
{
    http            : Http;
    platform        : Platform;
    firebaseUtility : TNFirebaseUtility;

    constructor(options?:Object, http:Http, platform:Platform, firebaseUtility:TNFirebaseUtility)
    {
        super(
        {
            path         : 'data',
            dependencies : [],
            model        : {settings : {}},
            setup        : false,
            loading      : false,
            loaded       : false
        });

        this.options(options);
        this.initialize(options);

        this.http            = http;
        this.platform        = platform;
        this.firebaseUtility = firebaseUtility;
    }

    configureProviders(data:Object)
    {
        let
        providers = data['providers'];

        if (providers != null)
        {
            let
            instance  = data['settings']['instance'],
            processed = {},
            provider,
            item;

            for (let key in Object.keys(providers))
            {
                provider = providers[key];

                item = processed[key] =
                {
                    url  : provider.domain[instance],
                    type : provider.type
                };
            });

            providers = processed;
        }
    }

    configureServices(data:Object)
    {
        let
        services = data['services'];

        if (services != null)
        {
            let
            provider,
            providers = data['providers'],
            providerType,
            heirarchy,
            proper,
            parent,
            exclusions,
            blank,
            fk,
            service,
            level;

            for (let name in Object.keys(services))
            {
                // Get the service name
                service      = services[name];
                service.name = name;

                // If the service provider is not runtime
                if (service.provider !== 'runtime')
                {
                    // Get the service provider
                    provider = providers[service.provider];

                    // Get the provider type
                    providerType = service.providerType = provider.type;

                    // If this has a firebase provider
                    if (providerType === 'firebase')
                    {
                        // Set the blank object if it's not defined
                        if (service.blank == null)
                        {
                            service.blank = {};
                        }

                        // Get the blank object
                        blank = service.blank;

                        // Check the blank object types (array, object, primitive)
                        if (blank instanceof Object)
                        {
                            if (blank instanceof Array)
                            {
                                service.type = 'array';
                            }
                            else
                            {
                                service.type = 'object';
                            }
                        }
                        else
                        {
                            service.type = 'primitive';
                        }

                        // If we have exclusions replace the exclusions array with object
                        if (service.exclusions != null)
                        {
                            exclusions = {};

                            for (let exclusion of service.exclusions)
                            {
                                exclusions[exclusion] = exclusion;
                            };

                            service.exclusions = exclusions;
                        }

                        // Split the name heirarchy array
                        heirarchy = name.split('.');

                        // Build the proper name (camel case) by cycling through the heirarchy
                        for (let index in heirarchy)
                        {
                            level = heirarchy[index];

                            if (index === '0')
                            {
                                proper = level;
                            }
                            else
                            {
                                proper += level.charAt(0).toUpperCase() + level.slice(1);
                            }
                        };

                        // Set the proper name and initialize to blank children object
                        service.proper   = proper;
                        service.children = {};

                        // If we are not the top level then we have a parent
                        if (heirarchy.length > 1)
                        {
                            heirarchy.pop();

                            // Get and set the parent
                            parent         = services[heirarchy.join('.')];
                            service.parent = parent;

                            // Set the parent's child to this service
                            parent.children[name] = service;

                            // If the parent is a foreign table
                            if (parent.foreignTable && parent.type !== 'primitive')
                            {
                                parent.blank = service.blank;
                                parent.type  = service.type;
                            }

                            // If this is a foreign table then figure out
                            // whether the parent object reference is a primitive or object
                            if (service.foreignTable)
                            {
                                fk = this.firebaseUtility.eval({key : service.service, object : parent.blank});

                                if (!(fk.object instanceof Object))
                                {
                                    service.type = 'primitive';
                                }
                                else if (fk.object instanceof Array)
                                {
                                    service.type = 'array';
                                }
                                else
                                {
                                    service.type = 'object';
                                }
                            }
                        }
                    }
                    // If this is a http request
                    else
                    {
                        // Set the service url
                        service.url = provider.url + '/' + service.service;

                        // Set reload to false if no reload is set
                        if (service.reload == null)
                        {
                            service.reload = false;
                        }
                    }
                }
            };

            // Give the providers and services to the firebase utility
            this.firebaseUtility.options({providers : providers, services : services});
        }
    }

    getLanguage(language:string) : Observable<Object>
    {
        return this.http.get(this.filePath('localize.' + language)).map((response:Response) => response.json());
    }

    processLanguage(language:string, model:Object)
    {
        let
        views = model['views'],
        dictionary,

        function processView(key:string, dictionary:Object)
        {
            let
            include = dictionary['#include'];

            if (include)
            {
                for (let view of include)
                {
                    TNObject.extend(dictionary, processView(view, views[view]));
                }

                delete dictionary['#include'];
            }

            return dictionary;
        };

        this.properties['model'].dictionary = model;

        for (let key in Object.keys(views))
        {
            dictionary = views[key];

            TNObject.extend(dictionary, processView(key, dictionary));

            delete dictionary['#include'];
        }
    }

    configureLanguage() : Observable<Object>
    {
        let
        model = this.properties['model'],

        getDefault = function(language)
        {
            language = model.settings.language;

            console.log('Defaulting to language: "' + language + '"');

            return this.getLanguage(language).

            map(dictionary =>
            {
                console.log('Found default language: "' + language + '"');

                this.processLanguage(language, dictionary);

                return dictionary;
            }).

            catch(error =>
            {
                console.log('Unable to find default language: "' + language + '"');
            });
        },

        getLanguage = function(language)
        {
            console.log('Searching for language: "' + language + '"');

            return this.getLanguage(language).

            map(dictionary =>
            {
                console.log('Found language file: "' + language + '"');

                this.processLanguage(language, dictionary);

                return dictionary;
            }).

            catch(error =>
            {
                let
                lang = language.split('-');

                if (lang.length === 2)
                {
                    language = lang[0];

                    console.log('Searching for non country specific language: "' + language + '"');

                    return this.getLanguage(language).

                    map(dictionary =>
                    {
                        console.log('Found non country specific language: "' + language + '"');

                        this.processLanguage(language, dictionary);

                        return dictionary;
                    }).

                    catch(error =>
                    {
                        console.log('Unable to find non country specific language: "' + language + '"');

                        return getDefault(language);
                    });
                }
                else
                {
                    console.log('Unable to find language: "' + language + '"');

                    return getDefault(language);
                }
            });
        };

        if (this.platform.is('cordova'))
        {
            let
            observable = Observable.create((observer) =>
            {
                Globalization.getLocaleName().then(function(result)
                {
                    getLanguage(result.toLowerCase()).

                    subscribe(() => 
                    {
                        observer.onNext();
                        observer.onComplete();
                    });
                },

                function(error)
                {
                    console.log('Unable to get local name');

                    getLanguage(getLanguage(model.settings.language)).

                    subscribe(() => 
                    {
                        observer.onNext();
                        observer.onComplete();
                    });
                });
            });

            return observable;
        }
        else
        {
            // ToDo: Once $locale is implemented with Angular 2 implement it
//            getLanguage($locale.id);
            return getLanguage('en');
        }
    }

    setup(options:Object)
    {
        let
        properties = this.properties,
        model      = properties['model'],

        observable,
        observableConfig,
        observableInstance;

        properties['setup'] = true;

        observableConfig = this.http.get(this.filePath('configuration')).

        map((response:Response) => response.json()).

        map((data) =>
        {
            TNObject.extend(model, data);

            model.settings.language = model.language;

            return data;
        });

        observableInstance = this.http.get(this.filePath('instance')).

        map((response:Response) => response.json()).

        map((data) =>
        {
            TNObject.extend(model.settings, data);

            model.settings.language = model.language;

            return data;
        });

        observable = Observable.create((observer) =>
        {
            Observable.forkJoin(observableConfig, observableInstance).

            subscribe(() =>
            {
                this.configureProviders(model);
                this.configureServices(model);

                TNObject.extend(properties['model'], model);

                this.configureLanguage().subscribe((language) =>
                {
                    properties['model'].settings.language = language;

                    observer.onNext();
                    observer.onComplete();
                });
            });
        });

        this.addDependency(observable);
    }

    filePath(filename:string):string
    {
        return this.properties['path'] + '/' + filename + '.json';
    }

    addDependency(dependency)
    {
        this.properties['dependencies'].push(dependency);
    }

    // Load the application json config file
    load(options?:Object)
    {
        let
        properties = this.properties;

        if (!properties['loaded'] && !properties['loading'])
        {
            this.setup(options);

            properties['loading'] = true;

            properties['observableDependencies'] = Observable.forkJoin(properties['dependencies']).

            map(() =>
            {
                properties['loaded'] = true;
            });
        }

        return properties['observableDependencies'];
    }

    // Load the application json config file
    localizeService(options:Object)
    {
        let
        name    = options['name'],
        model   = options['model'],
        service = options['service'],
        data    = options['data'],

        item,
        dictionary;

        if (service.localize)
        {
            dictionary = model.dictionary[name];

            if (data instanceof Array)
            {
                for (let item of data)
                {
                    item.display = dictionary[item.id];
                }
            }
            else
            {
                for (let key in Object.keys(item))
                {
                    item = data[key];

                    item.id      = key;
                    item.display = dictionary[key];
                }
            }
        }

        return data;
    }

    getHTTP(options:Object)
    {
        let
        service = options['service'];

        return this.http.get(service.url).

        map((response:Response) => response.json()).

        map((data) =>
        {
            options['data'] = data;

            service.data = this.localizeService(options);

            return service.data;
        });
    }

    get(options:Object)
    {
        var
        name    = options['name'],
        model   = this.properties['model'],
        service = model.services[name],

        observable;

        if (service.providerType === 'firebase')
        {
//            observable = TNFirebaseUtility.getFirebase({name : name});
        }
        else
        {
            observable = this.getHTTP({name : name, service : service, model : model});
        }

        return observable;
    }

    setKey(options:Object)
    {
        var
        name     = options['name'],
        services = this.properties['model'].services,
        service  = services[name],
        key      = options['key'],
        reload   = key !== service.key ? true : false,
        item;

        if (reload)
        {
            for (let serviceName in Object.keys(services))
            {
                item = services[serviceName];

                if (serviceName.indexOf(name) === 0)
                {
                    item.reload = true;
                }
            }
        }

        service.key = key;
    };
}