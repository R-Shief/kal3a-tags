'use strict';

/**
 * @ngdoc function
 * @name kal3aTagsApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the kal3aTagsApp
 */
angular.module('kal3aTagsApp')
    .controller('MainCtrl', ['tag', '$scope', '$location', 'cornercouch', 'fosRouting', '_', function (tag, $scope, $location, cornercouch, fosRouting, _) {

        $scope.data = [];
        $scope.tag = tag;

        var server = cornercouch(fosRouting.generate('_guzzle_proxy_couchdb', {}, true), 'GET');
        var db = server.getDB();


        $scope.getTags = function (val) {

            var endPosition = val.length - 1,
                endCharacterCode = val.charCodeAt(endPosition),
                nextCharacter = String.fromCharCode(endCharacterCode + 1),
                endkey = val.substr(0, endPosition) + nextCharacter;

            return db
                .query('tag', 'timeseries', {
                    // stale: 'ok',
                    group: true,
                    group_level: 1,
                    startkey: [val],
                    endkey: [endkey, {}]
                })
                .then(function (res) {
                    return _.map(res.data.rows, function (row) {
                        return { key: row.key[0], value: row.value };
                    });
                });
        };

        $scope.getData = function ($item, $model, $label, $event) {
            db
                .query('enclosure', 'tags', {
                    group: true,
                    group_level: 2,
                    startkey: [tag],
                    endkey: [tag, {}]
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

            db
                .query('nofollow', 'tags', {
                    group: true,
                    group_level: 2,
                    startkey: [tag],
                    endkey: [tag, {}]
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
        };

        if ($scope.tag) {
            $scope.getData($scope.tag);
        }
    }]);
