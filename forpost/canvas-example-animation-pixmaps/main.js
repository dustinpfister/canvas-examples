var LIFESPAN = 7;

// state object
var canvasObj = utils.createCanvas({
    width: 320,
    height: 240
});
var state = {
    ver: '0.1.0',
    pixmaps: pixmapMod.create(),
    canvas: canvasObj.canvas,
    ctx: canvasObj.ctx,
    lt: new Date(),
    framesPerSec: 2,
    secs: 1
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
        state.pixmaps.box_basics.step(1);
        state.pixmaps.box_basics.draw(state.ctx, 32, 32, 64, 64);
        draw.ver(state.ctx, state.canvas, state);
        state.secs = 0;
    }
    state.lt = now;
};

loop();
