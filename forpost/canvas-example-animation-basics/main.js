
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
    framesPerSec: 20,
    secs: 0
};

state.ships = poolMod.create({
    count: 20,
    spawn: function(obj, pool, state, opt){
        obj.x = state.canvas.width / 2;
        obj.y = state.canvas.height / 2;
        obj.heading = Math.PI * 2 * Math.random();
        obj.pps = 16 + 128 * Math.random();
        obj.lifespan = 3;
    },
    update: function(obj, pool, state, secs){

        obj.frameIndex = Math.floor(state.sheets.tri.maxFrame * ( obj.heading / (Math.PI * 2) ));
    }
});



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

        var ships = poolMod.getAllActive(state.ships, true);
        ships.forEach(function(ship){
            state.sheets.tri.set(ship.frameIndex);
            state.sheets.tri.draw(state.ctx, ship.x - 16, ship.y - 16, ship.w, ship.h);
        });

        draw.ver(state.ctx, state.canvas, state);

        // update
        poolMod.spawn(state.ships, state, {});
        poolMod.update(state.ships, state.secs, state);
        state.secs = 0;
        //state.secs = utils.mod(state.secs, 1 / state.framesPerSec);
    }
    state.lt = now;
};
loop();
