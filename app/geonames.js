(function () {
    'use strict';

    angular
        .module('app')
        .factory('geonames', geonames);

    geonames.$inject = ['$http', 'CacheFactory'];

    // interface to geonames.org
    function geonames($http, CacheFactory) {

        var factory = {};
        var baseUrl = "http://api.geonames.org/";
        var userName = "amcnaughton";
        var countryCache = CacheFactory('countryCache');

        factory.countryInfo = countryInfo;
        factory.neighbors = neighbors;
        factory.population = population;

        return factory;

        function countryInfo(countryCode) {

            var url = baseUrl + "countryInfoJSON?username=" + userName;
            var countryData;

            //now check the country cache
            countryData = getCountry(countryCode);
            if (countryData) {

                // return the cached data as a resolve promise
                return Promise.resolve({
                    data: countryData
                });
            }

            // query string for a single country?
            if (countryCode)
                url += "&country=" + countryCode;

            // get the data from geonames.org
            return $http.get(url)
                .then(function (res) {
                        // success
                        countryData = {
                            data: putCountry(res.data.geonames)
                        };
                        return countryData;
                    },
                    function (httpError) {
                        // http failure
                        throw httpError.status + " : " + httpError.data;
                    });

            // get one or all countries from the cache
            function getCountry(countryCode) {

                if (!countryCode) {

                    var keys = countryCache.keys();
                    var countries = [];

                    if (!keys.length)
                        return null;

                    for (var i = 0; i < keys.length; i++)
                        countries.push(countryCache.get(keys[i]));

                    return countries;
                } else
                    return countryCache.get(countryCode);

            }

            // add one or more countries to the cache
            function putCountry(data) {

                for (var i = 0; i < data.length; i++)
                    countryCache.put(data[i].isoAlpha3, data[i]);

                if (data.length === 1)
                    return data[0];
                else
                    return data;
            }

        }

        // lookup the neighbors of a country
        function neighbors(countryCode) {

            var url = baseUrl + "neighboursJSON?username=" + userName + "&country=" + countryCode;
            var neighborsData;

            return $http.get(url)
                .then(function (res) {
                        // success
                        neighborsData = {
                            data: res.data.geonames
                        };
                        return neighborsData;
                    },
                    function (httpError) {
                        // http failure
                        throw httpError.status + " : " + httpError.data;
                    });

        }

        // lookup the neighbors of a country
        function population(countryCode, place) {

            var url = baseUrl + "searchJSON?username=" + userName + "&name_equals=" + place + "&country=" + countryCode + "&maxRows=1";
            var populationData;

            return $http.get(url)
                .then(function (res) {
                        // success
                        populationData = {
                            data: res.data.geonames[0].population
                        };
                        return populationData;
                    },
                    function (httpError) {
                        // http failure
                        throw httpError.status + " : " + httpError.data;
                    });
        }
    }

})();
