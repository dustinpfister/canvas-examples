var LIFESPAN = 7;

// state object
var canvasObj = utils.createCanvas({
    width: 640,
    height: 480
});
var state = {
    ver: '0.0.0',
    canvas: canvasObj.canvas,
    ctx: canvasObj.ctx,
    lt: new Date(),
    framesPerSec: 20,
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
        draw.ver(state.ctx, state.canvas, state);
        state.secs = 0;
    }
    state.lt = now;
};
loop();
