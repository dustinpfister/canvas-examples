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

// PERCENT METHODS

// clamp a percent value
utils.clampPer = function (per) {
    if (per > 1) {
        return 1;
    }
    if (per < 0) {
        return 0;
    }
    return per;
};

// basic percent method that will return a percent or numerator depeding on mode
utils.per = function(a, d, mode){
    mode = mode === undefined ? 'per' : mode;
    if(mode === 'per'){
        // a is a numerator return a percent value
        return utils.clampPer(a / d);
    }
    // a is a percent return a numerator
    return a * d;
};

// log3 percent method
utils.log3 = function (a, d, mode, p1) {
    mode = mode === undefined ? 'per' : mode;
    p1 = p1 === undefined ? 12 : p1;
    if(mode === 'per'){
        // a is a numerator return a percent value
        var n = a;
        var per = utils.per(n, d, 'per');
        return Math.log(1 + per) / Math.log(2 + p1);
    }
    // a is a percent return a numerator
    var per = a;
    var base = 2 + p1;
    return ((Math.pow(base, 1 + per) / base - 1) * d);
};

// LEVEL OBJECT

utils.xp = {
  defaultOptions:{
      levelCap: 100,
      expCap: Math.pow(10, 7),
      perMethod: 'log3',
      perArgs: [10]
  }
};

utils.xp.byLevel = function(level, opt){

    opt = opt || {};
    opt.levelCap = 100;
    opt.expCap = 1000;
    opt.perMethod = 'log3';
    opt.perArgs = [0];

    var per = utils[opt.perMethod].apply(null, [level, opt.levelCap, 'per'].concat(opt.perArgs));

    return {
        level: level,
        xp: opt.expCap * per
    };
};

utils.xp.byExp = function(xp, opt){
    opt = opt || {};
    opt.levelCap = 100;
    opt.expCap = 1000;
    opt.perMethod = 'log3';
    opt.perArgs = [0];

    var level = utils[opt.perMethod].apply(null, [xp / opt.expCap, opt.levelCap, 'n'].concat(opt.perArgs));

    return {
        level: level,
        xp: xp
    };
};