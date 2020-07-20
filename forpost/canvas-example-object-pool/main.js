
var container = document.getElementById('canvas-app'),
canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d');
canvas.width = 320;
canvas.height = 240;
container.appendChild(canvas);

// create a pool
var createPool = function () {
    var state = {
        pool: [],
        spawnRate: 0.1,
        secs: 0
    };
    var i = 10;
    while (i--) {
        state.pool.push({
            x: 32,
            y: 32,
            w: 32,
            h: 32,
            heading: 0,
            pps: 128,
            active: false
        });
    }
    return state;
};

var spawn = function (state, secs) {

    state.secs += secs;
    if (state.secs >= state.spawnRate) {
        bx = getInactive(state.pool);
        if (bx) {
            bx.active = true;
            bx.x = canvas.width / 2 - bx.w / 2;
            bx.y = canvas.height / 2 - bx.h / 2;
            bx.heading = Math.PI * 2 * Math.random();
        }
        state.secs %= state.spawnRate;
    }

};

update = function (state, secs) {
    var i = state.pool.length,
    bx;
    while (i--) {
        bx = state.pool[i];
        if (bx.active) {
            // move
            bx.x += Math.cos(bx.heading) * bx.pps * secs;
            bx.y += Math.sin(bx.heading) * bx.pps * secs;
        }
        // set inactive if out of bounds
        checkBounds(bx, canvas);
    }
    // spawn
    spawn(state, secs);
};

// get an inactive object or return false
var getInactive = function (pool) {
    var p = state.player,
    i = pool.length,
    obj;
    while (i--) {
        obj = pool[i];
        if (!obj.active) {
            return obj;
        }
    }
    return false;
};

// check bounds with the given object and set it inactive if it is out
var checkBounds = function (bx, canvas) {
    if (bx.x >= canvas.width || bx.x < bx.w * -1 || bx.y > canvas.height || bx.y < bx.h * -1) {
        bx.active = false;
    }
};

// create a state with pool
var state = createPool();

// LOOP
var lt = new Date();
var loop = function () {

    var now = new Date(),
    t = now - lt,
    secs = t / 1000;

    requestAnimationFrame(loop);

    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    var i = state.pool.length,
    bx;
    ctx.fillStyle = 'white';
    while (i--) {
        bx = state.pool[i];
        if (bx.active) {
            ctx.fillRect(bx.x, bx.y, bx.w, bx.h);
        }
    }

    update(state, secs);

    lt = now;

};
loop();
