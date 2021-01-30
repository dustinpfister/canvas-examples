var LIFESPAN = 7;

// state object
var canvasObj = utils.createCanvas({
    width: 320,
    height: 240
});
var state = {
    ver: '0.0.0',
    canvas: canvasObj.canvas,
    ctx: canvasObj.ctx,
    lt: new Date(),
    framesPerSec: 20,
    secs: 1
};

var dynas = dynaMod.create();

draw.background(state.ctx, state.canvas);

dynas.gridlines.set(8, {div: 4});
dynas.gridlines.draw(state.ctx);

draw.ver(state.ctx, state.canvas, state);

/*
state.boxes = poolMod.create({
    count: 30,
    w: 64,
    h: 64,
    spawn: function(obj, pool, state, opt){


    },
    update: function(obj, pool, state, secs){

    }
});

// basic app loop
var loop = function(){
    var now = new Date(),
    secs = (now - state.lt) / 1000;
    requestAnimationFrame(loop);
    state.secs += secs;
    state.secs = state.secs > 0.5 ? 0.5 : state.secs;
    if(state.secs >= 1 / state.framesPerSec){
        // draw
        draw.background(state.ctx, state.canvas);
        state.boxes.objects.forEach(function(box){
            if(box.active){

            }
        });
        draw.ver(state.ctx, state.canvas, state);
        // update
        //poolMod.spawn(state.boxes, state, {});
        //poolMod.update(state.boxes, state.secs, state);
        state.secs = 0;
    }
    state.lt = now;
};

loop();
*/