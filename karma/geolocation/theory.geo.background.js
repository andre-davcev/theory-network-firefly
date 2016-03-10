'use strict';

describe('GeoBackground', function()
{
	 var
    $scope,
    $compile,
    element,
    factory,
    GeoBackground,
    firebaseObject;


     /*beforeEach(function(){
        firebaseObject = {
            getSomething: function(){
                return 'something';
            }
        };
     });

     module(function ($provide){
        $provide.value('firebaseObject', firebaseObject);
     });*/

      beforeEach(module
    (
        'core.config', 'firefly.config', 'theory.base', 'firefly.services', 'firebase', 'theory.firebase','theory.geobackground', 'ngCordovaMocks', 'ngCordova'
    ));


     /*beforeEach(function(){
        module(function ($provide){
            $provide.factory('GeoBackground', function(){

                return {
                    start : function() {
                        console.log('test');
                        return 'hello';
                    }
                };               
            }); 
         });         
     });*/

     
     it('test GeoBackground to be created', inject(function(_GeoBackground_) {
        GeoBackground = _GeoBackground_;
        expect(GeoBackground).toBeDefined();
        //GeoBackground.start();

     }));
	/* beforeEach(inject(function($injector, _$compile_, _$rootScope_)
    {
        $scope   = _$rootScope_.$new();
        $compile = _$compile_;        

        factory      = $injector.get('GeoBackground');
        GeoBackground = new factory({scope : $scope});
    }));*/



	/* it('should test adding an angular watcher and making sure it is cancelled on $destroy', function()
    {
        $scope.var1 = 'value';
        GeoBackground.watcher($scope.$watch('var1', function(){}));
        $scope.$digest();

        // There should be 1 watcher in the array
        expect(GeoBackground.watches.length).toBe(1);

        $scope.$destroy();

        // There should be 0 watchers in the array
        expect(GeoBackground.watches.length).toBe(0);
    });*/

    /*it('testing GeoBackground', inject(function (GeoBackground){
        expect(true);
    }));*/
});