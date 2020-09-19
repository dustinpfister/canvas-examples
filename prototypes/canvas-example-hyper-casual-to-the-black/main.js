
var canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d'),
container = document.getElementById('canvas-app') || document.body;
container.appendChild(canvas);
canvas.width = 320;
canvas.height = 240;
ctx.translate(0.5, 0.5);


var state = {
    lt: new Date(),
    game : gameMod.create({
        pps: 8,
        distance: 0
    })
};
var loop = function () {
    var now = new Date(),
    t = now - state.lt,
    secs =  t / 1000;
    requestAnimationFrame(loop);

    gameMod.update(state.game, secs);

    draw.back(ctx, canvas);
    draw.textETA(ctx, state.game, 10, 10);
};

loop();
