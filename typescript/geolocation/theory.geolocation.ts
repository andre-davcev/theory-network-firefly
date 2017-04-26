
/*

'use strict';

angular.module('theory.geobackground', []).

factory('GeoBackground', function($cordovaLocalNotification, $log, TNObject)
{
    var
    GeoBackground = function(options)
    {
        GeoBackground.parent.call(this,
        {
            config :
            {
                desiredAccuracy                      : 10,
                stationaryRadius                     : 1,
                distanceFilter                       : 5,
                debug                                : false,                   // Enable this hear sounds for background-geolocation life-cycle
                locationUpdateInterval               : 10000,
                minimumActivityRecognitionConfidence : 80,                      // Percentage
                fastestLocationUpdateInterval        : 10000,
                activityRecognitionInterval          : 10000,
                stopTimeout                          : 0,
                stopOnTerminate                      : false,                   // Enable this to clear background location settings when the app terminates
                activityType                         : 'AutomotiveNavigation',

                notificationTitle                    : 'Background tracking',   // [Android] Customize the title of the notification
                notificationText                     : 'ENABLED',               // [Android] Customize the text of the notification
                forceReload                          : true,                    // [Android] If the user closes the app while tracking is started, reboot app (WARNING: possibly distruptive to user)
                startOnBoot                          : true,                    // [Android] Auto start background-service in headless mode when device is powered-up.
                headers                              : {'X-Foo' : 'BAR'},       // [Android] Optional HTTP headers sent to your configured #url when persisting locations

                disableElasticity                    : false                     // [iOS] Set true to disable speed-based distanceFilter elasticity
            },

            location:
            {
                latitude  : undefined,
                longitude : undefined
            },

            locationFound : false,
            detectMotion  : true,
            radius        : 35
        });

        this.options(options);
    };

    TNInheritance.extend(GeoBackground, TNObject);

    GeoBackground.prototype.start = function(options, config)
    {
        var
        self       = this,
        bgGeo      = options.bgGeo = window.BackgroundGeolocation,
        properties = this.options(options);

        angular.extend(properties.config, config);

        console.log(properties);

        bgGeo.configure(function(location)
        {
            console.log(location);
            self.locationChanged(location);
        },

        function(error)
        {
            console.log(error);
            self.locationFailed(error);
        }, properties.config);

        bgGeo.start();

        if (properties.detectMotion)
        {
            bgGeo.onMotionChange(self.onMotionChange);
        }
    };

    GeoBackground.prototype.locationChanged = function(location)
    {
        var
        properties = this.properties;

        angular.extend(properties.location, location.coords);

        properties.locationFound = true;
    };

    GeoBackground.prototype.locationFailed = function(error)
    {
        $log.error('BackgroundGeoLocation error');
    };

    GeoBackground.prototype.stop = function()
    {
        this.properties.bgGeo.finish();
    };

    GeoBackground.prototype.location = function(location)
    {
        if (location)
        {
            this.properties.location = location;
        }

        return this.properties.location;
    };

    GeoBackground.prototype.locationFound = function()
    {
        return this.properties.locationFound;
    };

    GeoBackground.prototype.onMotionChange = function(isMoving, location, taskId)
    {

    };

    return GeoBackground;
});

*/