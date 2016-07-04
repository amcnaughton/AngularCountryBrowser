(function () {
    'use strict';

    angular
        .module('app')
        .factory('geonames', ['$http', '$q', 'CacheFactory', function ($http, $q, CacheFactory) {

            var factory = {};
            var baseUrl = "http://api.geonames.org/";
            var userName = "amcnaughton";
            var countryCache = CacheFactory('countryCache');

            factory.countryInfo = countryInfo;
            factory.neighbors = neighbors;

            function countryInfo(country) {

                var url = baseUrl + "countryInfoJSON?username=" + userName;
                var countryData;

                //now check the country cache
                countryData = getCountry(country);
                console.log("getC", countryData)
                if (countryData && countryData.length) {

                    // return the cached data as a resolve promise
                    return new Promise(function (resolve) {
                        resolve({
                            data: countryData
                        });
                    });
                }

                // query string for a single country?
                if (country)
                    url += "&country=" + country;

                // get the data from geonames.org
                return $http.get(url)
                    .then(function (res) {
                            // success
                            countryData = {
                                data: putCountry(res.data.geonames)
                            };
                            console.log("countryInfo", countryData);

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

                        for (var i = 0; i < countries.length; i++)
                            countries.push(countryCache.get(countries[i]));

                        return countries;
                    } else
                        return countryCache.get(countryCode);
                }

                // add one or more countries to the cache
                function putCountry(data) {

                    for (var i = 0; i < data.length; i++)
                        countryCache.put(data[i].countryCode, data[i]);

                    return data;
                }

            }


            function neighbors(countryCode) {

                var url = baseUrl + "neighboursJSON?username=" + userName + "&country=" + countryCode;
                var neighborsData;

                return $http.get(url)
                    .then(function (res) {
                            // success
                            console.log("neighbors", res);
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

            return factory;
        }]);
})();
