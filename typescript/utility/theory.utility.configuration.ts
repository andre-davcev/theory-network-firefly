import {Http, Response} from '@angular/http';
import {Observable}     from 'rxjs/Rx';
import {Platform}       from 'ionic-angular';
import {Globalization}  from '@ionic-native/globalization';
//ToDo: $locale
//ToDo: $log

import {TNObject}          from '../base/theory.base.object';
import {TNFirebaseUtility} from '../firebase/theory.firebase.utility';


export interface TNConfigOptions
{
    http             : Http,
    platform         : Platform,
    globalization    : Globalization,
    firebaseUtility  : TNFirebaseUtility,
    path?            : string,
    dependencies?    : Array<Observable<any>>
}


export interface TNConfigProvider
{
    type   : string,
    domain : {[id:string]:string}
}

export interface TNConfigService
{
    provider      : string,
    service?      : string,
    data?         : any,
    localize?     : boolean,
    blank?        : any,
    foreignTable? : string,
    exclusions?   : Array<string>,
    reload?       : boolean
}

export interface TNConfigView
{
    dependencies : Array<string>,
    directives?  : Array<string>
}

export interface TNConfig
{
    providers : {[id:string]:TNConfigProvider},
    language  : string,
    services  : {[id:string]:TNConfigService},
    views     : {[id:string]:TNConfigView}
}


export interface TNModelSettings
{
    language  : string,
    instance? : string
}

export interface TNModelProvider
{
    url  : string,
    type : string
}

export interface TNModelService
{
    provider      : string,
    service?      : string,
    data?         : any,
    localize?     : boolean,
    blank?        : any,
    foreignTable? : string,
    reload?       : boolean,

    name          : string,
    providerType? : string,
    type?         : 'array' | 'object' | 'primitive',
    exclusions?   : {[id:string]:string},
    proper?       : string,
    children?     : {[id:string]:TNModelService},
    parent?       : TNModelService,
    url?          : string,
    key?          : string
}

export interface TNModelView
{
    dependencies : Array<string>,
    silent?      : Array<string>,
    directives?  : Array<string>
}

export interface TNModel
{
    settings    : TNModelSettings,
    providers?  : {[id:string]:TNModelProvider},
    services?   : {[id:string]:TNModelService},
    views?      : {[id:string]:TNModelView},
    dictionary? : {[id:string]:any}
}

export class TNConfiguration
{
    protected http            : Http;
    protected platform        : Platform;
    protected firebaseUtility : TNFirebaseUtility;
    protected globalization   : Globalization;

    protected path                   : string;
    protected dependencies           : Array<Observable<any>>;
    protected observableDependencies : Observable<any>;

    protected isSetup : boolean = false;
    protected loading : boolean = false;
    protected loaded  : boolean = false;

    protected model : TNModel = {settings : {language : 'en'}};

    constructor(options:TNConfigOptions)
    {
        this.http            = options.http;
        this.platform        = options.platform;
        this.firebaseUtility = options.firebaseUtility;
        this.globalization   = options.globalization;

        this.path         = options.path         != null ? options.path         : 'data';
        this.dependencies = options.dependencies != null ? options.dependencies : [];

        this.initialize(options);
    }

    protected initialize(options:TNConfigOptions)
    {
        
    }

    protected configureProviders(data:TNConfig)
    {
        let providers:{[id:string]:TNConfigProvider} = data.providers;

        if (providers != null)
        {
            let instance:string                         = this.model.settings.instance;
            let processed:{[id:string]:TNModelProvider} = {};

            let provider:TNConfigProvider;

            for (let key of Object.keys(providers))
            {
                provider = providers[key];

                processed[key] =
                {
                    url  : provider.domain[instance],
                    type : provider.type
                };
            };

            this.model.providers = processed;
        }
    }

    protected configureServices(data:TNConfig)
    {
        let configServices:{[id:string]:TNConfigService} = data.services;

        if (configServices != null)
        {
            let services:{[id:string]:TNModelService} = {};
            let provider:TNModelProvider;
            let providers:{[id:string]:TNModelProvider} = this.model.providers;
            let providerType:string;
            let heirarchy:Array<string>;
            let proper:string;
            let parent:TNModelService;
            let exclusions:{[id:string]:string};
            let blank:any;
            let fk;
            let current:TNConfigService;
            let service:TNModelService;
            let level;

            for (let name of Object.keys(configServices))
            {
                // Get the service name
                current = configServices[name];

                service =
                {
                    name     : name,
                    provider : current.provider
                };

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
                        // Get the blank object
                        blank = service.blank = current.blank == null ? {} : current.blank;

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
                        if (current.exclusions != null)
                        {
                            exclusions = {};

                            for (let exclusion of current.exclusions)
                            {
                                exclusions[exclusion] = exclusion;
                            }

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
                        service.proper       = proper;
                        service.children     = {};
                        service.foreignTable = current.foreignTable;
                        service.service      = current.service;
                        service.data         = current.data;
                        service.localize     = current.localize;
                        service.reload       = current.reload;

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
                                // ToDo put this back
/*
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
*/
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

                services[name] = service;
            };

            // Give the providers and services to the firebase utility
//            this.firebaseUtility.options({providers : providers, services : services});
        }
    }

    protected getLanguage(language:string) : Observable<any>
    {
        return this.http.

        get(this.filePath('localize.' + language)).

        map((response:Response) => response.json());
    }

    protected processLanguage(language:string, dictionary:{[id:string]:any})
    {
        let views:{[id:string]:any} = dictionary.views;
        let viewDictionary:{[id:string]:any};

        let processView = (key:string, viewDictionary:{[id:string]:any}) =>
        {
            let include = viewDictionary['#include'];

            if (include != null)
            {
                for (let view of include)
                {
                    TNObject.extend(viewDictionary, processView(view, views[view]));
                }

                delete viewDictionary['#include'];
            }

            return viewDictionary;
        };

        this.model.dictionary = dictionary;

        for (let key of Object.keys(views))
        {
            viewDictionary = views[key];

            TNObject.extend(viewDictionary, processView(key, viewDictionary));

            delete viewDictionary['#include'];
        }
    }

    protected configureLanguage() : Observable<Object>
    {
        let model:TNModel = this.model;

        let getDefault = (language:string) : Observable<Object> =>
        {
            language = model.settings.language;

            console.log('Defaulting to language: "' + language + '"');

            return this.getLanguage(language).

            map((dictionary:{[id:string]:any}) =>
            {
                console.log('Found default language: "' + language + '"');

                this.processLanguage(language, dictionary);

                console.log(model.dictionary);

                return dictionary;
            }).

            catch(error =>
            {
                console.log('Unable to find default language: "' + language + '"');

                return Observable.throw(error);
            });
        };

        let getLanguage = (language:string) : Observable<Object> =>
        {
            console.log('Searching for language: "' + language + '"');

            return this.getLanguage(language).

            map((dictionary:{[id:string]:any}) =>
            {
                console.log('Found language file: "' + language + '"');

                this.processLanguage(language, dictionary);

                return dictionary;
            }).

            catch(error =>
            {
                let lang:Array<string> = language.split('-');

                if (lang.length === 2)
                {
                    language = lang[0];

                    console.log('Searching for non country specific language: "' + language + '"');

                    return this.getLanguage(language).

                    map((dictionary:{[id:string]:any}) =>
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
            let observable = Observable.create((observer) =>
            {
                this.globalization.getLocaleName().then(function(result)
                {
                    getLanguage(result.value.toLowerCase()).

                    subscribe(() => 
                    {
                        observer.next();
                        observer.complete();
                    });
                },

                function(error)
                {
                    console.log('Unable to get local name');

                    getLanguage(model.settings.language).

                    subscribe(() => 
                    {
                        observer.next();
                        observer.complete();
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

    protected setup(options:Object)
    {
        let model:TNModel = this.model;
        let config:TNConfig;

        let observable;
        let observableConfig;
        let observableInstance;

        this.isSetup = true;

        observableConfig = this.http.

        get(this.filePath('configuration')).

        map((response:Response) => response.json()).

        map((data:TNConfig) =>
        {
            config = data;

            model.settings.language = data.language;

            return data;
        });

        observableInstance = this.http.

        get(this.filePath('instance')).

        map((response:Response) => response.json()).

        map((data:any) =>
        {
            model.settings.instance = data.instance;

            return data;
        });

        observable = Observable.create(observer =>
        {
            Observable.forkJoin(observableConfig, observableInstance).

            subscribe(() =>
            {
                this.configureProviders(config);
                this.configureServices(config);

                this.configureLanguage().subscribe((language:string) =>
                {
                    model.settings.language = language;

                    observer.next();
                    observer.complete();
                },

                (error) =>
                {
                    console.log(error)
                });
            });
        });

        this.addDependency(observable);
    }

    protected filePath(filename:string):string
    {
        return this.path + '/' + filename + '.json';
    }

    protected addDependency(dependency)
    {
        this.dependencies.push(dependency);
    }

    // Load the application json config file
    protected localizeService(name:string, model:TNModel, service:TNModelService, data:any)
    {
        let item:any;
        let dictionary:{[id:string]:string};

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
                for (let key of Object.keys(item))
                {
                    item = data[key];

                    item.id      = key;
                    item.display = dictionary[key];
                }
            }
        }

        return data;
    }

    protected getHTTP(name:string, service:TNModelService, model:TNModel)
    {
        return this.http.get(service.url).

        map((response:Response) => response.json()).

        map((data) =>
        {
            service.data = this.localizeService(name, model, service, data);

            return service.data;
        });
    }

    protected get(name:string) : Observable<any>
    {
        let model:TNModel          = this.model;
        let service:TNModelService = model.services[name];

        let observable:Observable<any>;

        if (service.providerType === 'firebase')
        {
//            observable = TNFirebaseUtility.getFirebase({name : name});
        }
        else
        {
            observable = this.getHTTP(name, service, model);
        }

        return observable;
    }

    public setKey(name:string, key:string)
    {
        let services:{[id:string]:TNModelService} = this.model.services;
        let service:TNModelService                = services[name];
        let reload:boolean                        = key != service.key ? true : false;
        let item:TNModelService;

        if (reload)
        {
            for (let serviceName of Object.keys(services))
            {
                item = services[serviceName];

                if (serviceName.indexOf(name) === 0)
                {
                    item.reload = true;
                }
            }
        }

        service.key = key;
    }

    public dictionary(view:string, scope?:any) : {[id:string]:string}
    {
        let dictionary:{[id:string]:string} = this.model.dictionary.views[view];

        if (scope != null)
        {
            scope.dictionary = dictionary;
        }

        return dictionary;
    }

    // Load the application json config file
    public load(options?:Object)
    {
        if (!this.loaded && !this.loading)
        {
            this.setup(options);

            this.loading = true;

            this.observableDependencies = Observable.forkJoin(this.dependencies).

            map((data:any) =>
            {
                this.loaded = true;
            });
        }
        else
        {
            this.observableDependencies = Observable.create((observer) =>
            {
                observer.next();
                observer.complete();
            });
        }

        return this.observableDependencies;
    }
}