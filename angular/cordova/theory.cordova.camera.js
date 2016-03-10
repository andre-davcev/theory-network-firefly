'use strict';

angular.module('theory.cordova').

factory('TNCordovaCamera', function($q)
{
    var
    camera = {};

    camera.getPicture = function(options)
    {
        var q = $q.defer();

        navigator.camera.getPicture(function(result)
        {
            // Do any magic you need
            q.resolve(result);
        },
        function(error)
        {
            q.reject(error);
        }, options);

        return q.promise;
    };

    return camera;
});