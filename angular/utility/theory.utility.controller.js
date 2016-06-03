'use strict';

angular.module('theory.utility').

factory('TNController', function($timeout, TNObject)
{
    var
    TNController = function(options)
    {
        TNController.parent.call(this, {});

        this.options(options);

        angular.extend(this,
        {
            scopes : {}
        });
    };

    TNInheritance.extend(TNController, TNObject);

    TNController.prototype.process = function(scope, type, properties)
    {
        var
        self    = this,
        scopes  = this.scopes,
        current = scopes[scope.$id];

        if (!current)
        {
            current = scopes[scope.$id] = [];

            scope.$on('$destroy', function()
            {
                angular.forEach(scopes[scope.$id], function(item)
                {
                    self[item.type + 'Delete'](item.properties);
                });

                delete scopes[scope.$id];
            });
        }

        current.push({type : type, properties : properties});
    };

    TNController.prototype.watcher = function(scope, watcher)
    {
        this.process(scope, 'watcher', watcher);
    };

    TNController.prototype.watcherDelete = function(watcher)
    {
        watcher();
    };

    TNController.prototype.timeout = function(scope, timeout)
    {
        this.process(scope, 'timeout', timeout);
    };

    TNController.prototype.timeoutDelete = function(timeout)
    {
        $timeout.cancel(timeout);
    };

    TNController.prototype.bind = function(scope, name, element)
    {
        this.process(scope, 'bind', {name : name, element : element});
    };

    TNController.prototype.bindDelete = function(bind)
    {
        bind.element.off(bind.name);
    };

    TNController.prototype.on = function(scope, name, element)
    {
        this.process(scope, 'on', {name : name, element : element});
    };

    TNController.prototype.onDelete = function(on)
    {
        if (on && on.element && on.element.on)
        {
            on.element.on(on.name, null);
        }
    };

    TNController.prototype.mapEvent = function(scope, name, element)
    {
        this.process(scope, 'mapEvent', {name : name, element : element});
    };

    TNController.prototype.mapEventDelete = function(mapEvent)
    {
        google.maps.event.clearListeners(mapEvent.element, mapEvent.name);
    };

    TNController.prototype.windowEvent = function(scope, name, func)
    {
        this.process(scope, 'windowEvent', {name : name, func : func});
    };

    TNController.prototype.windowEventDelete = function(windowEvent)
    {
        window.removeEventListener(windowEvent.name, windowEvent.func);
    };

    return new TNController();
});