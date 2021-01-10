var utils = {};

// mathematical modulo
utils.mod = function(x, m) {
    return (x % m + m) % m;
};

utils.bias = function(n, d){
    var per = n / d;
    return 1 - Math.abs(0.5 - per) / 0.5;
};

utils.log1 = function (n, d, base) {
    base = base === undefined ? 2 : base;
    var per = n / d;
    return Math.log( 1 + (per * (base - 1))) / Math.log(base);
};