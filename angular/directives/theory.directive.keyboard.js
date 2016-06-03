'use strict';

angular.module('theory.directives').

/*
    <div tn-keyboard></div>
*/

directive('tnKeyboard', function(tnDirective, TNController)
{
    var
    tnKeyboard = function(options)
    {
        var
        defaults      = {},
        defaultValues = {},
        scope         = {};

        tnKeyboard.parent.call(this);

        angular.extend(this,
        {
            restrict : 'A',
            replace  : false
        });

        this.options(defaults);
        this.options(options);
        this.extendDirective(defaultValues, scope);
    };

    TNInheritance.extend(tnKeyboard, tnDirective);

    tnKeyboard.prototype.linkingFunction = function(scope, element, attributes, controller)
    {
        tnKeyboard.parent.prototype.linkingFunction.call(this, scope, element, attributes, controller);

        var
        shown            = false,
        keyboardShowName = 'native.keyboardshow',
        keyboardHideName = 'native.keyboardhide',

        keyboardShow = function()
        {
            if (!shown)
            {
                element.addClass('tn-keyboard-shown');
            }

            element.removeClass('tn-keyboard-hidden').addClass('tn-keyboard');

            shown = true;
        },

        keyboardHide = function()
        {
            element.removeClass('tn-keyboard').addClass('tn-keyboard-hidden');
        };

        element.addClass('tn-keyboard-hidden');

        window.addEventListener(keyboardShowName, keyboardShow);
        window.addEventListener(keyboardHideName, keyboardHide);

        TNController.windowEvent(scope, {name : keyboardShowName, func : keyboardShow});
        TNController.windowEvent(scope, {name : keyboardHideName, func : keyboardHide});
    };

    return new tnKeyboard();
});