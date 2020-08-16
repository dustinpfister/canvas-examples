// UTILS
var utils = {};
// get distance between two points
utils.distance = function (x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
};
// get a canvas relative point
utils.getCanvasRelative = function (e) {
    var canvas = e.target,
    bx = canvas.getBoundingClientRect();
    return {
        x: (e.changedTouches ? e.changedTouches[0].clientX : e.clientX) - bx.left,
        y: (e.changedTouches ? e.changedTouches[0].clientY : e.clientY) - bx.top,
        bx: bx
    };
};
// return a percent value from another percent value
utils.logPer = function (per, high) {
    high = high === undefined ? 2 : high;
    per = per < 0 ? 0 : per;
    per = per > 1 ? 1 : per;
    return Math.log((1 + high - 2) + per) / Math.log(high);
};

/*
utils.logOnce = function () {
var fired = false;
return function (mess) {
if (!fired) {
console.log(mess);
fired = true;
}
}
};
*/
