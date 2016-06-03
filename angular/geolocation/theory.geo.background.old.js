'use strict';

angular.module('theory.geobackground', []).

factory('GeoBackground', function($cordovaToast, $cordovaLocalNotification, $rootScope, TNObject, TNFirebaseObject, User, FIREBASE_URL, SERVICE_GEOFIRE, $firebaseArray, Notifications, SERVICE_LOCATIONS,
    SERVICE_SUBSCRIBED, SERVICE_USERS, SERVICE_ALERTS, SERVICE_SUBSCRIPTIONS)
{
    var
    bgGeo,
    firebaseRef = new Firebase(FIREBASE_URL + SERVICE_GEOFIRE),
    geoFire = new GeoFire(firebaseRef),
    blank = {},

    geoBackgroundObject = new TNFirebaseObject(
    {
        blank : blank,
        url   : SERVICE_GEOFIRE
    }),

    GeoBackground = function(options)
    {
        var
        defaults =
        {
            configuration:
            {
                url: 'https://1388625286411.firebaseio.com/mylocations/' + User.current().username + '.json', // <-- Android ONLY:  your server url to send locations to
                params:
                {
                    auth_token: 'user_secret_auth_token', //  <-- Android ONLY:  HTTP POST params sent to your server when persisting locations.
                    xer       : User.current().username //  <-- Android ONLY:  HTTP POST params sent to your server when persisting locations.
                },
                headers:
                { // <-- Android ONLY:  Optional HTTP headers sent to your configured #url when persisting locations
                    'X-Foo': 'BAR'
                },
                desiredAccuracy: 10,
                stationaryRadius: 1,
                distanceFilter: 5,
                notificationTitle: 'Background tracking', // <-- android only, customize the title of the notification
                notificationText: 'ENABLED', // <-- android only, customize the text of the notification
                debug: false, // <-- enable this hear sounds for background-geolocation life-cycle.
                disableElasticity: false, // <-- [iOS] Default is 'false'.  Set true to disable speed-based distanceFilter elasticity
                locationUpdateInterval: 10000,
                minimumActivityRecognitionConfidence: 80, // percentage
                fastestLocationUpdateInterval: 10000,
                activityRecognitionInterval: 10000,
                stopTimeout: 0,
                forceReload: true, // <-- [Android] If the user closes the app **while location-tracking is started** , reboot app (WARNING: possibly distruptive to user)
                stopOnTerminate: false, // <-- enable this to clear background location settings when the app terminates
                // <-- [Android] Allow the background-service to run headless when user closes the app.
                startOnBoot: true, // <-- [Android] Auto start background-service in headless mode when device is powered-up.
                activityType: 'AutomotiveNavigation'
            },

            location:
            {
                latitude  : undefined,
                longitude : undefined
            },

            killOnChange: false,

            locationFound: false
        };

        //$cordovaToast.showShortCenter('configuring for user: ' + User.current().username);

        GeoBackground.parent.call(this);

        if (options.distanceFilter)
        {
            defaults.configuration.distanceFilter = options.distanceFilter;
        }

        this.options(defaults);
        this.options(options);
    };

    TNInheritance.extend(GeoBackground, TNObject);

    GeoBackground.prototype.start = function(options)
    {
        $cordovaToast.showShortCenter('starting geobackground');
        bgGeo = window.BackgroundGeolocation;

        var
            self = this;

        var configProperties = self.property('configuration');$cordovaToast.showShortCenter('location chnaged!!!!!' + JSON.stringify(location));

        $cordovaToast.showShortCenter('distance' + JSON.stringify(configProperties));

        bgGeo.configure(function(location)
        {
            self.locationChanged(self, location);
        },

            function(error)
            {
                self.locationFailed(self, error);
            }, self.property('configuration'));

        var mySubscribedUrl = User.url() + '/' + User.current().$id + '/subscribed';
        var mySubscribedRef = new Firebase(mySubscribedUrl);
        var mySubscribedSubscriptions = $firebaseArray(mySubscribedRef);

        mySubscribedSubscriptions.$loaded().then(function()
        {
            bgGeo.start();
            bgGeo.onMotionChange(self.onMotionChange());
            //bgGeo.finish(taskId);
            //bgGeo.changePace(true);
            //bgGeo.onStationary(self.onStationary());

        });
    };

    GeoBackground.prototype.locationChanged = function(geo, location)
    {
        //console.log('[js] BackgroundGeoLocation callback:  ' + location.latitude + ',' + location.longitude);
        $cordovaToast.showShortCenter('location chnaged!!!!!' + JSON.stringify(location));

        var
        loc = geo.property('location');
        //callback = geo.property('callback');

        loc.latitude = location.coords.latitude;
        loc.longitude = location.coords.longitude;

        $rootScope.newLocation = location;
        $rootScope.$broadcast('newLocation', location);

        var radius = 35;
        var options = this.options();

        if (options.radius)
        {
            radius = options.radius;
        }

        var geoQuery = geoFire.query({
            center: [Number(loc.latitude), Number(loc.longitude)],
            radius: radius //kilometers
        });

        /*var onReadyRegistration = geoQuery.on("ready", function() {
            //console.log("GeoQuery has loaded and fired all other events for initial data");
        });*/

        geoQuery.on('key_entered', function(key, location, distance)
        {
            console.log(key + ' entered query at ' + location + ' (' + distance + ' km from center)');
            //$cordovaToast.showShortCenter(key + " entered query at " + location + " (" + distance + " km from center)");
            var alertObject,
                subscriptionObject;
            var locationKeys = {};
            var locationKey = {};
            locationKey[key] = key;

            angular.extend(locationKeys, locationKey);

            var locationObject = geoBackgroundObject.objectRefHelper(SERVICE_LOCATIONS + '/' + key);

            locationObject.$loaded().then(function()
            {
                if (locationObject.subscriptionID !== undefined)
                {
                    $cordovaToast.showShortCenter('subscriptionKey: ' + locationObject.subscriptionID);
                    //check if user subscribed to this subscription
                    var subscribedObject = geoBackgroundObject.objectRefHelper(SERVICE_USERS + '/' + User.current().$id + '/' +
                        SERVICE_SUBSCRIBED + '/' + locationObject.subscriptionID);

                    subscribedObject.$loaded().then(function()
                    {
                        if (subscribedObject.$value)
                        {
                            //found subscribed object
                            $cordovaToast.showShortCenter('subsribed to: ' + subscribedObject.$value);
                            //look for pre-existing alerts and don't alert if if found
                            alertObject = geoBackgroundObject.objectRefHelper(SERVICE_USERS + '/' + User.current().$id + '/' +
                                SERVICE_ALERTS + '/' + locationObject.subscriptionID);
                            alertObject.$loaded().then(function()
                            {
                                if (!alertObject.subscriptionRef)
                                {
                                    //get this subscription
                                    var subscriptionUrl = SERVICE_SUBSCRIPTIONS + '/' + locationObject.subscriptionID;
                                    console.log('subscriptionUrl: ' + subscriptionUrl);
                                    subscriptionObject = geoBackgroundObject.objectRefHelper(subscriptionUrl);
                                    console.log('looking for subscription: ' + locationObject.subscriptionID);

                                    subscriptionObject.$loaded().then(function()
                                    {
                                        console.log('creating alert for: ' + subscriptionObject);
                                        if (subscriptionObject.$id)
                                        {
                                            //send push notification by storing in notifications object
                                            var newNotification =
                                            {
                                                userId              : User.current().$id,
                                                subscriptionId      : locationObject.subscriptionID,
                                                isBeacon            : false,
                                                notificationMessage : subscriptionObject.description,
                                                title               : 'Found Subscription!'
                                            };
                                            //store alert so user doesn't get alerted again
                                            var now = new Date();
                                            alertObject.subscriptionRef = locationObject.subscriptionID;
                                            alertObject.alertTime = now.getTime();
                                            alertObject.isBeacon = false;
                                            alertObject.$save();

                                            $cordovaLocalNotification.schedule(

                                                {
                                                    id    : locationObject.subscriptionID,
                                                    title : 'Found Subscription!',
                                                    text  : subscriptionObject.description,
                                                    data  :
                                                    {
                                                        customProperty: 'custom value'
                                                    }
                                                }

                                            ).then(function(result)
                                            {
                                            });

                                            Notifications.saveNotification(newNotification);

                                        }
                                        else
                                        {
                                            console.log('already alerted');
                                        }
                                    });
                                }
                                else
                                {
                                    console.log('already alerted');
                                }
                            });
                        }
                    });
                }
            });

            if (geo.property('killOnChange'))
            {
                $cordovaToast.showShortCenter('killed!!!!!');
                geo.stop();
            }

        });
    };

    GeoBackground.prototype.locationFailed = function(geo, error)
    {
        console.log('BackgroundGeoLocation error');
    };

    GeoBackground.prototype.stop = function()
    {
        $cordovaToast.showShortCenter('stopped!!!!!');
        bgGeo.finish();
    };

    GeoBackground.prototype.onStationary = function(location)
    {
        //$cordovaToast.showShortCenter('stationary!!!!!');
    };

    GeoBackground.prototype.onMotionChange = function(isMoving, location, taskId)
    {
        if (isMoving)
        {
            $cordovaToast.showShortCenter('Device has just started MOVING', location);
        }
        else
        {
            $cordovaToast.showShortCenter('Device has just STOPPED', location);
        }
    };

    return GeoBackground;
});