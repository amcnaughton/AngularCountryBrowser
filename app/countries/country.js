(function () {
    'use strict';

    angular
        .module('app')
        .controller('countryCtrl', ['geonames', '$routeParams', function (geonames, $routeParams) {

            var vm = this;

            console.log($routeParams)

            geonames.countryInfo($routeParams.countryCode)
                .then(function (res) {
                    vm.country = res.data;
                });
            ;
            geonames.neighbors($routeParams.countryCode)
                .then(function (res) {
                    vm.neighbors = res.data;
                })

        }]);
})();
