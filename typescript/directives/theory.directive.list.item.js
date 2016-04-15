'use strict';

angular.module('theory.directives').

directive('tnListItem', function(tnDirective, $timeout, $swipe)
{
    var
    tnListItem = function(options)
    {
        tnListItem.parent.call(this,
        {
            templateName : 'tn-list-item'
        });

        this.options(options);

        this.extendDirective(
        {
            animate      : false,
            tnDictionary :
            {
                tnListItemDeleteLabel : 'Delete'
            }
        },
        {
            tnDelete     : '=',
            tnItem       : '=?',
            tnDictionary : '=?',
            animate      : '=?'
        });

        angular.extend(this,
        {
            transclude : true
        });
    };

    TNInheritance.extend(tnListItem, tnDirective);

    tnListItem.prototype.linkingFunction = function(scope, element, attributes, controller)
    {
        tnListItem.parent.prototype.linkingFunction.call(this, scope, element, attributes, controller);

        if (scope.tnDelete)
        {
            var
            root,
            children,
            transcluded,
            input,
            deleteButton,
            deleteButtonWidth,
            deleteButtonHeight,
            startX,
            delta,
            sliding,
            remove     = scope.tnDelete,
            item       = scope.tnItem,
            deleteMode = false,
            removeMode = false,

            reset = function(cancel)
            {
                $timeout(function()
                {
                    if (cancel)
                    {
                        transcluded.css('transform', 'translate3d(' + -deleteButtonWidth + 'px, 0px, 0px) scale(1)');
                    }
                    else
                    {
                        transcluded.css('transform', 'translate3d(0px, 0px, 0px) scale(1)');
                    }
                }, 100);
            };

            $timeout(function()
            {
                root               = angular.element(element[0]);
                children           = root.children();
                transcluded        = children.eq(0);
                input              = children.eq(2);
                deleteButton       = children.eq(1);
                deleteButtonWidth  = deleteButton[0].clientWidth;
                deleteButtonHeight = deleteButton[0].clientHeight;

                $swipe.bind(transcluded,
                {
                    start : function(coordinates)
                    {
                        if (!deleteMode)
                        {
                            startX  = coordinates.x;
                            sliding = true;

                            scope.animate = false;
                        }
                    },

                    move : function(coordinates)
                    {
                        if (sliding)
                        {
                            delta = coordinates.x - startX;

                            if (delta < 0)
                            {
                                transcluded.css('transform', 'translate3d(' + delta + 'px, 0px, 0px) scale(1)');

                                if (delta < -deleteButtonWidth)
                                {
                                    scope.deleteMode = deleteMode = true;

                                    $timeout(function()
                                    {
                                        input.focus();
                                    });
                                }
                            }
                        }
                    },

                    end : function(coordinates)
                    {
                        if (sliding)
                        {
                            scope.animate   = true;
                            sliding         = false;
                            delta           = coordinates.x - startX;

                            if (delta > -deleteButtonWidth)
                            {
                                reset();
                            }
                            else
                            {
                                reset(true);
                            }
                        }
                    },

                    cancel : function(coordinates)
                    {
                        if (!deleteMode)
                        {
                            scope.animate = true;
                            sliding       = false;
                            reset();
                        }
                    }
                });

                angular.extend(scope,
                {
                    click : function($event)
                    {
                        if (deleteMode)
                        {
                            scope.deleteMode = deleteMode = false;
                            scope.animate = true;

                            reset();
                        }
                    },

                    blur : function($event)
                    {
                        if (deleteMode && !removeMode)
                        {
                            scope.deleteMode = deleteMode = false;
                            scope.animate    = true;

                            reset();
                        }
                    },

                    remove : function($event)
                    {
                        $event.preventDefault();
                        
                        removeMode = true;

                        remove(item).then(function(result)
                        {
                            removeMode       = false;
                            scope.deleteMode = deleteMode = false;
                            scope.animate    = true;

                            reset();
                        });
                    }
                });

                reset();
            });
        }
    };

    return new tnListItem();
});