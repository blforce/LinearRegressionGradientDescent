
var rate = 0.001;

function stepGradient(b, m, points, rate) {
    var bGradient = 0;
    var mGradient = 0;

    var N = points.length;
    var constant = (2.0 / N);

    for (var i = 0; i < N; i++) {
        x = points[i][0];
        y = points[i][1];

        bGradient -= constant * (y - ((m * x) + b));
        mGradient -= constant * (y - ((m * x) + b)) * x;
    }

    bResult = b - (rate * bGradient);
    mResult = m - (rate * mGradient);

    return [bResult, mResult];
}

exports.Optimize = function (data, x_col, y_col, iterations, callback) {
    var b = 0.0;
    var m = 0.0;

    var points = [];

    data.forEach(function (record) {
        points.push([record[x_col], record[y_col]]);
    });

    for (var i = 0; i < iterations; i++) {
        var result = stepGradient(b, m, points, rate);
        b = result[0];
        m = result[1];
    }

    callback(m, b);
};
