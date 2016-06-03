'use strict';

angular.module('theory.base').

factory('TNNode', function(TNObject)
{
    var
    TNNode = function(options)
    {
        TNNode.parent.call(this,
        {
            value    : null,
            next     : null,
            previous : null
        });

        this.options(options);
    };

    TNInheritance.extend(TNNode, TNObject);

    return TNNode;
});