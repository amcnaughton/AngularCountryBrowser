(function () {
    'use strict';

    angular
        .module('app')
        .controller('countriesCtrl', countriesCtrl);

    countriesCtrl.$inject = ['geonames', 'url', 'loading'];

    // list all countries
    function countriesCtrl(geonames, url, loading) {

        var vm = this;

        vm.loading = loading;

        activate();

        function activate() {

            vm.setSelectedCountry = url.viewCountry;    // fires when user selects a country

            vm.loading.start();                         // loading overlay disappears at end of ng-repeat

            geonames.countryInfo()
                .then(function (res) {
                    vm.countries = res.data;
                });
        }

    }
})();
