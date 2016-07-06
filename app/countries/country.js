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
                return {
                    country: vm.country.countryCode, /* use 2 letter country code */
                    capital: vm.country.capital
                }
            })
            .then(function (params) {
                geonames.population(params.country, params.capital)
                    .then(function (res) {
                        vm.country.capitalPopulation = res.data;
                    });
            });

        geonames.neighbors($routeParams.countryCode)
            .then(function (res) {
                vm.neighbors = res.data;
            })
    }
})();
