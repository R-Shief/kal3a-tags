'use strict';

/**
 * @ngdoc directive
 * @name kal3aTagsApp.directive:kal3aLineChart
 * @description
 * # kal3aLineChart
 */
angular.module('kal3aTagsApp')
    .component('kal3aLineChart', {
        template: '<linechart data="$ctrl.data" options="$ctrl.options" mode=""></linechart>',
        transclude: true,
        bindings: {
            tag: '<'
        },
        controller: ['cornercouch', 'fosRouting', function (cornercouch, fosRouting) {
            var server = cornercouch(fosRouting.generate('_guzzle_proxy_couchdb', {}, true), 'GET');
            var db = server.getDB();

            this.options = {
                axes: {
                    x: {type: 'date'},
                    y: {type: 'linear'}
                },
                series: [
                    {
                        y: 'value',
                        label: this.tag
                    }
                ],
                lineMode: 'cardinal'
            };

            db
                .query('tag', 'timeseries', {
                    stale: 'ok',
                    group: true,
                    group_level: 5,
                    startkey: [this.tag],
                    endkey: [this.tag, {}]
                })
                .then(function (res) {
                    this.data = _.map(res.data.rows, function (row) {
                        var utc = row.key.splice(1);
                        utc[1] = utc[1] - 1;
                        return {
                            x: new Date(Date.UTC.apply(null, utc)),
                            value: parseInt(row.value, 10)
                        };
                    });
                }.bind(this));

        }]
    });
