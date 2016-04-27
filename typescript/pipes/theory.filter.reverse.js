'use strict';

angular.module('theory.filters').

filter('reverse', function()
{
    var
	reverse = function(items)
	{
    return items.slice().reverse();
	};

    return reverse;
});