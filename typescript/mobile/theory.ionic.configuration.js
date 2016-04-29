'use strict';

angular.module('theory.ionic').

// RWConfiguration application object
factory('IonicConfiguration', function($ionicPlatform, $timeout, $q, $cordovaStatusbar, $cordovaGeolocation, $log, $ionicLoading, TNConfiguration)
{
    var
    IonicConfiguration = function(options)
    {
        IonicConfiguration.parent.call(this,
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
    };

    TNInheritance.extend(IonicConfiguration, TNConfiguration);

    IonicConfiguration.prototype.initialize = function(options)
    {
        IonicConfiguration.parent.prototype.initialize.call(this, options);

        var
        q          = $q.defer(),
        properties = this.properties;

        $ionicPlatform.ready(function()
        {
            if (window.cordova)
            {
                // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard for form inputs)
                if (window.cordova.plugins.Keyboard)
                {
                    cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                }

                $timeout(function()
                {
                    navigator.splashscreen.hide();
                }, 100);
            }

            if (window.StatusBar)
            {
                // org.apache.cordova.statusbar required
                if (properties.statusBarStyle === -1)
                {
                    $cordovaStatusbar.styleHex(properties.statusBarHex);
                }
                else
                {
                    $cordovaStatusbar.style(properties.statusBarStyle);
                }

                if (properties.statusBarHide)
                {
                    $cordovaStatusbar.hide();
                }
            }

            q.resolve();
        });

        this.addDependency(q.promise);
    };

    IonicConfiguration.prototype.load = function(options)
    {
        var
        self       = this,
        q          = $q.defer(),
        properties = this.properties;

        IonicConfiguration.parent.prototype.load.call(this, options).then(function()
        {
            if (properties.getLocation && !properties.positionFound)
            {
                properties.positionFound = true;

                $cordovaGeolocation.getCurrentPosition().then(function(position)
                {
                    self.properties.model.services.position.data =
                    {
                        latitude  : position.coords.latitude,
                        longitude : position.coords.longitude
                    };

                    q.resolve();
                },
                function(error)
                {
                    $log.error('Unable to get current geolocation position');

                    q.resolve();
                });
            }
            else
            {
                q.resolve();
            }
        });

        return q.promise;
    };

    IonicConfiguration.prototype.save = function(options)
    {
        var
        q = $q.defer();

        $ionicLoading.show();

        IonicConfiguration.parent.prototype.save.call(this, options).then(function()
        {
            $ionicLoading.hide();

            q.resolve();
        });

        return q.promise;
    };

    IonicConfiguration.prototype.getDependencies = function(options)
    {
        var
        self     = this,
        scope    = options.scope,
        services = this.properties.model.services,
        promises = [];

        angular.forEach(options.dependencies, function(dependency)
        {
            var
            service = services[dependency],
            data    = service.data;

            if (angular.isDefined(data) && ((service.providerType === 'firebase' && !data.reload()) || (service.providerType !== 'firebase' && !service.reload)))
            {
                if (service.providerType === 'firebase')
                {
                    scope[service.proper] = service.data;

                    var
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
                var
                q = $q.defer();

                self.get({name : dependency}).then(function(data)
                {
                    if (service.providerType === 'firebase')
                    {
                        scope[service.proper] = service.data;

                        var
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

                    q.resolve();
                });

                promises.push(q.promise);
            }
        });

        return $q.all(promises);
    };

    IonicConfiguration.prototype.view = function(options)
    {
        var
        self     = this,
        scope    = options.scope,
        state    = options.state,
        model    = this.properties.model,
        name     = state.current.name,
        view     = model.views[name],
        q        = $q.defer();

        angular.extend(scope, options.stateParams);

        angular.extend(scope,
        {
            name       : name,
            dictionary : model.dictionary.views[name]
        });

        angular.forEach(options.keys, function(scopeKey, serviceKey)
        {
            self.setKey({name : serviceKey, key : scope[scopeKey]});
        });

        if (view)
        {
            self.getDependencies({scope : scope, dependencies : view.dependencies}).then(function()
            {
                angular.forEach(view.directives, function(directive)
                {
                    angular.extend(model.dictionary.views[name], model.dictionary.directives[directive]);
                });

                self.getDependencies({scope : scope, dependencies : view.silent});

                q.resolve();
            });
        }
        else
        {
            q.resolve();
        }

        return q.promise;
    };

    return IonicConfiguration;
});