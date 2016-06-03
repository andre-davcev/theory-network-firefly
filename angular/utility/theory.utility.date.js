'use strict';

angular.module('theory.utility').

factory('TNDate', function()
{
    var
    date = {};

    date.timestamp = function(options)
    {
        var
        dateTime,
        dayTime,
        timestamp,
        utc = true;

        if (options)
        {
            dayTime = options.date;

            if (angular.isDefined(options.utc))
            {
                utc = options.utc;
            }
        }

        if (dayTime)
        {
            dateTime = dayTime;
        }
        else
        {
            dateTime = new Date();
        }

        if (utc)
        {
            timestamp = Date.UTC(dateTime.getUTCFullYear(), dateTime.getUTCMonth(), dateTime.getUTCDate(), dateTime.getUTCHours(), dateTime.getUTCMinutes(), dateTime.getUTCSeconds(), dateTime.getUTCMilliseconds());
        }
        else
        {
            timestamp = '' + dateTime.getFullYear() + dateTime.getMonth() + 1 + dateTime.getDate() + dateTime.getHours() + dateTime.getMinutes() + dateTime.getSeconds();
        }

        return timestamp;
    };

    date.timezone = function()
    {
        new Date().getTimezoneOffset();
    };

    date.parseTime = function(timeString)
    {
        var
        components = timeString.split(':');

        return new Date(1970, 0, 1, parseInt(components[0]), parseInt(components[1]), parseInt(components[2]));
    };

    date.parseTimeDate = function(time)
    {
        return '' + time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds();
    };

    return date;
});