'use strict';

angular.module('theory.directives').

directive('tnTooltipHover', function(tnDirective)
{
    var
    tnTooltipHover = function(options)
    {
        var
        defaultValues =
        {
            tnTooltipClasses : ''
        },
        scope =
        {
            tnTooltipHover      : '=',
            tnTooltipData       : '=?',
            tnTooltipController : '=?',
            tnTooltipClasses    : '@'
        };

        tnTooltipHover.parent.call(this, {});
        this.options(options);
        this.extendDirective(defaultValues, scope);

        this.replace  = false;
        this.restrict = 'A';
        this.require  = '^tnTooltip';
    };

    TNInheritance.extend(tnTooltipHover, tnDirective);

    tnTooltipHover.prototype.linkingFunction = function(scope, element, attributes, controllers, transclude)
    {
        tnTooltipHover.parent.prototype.linkingFunction.call(this, scope, element, attributes, controllers, transclude);

        scope.attributes = attributes;

        angular.element(element).

        mouseenter(function()
        {
            controllers.showTooltip(scope.tnTooltipHover, scope, element, scope.tnTooltipClasses);
        }).

        mouseleave(function()
        {
            controllers.hideTooltip();
        });

        scope.$on('$destroy', function()
        {
            angular.element(element).unbind('mouseenter mouseleave');

            controllers.hideTooltip();
        });
    };

    return new tnTooltipHover();
});