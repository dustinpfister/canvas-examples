
var container = document.getElementById('canvas-app'),
canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d');
canvas.width = 320;
canvas.height = 240;
container.appendChild(canvas);

// create a state with pool
var state = {
    ver: '0.4.0',
    canvas: canvas,
    secs: 0,
    spawnRate: 0.1,
    // shot pool
    shots: poolMod.create({
        count: 100,
        pps: 32,
        w: 8,
        h: 8,
        spawn: function (obj, pool, state, opt) {
            obj.x = opt.x;
            obj.y = opt.y;
            obj.heading = opt.heading;
            obj.lifespan = 3;
            obj.data.shooter = opt.shooter;
            obj.data.damage = opt.damage;
        },
        update: function (obj, pool, state, secs) {
            poolMod.moveByPPS(obj, secs);
            state.boxes.objects.forEach(function (bx) {
                // if not shooter box
                if (bx != obj.data.shooter && bx.active) {
                    if (poolMod.boundingBox(bx, obj)) {
                        bx.data.hp.current -= obj.data.damage;
                        bx.data.hp.current = bx.data.hp.current < 0 ? 0 : bx.data.hp.current;
                        if (bx.data.hp.current === 0) {
                            bx.lifespan = 0;
                        }
                        obj.lifespan = 0;
                    }
                }
            })
        }
    }),
    // box pool
    boxes: poolMod.create({
        count: 10,
        data: {
            colors: ['red', 'green', 'blue']
        },
        spawn: function (obj, pool, state, opt) {

            obj.x = state.canvas.width * Math.random();
            obj.y = state.canvas.height * Math.random();
            obj.heading = Math.PI * 2 * Math.random();

            obj.pps = 32 + 128 * Math.random();
            var dir = Math.random() < 0.5 ? -1 : 1;
            obj.hcps = (90 + 90 * Math.random()) * dir;
            obj.lifespan = 300;
            // data
            obj.data.fill = pool.data.colors[obj.i % pool.data.colors.length];
            obj.data.weapon = {
                secs: 0,
                shotRate: 1,
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
                        heading: obj.heading,
                        shooter: obj,
                        damage: w.damage
                    });
                    w.secs %= w.shotRate;
                }
            }
        }
    })
};

// LOOP
var lt = new Date(),
maxSecs = 0.1;
var loop = function () {

    var now = new Date(),
    t = now - lt,
    secs = t / 1000;
    secs = secs > maxSecs ? maxSecs : secs;

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
