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

utils.boundToCircle = function(obj, cx, cy, radius){
    if(utils.distance(obj.x, obj.y, cx, cy) > radius){
        var a = Math.atan2(obj.y - cy, obj.x - cx);
        obj.x = cx + Math.cos(a) * radius;
        obj.y = cy + Math.sin(a) * radius;
    }
};
 
