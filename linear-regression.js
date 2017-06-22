
if(exports == null)
    exports = {};

function stepGradient(b, m, points, rate) {
    var bGradient = 0;
    var mGradient = 0;

    var N = points.length;
    var constant = (2.0 / N);

    for (var i = 0; i < N; i++) {
        var point = points[i];

        mGradient -= constant * (point.y - ((m * point.x) + b)) * point.x;
        bGradient -= constant * (point.y - ((m * point.x) + b));
    }

    mResult = m - (rate * mGradient);
    bResult = b - (rate * bGradient);

    return [mResult, bResult];
}

function Optimize(data, x_col, y_col, iterations, rate, onComplete, stepComplete) {
    var b = 0.0;
    var m = 0.0;

    var points = [];

    data.forEach(function (record) {
        points.push({ x: Number(record[x_col]), y: Number(record[y_col])});
    });

    for (var i = 0; i < iterations; i++) {
        var result = stepGradient(b, m, points, rate);
        m = result[0];
        b = result[1];

        if (stepComplete != null)
            stepComplete(m, b, i);
    }

    onComplete(m, b);
};

exports.Optimize = Optimize;
