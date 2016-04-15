'use strict';

angular.module('theory.firebase', []).

factory('TNFirebase', function($q, TNObject)
{
    var
    TNFirebase = function(options)
    {
        TNFirebase.parent.call(this,
        {
            index     : 0,
            reload    : false,
            isNew     : false,
            name      : undefined,
            key       : undefined,
            url       : undefined,
            obj       : undefined,
            reference : undefined,
            utility   : undefined,
            parent    : undefined,
            children  : {}
        });

        this.options(options);
    };

    TNInheritance.extend(TNFirebase, TNObject);

    TNFirebase.prototype.index = function(increment)
    {
        if (angular.isDefined(increment) && increment)
        {
            this.properties.index -= 1;
        }

        return this.properties.index;
    };

    TNFirebase.prototype.reload = function(reload)
    {
        if (angular.isDefined(reload))
        {
            this.properties.reload = reload;
        }

        return this.properties.reload;
    };

    TNFirebase.prototype.isNew = function(isNew)
    {
        if (angular.isDefined(isNew))
        {
            this.properties.isNew = isNew;
        }

        return this.properties.isNew;
    };

    TNFirebase.prototype.name = function()
    {
        return this.properties.name;
    };

    TNFirebase.prototype.key = function(key)
    {
        if (angular.isDefined(key))
        {
            this.properties.key = key;
        }

        return this.properties.key;
    };

    TNFirebase.prototype.url = function(url)
    {
        if (url)
        {
            this.properties.url = url;
        }

        return this.properties.url;
    };

    TNFirebase.prototype.setAsKey = function()
    {
        this.utility.setKey({key : this.key(), name : this.name()});
    };

    TNFirebase.prototype.parent = function()
    {
        return this.properties.parent;
    };

    TNFirebase.prototype.children = function()
    {
        return this.properties.children;
    };

    TNFirebase.prototype.object = function(key)
    {
        return angular.isDefined(key) ? this.properties.obj[key] : this.properties.obj;
    };

    TNFirebase.prototype.reference = function(key)
    {
        return angular.isDefined(key) ? this.properties.reference[key] : this.properties.reference;
    };

    TNFirebase.prototype.utility = function()
    {
        return this.properties.utility;
    };

    TNFirebase.prototype.options = function(options)
    {
        var
        properties = TNFirebase.parent.prototype.options.call(this, options);

        this.obj = properties.obj;

        return properties;
    };

    TNFirebase.prototype.get = function(options)
    {
        var
        self = this,
        q    = $q.defer();

        this.properties.utility.get(this.name(options)).then(function(results)
        {
            self.options(results);

            q.resolve();
        });

        return q.promise;
    };

    TNFirebase.prototype.set = function(options)
    {
        var
        self = this,
        q    = $q.defer();

        this.properties.utility.set({item : this}).then(function(results)
        {
            self.options(results);

            q.resolve();
        });

        return q.promise;
    };

    TNFirebase.prototype.save = function(options)
    {
        var
        self = this,
        q    = $q.defer();

        this.properties.utility.save({item : this}).then(function(results)
        {
            self.options(results);

            q.resolve();
        });

        return q.promise;
    };

    TNFirebase.prototype.delete = function(options)
    {
        var
        self = this,
        q    = $q.defer();

        this.properties.utility.delete({item : this}).then(function(results)
        {
            self.options(results);

            q.resolve();
        });

        return q.promise;
    };

    return TNFirebase;
});