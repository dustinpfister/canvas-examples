var createCanvas = function(opt){
    opt = opt || {};
    opt.container = opt.container || document.getElementById('canvas-app') || document.body;
    opt.canvas = document.createElement('canvas');
    opt.ctx = opt.canvas.getContext('2d');
    opt.container.appendChild(opt.canvas);
    opt.canvas.width = opt.width === undefined ? 300 : opt.width;
    opt.canvas.height = opt.height === undefined ? 200 : opt.height;
    opt.ctx.translate(0.5, 0.5);
    return opt;
};

var draw = {};

draw.background = function(ctx, canvas){
    ctx.fillStyle='black';
    ctx.fillRect(0,0,canvas.width, canvas.height);
};

var canvasObj = createCanvas(),
canvas = canvasObj.canvas,
ctx = canvasObj.ctx;

draw.background(ctx, canvas);