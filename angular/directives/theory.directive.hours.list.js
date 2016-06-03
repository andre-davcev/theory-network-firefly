'use strict';

angular.module('theory.directives').

directive('tnHoursList', function($timeout, tnDirective, TNDate, TNController)
{
    var
    tnHoursList = function(options)
    {
        var
        self     = this,
        defaults = {},
        defaultValues =
        {
            min        : '00:00:00',
            max        : '23:59:59',
            increment  : '01:00:00',
            cushion    : '01:00:00',
            starts     : '08:00:00',
            dictionary :
            {
                tnHoursStarts : 'Starts',
                tnHoursEnds   : 'Ends'
            }
        },
        scope =
        {
            dictionary : '=',
            times      : '=',
            min        : '@',
            max        : '@',
            starts     : '@',
            ends       : '@',
            increment  : '@',
            cushion    : '@'
        };

        tnHoursList.parent.call(this);

        //        this.controller = 'tnHoursListController';

        this.templateUrl = function(element, attributes)
        {
            return this.getTemplateUrl(attributes, 'tn-hours-list');
        };

        this.link = function(scope, element, attributes)
        {
            self.initialize(scope);

            var
            times      = scope.times,
            length     = scope.count = times.length,
            min        = scope.min,
            max        = scope.max,
            starts     = scope.starts,
            ends,
            increment  = scope.increment,
            cushion    = scope.cushion,
            minTime,
            maxTime,
            minStarts,
            maxEnds,

            preprocessTimes = function()
            {
                if (length === 0)
                {
                    minTime = starts;
                    maxTime = ends;
                }
                else
                {
                    minTime = angular.copy(times[0].starts);
                    maxTime = angular.copy(times[length - 1].ends);
                }

                minStarts = TNDate.parseTime(min);
                maxEnds   = TNDate.parseTime(max);
            };

            increment = TNDate.parseTime(increment);
            cushion   = TNDate.parseTime(cushion);
            starts    = TNDate.parseTime(starts);

            if (ends)
            {
                ends = TNDate.parseTime(ends);
            }
            else
            {
                ends = new Date(1970, 0, 1, starts.getHours() + increment.getHours(), starts.getMinutes() + increment.getMinutes(), starts.getSeconds() + increment.getSeconds());
            }

            preprocessTimes();

            scope.changeStart = function(time, index)
            {
                var
                isFirst = index === 0;

                if (isFirst)
                {
                    minTime = angular.copy(time);
                }

                times[index].endsMin = TNDate.parseTimeDate(new Date(1970, 0, 1, time.getHours(), time.getMinutes() + 1, time.getSeconds()));

                if (length > 1 && !isFirst)
                {
                    times[index - 1].endsMax = TNDate.parseTimeDate(new Date(1970, 0, 1, time.getHours(), time.getMinutes() - 1, time.getSeconds()));
                }
            };

            scope.changeEnd = function(time, index)
            {
                var
                isLast = index === (length - 1);

                if (isLast)
                {
                    maxTime = angular.copy(time);
                }

                times[index].startsMax = TNDate.parseTimeDate(new Date(1970, 0, 1, time.getHours(), time.getMinutes() - 1, time.getSeconds()));

                if (length > 1 && !isLast)
                {
                    times[index + 1].startsMin = TNDate.parseTimeDate(new Date(1970, 0, 1, time.getHours(), time.getMinutes() + 1, time.getSeconds()));
                }
            };

            TNController.watcher(scope, scope.$watchCollection('times', function(newTimes, oldTimes)
            {
                var
                oldLength = oldTimes.length,
                newLength = newTimes.length,
                time,
                newStart,
                newEnd,
                last,
                beforeTime;

                $timeout(function()
                {
                    if (newLength > oldLength)
                    {
                        last = newLength - 1;
                        time = newTimes[last];

                        if (newLength === 1)
                        {
                            time.starts    = minTime;
                            time.ends      = maxTime;
                            time.startsMin = min;
                            time.startsMax = TNDate.parseTimeDate(new Date(1970, 0, 1, maxTime.getHours(), maxTime.getMinutes() - 1, maxTime.getSeconds()));
                            time.endsMin   = TNDate.parseTimeDate(new Date(1970, 0, 1, minTime.getHours(), minTime.getMinutes() + 1, minTime.getSeconds()));
                            time.endsMax   = max;
                        }
                        else
                        {
                            newStart = new Date(1970, 0, 1, maxTime.getHours() + cushion.getHours(), maxTime.getMinutes() + cushion.getMinutes(), maxTime.getSeconds() + cushion.getSeconds());

                            if (newStart.getTime() > maxEnds.getTime())
                            {
                                newStart = new Date(1970, 0, 1, maxTime.getHours(), maxTime.getMinutes() + 1, maxTime.getSeconds());
                            }

                            if (newStart.getTime() >= maxEnds.getTime())
                            {
                                delete newTimes[last];
                            }
                            else
                            {
                                newEnd = new Date(1970, 0, 1, newStart.getHours() + increment.getHours(), newStart.getMinutes() + increment.getMinutes(), newStart.getSeconds() + increment.getSeconds());

                                if (newEnd.getTime() > maxEnds.getTime())
                                {
                                    newEnd = new Date(1970, 0, 1, newStart.getHours(), newStart.getMinutes() + 1, newStart.getSeconds());
                                }

                                if (newEnd.getTime() > maxEnds.getTime())
                                {
                                    delete newTimes[last];
                                }
                                else
                                {
                                    beforeTime = newTimes[newLength - 2].ends;

                                    time.starts = newStart;
                                    time.ends   = newEnd;

                                    time.startsMin = TNDate.parseTimeDate(new Date(1970, 0, 1, beforeTime.getHours(), beforeTime.getMinutes() + 1, beforeTime.getSeconds()));
                                    time.startsMax = TNDate.parseTimeDate(new Date(1970, 0, 1, newEnd.getHours(), newEnd.getMinutes() - 1, newEnd.getSeconds()));
                                    time.endsMin   = TNDate.parseTimeDate(new Date(1970, 0, 1, newStart.getHours(), newStart.getMinutes() + 1, newStart.getSeconds()));
                                    time.endsMax   = max;

                                    newTimes[newLength - 2].endsMax = TNDate.parseTimeDate(new Date(1970, 0, 1, newStart.getHours(), newStart.getMinutes() - 1, newStart.getSeconds()));

                                    maxTime = angular.copy(newEnd);

                                    length = newLength;
                                }
                            }
                        }
                    }
                    else if (oldLength < newLength)
                    {
                        preprocessTimes();

                        length = newLength;
                    }
                });
            }));
        };

        this.options(defaults);
        this.options(options);
        this.extendDirective(defaultValues, scope);
    };

    TNInheritance.extend(tnHoursList, tnDirective);

    return new tnHoursList();
});