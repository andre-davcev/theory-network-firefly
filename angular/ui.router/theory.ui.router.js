'use strict';

angular.module('theory.ui.router', []).

provider('UIRouter', function($stateProvider)
{
    var
    router  = {},
    factory = {},
    cut     = 0,
    html5   = true,
    base    = 'templates';

    router.init = function(options)
    {
        if (options)
        {
            // Set the base path for views.  Default is views
            if (options.base)
            {
                base = options.base;
            }

            if (angular.isDefined(options.cut))
            {
                cut = options.cut;
            }

            if (angular.isDefined(options.html5))
            {
                html5 = options.html5;
            }
        }
    };

    router.add = function(options)
    {
        var
        name        = options.name,
        path        = options.path,
        parent      = options.parent,
        views       = options.views,
        abstract    = options.abstract,
        include     = options.include,
        resolve     = options.resolve,
        components  = name.split('-'),
        length      = components.length,
        state       = {},
        controller  = '',
        templateUrl = '',
        separator   = '',
        cutOption   = cut,
        url         = '',
        last,
        id;

        // If we're going to cut the
        if (options.cut)
        {
            cutOption = options.cut;
        }

        if (include)
        {
            include = length - include;
        }
        else
        {
            include = length - 1;
        }

        name = '';

        // Split the string up into components with the '-' char
        angular.forEach(components, function(component, index)
        {
            id = false;

            // If this is a key
            if (component.charAt(0) === ':')
            {
                // Remove the ':' char
                component = component.slice(1);
                id        = true;
            }

            name += separator + component;

            if (last && abstract && !parent)
            {
                name   = component;
                parent = last;
            }

            // If this is the last component then set the url
            if (index >= include)
            {
                templateUrl += component;
                controller  += component.charAt(0).toUpperCase() + component.slice(1);

                if ((index + 1) === length)
                {
                    if (id)
                    {
                        url += '/' + component + '/:' + component + 'id';
                    }
                    else
                    {
                        url += '/' + component;
                    }
                }
                else
                {
                    templateUrl += '.';
                }
            }

            last = component;

            separator = '.';
        });

        if (!path)
        {
            path = base;
        }

        if (path !== '')
        {
            path += '/';
        }

        if (parent)
        {
            state.parent = parent;
        }

        if (abstract)
        {
            state.abstract = true;
        }

        templateUrl = path + templateUrl + '.html';

        if (options.controller)
        {
            controller = options.controller;
        }
        else
        {
            controller = controller + 'Controller';
        }

        controller += ' as ' + controller.charAt(0).toLowerCase() + controller.slice(1);

        if (views)
        {
            state.views        = {};
            state.views[views] = {};

            state.views[views].templateUrl = templateUrl;
            state.views[views].controller  = controller;
        }
        else
        {
            state.templateUrl = templateUrl;
            state.controller  = controller;
        }

        if (resolve)
        {
            state.resolve = resolve;
        }

        state.url = url;

        $stateProvider.state(name, state);

        return this;
    };

    factory.$get = function()
    {
        return router;
    };

    return factory;
});