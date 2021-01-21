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
    sheets:{
        tri: canvasObjects('tri')
    },
    framesPerSec: 1,
    secs: 0
};

// basic app loop
var loop = function(){
    var now = new Date(),
    secs = (now - state.lt) / 1000;
    requestAnimationFrame(loop);

    state.secs += secs;
    if(state.secs >= 1 / state.framesPerSec){

        // draw
        draw.background(state.ctx, state.canvas);
        state.sheets.tri.draw(state.ctx, 120, 40, 64, 64);
        draw.ver(state.ctx, state.canvas, state);

        // update
        state.sheets.tri.step(1);
        state.secs = utils.mod(state.secs, 1 / state.framesPerSec);
    }
    state.lt = now;
};
loop();
