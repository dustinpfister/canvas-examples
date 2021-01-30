var LIFESPAN = 7;

// state object
var canvasObj = utils.createCanvas({
    width: 320,
    height: 240
});
var state = {
    ver: '0.3.0',
    pixmaps: pixmapMod.create(),
    canvas: canvasObj.canvas,
    ctx: canvasObj.ctx,
    lt: new Date(),
    framesPerSec: 20,
    secs: 1
};

state.maxDist = state.canvas.width * 0.75;

state.boxes = poolMod.create({
    count: 30,
    w: 64,
    h: 64,
    spawn: function(obj, pool, state, opt){
        var radian = utils.pi2 * Math.random();
        obj.x = state.canvas.width / 2 + Math.cos(radian) * state.maxDist - obj.w / 2;
        obj.y = state.canvas.height / 2 + Math.sin(radian) * state.maxDist - obj.h / 2;
        obj.heading = radian + Math.PI;
        obj.pps = 64; //16 + 32 * Math.random();
        obj.pixmapKey = 'mr_sun'; //'box_basics';
        obj.aniKey = ['sun_happy', 'sun_mad'][Math.floor(Math.random() * 2)];
        obj.frameIndex = 0;
        obj.ani = state.pixmaps[obj.pixmapKey][obj.aniKey];
        obj.secs = 0;
        obj.lifespan = 1;
    },
    update: function(obj, pool, state, secs){
        obj.secs += secs;
        obj.lifespan = 1;
        if(obj.secs >= 0.25){
            obj.frameIndex += 1;
            obj.frameIndex %= obj.ani.maxFrame;
            obj.secs %= 0.25
        }
        var dist = utils.distance(obj.x + obj.w / 2, obj.y + obj.h / 2, state.canvas.width / 2, state.canvas.height / 2);
        if(dist >= state.maxDist){
           obj.lifespan = 0;
        }
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
                box.ani.set(box.frameIndex);
                box.ani.draw(state.ctx, box.x, box.y, box.w, box.h);
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
