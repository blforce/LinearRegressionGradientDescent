'use strict';

var fs = require('fs');
var parse = require('csv-parse/lib/sync');
var regression = require('./linear-regression');

var fileName = 'data/kc_house_data.csv';
var records = [];

fs.readFile(fileName, function (err, data) {
    if (err) {
        return console.error(err);
    }
    records = parse(data, { columns: true });

    regression.Optimize(records, 'bedrooms', 'price', 1000, function (m, b) {
        console.log('Y = ' + m + 'x + ' + b);
    });
});
