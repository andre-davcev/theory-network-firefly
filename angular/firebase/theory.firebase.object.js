'use strict';

angular.module('theory.firebase').

factory('TNFirebaseObject', function($firebaseObject, $firebaseArray, $q, TNObject, FIREBASE_URL)
{
    var
    TNFirebaseObject = function(options)
    {
        var
        defaults =
        {
            all               : false,
            blank             : {},
            url               : undefined,
            firebaseReference : undefined,
            objects           : undefined,
            objectsRef        : undefined,
            objectRef         : undefined,
            currentKey        : undefined,
            current           : undefined,
            currentRef        : undefined,
            currentSaved      : undefined,
            scopeKey          : undefined,
            master            : undefined
        };

        TNFirebaseObject.parent.call(this);

        this.options(defaults);
        this.options(options);

        this.init(options);
    };

    TNInheritance.extend(TNFirebaseObject, TNObject);

    TNFirebaseObject.prototype.init = function(options)
    {
        this.reset();

        this.url(this.properties.url);
    };

    TNFirebaseObject.prototype.blank = function()
    {
        return this.properties.blank;
    };

    TNFirebaseObject.prototype.reset = function()
    {
        var
        properties = this.properties;

        properties.objects    = {};
        properties.objectsRef = {};

        this.resetCurrent();
    };

    TNFirebaseObject.prototype.resetCurrent = function()
    {
        var
        properties = this.properties;

        properties.current      = {};
        properties.currentKey   = '';
        properties.currentSaved = false;
    };

    TNFirebaseObject.prototype.objects = function(key)
    {
        var
        properties = this.properties;

        if (angular.isDefined(key))
        {
            return properties.objects[key];
        }

        return properties.objects;
    };

    TNFirebaseObject.prototype.objectsRef = function()
    {
        return this.properties.objectsRef;
    };

    TNFirebaseObject.prototype.objectRef = function()
    {
        return this.properties.objectRef;
    };

    TNFirebaseObject.prototype.refHelper = function(fireURL)
    {
        if (fireURL)
        {
            var
            urlObjectUrl            = FIREBASE_URL + fireURL,
            firebaseHelperReference = new Firebase(urlObjectUrl);

            return firebaseHelperReference;
        }
        else
        {
            return this.properties.firebaseReference;
        }
    };

    TNFirebaseObject.prototype.objectRefHelper = function(fireURL)
    {
        var
        urlObjectUrl            = FIREBASE_URL + fireURL,
        firebaseHelperReference = new Firebase(urlObjectUrl);

        return $firebaseObject(firebaseHelperReference);
    };

    TNFirebaseObject.prototype.arrayRefHelper = function(fireURL)
    {
        var
        urlObjectUrl            = FIREBASE_URL + fireURL,
        firebaseHelperReference = new Firebase(urlObjectUrl);

        return $firebaseArray(firebaseHelperReference);
    };

    TNFirebaseObject.prototype.count = function()
    {
        return Object.keys(this.properties.objects).length;
    };

    TNFirebaseObject.prototype.url = function(fireURL)
    {
        var
        properties = this.properties,
        url        = properties.url;

        if (fireURL)
        {
            properties.url               = url = FIREBASE_URL + fireURL;
            properties.firebaseReference = new Firebase(url);
            properties.objectRef         = $firebaseObject(properties.firebaseReference);
        }

        return url;
    };

    TNFirebaseObject.prototype.all = function()
    {
        var
        properties = this.properties,
        q          = $q.defer(),
        objects    = $firebaseObject(properties.firebaseReference);

        this.resetCurrent();

        properties.all = true;

        objects.$loaded().then(function()
        {
            properties.objects = objects;

            q.resolve(objects);
        });

        return q.promise;
    };

    TNFirebaseObject.prototype.key = function(currKey)
    {
        var
        properties = this.properties,
        currentKey = properties.currentKey;

        if (angular.isDefined(currKey))
        {
            properties.currentKey = currentKey = currKey;
        }

        return currentKey;
    };

    TNFirebaseObject.prototype.current = function(options)
    {
        var
        properties = this.properties,
        current    = properties.current;

        if (options)
        {
            var
            key      = options.key,
            scope    = options.scope,
            value    = options.value,
            valueRef = options.valueRef,
            q;

            if (key)
            {
                properties.currentKey = key;

                if (key === -1)
                {
                    properties.currentSaved = false;

                    if (Object.keys(current).length === 0 || options.fresh)
                    {
                        properties.current = current = angular.copy(properties.blank);
                    }

                    if (scope)
                    {
                        q = $q.defer();

                        q.resolve(current);

                        return q.promise;
                    }
                }
                else
                {
                    properties.currentSaved = true;

                    if (angular.isDefined(value))
                    {
                        properties.current = current = value;

                        properties.objects[key] = value;

                        if (valueRef)
                        {
                            properties.objectsRef[key] = valueRef;
                        }
                    }
                    else
                    {
                        properties.current    = current = properties.objects[key];
                        properties.currentRef = properties.objectsRef[key];
                    }

                    if (scope)
                    {
                        q = $q.defer();

                        /*
                                                current.$bindTo(scope, options.scopeKey).then(function()
                                                {
                                                    q.resolve(current);
                                                });
*/
                        q.resolve(current);

                        return q.promise;
                    }
                }
            }
            else
            {
                q = $q.defer();
                properties.current = current = options;
                q.resolve(current);

                return q.promise;
            }
        }

        return current;
    };

    TNFirebaseObject.prototype.currentFirebaseObject = function(object)
    {
        var
        properties = this.properties;

        if (object)
        {
            properties.firebaseObject = object;
        }

        return properties.firebaseObject;
    };

    TNFirebaseObject.prototype.saved = function(isSaved)
    {
        var
        properties   = this.properties,
        currentSaved = properties.currentSaved,
        saved;

        if (angular.isDefined(isSaved))
        {
            properties.currentSaved = currentSaved = isSaved;
        }

        saved = currentSaved;

        if (properties.master)
        {
            saved = properties.master.saved();
        }

        return saved;
    };

    TNFirebaseObject.prototype.item = function(key)
    {
        return this.properties.objects[key];
    };

    TNFirebaseObject.prototype.get = function(options)
    {
        var
        self       = this,
        properties = this.properties,
        q          = $q.defer(),
        i,
        total,
        keys;

        if (options)
        {
            keys = options.keys;

            self.reset();

            if (keys)
            {
                i     = 0;
                total = Object.keys(keys).length;

                if (total > 0)
                {
                    angular.forEach(keys, function(key)
                    {
                        self.find(key).then(function()
                        {
                            i++;

                            if (i === total)
                            {
                                q.resolve(properties.objects);
                            }
                        });
                    });
                }
                else
                {
                    q.resolve(properties.objects);
                }
            }
            else
            {
                self.all().then(function()
                {
                    q.resolve(properties.objects);
                });
            }
        }
        else
        {
            q.resolve(properties.objects);
        }

        return q.promise;
    };

    TNFirebaseObject.prototype.object = function(key)
    {
        var
        curr,
        properties = this.properties;

        if (key === -1)
        {
            properties.currentSaved = false;
            curr                    = angular.copy(properties.blank);
        }
        else
        {
            properties.currentSaved = true;
            curr                    = properties.objects[key];
        }

        this.current(curr);

        return curr;
    };

    TNFirebaseObject.prototype.find = function(key)
    {
        var
        properties = this.properties,
        q          = $q.defer(),
        objURL     = properties.url + '/' + key,
        fire       = new Firebase(objURL),
        object     = $firebaseObject(fire);
        //            object    = reference.$asObject();

        object.$loaded().then(function(data)
        {
            properties.objectsRef[key] = fire;
            properties.objects[key]    = object;

            q.resolve(object);
        });

        return q.promise;
    };

    TNFirebaseObject.prototype.delete = function(key)
    {
        var
        properties = this.properties,
        q          = $q.defer();

        if (!(angular.isDefined(key)))
        {
            key = properties.current.$id;
        }

        if (properties.objects[key])
        {
            properties.objects[key].$destroy();
        }

        properties.objectRef.$remove(key).then(function()
        {
            q.resolve();
        });

        /*
                if (objects)
                {
                    objects[key].$remove(key).then(function()
                    {
                        q.resolve();
                    });
                }
                else
                {
                    self.find(key).then(function(object)
                    {
                        object.$remove(key).then(function()
                        {
                            q.resolve();
                        });
                    });
                }
*/

        return q.promise;
    };

    TNFirebaseObject.prototype.add = function(key, value, current)
    {
        var
        self       = this,
        properties = this.properties,
        q          = $q.defer(),
        objURL     = properties.url + '/' + key,
        reference  = new Firebase(objURL);

        reference.set(value, function(ref)
        {
            if (current)
            {
                self.current({key : key, value : value});
            }

            q.resolve(ref);
        });

        return q.promise;
    };

    TNFirebaseObject.prototype.prepareData = function(options)
    {

    };

    TNFirebaseObject.prototype.create = function(options)
    {
        var
        self = this,
        q    = $q.defer();

        this.prepareData(options);

        this.add(options.key, options.value).then(function(object)
        {
            if (options.current)
            {
                self.current(object);
            }

            q.resolve(object);
        });

        return q.promise;
    };

    TNFirebaseObject.prototype.set = function(options)
    {
        var
        properties = this.properties,
        q          = $q.defer(),
        key        = options.key,
        value      = options.value,
        curr       = options.current;

        if (properties.currentSaved)
        {
            if (curr)
            {
                properties.current[key] = value;

                return this.save();
            }
            else
            {
                properties.currentRef.set(value, function(ref)
                {
                    q.resolve();
                });
            }
        }
        else
        {
            if (curr)
            {
                properties.current[key] = value;
            }
            else
            {
                properties.objects[key] = value;
            }

            q.resolve();
        }

        return q.promise;
    };

    TNFirebaseObject.prototype.save = function(options)
    {
        var
        self       = this,
        properties = this.properties,
        q          = $q.defer(),
        key,
        obj;

        if (options)
        {
            obj = options.object;
        }

        if (!obj)
        {
            obj = properties.current;
        }

        obj.$save().then(function(ref)
        {
            key = ref.key();

            self.find(key).then(function(savedObject)
            {
                properties.objects[key] = savedObject;

                if (!options || !(options.object))
                {
                    properties.current    = savedObject;
                    properties.currentKey = key;
                }

                q.resolve(savedObject);
            });
        });

        return q.promise;
    };

    TNFirebaseObject.prototype.saveFirebaseObject = function(firebaseObject)
    {
        var
        self = this,
        q    = $q.defer(),
        key;

        firebaseObject.$save().then(function(ref)
        {
            key = ref.key();

            self.find(key).then(function(savedObject)
            {
                q.resolve(savedObject);
            });
        });

        return q.promise;
    };

    TNFirebaseObject.prototype.push = function(options)
    {
        var
        self       = this,
        properties = this.properties,
        q          = $q.defer(),
        obj        = angular.copy(options.object),
        newRef,
        key;

        newRef = properties.firebaseReference.push(obj, function(ref)
        {
            key = newRef.key();

            self.find(key).then(function(savedObject)
            {
                properties.objects[key]    = savedObject;
                properties.objectsRef[key] = newRef;

                if (options && options.current)
                {
                    properties.currentRef = newRef;
                    properties.current    = savedObject;
                    properties.currentKey = key;
                }

                q.resolve(key);
            });
        });

        return q.promise;
    };

    TNFirebaseObject.prototype.master = function(masterObject)
    {
        var
        properties = this.properties;

        if (masterObject)
        {
            properties.master = masterObject;
        }

        return properties.master;
    };

    return TNFirebaseObject;
});