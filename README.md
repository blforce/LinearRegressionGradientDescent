# Gradient Descent in JavaScript

Behold, a simple implementation of Gradient Descent! If you want to see a live demo, 
I have one [here](https://codepen.io/theBenForce/details/jwwEvb).

## app.js

The `app.js` file handles four things: setting hyperparameters, defining callback methods, 
loading data from a csv, and calling the linear regression method. 

## linear-regression.js
This is where the magic happens, starting in the Optimize method. 

### Optimize()
After a few variables are declared, the raw data that was passed in is converted to a list 
of objects with x and y properties. This loop gets the x and y values using the column names 
specified in the method parameters then converts them to numeric values. Next a quick check 
is performed to verify that nothing went wrong while parsing the numeric values, then a new 
point is saved.
```javascript
    // Make sure points are numeric values with x and y as the keys.
    data.forEach(function (record) {
        var nextX = Number(record[x_col]);
        var nextY = Number(record[y_col]);

        if (isNaN(nextX) || isNaN(nextY)) return;
        points.push({ x: nextX, y: nextY });
    });
```
   
Once all of the points have been parsed, it's time to run the gradient descent on them. This
code just loops for the requested number of steps, calling the ```stepGradient()``` method
every iteration and saving the results. Oh, there's some extra code in there to call the callback
methods too.
```javascript 
    for (var i = 0; i < iterations; i++) {
        var result = stepGradient(b, m, points, rate);
        m = result[0];
        b = result[1];

        if (stepComplete != null)
            stepComplete(m, b, i);
    }

    onComplete(m, b);
}
```

### StepGradient()
After all that setup, here's the heart of this app. First, all of the local variables are
initialized. Most of the variables are self-documenting, except the ```constant``` value.
```constant``` is just a left-over value for the two partial derivatives that are used
in the gradient descent formula.
```javascript
var bGradient = 0;
var mGradient = 0;

var N = points.length;
var constant = (2.0 / N);
```

With everything setup for this iteration the program loops through every data point. During
each iteration the ```mGradient``` and ```bGradient``` values are updated using the 
partial dirivatives of the error function with respect to m and b respectively.
```javascript
points.forEach(function (point) {
    mGradient -= constant * (point.y - ((m * point.x) + b)) * point.x;
    bGradient -= constant * (point.y - ((m * point.x) + b));
});
```

Finally, the resulting m and b values are calculated and returned. Each value has it's
corresponding gradient, multiplied by the learning rate, subtracted from it.
```javascript
mResult = m - (rate * mGradient);
bResult = b - (rate * bGradient);

return [mResult, bResult];
```