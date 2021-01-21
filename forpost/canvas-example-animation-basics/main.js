
// state object
var canvasObj = utils.createCanvas();
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
