//'use strict';

angular.module('theory.base').

provider('Inheritance', function()
{
    var
    factory = {},
    inheritance,

    InheritanceFactory = function()
    {

    };

    InheritanceFactory.prototype.constructor = InheritanceFactory;

    InheritanceFactory.prototype.extend = function(subClass, baseClass)
    {
        // This is a constructor that is used to setup inheritance without
        // invoking the base's constructor. It does nothing, so it doesn't
        // create properties on the prototype like our previous example did
        function Dummy()
        {

        };

        // Copy the prototype from the base to setup inheritance
        Dummy.prototype = baseClass.prototype;

        // Tricky huh?
        subClass.prototype = new Dummy();

        // Remember the constructor property was set wrong, let's fix it
        subClass.prototype.constructor = subClass;

        subClass.parent           = baseClass;
        subClass.parent.prototype = baseClass.prototype;
    };

    if (typeof exports !== 'undefined')
    {
        inheritance = exports.TNInheritance = new InheritanceFactory();
    }
    else
    {
        inheritance = window.TNInheritance = new InheritanceFactory();
    }

    factory.$get = function()
    {
        return inheritance;
    };

    return factory;
});