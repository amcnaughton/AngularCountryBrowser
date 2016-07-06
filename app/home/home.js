(function () {
    'use strict';

    angular
        .module('app')
        .controller('homeCtrl', homeCtrl);

    homeCtrl.$inject = ['$window', 'geonames', 'url'];

    function homeCtrl($window, geonames, url) {

        var vm = this;

        // populate cache
        geonames.countryInfo()
            .then(function (res) {
                vm.countries = res.data;
            });

        // fires when user selects a country
        $window.setSelectedCountry = url.viewCountry;
    }
})();
