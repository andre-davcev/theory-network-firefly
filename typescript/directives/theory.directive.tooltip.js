'use strict';

angular.module('theory.directives').

directive('tnTooltip', function(tnDirective, $templateCacheUtility, $compile, $http, $timeout)
{
    var
    tnTooltip = function(options)
    {
        tnTooltip.parent.call(this, {});
        this.options(options);

        this.replace  = false;
        this.restrict = 'A';
        this.scope    = false;

        this.controller = function($scope)
        {
            this.showTooltip = function(templateURL, scope, element, classes)
            {
                $templateCacheUtility.get(templateURL).then(function(template)
                {
                    var
                    tooltip = $scope.tnTooltip,
                    offset,
                    top,
                    left;

                    $scope.tnTooltipClasses = classes ? classes : '';

                    tooltip.empty();
                    tooltip.html(template);

                    $compile(tooltip.contents())(scope);

                    $timeout(function()
                    {
                        offset = element.offset();

                        top  = offset.top - tooltip.outerHeight();
                        left = offset.left + (element.outerWidth() / 2) - (tooltip.outerWidth() / 2);

                        tooltip.

                        css('top',  top  + 'px').
                        css('left', left + 'px');
                    });
                });
            };

            this.hideTooltip = function()
            {
                $timeout(function()
                {
                    $scope.tnTooltip.css('left', '-9999px');
                });
            };
        };

        this.controller.$inject = ['$scope'];
    };

    TNInheritance.extend(tnTooltip, tnDirective);

    tnTooltip.prototype.linkingFunction = function(scope, element, attributes, controllers, transclude)
    {
        tnTooltip.parent.prototype.linkingFunction.call(this, scope, element, attributes, controllers, transclude);

        $templateCacheUtility.get(this.getTemplateUrl(attributes, 'tn-tooltip')).then(function(template)
        {
            template = $compile(template)(scope);

            element.prepend(template);

            scope.tnTooltip = angular.element(template);
        });
    };

    return new tnTooltip();
});