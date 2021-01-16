// create canvas helper
var createCanvas = function(opt){
    opt = opt || {};
    opt.container = opt.container || document.getElementById('canvas-app') || document.body;
    opt.canvas = document.createElement('canvas');
    opt.ctx = opt.canvas.getContext('2d');
    opt.container.appendChild(opt.canvas);
    opt.canvas.width = opt.width === undefined ? 440 : opt.width;
    opt.canvas.height = opt.height === undefined ? 280 : opt.height;
    opt.ctx.translate(0.5, 0.5);
    return opt;
};
// state object
var canvasObj = createCanvas();
var state = {
    ver: '0.5.0',
    canvas: canvasObj.canvas,
    ctx: canvasObj.ctx,
    lt: new Date(),
    can: canvasObjects(),
    framesPerSec: 20
};

// basic app loop
var loop = function(){
    var now = new Date(),
    secs = (now - state.lt) / 1000;
    requestAnimationFrame(loop);
    // draw
    draw.background(state.ctx, state.canvas);
    state.can.draw(state.ctx, 100, 100, 128, 128);
    draw.ver(state.ctx, state.canvas, state);

    // update
    state.can.step(-1);
    state.lt = now;
};
loop();
