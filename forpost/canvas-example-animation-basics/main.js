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
draw.ver = function(ctx, canvas, state){
    ctx.fillStyle='white';
    ctx.textBaseline='top';
    ctx.textAlign='left';
    ctx.font='10px arial';
    ctx.fillText('v' + state.ver, 2, canvas.height - 12);
};
draw.box = function(ctx, box){
    ctx.fillStyle = 'red'
    ctx.beginPath();
    ctx.rect(box.x, box.y, box.w, box.h);
    ctx.fill();
};

var ff = forFrame.create();
console.log(ff);

var state = {
    ver: '0.1.0'
};
var canvasObj = createCanvas(),
canvas = canvasObj.canvas,
ctx = canvasObj.ctx;

draw.background(ctx, canvas);
draw.box(ctx, ff.model);
draw.ver(ctx, canvas, state);
