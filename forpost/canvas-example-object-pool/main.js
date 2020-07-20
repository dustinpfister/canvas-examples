
var container = document.getElementById('canvas-app'),
canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d');
canvas.width = 320;
canvas.height = 240;
container.appendChild(canvas);

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
