'use strict';

angular.module('theory.directives').

// <tn-table> directive
directive('tnTable', function(edDirective, $interpolate, $window, $templateCache, $templateCacheUtility, $timeout, $q, $filter, TNController)
{
    // Constructor
    var
    tnTable = function(options)
    {
        var
        self     = this,
        defaults =
        {
            typesDefined   : true,
            previousSortBy : -1
        },
        defaultValues =
        {
            ascending  : true,
            name       : '',
            columnPath : 'columns'
        },
        scope =
        {
            headers        : '=?',
            footer         : '=?',
            data           : '=',
            sortBy         : '@',
            ascending      : '=?',
            template       : '=',
            filtered       : '=?',
            paginationSize : '=?',
            paginationPage : '=?',
            controller     : '=?',
            control        : '=?',
            name           : '@',
            columnPath     : '@'
        };

        tnTable.parent.call(this, defaults);
        this.options(options);
        this.extendDirective(defaultValues, scope);

        this.templateUrl = function(element, attributes)
        {
            return self.getTemplateUrl(attributes, 'tn-table');
        };
    };

    TNInheritance.extend(tnTable, edDirective);

    tnTable.prototype.linkingFunction = function(scope, element, attributes, controller, transclude)
    {
        tnTable.parent.prototype.linkingFunction.call(this, scope, element, attributes, controller, transclude);

        var
        self             = this,
        filterStringBase = 'data',
        filterString,
        processing,
        initialized = false,

        stickyHeaders = function()
        {
            var
            q = $q.defer();

            // wrap in $timeout to give table a chance to finish rendering
            $timeout(function()
            {
                var
                table    = angular.element(element[0]),
                sections = table.find('> .tn-section'),
                header   = table.find('> .tn-header'),
                body     = table.find('> .tn-body'),
                footer   = table.find('> .tn-footer'),
                columnsHeader,
                columnsBody,
                columnsFooter,
                width,
                hasBody,
                hasFooter;

                sections.css('display', '');

                columnsHeader = table.find('> .tn-header > .tn-row:first-child > .tn-column');
                columnsBody   = body.find('> .tn-row:first-child > .tn-column');
                columnsFooter = table.find('> .tn-footer > .tn-row:first-child > .tn-column');
                hasBody       = columnsBody.length > 0;
                hasFooter     = columnsFooter.length > 0;

                columnsHeader.each(function(index)
                {
                    width = hasBody ? columnsBody.eq(index).width() : angular.element(this).width();

                    if (hasBody)
                    {
                        columnsBody.eq(index).width(width);
                    }

                    if (hasFooter)
                    {
                        columnsFooter.eq(index).width(width);
                    }

                    angular.element(this).width(width);
                });

                body.css('display', 'block');
                header.css('display', 'table');
                footer.css('display', 'block');
            });

            return q.promise;
        },

        process = function()
        {
            self.generateRowTemplate(scope);

            scope.selectedRow = -1;
            scope.filtered    = scope.$eval(scope.filterString);

            stickyHeaders().then(function()
            {
                processing = false;
            });
        },

        processTable = function(headers)
        {
            processing = true;

            if (headers)
            {
                self.initializeHeaders(scope).then(function()
                {
                    process();
                });

                if (scope.footer)
                {
                    self.initializeFooter(scope);
                }
            }
            else
            {
                process();
            }
        };

        if (scope.control)
        {
            angular.extend(scope.control,
            {
                exportData : function(options)
                {
                    self.exportData(options, scope);
                },

                refresh : function()
                {
                    processTable();
                }
            });
        }

        if (angular.isDefined(scope.paginationSize))
        {
            filterStringBase += ' | startFrom : (paginationPage - 1) * paginationSize | limitTo : paginationSize | ';
        }

        filterString = filterStringBase;

        if (angular.isDefined(scope.sortBy))
        {
            if (!angular.isDefined(scope.paginationSize))
            {
                filterString += ' | ';
            }

            filterString += 'orderBy : sortBy : reverse';
        }

        angular.extend(scope,
        {
            reverse : !scope.ascending,

            filterString     : filterString,
            filterStringBase : filterStringBase,
            selectedColumn   : 0,
            selectedRow      : -1,

            clickedHeader : function(header, index)
            {
                if (!header.disabled)
                {
                    scope.reverse = scope.sortBy === header.key ? !scope.reverse : !scope.ascending;
                    scope.sortBy  = header.key;

                    scope.filtered       = scope.$eval(scope.filterString);
                    scope.selectedColumn = index;
                }
            },

            clickedRow : function(row, index)
            {
                scope.selectedRow = index;
            }
        });

        if (scope.paginationSize)
        {
            TNController.watcher(scope, scope.$watch('paginationSize', function()
            {
                if (initialized && scope.data)
                {
                    processTable();
                }
            }));

            TNController.watcher(scope, scope.$watch('paginationPage', function()
            {
                if (initialized && scope.data)
                {
                    processTable();
                }
            }));
        }

        TNController.watcher(scope, scope.$watch('data', function(data)
        {
            if (data)
            {
                processTable(true);

                initialized = true;
            }
        }));

        $(window).on('resize.doResize', stickyHeaders);

        scope.$on('$destroy', function()
        {
            $(window).off('resize.doResize');
        });
    };

    tnTable.prototype.initializeHeaders = function(scope)
    {
        var
        tableName   = scope.columnPath + '/' + scope.name,
        q           = $q.defer(),
        loadedCount = 0,
        headerCount = scope.headers.length,
        columnName;

        scope.bodyClasses = 'tn-display-header';

        angular.forEach(scope.headers, function(header, index)
        {
            if (!angular.isDefined(header.disabled))
            {
                header.disabled = false;
            }

            if (!angular.isDefined(header.key))
            {
                header.disabled = true;
            }

            if (!angular.isDefined(header.visible))
            {
                header.visible = true;
            }

            if (header.format)
            {
                header.interpolate = $interpolate(header.format);
            }

            if (!angular.isDefined(header.order))
            {
                header.order = index;
            }

            if (!angular.isDefined(header.index))
            {
                header.index = index;
            }

            if (!angular.isDefined(header.filterable))
            {
                header.filterable = true;
            }

            columnName = header.title.toLowerCase().replace(/ #/g, '').replace(/#/g, '').replace(/\./g, '').replace(/ /g, '-');

            header.template = tableName + '-' + columnName + '.html';

            $templateCacheUtility.get(header.template).then(function(template)
            {
                loadedCount++;

                header.templateLoaded = template;

                if (loadedCount === headerCount)
                {
                    q.resolve();
                }
            });
        });

        return q.promise;
    };

    tnTable.prototype.initializeFooter = function(scope)
    {
        var
        footer         = scope.footer,
        tableFooter    = {},
        templateFooter = '',
        templateValue,
        classes,
        key,
        column,
        columnType;

        scope.bodyClasses  += ' tn-display-footer';
        scope.footerColumns = [];

        angular.forEach(scope.headers, function(header)
        {
            key            = header.key;
            column         = footer[key];
            templateValue  = '';
            classes        = 'tn-column';

            if (column)
            {
                columnType = column.type;

                if (columnType === 'label')
                {
                    templateValue = column.label;
                }
                else if (columnType === 'sum')
                {
                    templateValue = 0;

                    angular.forEach(scope.data, function(row)
                    {
                        if (angular.isDefined(row[key]))
                        {
                            templateValue += row[key];
                        }
                    });

                    if (column.format)
                    {
                        tableFooter[key] = templateValue;

                        templateValue = column.format;
                    }
                }
            }

            templateFooter += '<td class="' + classes + '">' + templateValue + '</td>';
        });

        scope.tableFooter    = tableFooter;
        scope.templateFooter = templateFooter;
    };

    tnTable.prototype.generateRowTemplate = function(scope)
    {
        var
        rowTemplate = '';

        scope.rowTemplate = undefined;

        $timeout(function()
        {
            angular.forEach($filter('orderBy')(scope.headers, 'order'), function(column)
            {
                if (column.visible)
                {
                    rowTemplate += '<td class="tn-column">' + column.templateLoaded + '</td>';
                }
            });

            scope.rowTemplate = rowTemplate;
        });
    };

    tnTable.prototype.exportData = function(options, scope)
    {
        var
        data           = options.filtered ? scope.filtered : scope.data,
        delimiter      = options.delimiter ? options.delimiter : ',',
        includeHeaders = angular.isDefined(options.includeHeaders) ? options.includeHeaders : true,
        filename       = options.filename ? options.filename : 'report.csv',
        row            = [],
        print          = [],
        csv,
        keys,
        current,

        processColumn = function(value)
        {
            if (angular.isDefined(value))
            {
                if (angular.isString(value))
                {
                    row.push(value.trim().replace(/,/g,'').replace('#',''));
                }
                else
                {
                    row.push(value);
                }
            }
            else
            {
                row.push('');
            }
        },

        processRow = function()
        {
            print.push(row.join(','));

            row = [];
        },

        headers = scope.headers.sort(function(a, b)
        {
            if (a.order < b.order)
            {
                return -1;
            }
            else if (a.order > b.order)
            {
                return 1;
            }

            return 0;
        });

        if (includeHeaders)
        {
            angular.forEach(headers, function(header)
            {
                if (header.visible)
                {
                    processColumn(header.title);
                }
            });

            processRow();
        }

        angular.forEach(data, function(item)
        {
            angular.forEach(headers, function(header, index)
            {
                if (header.visible)
                {
                    if (header.interpolate)
                    {
                        processColumn(header.interpolate({current : item}));
                    }
                    else
                    {
                        keys = header.key.split('.');

                        if (keys.length === 1)
                        {
                            processColumn(item[header.key]);
                        }
                        else
                        {
                            current = item;

                            angular.forEach(keys, function(key)
                            {
                                current = current[key];
                            });

                            processColumn(current);
                        }
                    }
                }
            });

            processRow();
        });

        csv = print.join('%0A');

        if (bowser.msie)
        {
            csv = csv.replace(/%0A/g, '\r\n');

            var
            popup = $window.open();

            popup.document.write('sep=' + delimiter + '\r\n' + csv);
            popup.document.close();
            popup.document.execCommand('SaveAs', true, filename);
            popup.close();
        }
        else if (bowser.safari)
        {
            $window.open('data:application/vnd.ms-excel,' + csv);
        }
        else
        {
            var
            link = scope.downloadLink;

            if (!scope.downloadLink)
            {
                link = scope.downloadLink = document.createElement('a');

                angular.element(link).css('display', 'none');

                document.body.appendChild(link);
            }

            link.href     = 'data:text/csv;charset=utf-8,' + csv;
            link.target   = '_blank';
            link.download = filename;

            link.click();
        }
    };

    return new tnTable();
});