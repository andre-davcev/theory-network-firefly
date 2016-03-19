import {TNObject} from '../base/theory.base.d';

export class TNConfiguration extends TNObject
{
    constructor(options:Object)
    {
        super(
        {
            path            : 'data',
            dependencies    : [],
            model           : {settings : {}},
            setup           : false,
            loading         : false,
            loaded          : false,
            loadingPromises : []
        });

        this.options(options);
        this.initialize(options);
    }
}

/*

// TNConfiguration application object
factory('TNConfiguration', function($http, $q, $ionicPlatform, $cordovaGlobalization, $locale, $log, TNObject, TNFirebaseUtility)
{
    var
    TNConfiguration = function(options)
    {
        TNConfiguration.parent.call(this,
        {
            path            : 'data',
            dependencies    : [],
            model           : {settings : {}},
            setup           : false,
            loading         : false,
            loaded          : false,
            loadingPromises : []
        });

        this.options(options);

        this.initialize(options);
    };

    TNConfiguration.prototype.configureProviders = function(data)
    {
        if (data.providers)
        {
            var
            instance  = data.settings.instance,
            processed = {},
            item;

            angular.forEach(data.providers, function(provider, name)
            {
                item = processed[name] =
                {
                    url  : provider.domain[instance],
                    type : provider.type
                };
            });

            data.providers = processed;
        }
    };

    TNConfiguration.prototype.configureServices = function(data)
    {
        if (data.services)
        {
            var
            provider,
            providers = data.providers,
            services  = data.services,
            providerType,
            heirarchy,
            proper,
            parent,
            exclusions,
            blank,
            fk;

            // Cycle through all the services
            angular.forEach(services, function(service, name)
            {
                // Get the service name
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
                        if (!angular.isDefined(service.blank))
                        {
                            service.blank = {};
                        }

                        // Get the blank object
                        blank = service.blank;

                        // Check the blank object types (array, object, primitive)
                        if (angular.isObject(blank))
                        {
                            if (angular.isArray(blank))
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
                        if (angular.isDefined(service.exclusions))
                        {
                            exclusions = {};

                            angular.forEach(service.exclusions, function(exclusion)
                            {
                                exclusions[exclusion] = exclusion;
                            });

                            service.exclusions = exclusions;
                        }

                        // Split the name heirarchy array
                        heirarchy = name.split('.');

                        // Build the proper name (camel case) by cycling through the heirarchy
                        angular.forEach(heirarchy, function(level, index)
                        {
                            if (index === 0)
                            {
                                proper = level;
                            }
                            else
                            {
                                proper += level.charAt(0).toUpperCase() + level.slice(1);
                            }
                        });

                        // Set the proper name and initialize to blank children object
                        angular.extend(service,
                        {
                            proper   : proper,
                            children : {}
                        });

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
                                fk = TNFirebaseUtility.eval({key : service.service, object : parent.blank});

                                if (!angular.isObject(fk.object))
                                {
                                    service.type = 'primitive';
                                }
                                else if (angular.isArray(fk.object))
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
                        if (!angular.isDefined(service.reload))
                        {
                            service.reload = false;
                        }
                    }
                }
            });

            // Give the providers and services to the firebase utility
            TNFirebaseUtility.options({providers : providers, services : services});
        }
    };

    TNConfiguration.prototype.getLanguage = function(language)
    {
        var
        q = $q.defer();

        $http.get(this.filePath('localize.' + language)).then(function(response)
        {
            q.resolve(response.data);
        }).
        catch(function(error)
        {
            q.reject(error);
        });

        return q.promise;
    };

    TNConfiguration.prototype.processLanguage = function(language, model)
    {
        var
        views = model.views,

        processView = function(key, dictionary)
        {
            var
            include = dictionary['#include'];

            if (include)
            {
                angular.forEach(include, function(view)
                {
                    angular.extend(dictionary, processView(view, views[view]));
                });

                delete dictionary['#include'];
            }

            return dictionary;
        };

        this.properties.model.dictionary = model;

        angular.forEach(views, function(dictionary, key)
        {
            angular.extend(dictionary, processView(key, dictionary));
            delete dictionary['#include'];
        });
    };

    TNConfiguration.prototype.configureLanguage = function()
    {
        var
        q     = $q.defer(),
        self  = this,
        model = this.properties.model,

        getDefault = function(language)
        {
            language = model.settings.language;

            $log.info('Defaulting to language: "' + language + '"');

            self.getLanguage(language).then(function(dictionary)
            {
                $log.info('Found default language: "' + language + '"');

                self.processLanguage(language, dictionary);

                q.resolve(language);
            }).
            catch(function(error)
            {
                $log.error('Unable to find default language: "' + language + '"');

                q.reject();
            });
        },

        getLanguage = function(language)
        {
            $log.info('Searching for language: "' + language + '"');

            self.getLanguage(language).then(function(dictionary)
            {
                $log.info('Found language file: "' + language + '"');

                self.processLanguage(language, dictionary);

                q.resolve(language);
            }).
            catch(function(error)
            {
                var
                lang = language.split('-');

                if (lang.length === 2)
                {
                    language = lang[0];

                    $log.info('Searching for non country specific language: "' + language + '"');

                    self.getLanguage(language).then(function(dictionary)
                    {
                        $log.info('Found non country specific language: "' + language + '"');

                        self.processLanguage(language, dictionary);

                        q.resolve(language);
                    }).
                    catch(function(error)
                    {
                        $log.info('Unable to find non country specific language: "' + language + '"');

                        getDefault(language);
                    });
                }
                else
                {
                    $log.info('Unable to find language: "' + language + '"');

                    getDefault(language);
                }
            });
        };

        if ($ionicPlatform.is('cordova'))
        {
            $cordovaGlobalization.getLocaleName().then(function(result)
            {
                getLanguage(result.toLowerCase());
            },

            function(error)
            {
                $log.error('Unable to get local name');

                getLanguage(model.settings.language);
            });
        }
        else
        {
            getLanguage($locale.id);
        }

        return q.promise;
    };

    TNConfiguration.prototype.setup = function(options)
    {
        var
        self            = this,
        q               = $q.defer(),
        properties      = this.properties,
        model           = properties.model,
        promiseConfig   = $q.defer(),
        promiseInstance = $q.defer();

        properties.setup = true;

        $http.get(self.filePath('configuration')).then(function(response)
        {
            angular.extend(model, response.data);

            angular.extend(model.settings,
            {
                language : model.language
            });

            promiseConfig.resolve();
        });

        $http.get(self.filePath('instance')).then(function(response)
        {
            angular.extend(model.settings, response.data);

            promiseInstance.resolve();
        });

        $q.all([promiseConfig.promise, promiseInstance.promise]).then(function()
        {
            self.configureProviders(model);
            self.configureServices(model);

            angular.extend(properties.model, model);

            self.configureLanguage().then(function(language)
            {
                properties.model.settings.language = language;

                q.resolve();
            });
        });

        self.addDependency(q.promise);
    };

    TNConfiguration.prototype.filePath = function(filename)
    {
        var
        properties = this.properties,
        filePath   = properties.path + '/' + filename + '.json';

        return filePath;
    };

    TNConfiguration.prototype.addDependency = function(dependency)
    {
        this.properties.dependencies.push(dependency);
    };

    // Load the application json config file
    TNConfiguration.prototype.load = function(options)
    {
        var
        q          = $q.defer(),
        properties = this.properties;

        if (properties.loaded)
        {
            q.resolve();
        }
        else if (properties.loading)
        {
            var
            loading = $q.defer();

            properties.loadingPromises.push(loading);

            return loading.promise;
        }
        else
        {
            this.setup(options);

            properties.loading = true;

            $q.all(this.properties.dependencies).then(function()
            {
                properties.loaded = true;

                angular.forEach(properties.loadingPromises, function(promise)
                {
                    promise.resolve();
                });

                q.resolve();
            });
        }

        return q.promise;
    };

    // Load the application json config file
    TNConfiguration.prototype.localizeService = function(options)
    {
        var
        name    = options.name,
        model   = options.model,
        service = options.service,
        data    = options.data,
        dictionary;

        if (service.localize)
        {
            dictionary = model.dictionary[name];

            if (angular.isArray(data))
            {
                angular.forEach(data, function(item, index)
                {
                    item.display = dictionary[item.id];
                });
            }
            else
            {
                angular.forEach(data, function(item, key)
                {
                    angular.extend(item,
                    {
                        id      : key,
                        display : dictionary[key]
                    });
                });
            }
        }

        return data;
    };

    TNConfiguration.prototype.getHTTP = function(options)
    {
        var
        self    = this,
        q       = $q.defer(),
        service = options.service;

        $http.get(service.url).then(function(response)
        {
            angular.extend(options,
            {
                data : response.data
            });

            service.data = self.localizeService(options);

            q.resolve(service.data);
        });

        return q.promise;
    };

    TNConfiguration.prototype.get = function(options)
    {
        var
        name    = options.name,
        model   = this.properties.model,
        service = model.services[name],
        q;

        if (service.providerType === 'firebase')
        {
            q = TNFirebaseUtility.getFirebase({name : name});
        }
        else
        {
            q = this.getHTTP({name : name, service : service, model : model});
        }

        return q;
    };

    TNConfiguration.prototype.dictionary = function(view, scope)
    {
        var
        dictionary = this.properties.model.dictionary.views[view];

        if (scope)
        {
            scope.dictionary = dictionary;
        }

        return dictionary;
    };

    return TNConfiguration;
});
*/