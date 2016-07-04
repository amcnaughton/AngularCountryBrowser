(function () {
    'use strict';

    angular
        .module('app')
        .controller('countriesCtrl', ['geonames', '$location', function (geonames, $location) {

            var vm = this;

            geonames.countryInfo()
                .then(function (res) {
                    vm.countries = res.data;
                });

            // user selected a country
            vm.setSelectedCountry = function (countryCode) {
                console.log(countryCode);
                $location.path("/countries/" + countryCode);
            };
        }]);
})();
