'use strict';

angular.module('theory.base').

factory('TNStack', function(TNObject)
{
    var
    TNStack = function(options)
    {
        TNStack.parent.call(this,
        {
            size  : 0,
            stack : {}
        });

        this.options(options);
    };

    TNInheritance.extend(TNStack, TNObject);

    TNStack.prototype.push = function(data)
    {
        var
        properties = this.properties,
        index      = properties.size;

        properties.size++;

        properties.stack[index] = data;
    };

    TNStack.prototype.pop = function()
    {
        var
        properties = this.properties,
        index      = properties.size - 1,
        stack      = properties.stack,
        deleted;

        if (index >= 0)
        {
            deleted = stack[index];
            delete stack[index];
            properties.size--;

            return deleted;
        }
    };

    return TNStack;
});