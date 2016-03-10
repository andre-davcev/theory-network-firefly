'use strict';

describe('TNScope', function()
{

});

'use strict';

describe('TNScope', function()
{
    var
    $scope,
    $compile,
    element,
    factory,
    TNScope;

    beforeEach(module
    (
        'theory.base',
        'theory.controllers'
    ));

    beforeEach(inject(function($injector, _$compile_, _$rootScope_)
    {
        $scope   = _$rootScope_.$new();
        $compile = _$compile_;

        element = $compile('<div></div>')($scope);

        factory      = $injector.get('TNScope');
        TNScope = new factory({scope : $scope});
    }));

    it('should test adding an angular watcher and making sure it is cancelled on $destroy', function()
    {
        $scope.var1 = 'value';
        TNScope.watcher($scope.$watch('var1', function(){}));
        $scope.$digest();

        // There should be 1 watcher in the array
        expect(TNScope.watches.length).toBe(1);

        $scope.$destroy();

        // There should be 0 watchers in the array
        expect(TNScope.watches.length).toBe(0);
    });
});