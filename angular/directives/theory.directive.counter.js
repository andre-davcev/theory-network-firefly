'use strict';

angular.module('theory.directives').

/*
    <div tn-counter></div>
*/

directive('tnCounter', function($timeout, $filter, tnDirective, TNController)
{
    var
    tnCounter = function(options)
    {
        var
        defaults = {},

        defaultValues =
        {
            duration : 0
        },

        scope =
        {
            ngModel  : '=',
            duration : '@'
        };

        tnCounter.parent.call(this);

        angular.extend(this,
        {
            restrict : 'A',
            replace  : false,
            require  : 'ngModel'
        });

        this.options(defaults);
        this.options(options);
        this.extendDirective(defaultValues, scope);
    };

    TNInheritance.extend(tnCounter, tnDirective);

    tnCounter.prototype.linkingFunction = function(scope, element, attributes, controller)
    {
        tnCounter.parent.prototype.linkingFunction.call(this, scope, element, attributes, controller);

        var
        e = element[0],
        number,
        refreshInterval,
        duration,
        steps,
        step,
        countTo,
        increment,
        timeoutID,

        // Calculate various properties that will be used for the animation
        calculate = function()
        {
            refreshInterval = 30;
            step            = 0;
            timeoutID       = null;
            countTo         = parseInt(scope.ngModel) || 0;
            scope.value     = parseInt(attributes.countFrom, 10) || 0;
            duration        = parseFloat(scope.duration);

            steps     = Math.ceil(duration / refreshInterval);
            increment = ((countTo - scope.value) / steps);
            number    = scope.value;
        },

        // Setup a timeout which will be called recursively,
        // cancelling the old timeout and then incrementing again
        tick = function()
        {
            timeoutID = $timeout(function()
            {
                number += increment;
                step++;
                if (step >= steps)
                {
                    $timeout.cancel(timeoutID);
                    number = countTo;
                    e.textContent = $filter('number')(countTo, 0);
                }
                else
                {
                    e.textContent = $filter('number')(Math.round(number), 0);
                    tick();
                }
            }, refreshInterval);
        },

        // Start animation function
        start = function()
        {
            // Cancel any previous animations
            if (timeoutID)
            {
                $timeout.cancel(timeoutID);
            }

            // Do calculations before running the tick animation function
            calculate();
            tick();
        };

        // Watch ng-model attribute and start the animation if we see a change
        TNController.watcher(scope, scope.$watch('ngModel', function(value)
        {
            if (value)
            {
                start();
            }

            TNController.timeout(scope, timeoutID);
        }));
    };

    return new tnCounter();
});