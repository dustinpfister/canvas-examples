
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
    ships: {},
    framesPerSec: 1,
    secs: 0
};

state.ships = poolMod.create({
    count: 3,
    spawn: function(obj, pool, state, opt){
        obj.x = 0;
        obj.y = 32;
        obj.lifespan = 3;
    },
    update: function(obj, pool, state, secs){
        obj.x += 32 * secs;
        obj.frameIndex = 0;
    }
});

poolMod.spawn(state.ships, state, {});



console.log( poolMod.getAllActive(state.ships, true) );

// basic app loop
var loop = function(){
    var now = new Date(),
    secs = (now - state.lt) / 1000;
    requestAnimationFrame(loop);

    state.secs += secs;
    if(state.secs >= 1 / state.framesPerSec){

        // draw
        draw.background(state.ctx, state.canvas);

        state.sheets.tri.set(0);
        state.sheets.tri.draw(state.ctx, 120, 40, 64, 64);


        draw.ver(state.ctx, state.canvas, state);

        // update

        state.secs = utils.mod(state.secs, 1 / state.framesPerSec);
    }
    state.lt = now;
};
loop();
