var utils = {};

utils.mod = function(x, m) {
    return (x % m + m) % m;
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

// create a canvas element
utils.createCanvas = function(opt){
    opt = opt || {};
    opt.container = opt.container || document.getElementById('canvas-app') || document.body;
    opt.canvas = document.createElement('canvas');
    opt.ctx = opt.canvas.getContext('2d');
    // assign the 'canvas_example' className
    opt.canvas.className = 'canvas_example';
    // set native width
    opt.canvas.width = opt.width === undefined ? 320 : opt.width;
    opt.canvas.height = opt.height === undefined ? 240 : opt.height;
    // translate by 0.5, 0.5
    opt.ctx.translate(0.5, 0.5);
    // disable default action for onselectstart
    opt.canvas.onselectstart = function () { return false; }
    // append canvas to container
    opt.container.appendChild(opt.canvas);
    return opt;
};
// get a point relative to the canvas rather than window, 
// and scale the point to fit the current scaled size of the canvas
utils.getCanvasRelative = function (e) {
    var canvas = e.target,
    bx = canvas.getBoundingClientRect(),
    pos = {
        x: (e.changedTouches ? e.changedTouches[0].clientX : e.clientX) - bx.left,
        y: (e.changedTouches ? e.changedTouches[0].clientY : e.clientY) - bx.top,
        bx: bx
    };
    // ajust for native canvas matrix size
    pos.x = Math.floor((pos.x / canvas.scrollWidth) * canvas.width);
    pos.y = Math.floor((pos.y / canvas.scrollHeight) * canvas.height);
    // prevent default
    e.preventDefault();
    return pos;
};
