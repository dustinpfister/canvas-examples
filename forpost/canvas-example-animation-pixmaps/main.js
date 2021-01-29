var LIFESPAN = 7;

// state object
var canvasObj = utils.createCanvas({
    width: 320,
    height: 240
});
var state = {
    ver: '0.2.0',
    pixmaps: pixmapMod.create(),
    canvas: canvasObj.canvas,
    ctx: canvasObj.ctx,
    lt: new Date(),
    framesPerSec: 20,
    secs: 1
};

state.boxes = poolMod.create({
    count: 5,
    w: 64,
    h: 64,
    spawn: function(obj, pool, state, opt){
        obj.x = state.canvas.width / 2 - obj.w / 2;
        obj.y = state.canvas.height / 2- obj.h / 2;
        obj.heading = utils.pi2 * Math.random();
        obj.pps = 16 + 32 * Math.random();
        obj.lifespan = 1 + 3 * Math.random();
        obj.pixmapKey = 'mr_sun'; //'box_basics';
        obj.aniKey = 'sun_happy'; //['box1', 'box2'][Math.floor(Math.random() * 2)];
        obj.frameIndex = 0;
        obj.secs = 0;
    },
    update: function(obj, pool, state, secs){
        obj.secs += secs;
        if(obj.secs >= 0.25){
            obj.frameIndex += 1;
            obj.frameIndex %= 3;
            obj.secs %= 0.25
        }
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
        state.boxes.objects.forEach(function(box){
            if(box.active){
                state.pixmaps[box.pixmapKey][box.aniKey].set(box.frameIndex);
                state.pixmaps[box.pixmapKey][box.aniKey].draw(state.ctx, box.x, box.y, box.w, box.h);
            }
        });
        draw.ver(state.ctx, state.canvas, state);
        // update
        poolMod.spawn(state.boxes, state, {});
        poolMod.update(state.boxes, state.secs, state);
        state.secs = 0;
    }
    state.lt = now;
};

loop();
