'use strict';

angular.module('theory.filters').

filter('interpolate', function(version)
{
    var
   interpolate = function(text)
   {
       return String(text).replace(/\%VERSION\%/mg, version);
   };

    return interpolate;
});