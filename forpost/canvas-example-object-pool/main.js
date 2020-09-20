
var container = document.getElementById('canvas-app'),
canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d');
canvas.width = 320;
canvas.height = 240;
container.appendChild(canvas);

var checkBounds = function (obj, canvas) {
    if (obj.x >= canvas.width || obj.x < obj.w * -1 || obj.y > canvas.height || obj.y < obj.h * -1) {
        obj.active = false;
    }
};

// create a state with pool
var state = {
    ver: '0.3.0',
    canvas: canvas,
    secs: 0,
    spawnRate: 0.1,
    shots: poolMod.create({
        count: 100,
        pps: 256,
        w: 8,
        h: 8,
        spawn: function (obj, pool, state, opt) {
            obj.x = opt.x;
            obj.y = opt.y;
            obj.heading = opt.heading;
            obj.lifespan = 3;
        },
        update: function (obj, pool, state, secs) {
            poolMod.moveByPPS(obj, secs);
        }
    }),
    boxes: poolMod.create({
        count: 3,
        data: {
            colors: ['red', 'green', 'blue']
        },
        spawn: function (obj, pool, state, opt) {
            obj.x = state.canvas.width / 2;
            obj.y = state.canvas.height / 2;
            obj.heading = Math.PI * 2 * Math.random();
            obj.pps = 32 + 128 * Math.random();
            obj.hcps = -90 + 180 * Math.random();
            obj.lifespan = 10;

            // data
            obj.data.fill = pool.data.colors[obj.i % pool.data.colors.length];
            obj.data.weapon = {
                secs: 0,
                shotRate: 0.25,
                damage: 1
            };
            obj.data.hp = {
                current: 10,
                max: 10
            };

        },
        update: function (obj, pool, state, secs) {
            if (obj.active) {
                // move
                poolMod.moveByPPS(obj, secs);
                obj.heading += Math.PI / 180 * obj.hcps * secs;

                // shoot
                var w = obj.data.weapon;
                w.secs += secs;
                if (w.secs >= w.shotRate) {
                    poolMod.spawn(state.shots, state, {
                        x: obj.x,
                        y: obj.y,
                        heading: obj.heading
                    });
                    w.secs %= w.shotRate;
                }

            }
            checkBounds(obj, state.canvas);
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
    draw.pool(ctx, state.shots);

    draw.ver(ctx, state);
    poolMod.update(state.boxes, secs, state);
    poolMod.update(state.shots, secs, state);

    state.secs += secs;
    if (state.secs >= state.spawnRate) {
        poolMod.spawn(state.boxes, state);
        state.secs %= state.spawnRate;
    }
    lt = now;

};
loop();
