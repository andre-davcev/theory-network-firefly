import {Injectable} from '@angular/core';

//ToDo: $locale
//ToDo: $log

import {TNObject} from '../base/theory.base.object';

@Injectable()
export class TNFirebaseUtility extends TNObject
{
//    constructor(options?:Object)
    constructor()
    {
        super();

//        this.options(options);
    }

    service(name:string)
    {
        return this.properties['services'][name];
    }

    services(services?:Object) : Object
    {
        if (services != null)
        {
            this.properties['services'] = services;
        }

        return this.properties['services'];
    }

    provider(name:string)
    {
        return this.properties['providers'][name];
    }

    providers(providers?:Object) : Object
    {
        if (providers)
        {
            this.properties['providers'] = providers;
        }

        return this.properties['providers'];
    }

    merge(destination:Object, source:Object) : Object
    {
        let
        self = this,
        item,
        value;

        // For each item in the source object
        for (let key of Object.keys(source))
        {
            // Get the destination value
            item  = source[key];
            value = destination[key];

            // If the value is defined
            if (value != value)
            {
                // If the destination value is an object, merge it with the parallel source item
                if (value instanceof Object)
                {
                    destination[key] = self.merge(value, item);
                }
            }
            // If the destination value doesn't exist, populate it with the source object
            else
            {
                destination[key] = item;
            }
        };

        return destination;
    }

    eval(options:Object) : Object
    {
        // Split the key into pieces
        let
        separator = options['separator'] != null ? options['separator'] : '/',
        item      = options['object'],
        drilldown = options['key'].split(separator),
        key       = drilldown.shift(),
        results,
        main;

        // Cycle through the object key by key
        while (item[key] != null)
        {
            item = item[key];
            main = key;
            key  = drilldown.shift();
        }

        // If the options value is passed in
        if (options['value'] != null)
        {
            item[main] = options['value'];
        }

        // Return the key and child object
        results =
        {
            key    : main,
            object : item
        };

        return results;
    }

    setForeignTable(options:Object)
    {
        let
        item    = options['item'],
        remove  = options['remove'],
        service = this.service(item.name()),
        parent  = item.parent(),

        itemKey,
        firebase,
        firebaseDictionary,
        foreignTable,
        foreignDictionary,
        keysOld,
        key;

        // If the parent exists
        if (parent != null)
        {
            // If this is a foreign table
            if (service.foreignTable)
            {
                // Set item to the parent and the service
                firebase           = item;
                firebaseDictionary = parent;
                itemKey            = service.service;
            }
            // If the parent is a dictionary
            else if (service.parent.foreignTable && service.parent.type !== 'primitive')
            {
                // Get the parent's parent and parent key
                firebase           = parent;
                firebaseDictionary = parent.parent();
                itemKey            = this.service(parent.name()).service;

                // Add this one key to a key array
                options['keys'] = [options['key']];

                // If we're passing in an old key that means this is a new object
                if (options['keyOld'] != null)
                {
                    options['keyOld'] = [options['keyOld']];
                }
            }

            // Set the old keys if they exist
            keysOld = options['keyOld'];

            // Get the foreign key object and key
            foreignTable = this.eval({key : itemKey, object : firebaseDictionary.object()});

            // If we have a set of keys
            if (options['keys'])
            {
                // Get the foreign dictionary object
                foreignDictionary = firebase.obj;

                // Cycle over the keys
                for (let index in options['keys'])
                {
                    key = options['keys']['key'];

                    // If the remove flag is set, remove it from the foreign dictionary as well
                    if (remove)
                    {
                        // If the key is set on the foreign table (is new)
                        if (foreignTable.object[key])
                        {
                            delete foreignTable.object[key];
                        }

                        // Delete the object from foreign dictionary
                        delete foreignDictionary[key];
                    }
                    // Otherwise we're adding keys
                    else if (keysOld)
                    {
                        // Add the key to the foreign table
                        foreignTable.object[key] = key;
                        foreignDictionary[key]   = item;

                        // If we are saving a new key then remove the old key from the foreign dictionary
                        delete foreignDictionary[keysOld[index]];
                    }
                };
            }
            // Otherwise the foreign key is key value pair.  Remove or set the value
            else
            {
                foreignTable.obj[foreignTable.key] = remove ? null : options['key'];
            }
        }

        return parent;
    }
/*
    getObject(options:Object)
    {
        let
        q         = $q.defer(),
        service   = options['service'],
        url       = options['key'] != null ? service.url + '/' + options['key'] : service.url,
        reference = options['reference'] != null ? options['reference'] : new Firebase(url),
        object    = service.type === 'array' ? $firebaseArray(reference) : $firebaseObject(reference);

        // Try to load the object from firebase
        object.$loaded().then(function()
        {
            q.resolve({object : object, reference : reference, url : url});
        });

        return q.promise;
    }

    get(options:Object)
    {
        var
        self     = this,
        service  = options['service'],
        keys     = options['keys'],
        key      = options['key'],
        name     = service.name,
        promises = [],
        promise  = $q.defer(),
        children = {},
        parent   = service.parent,
        props    =
        {
            name    : service.name,
            parent  : parent ? parent.data : null,
            reload  : false,
            utility : this
        },
        child,
        firebase,
        hasKey,

        observable = Observable.create((observer) =>
        {
            setTimeout(() =>
            {
                observer.next('here');
                observer.completed();
            }, 1000);

            console.log('observation started');
        }),

        subscriber = observable.subscribe
        (
            (data) =>
            {
                console.log('data received');
            },

            (error) =>
            {
                console.log('error happened');
            },

            () =>
            {
                console.log('observation completed');
            }
        );

        // If this isn't a dictionary and we don't have a key,
        // try to get the key from an existing object
        if (keys == null && key == null && service.data != null)
        {
            key = service.data.key();
        }

        hasKey = key != null;

        // If keys are set
        if (keys)
        {
            // Get the child service properties
            child = service.children[Object.keys(service.children)[0]];

            // Loop over the keys
            for (let key of keys)
            {
                var
                q = $q.defer();

                // Get the firebase object
                self.getObject({service : service, key : key}).then(function(obj)
                {
                    // Create a new firebase object passing in the name, key, object, and reference
                    children[key] = new TNFirebase(
                    {
                        name      : child.name,
                        key       : key,
                        obj       : self.merge(obj.object, angular.copy(child.blank)),
                        reference : obj.reference,
                        reload    : false,
                        utility   : self,
                        url       : obj.url
                    });

                    q.resolve();
                });

                // Add the promise to the promise array
                promises.push(q.promise);
            });
        }
        // Otherwise this is to grab a single object
        else
        {
            var
            q = $q.defer(),

            // Initial the params
            params =
            {
                service : service
            };

            // If we have a key add it to the parms and the properties
            if (hasKey)
            {
                params.key = key;
                props.key  = key;
            }
            else
            {
                params.reference = service.reference;
            }

            // Get the single firebase object
            self.getObject(params).then(function(obj)
            {
                // Extend the properties with the returned object and reference
                angular.extend(props,
                {
                    obj       : self.merge(obj.object, angular.copy(service.blank)),
                    reference : service.reference,
                    url       : obj.url
                });

                q.resolve();
            });

            // Add this one promise
            promises.push(q.promise);
        }

        // After all the promises is finished
        $q.all(promises).then(function()
        {
            // If we have keys then add the received children to this dictionary
            if (keys)
            {
                angular.extend(props,
                {
                    children  : children,
                    obj       : children,
                    reference : service.reference
                });
            }
            // If we have a key set the properties key for adding to the firebase object
            else if (hasKey)
            {
                props.key = key;
            }

            // Create the new firebase object and set the service data
            service.data = firebase = new TNFirebase(props);

            // If this is a dictionary then set each child's parent
            // to the firebase object just created
            if (keys)
            {
                angular.forEach(children, function(child)
                {
                    child.properties.parent = firebase;
                });
            }

            if (parent)
            {
                // Set the parent's child to this firebase
                if (hasKey && parent.foreignTable && parent.type !== 'primitive')
                {
                    parent.data.properties.children[key][name] = firebase;
                }
                else if (parent.data)
                {
                    parent.data.properties.children[name] = firebase;
                }
            }

            // Finish this promise
            promise.resolve(firebase);
        });

        return promise.promise;
    }
*/
}

/*

factory('TNFirebaseUtility', function($firebaseObject, $firebaseArray, $q, $log, TNObject, TNDate, TNFirebase)
{
    TNFirebaseUtility.prototype.getURL = function(name)
    {
        var
        url       = '',
        providers = this.providers(),
        service   = this.service(name),
        isRoot    = name.indexOf('.') === -1;

        // If this is the top level node grab the url from the provider
        if (isRoot)
        {
            url = providers[service.provider].url;
        }
        else
        {
            url += service.parent.url;
        }

        // Then add the service attribute to the url
        if (service.service)
        {
            url += '/' + service.service;
        }

        if (isRoot && service.parent && angular.isDefined(service.parent.key()))
        {
            url += '/' + service.parent.key();
        }

        return url;
    };

    TNFirebaseUtility.prototype.dependencies = function(options)
    {
        // Get the parent/child heirarchy from the name
        var
        self         = this,
        name         = options.name,
        heirarchy    = name.split('.'),

        // Get the services
        services     = this.services(),
        dependencies = [],

        service,
        foreignTable,
        key = '';

        // Cycle through the heirarchy starting with the top parent
        angular.forEach(heirarchy, function(level, index)
        {
            // Build the key on each iteration
            key += index === 0 ? level : '.' + level;

            // Get the current service
            service = services[key];

            // If the service is set to reload
            if (!service.data || service.data.reload())
            {
                // See if this was a foreign table
                foreignTable = service.foreignTable;

                // If this is a foreign table
                if (foreignTable)
                {
                    // Get the url of the foreign table
                    service.url = services[foreignTable].url ? services[foreignTable].url : self.getURL(foreignTable);

                    service.reference = new Firebase(service.url);
                }
                // Otherwise we're continuing inside the current object structure
                else
                {
                    service.url = self.getURL(key);
                }
            }

            // Push this service onto the dependency array
            dependencies.push(service);
        });

        return dependencies;
    };

    TNFirebaseUtility.prototype.getFirebase = function(options)
    {
        // Get the main service and it's firebase dependencies
        var
        self         = this,
        q            = $q.defer(),
        dependencies = this.dependencies({name : options.name}),
        keys,
        parent,
        params,
        fk,

        // Process the service by walking up the dependency change
        process = function(service)
        {
            // If we have another service to process
            if (service)
            {
                // If the reload is set
                if (!service.data || service.data.reload())
                {
                    // If we have a parent that is a dictionary then grab the data from the parent
                    if (parent && parent.foreignTable && parent.type !== 'primitive')
                    {
                        // Set the data to the parents already retreived object
                        service.data = parent.data.object(service.data.key());

                        // Get the next dependency
                        process(dependencies.shift());
                    }
                    // If we're not a dictionary then get the object from Firebase
                    else
                    {
                        // Initialize the get params and the options for firebase object
                        params  = {service : service};

                        // If this service has a foreign key
                        if (service.foreignTable)
                        {
                            // Get the values of the foreign keys
                            fk = self.eval({key : service.service, object : parent.data.object()});

                            // If the foreign key object is a primitive set the key to the value
                            if (service.type === 'primitive')
                            {
                                params.key = fk.object;
                            }
                            // Cycle over the fk object and get the keys
                            else
                            {
                                keys = [];

                                angular.forEach(fk.object, function(value, key)
                                {
                                    keys.push(key);
                                });

                                params.keys = keys;
                            }
                        }

                        // Make the call to the main get method to grab the object from Firebase
                        self.get(params).then(function(data)
                        {
                            service.data = data;

                            parent = service;

                            // Get the next dependency
                            process(dependencies.shift());
                        });
                    }
                }
                // If we don't have to reload then just look for the next dependency
                else
                {
                    parent = service;

                    process(dependencies.shift());
                }
            }
            // If we've gotten all the dependencies then return the requested data
            else
            {
                q.resolve();
            }
        };

        // Start the recursive grabbing of dependency data
        process(dependencies.shift());

        return q.promise;
    };

    TNFirebaseUtility.prototype.deleteObject = function(options)
    {
        var
        self = this,
        q    = $q.defer(),
        item = options.item;

        // If the object is new
        if (item.isNew())
        {
            // Alse delete from parent if parent is dictionary
            item.properties.obj = item.obj = null;

            // Set the foreign table
            self.setForeignTable({item : item, key : item.key(), remove : true});

            q.resolve();
        }
        else
        {
            // Delete the object from firebase and then set the foreign table
            item.object().$remove().then(function()
            {
                q.resolve(self.setForeignTable({item : item, key : item.key(), remove : true}));
            });
        }

        return q.promise;
    };

    TNFirebaseUtility.prototype.deleteItem = function(options)
    {
        var
        self       = this,
        q          = $q.defer(),
        item       = options.item,
        service    = this.service(item.name()),
        exclusions = service.exclusions,
        promises   = [],
        children   = item.children();

        // If this object is a foreign key dictionary
        if (service.foreignKey && service.type !== 'primitive')
        {
            var
            deleteKeys = [];

            // Cycle over all children and delete each item
            angular.forEach(children, function(child, key)
            {
                var
                promise = $q.defer();

                // Delete the child item
                self.deleteItem({item : child}).then(function()
                {
                    deleteKeys.push(key);

                    delete children[key];

                    promise.resolve();
                });

                promises.push(promise);
            });

            // After all child items are deleted set the foreign keys of the parent
            $q.all(promises, function()
            {
                q.resolve(self.setForeignTable({item : item, keys : deleteKeys, remove : true}));
            });
        }
        // Otherwise this is a regular firebase object
        else
        {
            // First delete all it's children that are not excluded
            angular.forEach(children, function(child, name)
            {
                if (child.obj && !exclusions[name])
                {
                    promises.push(self.deleteItem({item : child}));
                }
            });

            // Then delete the specific firebase object
            $q.all(promises).then(function()
            {
                self.deleteObject({item : item}).then(function(results)
                {
                    q.resolve(results);
                });
            });
        }

        return q.promise;
    };

    TNFirebaseUtility.prototype.delete = function(options)
    {
        var
        self = this,
        q    = $q.defer();

        // Delete the item and all it's children
        this.deleteItem(options).then(function(parent)
        {
            // If we have a parent then save any foreign keys deleted
            if (parent && !options.item.isNew())
            {
                self.saveObject({item : parent.parent()}).then(function()
                {
                    q.resolve();
                });
            }
            // If we don't have to save any foreign keys in the parent just resolve the delete promise
            else
            {
                q.resolve();
            }
        });

        q.resolve();

        return q.promise;
    };

    TNFirebaseUtility.prototype.setKey = function(options)
    {
        var
        key      = options.key,
        name     = options.name,
        service  = this.service(name),
        firebase = service.data,

        // Set reload flag
        setReload = function(children)
        {
            angular.forEach(children, function(child)
            {
                child.reload(true);

                if (child.children())
                {
                    setReload(child.children());
                }
            });
        };

        // If we don't have the firebase object
        if (!firebase)
        {
            firebase = this.create({name : name});
        }

        // If this key is different than the previous
        if (key !== firebase.key())
        {
            // Set the key
            firebase.key(key);

            // Loop through all the children and set reload to true
            setReload(firebase.children());
        }
    };

    TNFirebaseUtility.prototype.create = function(options)
    {
        var
        self    = this,
        name    = options.name,
        scope   = options.scope,
        service = this.service(name),
        parent  = service.parent,
        key,
        firebase;

        // If we passed in a key, then set it
        if (options.key)
        {
            key = options.key;
        }
        // Otherwise get the key from the parent
        else if (parent)
        {
            // If the parent doesn't have a data object set or the parent is a dictionary
            if (!parent.data)
            {
                // Create a new parent firebase so that we can get a new index
                parent.data = new TNFirebase(
                {
                    reload    : true,
                    isNew     : true,
                    name      : parent.name,
                    obj       : angular.copy(parent.blank),
                    reference : parent.reference,
                    utility   : self,
                    parent    : parent.parent ? parent.parent.data : null
                });
            }

            // Get the next index from the parent dictionary
            key = parent.data.index(true);
        }

        // Create a new firebase object with all fields empty
        service.data = firebase = new TNFirebase(
        {
            reload  : true,
            isNew   : true,
            name    : name,
            key     : key,
            obj     : angular.copy(service.blank),
            utility : self,
            parent  : parent ? parent.data : null
        });

        // If we have a parent and it's a dictionary, then set the parents child to this new object
        if (parent && parent.foreignTable && parent.type !== 'primitive')
        {
            parent.data.properties.children[key] = firebase;
        }

        // If scope was passed in then set the new object to the scope using it's proper name
        if (scope)
        {
            scope[service.proper] = firebase;
        }

        return firebase;
    };

    TNFirebaseUtility.prototype.saveNew = function(options)
    {
        var
        self    = this,
        item    = options.item,
        service = this.service(item.name()),
        q       = $q.defer();

        // Use the firebase reference to make an object update
        options.reference.update(item.object(), function(error)
        {
            // If there was an error, reject the promise
            if (error)
            {
                $log.error('Error updating data: ', error);

                q.reject();
            }
            // Otherwise grab the new firebase object from the firebase store
            else
            {
                self.getObject({service : service, key : options.key, reference : options.reference}).then(function(object)
                {
                    // Return the new object merged with blank
                    q.resolve(self.merge(object.object, angular.copy(service.blank)));
                });
            }
        });

        return q.promise;
    };

    TNFirebaseUtility.prototype.saveObject = function(options)
    {
        var
        q    = $q.defer(),
        item = options.item;

        // If this object is new
        if (item.isNew())
        {
            // Get the service
            var
            service = this.service(item.name()),
            ref,
            key,
            keyOld = item.key(),
            props,
            parent;

            // If we have options passed in get the reference and key
            if (options.reference)
            {
                ref = options.reference;
                key = options.key;
            }
            // Otherwise generate a new reference and key
            else
            {
                ref = new Firebase(service.parent.url);
                ref = ref.push();
                key = ref.key();
            }

            // Fill the properties that will be passed to the foreign table
            props =
            {
                reference : ref,
                key       : key,
                keyOld    : keyOld,
                item      : item
            };

            // Set the foreign table key if there is any
            parent = this.setForeignTable(props);

            // Then save the new object
            this.saveNew(props).then(function(object)
            {
                // Set the new object property to isNew
                item.isNew(false);
                item.key(key);

                // Also set the obj property on the object
                item.obj = object;

                // Save the reference as well
                angular.extend(item.properties,
                {
                    reference : ref,
                    obj       : object
                });

                // Resolve the promise using this firebase
                q.resolve(parent);
            });
        }
        // If this is an existing firebase object, save it to the firebase store
        else
        {
            item.object().$save().then(function()
            {
                q.resolve();
            });
        }

        return q.promise;
    };

    TNFirebaseUtility.prototype.saveItem = function(options)
    {
        var
        self       = this,
        q          = $q.defer(),
        item       = options.item,
        service    = this.service(item.name()),
        promises   = [],
        children   = item.children();

        // If this object is a foreign key dictionary
        if (service.foreignKey && service.type !== 'primitive')
        {
            var
            reference = item.reference(),
            keysNew   = [];

            // Cycle over all children and delete each item
            angular.forEach(children, function(child, key)
            {
                if (child.isNew())
                {
                    var
                    promise = $q.defer(),
                    ref     = reference.push(),
                    keyNew  = ref.key();

                    // Save the child item
                    self.saveItem({item : child, key : keyNew, reference : ref}).then(function(firebase)
                    {
                        keysNew.push(keyNew);

                        children[keyNew] = firebase;

                        delete children[key];

                        promise.resolve();
                    });

                    promises.push(promise);
                }
            });

            // After all child items are saved set the foreign keys of the parent
            $q.all(promises, function()
            {
                q.resolve(self.setForeignTable({item : item, keys : keysNew}));
            });
        }
        // Otherwise this is a regular firebase object
        else
        {
            // First save all it's children if it's a new object
            if (item.isNew())
            {
                angular.forEach(children, function(child, name)
                {
                    if (child.obj)
                    {
                        promises.push(self.saveItem({item : child}));
                    }
                });
            }

            // Then save the specific firebase object
            $q.all(promises).then(function()
            {
                self.saveObject(options).then(function(results)
                {
                    q.resolve(results);
                });
            });
        }

        return q.promise;
    };

    TNFirebaseUtility.prototype.save = function(options)
    {
        var
        self = this,
        q    = $q.defer();

        // Delete the item and all it's children
        this.saveItem(options).then(function(parent)
        {
            // If we have a parent then save any foreign keys added
            if (parent)
            {
                self.saveObject({item : parent.parent()}).then(function()
                {
                    q.resolve();
                });
            }
            // If we don't have to save any foreign keys in the parent just resolve the save promise
            else
            {
                q.resolve();
            }
        });

        q.resolve();

        return q.promise;
    };

    return new TNFirebaseUtility();
});
*/