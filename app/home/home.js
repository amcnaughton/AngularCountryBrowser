(function () {
    'use strict';

    angular
        .module('app')
        .controller('homeCtrl', homeCtrl);

    homeCtrl.$inject = ['$window', 'geonames', 'url'];

    // dispaly the world map
    function homeCtrl($window, geonames, url) {

        var vm = this;

        activate();

        function activate() {

            // populate cache
            geonames.countryInfo()
                .then(function (res) {
                    vm.countries = res.data;
                });

            // fires when user selects a country
            $window.setSelectedCountry = url.viewCountry;
        }
    }
})();
