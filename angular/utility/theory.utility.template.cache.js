'use strict';

angular.module('theory.utility').

factory('$templateCacheUtility', function($templateCache, $q, $http)
{
    var
    $templateCacheUtility = {};

    $templateCacheUtility.get = function(templateURL)
    {
        var
        q        = $q.defer(),
        template = $templateCache.get(templateURL);

        if (template)
        {
            q.resolve(template);
        }
        else
        {
            $http.get(templateURL, {cache: $templateCache}).then(function(templateObject)
            {
                $templateCache.put(templateURL, templateObject.data);
                q.resolve(templateObject.data);
            });
        }

        return q.promise;
    };

    return $templateCacheUtility;
});