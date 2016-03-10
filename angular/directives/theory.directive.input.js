'use strict';

angular.module('theory.directives').

/*
    <tn-input type="password" name="name" value="value" placeholder="placeholder" clear="clear"></tn-input>
*/

constant('REGEX_EMAIL', '^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$').

directive('tnInput', function($timeout, tnDirective, REGEX_EMAIL, TNController)
{
    var
    tnInput = function(options)
    {
        var
        self = this,
        defaults = {},
        defaultValues =
        {
            type           : 'text',
            name           : '',
            viewValue      : '',
            placeholder    : '',
            required       : false,
            minLength      : 1,
            maxLength      : -1,
            trim           : true,
            change         : function()
            {

            },

            clear          : false,
            validate       : false,
            verifying      : false,
            validInput     : true,
            spinner        : 'spiral', // android, ios, ios-small, bubbles, circles, crescent, dots, lines, ripple, spiral
            spinnerClasses : '',
            roundedIcons   : false
        },
        scope =
        {
            type           : '@',
            name           : '=?',
            value          : '=',
            viewValue      : '=?',
            placeholder    : '=?',
            required       : '=?',
            minLength      : '=?',
            maxLength      : '=?',
            pattern        : '@',
            change         : '=?',
            trim           : '=?',

            clear          : '=?',
            validate       : '=?',
            verifying      : '=?',
            validInput     : '=?',
            spinner        : '=?',
            spinnerClasses : '@',
            roundedIcons   : '=?'
        };

        tnInput.parent.call(this);

        angular.extend(this,
        {
            templateUrl : function(element, attributes)
            {
                return self.getTemplateUrl(attributes, 'tn-input-' + attributes.type);
            }
        });

        this.options(defaults);
        this.options(options);
        this.extendDirective(defaultValues, scope);
    };

    TNInheritance.extend(tnInput, tnDirective);

    tnInput.prototype.linkingFunction = function(scope, element, attributes, controller)
    {
        tnInput.parent.prototype.linkingFunction.call(this, scope, element, attributes, controller);

        if (scope.clear)
        {
            TNController.watcher(scope, scope.$watch('form.input.$viewValue', function(current)
            {
                if (current)
                {
                    if (current.length > 0)
                    {
                        scope.showClear = true;
                    }
                    else
                    {
                        scope.showClear = false;
                    }
                }
                else
                {
                    scope.showClear = false;
                }

                scope.viewValue  = current;
                scope.validInput = scope.form.input.$valid;

                scope.change(current);
            }));

            scope.clearValue = function()
            {
                scope.showClear = false;
                scope.value     = '';

                $timeout(function()
                {
                    element.find('input').focus();
                });
            };
        }

        if (!scope.pattern)
        {
            if (scope.type === 'email')
            {
                scope.pattern = REGEX_EMAIL;
            }
            else
            {
                scope.pattern = '';
            }
        }

        if (scope.validate)
        {
            angular.extend(scope,
            {
                isVerified : function()
                {
                    return scope.validate && !scope.verifying && scope.form.input.$dirty && scope.form.input.$valid;
                },

                isError : function()
                {
                    return scope.validate && !scope.verifying && scope.form.input.$dirty && scope.form.input.$invalid;
                },

                isVerifying : function()
                {
                    return scope.validate && scope.state === 'verifying';
                }
            });
        }
    };

    return new tnInput();
});