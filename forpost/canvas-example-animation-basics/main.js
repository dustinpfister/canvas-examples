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
    ctx.fillStyle = 'red';
    ctx.beginPath();
    ctx.rect(box.x, box.y, box.w, box.h);
    ctx.fill();
};
draw.box2 = function(ctx, box){
    ctx.save();
    ctx.fillStyle = box.fillStyle || 'red';
    ctx.strokeStyle = box.strokeStyle || 'white';
    ctx.beginPath();
    ctx.translate(box.x, box.y);
    ctx.rotate(box.r);
    ctx.rect(box.w / 2 * -1, box.h / 2 * -1, box.w, box.h);
    if(box.fillStyle){
        ctx.fill();
    }
    if(box.strokeStyle){
        ctx.stroke();
    }
    ctx.restore();
};

var canvasObj = createCanvas();
var state = {
    ver: '0.2.0',
    canvas: canvasObj.canvas,
    ctx: canvasObj.ctx,
    ff: forFrame.create({
        width: canvasObj.canvas.width,
        height: canvasObj.canvas.height
    }),
    lt: new Date(),
    framesPerSec: 12,
};

var loop = function(){
    var now = new Date(),
    secs = (now - state.lt) / 1000;
    requestAnimationFrame(loop);
    draw.background(state.ctx, state.canvas);
    draw.box2(state.ctx, state.ff.model);
    draw.ver(state.ctx, state.canvas, state);
    forFrame.step(state.ff, secs * state.framesPerSec);
    state.lt = now;
};

loop();
