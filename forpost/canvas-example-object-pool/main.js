
var container = document.getElementById('canvas-app'),
canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d');
canvas.width = 320;
canvas.height = 240;
container.appendChild(canvas);

var draw = {};

draw.back = function (ctx, canvas) {
    ctx.fillStyle = 'red';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
};

draw.pool = function (ctx, state) {
    var i = state.pool.length,
    bx;
    ctx.fillStyle = 'white';
    while (i--) {
        bx = state.pool[i];
        if (bx.active) {
            ctx.fillRect(bx.x, bx.y, bx.w, bx.h);
        }
    }
};

// create a state with pool
var state = Pool.create();

// LOOP
var lt = new Date();
var loop = function () {

    var now = new Date(),
    t = now - lt,
    secs = t / 1000;

    requestAnimationFrame(loop);
    draw.back(ctx, canvas);
    draw.pool(ctx, state);
    Pool.update(state, secs);

    lt = now;

};
loop();
