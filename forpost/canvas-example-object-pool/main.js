
var container = document.getElementById('canvas-app'),
canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d');
canvas.width = 320;
canvas.height = 240;
container.appendChild(canvas);

var checkBounds = function (bx, canvas) {
    if (bx.x >= canvas.width || bx.x < bx.w * -1 || bx.y > canvas.height || bx.y < bx.h * -1) {
        bx.active = false;
    }
};

// create a state with pool
var state = {
    ver: '0.2.0',
    canvas: canvas,
    secs: 0,
    spawnRate: 0.1,
    boxes: poolMod.create({
        //canvas: canvas,
        count: 100,
        spawn: function (obj, state, opt) {


            if (state.secs >= state.spawnRate) {
				
                bx = poolMod.getInactive(state.boxes);
                if (bx) {
                    bx.active = true;
                    bx.x = state.canvas.width / 2;
                    bx.y = state.canvas.height / 2;
                    bx.heading = Math.PI * 2 * Math.random();
                    bx.pps = 32 + 128 * Math.random();
                    bx.hcps = -90 + 180 * Math.random();
                    bx.lifespan = 10;
                }
                state.secs %= state.spawnRate;
            }

        },
        update: function (bx, state, secs) {
            if (bx.active) {
                // move
                bx.x += Math.cos(bx.heading) * bx.pps * secs;
                bx.y += Math.sin(bx.heading) * bx.pps * secs;
                bx.heading += Math.PI / 180 * bx.hcps * secs;
                bx.lifespan -= secs;
                bx.lifespan = bx.lifespan < 0 ? 0 : bx.lifespan;
                if (bx.lifespan === 0) {
                    bx.hcps = 0;
                }
            }
            checkBounds(bx, state.canvas);
        }
    })
};

// LOOP
var lt = new Date();
var loop = function () {

    var now = new Date(),
    t = now - lt,
    secs = t / 1000;

    requestAnimationFrame(loop);
    draw.back(ctx, canvas);
    draw.pool(ctx, state.boxes);
    draw.ver(ctx, state);
    state.secs += secs;
    poolMod.update(state.boxes, secs, state);
    poolMod.spawn(state.boxes, state);

    lt = now;

};
loop();
