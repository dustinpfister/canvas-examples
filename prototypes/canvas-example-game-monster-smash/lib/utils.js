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
// clamp
utils.clamp = function (obj, box) {
    var xMax = box.x + box.w - obj.w,
    yMax = box.y + box.h - obj.h;
    obj.x = obj.x > xMax ? xMax : obj.x;
    obj.y = obj.y > yMax ? yMax : obj.y;
    obj.x = obj.x < box.x ? box.x : obj.x;
    obj.y = obj.y < box.y ? box.y : obj.y;
};

utils.getCanvasRelative = function (e) {
    var canvas = e.target,
    bx = canvas.getBoundingClientRect();
    return {
        x: (e.changedTouches ? e.changedTouches[0].clientX : e.clientX) - bx.left,
        y: (e.changedTouches ? e.changedTouches[0].clientY : e.clientY) - bx.top,
        bx: bx
    };
};
