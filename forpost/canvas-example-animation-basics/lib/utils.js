var utils = {};

utils.pi2 = Math.PI * 2;

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

// mathematical modulo
utils.mod = function(x, m) {
    return (x % m + m) % m;
};

utils.bias = function(n, d){
    var per = n / d;
    return 1 - Math.abs(0.5 - per) / 0.5;
};

utils.log1 = function (n, d, base) {
    base = base === undefined ? 2 : base;
    var per = n / d;
    return Math.log( 1 + (per * (base - 1))) / Math.log(base);
};