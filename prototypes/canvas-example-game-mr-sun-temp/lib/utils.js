var utils = {};

utils.getCanvasRelative = function (e) {
    var canvas = e.target,
    bx = canvas.getBoundingClientRect();
    return {
        x: (e.changedTouches ? e.changedTouches[0].clientX : e.clientX) - bx.left,
        y: (e.changedTouches ? e.changedTouches[0].clientY : e.clientY) - bx.top,
        bx: bx
    };
};

utils.distance = function (x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
};

utils.logPer = function (per, a, b) {
    a = a === undefined ? 2 : a;
    b = b === undefined ? a : b;
    per = per < 0 ? 0 : per;
    per = per > 1 ? 1 : per;
    return Math.log((1 + a - 2) + per) / Math.log(b);
};

utils.createLogPerObject = function(i, len, base, max, a, b){
    a = a === undefined ? 2: a;
    b = b === undefined ? a: b;
    base = base === undefined ? 0: base;
    max = max === undefined ? 1: max;
    var per = i / len,
    logPer = utils.logPer(per, a, b);
    return {
        i: i,
        len: len,
        per: per,
        logPer: logPer,
        n: base + logPer * max,
        valueOf: function(){
            return this.n;
        }
    };
};