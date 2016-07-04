(function() {
    'use strict';

    angular
        .module('app')
        .config(['$routeProvider', function($routeProvider) {
            $routeProvider
                .when('/', {
                    templateUrl: 'home/home.html',
                })
                .when('/countries', {
                    templateUrl: 'countries/countries.html',
                    controller: 'countriesCtrl as vm'
                })
                .when('/countries/:countryCode', {
                    templateUrl: 'countries/country.html',
                    controller: 'countryCtrl as vm'
                })
                //.otherwise({
                //    redirectTo: '/'
                //});

        }]);
})();
