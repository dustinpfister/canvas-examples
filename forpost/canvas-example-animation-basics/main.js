
// state object
var canvasObj = utils.createCanvas();
var state = {
    ver: '0.7.0',
    canvas: canvasObj.canvas,
    ctx: canvasObj.ctx,
    lt: new Date(),
    sheets:{
        tri: canvasObjects('tri'),
        boxGroup: canvasObjects('boxGroup')
    },
    ships: {},
    framesPerSec: 20,
    secs: 0
};

state.ships = poolMod.create({
    count: 50,
    spawn: function(obj, pool, state, opt){
        obj.x = state.canvas.width / 2;
        obj.y = state.canvas.height / 2;
        obj.heading = utils.pi2 * Math.random();
        obj.pps = 16 + 128 * Math.random();
        obj.lifespan = 5;
        var keys = Object.keys(state.sheets);
        obj.sheetName = keys[ Math.floor(Math.random() * keys.length) ];
    },
    update: function(obj, pool, state, secs){
        // have a frame index value to use with the sheet to skin the object
        obj.frameIndex = Math.floor(state.sheets.tri.maxFrame * ( obj.heading / utils.pi2 ));
        obj.heading += utils.pi2 / 360 * 90 * secs;
    }
});

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
            state.sheets[ship.sheetName].set(ship.frameIndex);
            state.sheets[ship.sheetName].draw(state.ctx, ship.x - 16, ship.y - 16, ship.w, ship.h);
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
