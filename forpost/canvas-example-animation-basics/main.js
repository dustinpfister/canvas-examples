// create canvas helper
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
// state object
var canvasObj = createCanvas();
var state = {
    ver: '0.2.0',
    canvas: canvasObj.canvas,
    ctx: canvasObj.ctx,
    ff: forFrame.create({
        maxFrame: 250,
        width: canvasObj.canvas.width,
        height: canvasObj.canvas.height
    }),
    lt: new Date(),
    framesPerSec: 30
};
// basic app loop
var loop = function(){
    var now = new Date(),
    secs = (now - state.lt) / 1000;
    requestAnimationFrame(loop);
    // draw
    draw.background(state.ctx, state.canvas);
    draw.box2(state.ctx, state.ff.model);
    draw.ver(state.ctx, state.canvas, state);
    // update by secs
    forFrame.update(state.ff, secs, state.framesPerSec);
    state.lt = now;
};
loop();
