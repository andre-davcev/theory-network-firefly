'use strict';

// Karma configuration

module.exports = function(config)
{
    config.set(
    {
        files:
        [
            // Load - Ionic
            'build/app/seed/www/lib/ionic/js/ionic.bundle.js',
            // Load - Libraries            
            'bower/bower_components/angular/angular.min.js',
            'bower/bower_components/angular-mocks/angular-mocks.js',
            'bower/bower_components/ngcordova/dist/ng-cordova.js',
            'bower/bower_components/ngcordova/dist/ng-cordova-mocks.js',
            'bower/bower_components/geofire/dist/geofire.min.js',
            'bower/bower_components/firebase/firebase.js',
            'bower/bower_components/angularfire/dist/angularfire.min.js',

            // Load - Core - Modules
            'code/core/angular/config/core.constants.js',

            // Load - Firefly - Modules
            'code/firefly/angular/config/firefly.constants.js',
            'code/firefly/angular/config/firefly.configuration.js',
            'code/firefly/angular/services/firefly.services.js',
            'code/firefly/angular/services/firefly.service.geofire.js',
            'code/firefly/angular/services/firefly.service.notifications.js',
            'code/firefly/angular/services/firefly.service.user.js',

            // Load - Theory - Modules
            'code/theory/angular/base/theory.base.js',
            'code/theory/angular/cordova/theory.cordova.js',
            'code/theory/angular/filters/theory.filters.js',
            'code/theory/angular/firebase/theory.firebase.js',
            'code/theory/angular/google/theory.google.js',
            'code/theory/angular/ionic/theory.ionic.js',
            'code/theory/angular/utility/theory.utility.js',
            'code/theory/angular/utility/theory.utility.templates.js',


            // Load - Theory - Angular
            'code/theory/angular/base/theory.base.inheritance.js',
            'code/theory/angular/base/theory.base.object.js',
            'code/theory/angular/base/theory.base.node.js',
            'code/theory/angular/base/theory.base.linked.list.js',
            'code/theory/angular/base/theory.base.queue.js',
            'code/theory/angular/base/theory.base.stack.js',
            'code/theory/angular/canvas/theory.canvas.js',
            'code/theory/angular/cordova/theory.cordova.camera.js',
            'code/theory/angular/directives/theory.directive.js',
            'code/theory/angular/directives/theory.directive.compile.js',
            'code/theory/angular/directives/theory.directive.counter.js',
            'code/theory/angular/directives/theory.directive.hours.js',
            'code/theory/angular/directives/theory.directive.hours.list.js',
            'code/theory/angular/directives/theory.directive.input.js',
            'code/theory/angular/directives/theory.directive.keyboard.js',
            'code/theory/angular/directives/theory.directive.photo.js',
            'code/theory/angular/directives/theory.directive.table.js',
            'code/theory/angular/directives/theory.directive.tooltip.js',
            'code/theory/angular/directives/theory.directive.tooltip.hover.js',
            'code/theory/angular/filters/theory.filter.interpolate.js',
            'code/theory/angular/filters/theory.filter.reverse.js',
            'code/theory/angular/firebase/theory.firebase.auth.js',
            'code/theory/angular/firebase/theory.firebase.object.js',
//            'code/theory/angular/geolocation/theory.geo.background.js',
            'code/theory/angular/google/theory.google.maps.js',
            'code/theory/angular/ionic/theory.ionic.configuration.js',
            'code/theory/angular/ui.router/theory.ui.router.js',
            'code/theory/angular/utility/theory.utility.configuration.js',
            'code/theory/angular/utility/theory.utility.date.js',
            'code/theory/angular/utility/theory.utility.controller.js',
            'code/theory/angular/utility/theory.utility.template.cache.js',

            // Load - Theory - Tests
            'code/theory/karma/base/theory.base.inheritance.js',
            'code/theory/karma/base/theory.base.object.js',
            'code/theory/karma/base/theory.base.queue.js',
            'code/theory/karma/base/theory.base.stack.js',
            'code/theory/karma/canvas/theory.canvas.js',
            'code/theory/karma/cordova/theory.cordova.camera.js',
            'code/theory/karma/directives/theory.directive.js',
            'code/theory/karma/directives/theory.directive.compile.js',
            'code/theory/karma/directives/theory.directive.counter.js',
            'code/theory/karma/directives/theory.directive.hours.js',
            'code/theory/karma/directives/theory.directive.hours.list.js',
            'code/theory/karma/directives/theory.directive.input.js',
            'code/theory/karma/directives/theory.directive.keyboard.js',
            'code/theory/karma/directives/theory.directive.photo.js',
            'code/theory/karma/directives/theory.directive.table.js',
            'code/theory/karma/directives/theory.directive.tooltip.js',
            'code/theory/karma/directives/theory.directive.tooltip.hover.js',
            'code/theory/karma/filters/theory.filter.interpolate.js',
            'code/theory/karma/filters/theory.filter.reverse.js',
            'code/theory/karma/firebase/theory.firebase.auth.js',
            'code/theory/karma/firebase/theory.firebase.object.js',
//            'code/theory/karma/geolocation/theory.geo.background.js',
            'code/theory/karma/google/theory.google.maps.js',
            'code/theory/karma/ionic/theory.ionic.configuration.js',
            'code/theory/karma/ui.router/theory.ui.router.js',
            'code/theory/karma/utility/theory.utility.configuration.js',
            'code/theory/karma/utility/theory.utility.date.js',
//            'code/theory/karma/utility/theory.utility.controller.js',
            'code/theory/karma/utility/theory.utility.templates.js',
            'code/theory/karma/utility/theory.utility.template.cache.js',

            // Load - Theory - Templates
            'code/theory/directives/*.html'
        ],

        preprocessors:
        {
            'code/theory/directives/*.html' : ['ng-html2js']
        }
    });
};