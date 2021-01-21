var utils = {};

// create a canvas element
utils.createCanvas = function(opt){
    opt = opt || {};
    opt.container = opt.container || document.getElementById('canvas-app') || document.body;
    opt.canvas = document.createElement('canvas');
    opt.canvas.className = 'canvas_example';
    opt.ctx = opt.canvas.getContext('2d');
    opt.container.appendChild(opt.canvas);
    opt.canvas.width = opt.width === undefined ? 320 : opt.width;
    opt.canvas.height = opt.height === undefined ? 240 : opt.height;
    opt.ctx.translate(0.5, 0.5);
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