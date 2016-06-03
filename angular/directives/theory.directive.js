'use strict';

angular.module('theory.directives', []).

factory('tnDirective', function($timeout, TNObject, TNController)
{
    var
    tnDirective = function(options)
    {
        var
        self = this;

        angular.extend(this,
        {
            restrict      : 'E',
            replace       : true,
            defaultValues : {},
            scope         : {},
            templateName  : undefined
        });

        tnDirective.parent.call(this);

        this.options(options);

        if (this.properties.templateName)
        {
            self.templateUrl = function(element, attributes)
            {
                return self.getTemplateUrl(attributes, self.properties.templateName);
            };
        }

        this.link = function(scope, element, attributes, controller)
        {
            TNController.timeout(scope, $timeout(function()
            {
                self.linkingFunction(scope, element, attributes, controller);
            }));
        };
    };

    TNInheritance.extend(tnDirective, TNObject);

    tnDirective.prototype.getTemplateUrl = function(attributes, name)
    {
        var
        path = attributes.templatePath;

        if (!path)
        {
            path = 'directives';
        }

        return path + '/' + name + '.html';
    };

    tnDirective.prototype.extendDirective = function(defaultValues, scope)
    {
        angular.extend(this.defaultValues, defaultValues);
        angular.extend(this.scope,         scope);
    };

    tnDirective.prototype.initialize = function(scope)
    {
        var
        defaults = this.defaultValues,
        typeDefault,
        property;

        angular.forEach(defaults, function(defaultValue, key)
        {
            property = scope[key];

            if (!(angular.isDefined(property)))
            {
                scope[key] = defaultValue;
            }
            else if (typeof defaultValue !== typeof property)
            {
                if (typeDefault === 'number')
                {
                    scope[key] = parseInt(defaultValue);
                }
                else if (typeDefault === 'boolean')
                {
                    if (scope[key] === 'true')
                    {
                        scope[key] = true;
                    }
                    else
                    {
                        scope[key] = false;
                    }
                }
            }
        });
    };

    tnDirective.prototype.linkingFunction = function(scope, element, attributes, controller)
    {
        this.initialize(scope);
    };

    return tnDirective;
});