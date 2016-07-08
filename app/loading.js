(function () {
    'use strict';

    angular
        .module('app')
        .factory('loading', loading);

    loading.$inject = ['$rootScope'];

    function loading($rootScope) {

        var factory = {};

        factory.start = start;
        factory.finish = finish;

        return factory;

        function start() {
            $rootScope.loading = true;
        }

        function finish() {
            $rootScope.loading = false;
        }
    }

})();
