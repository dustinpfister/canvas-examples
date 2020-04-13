// UTILS
var u = {};

u.distance = function (x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
};

// Math mod and angle methods from
// https://github.com/infusion/Angles.js/blob/master/angles.js
u.mod = function mod(x, m) {
    return (x % m + m) % m;
};

// percent to radian
u.perToRadian = function (per, min, max) {
    min = min === undefined ? 0 : min;
    max = max === undefined ? 359 : max;
    per = per === undefined ? 0: per;
    return Math.PI / 180 * (min + per * (max - min));
};
