// UTILS
var utils = {};

// create an return a new once method
utils.once = (function () {
    var fired = false;
    return function (mess) {
        if (!fired) {
            console.log(mess);
        }
        fired = true;
    };
}
    ());

utils.getCanvasRelative = function (e) {
    var canvas = e.target,
    bx = canvas.getBoundingClientRect();
    var x = (e.changedTouches ? e.changedTouches[0].clientX : e.clientX) - bx.left,
    y = (e.changedTouches ? e.changedTouches[0].clientY : e.clientY) - bx.top;
    return {
        x: x,
        y: y,
        bx: bx
    };
};

utils.boundingBox = function (x1, y1, w1, h1, x2, y2, w2, h2) {
    return !(
        (y1 + h1) < (y2) ||
        y1 > (y2 + h2) ||
        (x1 + w1) < x2 ||
        x1 > (x2 + w2));
};

utils.distance = function (x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
};

// Math mod and angle methods from
// https://github.com/infusion/Angles.js/blob/master/angles.js
utils.mod = function mod(x, m) {
    return (x % m + m) % m;
};

utils.angleNormalizeHalf = function (n) {
    var c = Math.PI * 2;
    var h = c / 2;
    return utils.mod(n + h, c) - h;
};

utils.angleMinDistance = function (a, b) {
    var m = Math.PI * 2;
    var h = m / 2;
    var diff = utils.angleNormalizeHalf(a - b);
    if (diff > h) {
        diff = diff - m;
    }
    return Math.abs(diff);
};