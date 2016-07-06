(function () {
    'use strict';

    angular
        .module('app')
        .controller('countryCtrl', countryCtrl);

    countryCtrl.$inject = ['geonames', '$routeParams'];

    // country detail page
    function countryCtrl(geonames, $routeParams) {

        var vm = this;

        geonames.countryInfo($routeParams.countryCode)
            .then(function (res) {
                vm.country = res.data;
            });

        geonames.neighbors($routeParams.countryCode)
            .then(function (res) {
                vm.neighbors = res.data;
            })
    }
})();
