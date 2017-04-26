/*

factory('GoogleMaps', function($q, $timeout, $ionicPlatform, TNObject, TNController, uiGmapIsReady)
{
    var
    GoogleMaps = function(options)
    {
        var
        defaults =
        {
            zoom       : 13,
            centerType : 'position',            // position, location, or bounds
            events :
            {
                bounds_changed     : false,     // Fired when the viewport bounds have changed.
                center_changed     : false,     // Fired when the map center property changes.
                click              : false,     // Fired when the user clicks on the map (but not when they click on a marker or infowindow).
                dblclick           : false,     // Fired when the user double-clicks on the map. Note that the click event will also fire, right before this one.
                drag               : false,     // Repeatedly fired while the user drags the map.
                dragend            : false,     // Fired when the user stops dragging the map.
                dragstart          : false,     // Fired when the user starts dragging the map.
                heading_changed    : false,     // Fired when the map heading property changes.
                idle               : false,     // Fired when the map becomes idle after panning or zooming.
                maptypeid_changed  : false,     // Fired when the mapTypeId property changes.
                mousemove          : false,     // Fired whenever the user's mouse moves over the map container.
                mouseout           : false,     // Fired when the user's mouse exits the map container.
                mouseover          : false,     // Fired when the user's mouse enters the map container.
                projection_changed : false,     // Fired when the projection has changed.
                resize             : false,     // Developers should trigger this event on the map when the div changes size: google.maps.event.trigger(map, 'resize') .
                rightclick         : false,     // Fired when the DOM contextmenu event is fired on the map container.
                tilesloaded        : false,     // Fired when the visible tiles have finished loading.
                tilt_changed       : false,     // Fired when the map tilt property changes.
                zoom_changed       : false      // Fired when the map zoom property changes.
            },

            scopeKey : 'map',

            centerOnPosition : true
        };

        GoogleMaps.parent.call(this);

        this.options(defaults);
        this.options(options);

        this.initialize();
    };

    TNInheritance.extend(GoogleMaps, TNObject);

    GoogleMaps.prototype.initialize = function()
    {
        angular.extend(this,
        {
            api       : google.maps,
            places    : google.maps.places,
            maps      : [],
            queue     : [],
            zoomScale :
            [
                591657550.500000,
                295828775.300000,
                147914387.600000,
                73957193.820000,
                36978596.910000,
                18489298.450000,
                9244649.227000,
                4622324.614000,
                2311162.307000,
                1155581.153000,
                577790.576700,
                288895.288400,
                144447.644200,
                72223.822090,
                36111.911040,
                18055.955520,
                9027.977761,
                4513.988880,
                2256.994440,
                1128.497220
            ]
        });
    };

    GoogleMaps.prototype.map = function(options)
    {
        var
        self       = this,
        properties = this.properties,
        q          = $q.defer(),
        mapPromise = $q.defer(),
        map        = this.current,
        maps       = this.maps,
        api        = this.api,
        index,
        events,
        element,
        position,
        scope,
        centerType,
        scopeKey,
        centerOnPosition,
        center,

        setMap = function(control)
        {
            self.control = control;

            element = map.element = control.getGMap();

            angular.forEach(events, function(value, eventName)
            {
                if (value)
                {
                    api.event.addListener(element, eventName, function(event)
                    {
                        self[eventName](this, event);
                    });

                    TNController.mapEvent(scope, element, eventName);
                }
            });

            if (options.locations)
            {
                self.locations(options.locations);
            }
            else if (!self.locations)
            {
                self.locations = {};
            }

            maps.push(map);

            mapPromise.resolve(map);
        };

        if (options)
        {
            index  = options.index;
            center = options.centerOnPosition;

            centerOnPosition = angular.isDefined(options.centerOnPosition) ? options.centerOnPosition : properties.centerOnPosition;

            map   = options.properties ? angular.copy(options.properties) : {};
            scope = map.scope = options.scope;

            map.position = options.position;

            if (centerOnPosition)
            {
                map.center = angular.copy(map.position);
            }

            if (angular.isDefined(index))
            {
                map = maps[index];

                mapPromise.resolve(map);
            }

            index = maps.length;

            angular.extend(map,
            {
                index      : index,
                showWindow : false
            });

            if (!angular.isDefined(map.zoom))
            {
                map.zoom = this.property('zoom');
            }

            if (!$ionicPlatform.is('cordova') && angular.isDefined(map.options.zoomControl) && !map.options.zoomControl)
            {
                map.options.zoomControl = true;
            }

            events          = angular.copy(this.property('events'));
            centerType      = options.centerType ? options.centerType : this.property('centerType');
            position        = map.position;
            scopeKey        = this.property('scopeKey');
            map.bounds      =
            {
                northeast : angular.copy(position),
                southwest : angular.copy(position)
            };

            if (centerType === 'bounds')
            {
                events.bounds_changed = true;
            }

            angular.extend(events, options.events);

            this.current = scope[scopeKey] = map;

            if (options.locations)
            {
                self.queue  = options.locations;
                events.idle = true;
            }

            if (self.control)
            {
                scope.$watch('map.control', function(control)
                {
                    if (control && control.getGMap && control !== self.control)
                    {
                        setMap(control);
                    }
                });
            }
            else
            {
                uiGmapIsReady.promise().then(function()
                {
                    setMap(map.control);
                });
            }
        }
        else
        {
            mapPromise.resolve(map);
        }

        $q.all([mapPromise.promise]).then(function()
        {
            q.resolve(map);
        },
        function()
        {
            q.reject();
        });

        return q.promise;
    };

    // Get the map radius
    GoogleMaps.prototype.radius = function()
    {
        var
        bounds             = this.current.element.getBounds(),
        center             = bounds.getCenter(),
        northeast          = bounds.getNorthEast(),
        earthRadius        = 3963.0,
        degreesToRadians   = 57.2958,
        centerLatitude     = center.lat()    / degreesToRadians,
        centerLongitude    = center.lng()    / degreesToRadians,
        northeastLatitude  = northeast.lat() / degreesToRadians,
        northeastLongitude = northeast.lng() / degreesToRadians,
        radius             = earthRadius * Math.acos(Math.sin(centerLatitude) * Math.sin(northeastLatitude) + Math.cos(centerLatitude) * Math.cos(northeastLatitude) * Math.cos(northeastLongitude - centerLongitude));

        return radius;
    };

    // Get the map center coordinates
    GoogleMaps.prototype.location = function(element)
    {
        var
        location = {},
        map      = this.current,
        center   = map.element.getBounds().getCenter();

        location.radius    = this.radius();
        location.latitude  = center.lat();
        location.longitude = center.lng();

        return location;
    };

    GoogleMaps.prototype.details = function(options)
    {
        var
        self     = this,
        location = options.place,
        q        = $q.defer(),
        service;

        service = new this.places.PlacesService(this.current.element);

        this.current.showWindow = true;

        service.getDetails({reference : location.reference}, function(place, status)
        {
            if (status === self.places.PlacesServiceStatus.OK)
            {
                q.resolve(place);
            }
        });

        return q.promise;
    };

    GoogleMaps.prototype.search = function(options)
    {
        var
        locations,
        query    = options.query,
        q        = $q.defer(),
        element  = this.current.element,
        places   = this.places,
        service  = new places.PlacesService(element),
        location = this.location(),

        request =
        {
            location : new this.api.LatLng(location.latitude, location.longitude),
            radius   : location.radius,
            query    : query
        };

        service.textSearch(request, function(results, status)
        {
            locations = [];

            if (status === places.PlacesServiceStatus.OK)
            {
                locations = results;
            }

            q.resolve(locations);
        });

        return q.promise;
    };

    // For an array of locations containing latitude and longitude properties,
    // use the Google Maps bounds API method to get the maps bounds
    GoogleMaps.prototype.bounds = function(locations)
    {
        var
        api    = this.api,
        bounds = new api.LatLngBounds();

        angular.forEach(locations, function(location)
        {
            bounds.extend(new api.LatLng(location.latitude, location.longitude));
        });

        return bounds;
    };

    GoogleMaps.prototype.clearLocations = function()
    {
        var
        map = this.current;

        map.locations = [];
        map.pins      = [];
    };

    GoogleMaps.prototype.locations = function(locations, clear)
    {
        if (clear)
        {
            this.clearLocations();
        }

        var
        map  = this.current,
        bounds,
        center,
        northeast,
        southwest,
        existing = map.locations,
        pins     = angular.isDefined(map.pins) ? map.pins : [];

        if (!existing)
        {
            existing = angular.isArray(locations) ? [] : {};
        }

        angular.forEach(locations, function(location, key)
        {
            existing[key] = location;

            location.coordinates =
            {
                latitude  : location.latitude,
                longitude : location.longitude
            };

            pins.push({latitude : location.latitude, longitude : location.longitude, pin : location.pin, key : key, name : location.name, place_id : location.place_id, reference : location.reference});
        });

        if (pins.length > 0)
        {
            bounds     = this.bounds(pins);
            center     = bounds.getCenter();
            northeast  = bounds.getNorthEast();
            southwest  = bounds.getSouthWest();

            map.bounds =
            {
                northeast :
                {
                    latitude  : northeast.lat(),
                    longitude : northeast.lng()
                },

                southwest :
                {
                    latitude  : southwest.lat(),
                    longitude : southwest.lng()
                }
            };

            if (this.centerType === 'bounds')
            {
                map.center =
                {
                    latitude  : center.lat(),
                    longitude : center.lng()
                };
            }
        }

        map.locations = existing;
        map.pins      = pins;

        this.refresh();
    };

    // Refresh the map
    GoogleMaps.prototype.refresh = function()
    {
        var
        self = this,
        map  = this.current;

        map.control.refresh();

        $timeout(function()
        {
            self.api.event.trigger(map.element, 'resize');
        });
    };

    // Go through the location/place details and create human readable open hours
    GoogleMaps.prototype.formatHours = function(location)
    {
        var
        current,
        open,
        openHours,
        openMinutes,
        openMeridian,
        openTime,
        close,
        closeHours,
        closeMinutes,
        closeMeridian,
        day,
        pad           = '00',
        weekdays      = [],
        opening_hours = location.opening_hours,
        hours         = opening_hours.periods,
        length        = hours.length;

        // Set the open now flag
        weekdays.open = opening_hours.open_now;

        // For each day of the week
        for (var i = 0; i < length; i++)
        {
            day         = {};
            current     = hours[i];
            open        = current.open;
            openHours   = open.hours;
            openMinutes = open.minutes;
            openTime    = open.time;
            close       = current.close;

            // If the place is open all day
            if (!(close) && day === 0 && openTime === '0000')
            {
                day.display = 'All Day';
            }
            // Otherwise get the close time
            else
            {
                closeHours   = close.hours;
                closeMinutes = close.minutes;
            }

            // Get the open time
            openMinutes  = '' + openMinutes;
            closeMinutes = '' + closeMinutes;

            // Pad the open minutes
            openMinutes  = pad.substring(0, pad.length - openMinutes.length) + openMinutes;
            closeMinutes = pad.substring(0, pad.length - closeMinutes.length) + closeMinutes;

            // Set whether open hours are in the AM or PM
            openMeridian = 'AM';
            if (openHours >= 12)
            {
                openMeridian = 'PM';
                openHours    -= 12;
            }

            // Set whether the close hours are in the AM or PM
            closeMeridian = 'AM';
            if (closeHours >= 12)
            {
                closeMeridian = 'PM';
                closeHours   -= 12;
            }

            // Set the days open hours in human readable format
            day.display = '' + openHours + ':' + openMinutes + ' ' + openMeridian + ' - ' + closeHours + ':' + closeMinutes + ' ' + closeMeridian;

            weekdays[i] = day;
        }

        // Return the weekdays
        return weekdays;
    };

    // Fired when the viewport bounds have changed
    GoogleMaps.prototype.bounds_changed = function(mapObject, event)
    {
        var
        map     = this.current,
        element = map.element,
        zoom    = map.zoom = mapObject.getZoom(),
        api     = this.api;

        map.scale = this.zoomScale[zoom];

        $timeout(function()
        {
            api.event.trigger(element, 'resize');
        });
    };

    // Fired when the map center property changes
    GoogleMaps.prototype.center_changed = function(mapObject, event)
    {

    };

    // Fired when the user clicks on the map (but not when they click on a marker or infowindow)
    GoogleMaps.prototype.click = function(mapObject, event)
    {
        var
        self = this,
        map  = this.current;

        map.showWindow = false;

        $timeout(function()
        {
            self.api.event.trigger(map.element, 'resize');
        });
    };

    // Fired when the user double-clicks on the map. Note that the click event will also fire, right before this one.
    GoogleMaps.prototype.dblclick = function(mapObject, event)
    {

    };

    // Repeatedly fired while the user drags the map
    GoogleMaps.prototype.drag = function(mapObject, event)
    {

    };

    // When the user stops dragging the map
    GoogleMaps.prototype.dragend = function(mapObject, event)
    {

    };

    // Fired when the user starts dragging the map
    GoogleMaps.prototype.dragstart = function(mapObject, event)
    {

    };

    // Fired when the map heading property changes
    GoogleMaps.prototype.heading_changed = function(mapObject, event)
    {

    };

    // Fired when the map becomes idle after panning or zooming
    GoogleMaps.prototype.idle = function(mapObject, event)
    {
        var
        queue = this.queue;

        if (queue.length > 0)
        {
            this.locations(queue);
        }
    };

    // Fired when the mapTypeId property changes
    GoogleMaps.prototype.maptypeid_changed = function(mapObject, event)
    {

    };

    // Fired whenever the user's mouse moves over the map container
    GoogleMaps.prototype.mousemove = function(mapObject, event)
    {

    };

    // Fired when the user's mouse exits the map container
    GoogleMaps.prototype.mouseout = function(mapObject, event)
    {

    };

    // Fired when the user's mouse enters the map container
    GoogleMaps.prototype.mouseover = function(mapObject, event)
    {

    };

    // Fired when the projection has changed
    GoogleMaps.prototype.projection_changed = function(mapObject, event)
    {

    };

    // Developers should trigger this event on the map when the div changes size: google.maps.event.trigger(map, 'resize')
    GoogleMaps.prototype.resize = function(mapObject, event)
    {

    };

    // Fired when the DOM contextmenu event is fired on the map container
    GoogleMaps.prototype.rightclick = function(mapObject, event)
    {

    };

    // Fired when the visible tiles have finished loading
    GoogleMaps.prototype.tilesloaded = function(mapObject, event)
    {

    };

    // Fired when the map tilt property changes
    GoogleMaps.prototype.tilt_changed = function(mapObject, event)
    {

    };

    // Fired when the map zoom property changes
    GoogleMaps.prototype.zoom_changed = function(mapObject, event)
    {

    };

    return GoogleMaps;
});
*/