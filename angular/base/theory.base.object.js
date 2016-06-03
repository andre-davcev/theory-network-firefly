'use strict';

angular.module('theory.base').

factory('TNObject', function()
{
    var
    TNObject = function(options)
    {
        this.properties = {};

        this.options(options);
    };

    TNInheritance.extend(TNObject, Object);

    TNObject.prototype.options = function(options)
    {
        if (options)
        {
            angular.extend(this.properties, options);
        }

        return this.properties;
    };

    TNObject.prototype.property = function(key, property)
    {
        var
        value;

        if (angular.isDefined(property))
        {
            this.properties[key] = property;
        }

        if (angular.isDefined(key))
        {
            value = this.properties[key];
        }

        return value;
    };

    return TNObject;
});