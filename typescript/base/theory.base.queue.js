'use strict';

angular.module('theory.base').

factory('TNQueue', function(TNObject)
{
    var
    TNQueue = function(options)
    {
        TNQueue.parent.call(this,
        {
            oldest : 0,
            newest : 0,
            queue  : {}
        });

        this.options(options);
    };

    TNInheritance.extend(TNQueue, TNObject);

    TNQueue.prototype.size = function()
    {
        var
        properties = this.properties;

        return properties.newest - properties.oldest;
    };

    TNQueue.prototype.enqueue = function(data)
    {
        var
        properties = this.properties;

        properties.queue[properties.newest] = data;

        properties.newest++;
    };

    TNQueue.prototype.dequeue = function()
    {
        var
        properties = this.properties,
        oldest     = properties.oldest,
        newest     = properties.newest,
        deleted;

        if (oldest !== newest)
        {
            deleted = properties.queue[oldest];

            delete properties.queue[oldest];

            properties.oldest++;

            return deleted;
        }
    };

    return TNQueue;
});