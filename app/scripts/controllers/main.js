'use strict';

/**
 * @ngdoc function
 * @name kal3aTagsApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the kal3aTagsApp
 */
angular.module('kal3aTagsApp')
    .controller('MainCtrl', ['$scope', '$location', 'cornercouch', 'fosRouting', '_', function ($scope, $location, cornercouch, fosRouting, _) {

        $scope.data = [];
        $scope.tag = $location.hash();

        $scope.server = cornercouch(fosRouting.generate('_guzzle_proxy_couchdb', {}, true), 'GET');
        $scope.db = $scope.server.getDB();

        $scope.options = {
            axes: {
                x: {type: 'date'},
                y: {type: 'linear'}
            },
            series: [
                {
                    y: 'value',
                    label: $scope.tag
                }
            ],
            lineMode: 'cardinal'
        };

        $scope.$watch('tag', function (value) {
            $location.hash(value);
        });

        $scope.$watch(function () {
            return $location.hash();
        }, function (value) {
            $scope.tag = value;
        });

        $scope.getTags = function (val) {

            var endPosition = val.length - 1,
                endCharacterCode = val.charCodeAt(endPosition),
                nextCharacter = String.fromCharCode(endCharacterCode + 1),
                endkey = val.substr(0, endPosition) + nextCharacter;

            return $scope.db
                .query('tag', 'timeseries', {
                    stale: 'ok',
                    group: true,
                    group_level: 1,
                    startkey: [val],
                    endkey: [endkey, {}]
                })
                .then(function (res) {
                    return _.map(res.data.rows, function (row) {
                        return row.key[0];
                    });
                });
        };

        $scope.getData = function () {
            if ($scope.tag) {
                $scope.db
                    .query('tag', 'timeseries', {
                        stale: 'ok',
                        group: true,
                        group_level: 5,
                        startkey: [$scope.tag],
                        endkey: [$scope.tag, {}]
                    })
                    .then(function (res) {
                        $scope.data = _.map(res.data.rows, function (row) {
                            var utc = row.key.splice(1);
                            utc[1] = utc[1] - 1;
                            return {
                                x: new Date(Date.UTC.apply(null, utc)),
                                value: parseInt(row.value, 10)
                            };
                        });
                    });

                $scope.db
                    .query('enclosure', 'tags', {
                        stale: 'ok',
                        group: true,
                        group_level: 2,
                        startkey: [$scope.tag],
                        endkey: [$scope.tag, {}]
                    })
                    .then(function (res) {
                            var reverseSort = function (row) {
                                    return -row.value;
                                },
                                slideFactory = function (row) {
                                    return row.key[1];
                                },
                                filterLongTail = function (row) {
                                    return (row.value > 5);
                                };

                            $scope.slides = _.map(_.sortBy(_.filter(res.data.rows, filterLongTail), reverseSort), slideFactory);
                        }
                    );

                $scope.db
                    .query('nofollow', 'tags', {
                        stale: 'ok',
                        group: true,
                        group_level: 2,
                        startkey: [$scope.tag],
                        endkey: [$scope.tag, {}]
                    })
                    .then(function (res) {
                            var reverseSort = function (row) {
                                    return -row.value;
                                },
                                listFactory = function (row) {
                                    return row.key[1];
                                },
                                filterLongTail = function (row) {
                                    return (row.value > 5);
                                };

                            $scope.links = _.map(_.sortBy(_.filter(res.data.rows, filterLongTail), reverseSort), listFactory);
                        }
                    );
            }
        };

        if ($scope.tag) {
            $scope.getData();
            $scope.options.series[0].label = $scope.tag;
        }
    }]);
