'use strict';

var fs = require('fs');
var parse = require('csv-parse/lib/sync');
var regression = require('./linear-regression');

var fileName = 'data/kc_house_data.csv';
var records = [];
var rate = 0.001;
var steps = 1000;

function onCompleted(m, b) {
    console.log('Y = ' + m + 'x + ' + b);
}

function onStep(m, b, i) {
    if (i % 100 !== 0) return;

    console.log('Step ' + i + ': Y = ' + m + 'x + ' + b);
}

fs.readFile(fileName, function (err, data) {
    if (err) {
        return console.error(err);
    }
    records = parse(data, { columns: true });

    regression.Optimize(records, 'bedrooms', 'price',
                        steps, rate,
                        onCompleted, onStep);
});
