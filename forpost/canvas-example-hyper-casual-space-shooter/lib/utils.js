var utils = {};

// mathematical modulo
utils.mod = function(x, m) {
    return (x % m + m) % m;
};

// return a canvas realtive point from the given Mouse or Touch event Object
utils.getCanvasRelative = function (e) {
    var canvas = e.target,
    bx = canvas.getBoundingClientRect();
    return {
        x: (e.changedTouches ? e.changedTouches[0].clientX : e.clientX) - bx.left,
        y: (e.changedTouches ? e.changedTouches[0].clientY : e.clientY) - bx.top,
        bx: bx
    };
};

// get a distance between two points
utils.distance = function (x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
};


// ANGLES

// Wrap a radian value
utils.wrapRadian = function(radian){
    return utils.mod(radian, Math.PI * 2);
};

// get the angle from one point to another
utils.angleTo = function(fromX, fromY, toX, toY){
    return utils.wrapRadian(Math.atan2(toY - fromY, toX - fromX) + Math.PI);
};

utils.normalizeHalf = function(n, scale) {
  var c = scale || Math.PI * 2;
  var h = c / 2;
  return utils.mod(n + h, c) - h;
};

utils.shortestDirection = function(from, to, scale) {
  var z = from - to;
  if (from === to) {
    return 0;
    // if (mod(-z, 360) < mod(z, 360)) {
  } else if (utils.normalizeHalf(z, scale) < 0) {
    return -1; // Left
  } else {
    return +1; // Right
  }
}

// deep clone an object
utils.deepClone = function (obj) {
    return JSON.parse(JSON.stringify(obj));
};

