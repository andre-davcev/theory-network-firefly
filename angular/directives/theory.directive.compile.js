'use strict';

angular.module('theory.directives').

directive('tnCompile', function($compile)
{
    var
    tnCompile =
    {
        restrict : 'A',

        link : function(scope, element, attributes)
        {
            element.html(attributes.tnCompile);
            $compile(element.contents())(scope);
        }
    };

    return tnCompile;
});