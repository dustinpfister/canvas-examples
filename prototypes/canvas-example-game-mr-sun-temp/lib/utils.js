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
        n: base + logPer * ( max - base ),
        valueOf: function(){
            return this.n;
        }
    };
};

utils.createLogPerCollection = function(opt){
    opt = opt || {};
    opt.len = opt.len === undefined ? 100 : opt.len;
    opt.base = opt.base === undefined ? 0 : opt.base;
    opt.max = opt.max === undefined ? 50 : opt.max;
    opt.a = opt.a === undefined ? 2 : opt.a;
    opt.b = opt.b === undefined ? opt.a : opt.b;
    var i = 0, obj, collection = {
       len: opt.len,
       base: opt.base,
       max: opt.max,
       a: opt.a,
       b: opt.b
    };
    collection.data = [];
    while(i < opt.len){
        obj = utils.createLogPerObject(i, opt.len, opt.base, opt.max, opt.a, opt.b);
        collection.data.push(obj);
        i += 1;
    }
    return collection;
};