
var rate = 0.0001;

function stepGradient(b, m, points) {
    var bGradient = 0;
    var mGradient = 0;

    var N = points.length;
    var constant = (2.0 / N);

    for (var i = 0; i < N; i++) {
        var point = points[i];

        bGradient -= constant * (point.y - ((m * point.x) + b));
        mGradient -= constant * (point.y - ((m * point.x) + b)) * point.x;
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
        points.push({ x: Number(record[x_col]), y: Number(record[y_col])});
    });

    for (var i = 0; i < iterations; i++) {
        var result = stepGradient(b, m, points);
        b = result[0];
        m = result[1];
    }

    callback(m, b);
};
