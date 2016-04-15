'use strict';

angular.module('theory.directives').

directive('tnHours', function(tnDirective)
{
    var
    tnHours = function(options)
    {
        var
        self = this,
        defaults = {},
        defaultValues =
        {
            min        : '00:00:00',
            max        : '23:59:59',
            starts     : '08:00:00',
            increment  : '01:00:00',
            dictionary :
            {
                tnHoursStarts : 'Starts',
                tnHoursEnds   : 'Ends'
            }
        },
        scope =
        {
            dictionary : '=',
            hours      : '=',
            min        : '@',
            max        : '@',
            starts     : '@',
            ends       : '@',
            increment  : '@'
        };

        tnHours.parent.call(this);

        this.templateUrl = function(element, attributes)
        {
            return this.getTemplateUrl(attributes, 'tn-hours');
        };

        this.link = function(scope, element, attributes)
        {
            self.initialize(scope);

            var
            hours      = scope.hours,
            starts     = scope.starts,
            ends       = scope.ends,
            increment  = scope.increment,
            components;

            if (!hours.starts)
            {
                components = starts.split(':');

                hours.starts = new Date(1970, 0, 1, parseInt(components[0]), parseInt(components[1]), parseInt(components[2]));
            }
            else if (!hours.ends)
            {
                if (ends)
                {
                    components = ends.split(':');

                    hours.ends = new Date(1970, 0, 1, parseInt(components[0]), parseInt(components[1]), parseInt(components[2]));
                }
                else
                {
                    components = increment.split(':');

                    hours.ends = new Date(1970, 0, 1, starts.getHours() + parseInt(components[0]), starts.getMinutes() + parseInt(components[1]), starts.getSeconds() + parseInt(components[2]));
                }
            }
        };

        this.options(defaults);
        this.options(options);
        this.extendDirective(defaultValues, scope);
    };

    TNInheritance.extend(tnHours, tnDirective);

    return new tnHours();
});