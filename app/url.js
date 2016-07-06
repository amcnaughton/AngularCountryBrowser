(function () {
    'use strict';

    angular
        .module('app')
        .factory('url', url);

    url.$inject = ['$location', '$timeout'];

    // deal with country changes
    function url($location, $timeout) {

        var factory = {};

        factory.viewCountry = viewCountry;

        return factory;

        function viewCountry(countryCode) {

            $timeout(function () {
                $location.path("/countries/" + countryCode);
            }, 0);
        }
    }

})();
