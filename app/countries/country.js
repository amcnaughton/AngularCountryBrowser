(function () {
    'use strict';

    angular
        .module('app')
        .controller('countryCtrl', countryCtrl);

    countryCtrl.$inject = ['geonames', '$routeParams', '$q'];

    // country detail page
    function countryCtrl(geonames, $routeParams, $q) {

        var vm = this;
        var countryPromise;
        var neighborsPromise;

        // get country and then capital population
        countryPromise = geonames.countryInfo($routeParams.countryCode)
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

        // get list of neighbors
        neighborsPromise = geonames.neighbors($routeParams.countryCode)
            .then(function (res) {
                vm.neighbors = res.data;
            })

        $q.all([countryPromise, neighborsPromise])
            .catch(function (error) {
                alert("Error loading page details");
            });
    }
})();
