// UTILS
var utils = {};
// bounding box
utils.bb = function (a, b) {
    return !(
        (a.y + a.h) < b.y ||
        a.y > (b.y + b.h) ||
        (a.x + a.w) < b.x ||
        a.x > (b.x + b.w));
};
// get angle from one point to another
utils.angleToPoint = function (x1, y1, x2, y2, scale) {
    scale = scale === undefined ? Math.PI * 2 : scale;
    var aTan = Math.atan2(y1 - y2, x1 - x2);
    return (aTan + Math.PI) / (Math.PI * 2) * scale;
};
// get a point relative to a canvas element rather than window
utils.getCanvasRelative = function (e) {
    var canvas = e.target,
    bx = canvas.getBoundingClientRect();
    return {
        x: (e.changedTouches ? e.changedTouches[0].clientX : e.clientX) - bx.left,
        y: (e.changedTouches ? e.changedTouches[0].clientY : e.clientY) - bx.top,
        bx: bx
    };
};
