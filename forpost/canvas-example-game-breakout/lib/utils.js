var util = {};

util.TAU = Math.PI * 2;
util.EPS = 1e-15;

util.mod = function mod(x, m) {
    return (x % m + m) % m;
};

util.boundingBox = function (x1, y1, w1, h1, x2, y2, w2, h2) {
    return !(
        (y1 + h1) < (y2) ||
        y1 > (y2 + h2) ||
        (x1 + w1) < x2 ||
        x1 > (x2 + w2));
};

util.distance = function (x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
};

// normalize angle method
util.angleNormalize = function (a, scale) {
    return util.mod(a, scale || util.TAU);
}
