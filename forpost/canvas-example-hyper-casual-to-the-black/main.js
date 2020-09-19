// create canvas
var canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d'),
container = document.getElementById('canvas-app') || document.body;
container.appendChild(canvas);
canvas.width = 320;
canvas.height = 240;
ctx.translate(0.5, 0.5);
// main state object
var state = {
    ver: '0.1.0',
    lt: new Date(),
    game : gameMod.create({
        canvas: canvas,
        startTime: new Date(2005, 4, 6, 10, 5),
        distObj:{
                //32: 900000000,
                //64: 100000000
        },
        //pps: 128,
        ppsIndex:5, //6,
        distance: 0,
        targetTimeUnit: 'years'
    })
};
// main app loop
var loop = function () {
    var now = new Date(),
    t = now - state.lt,
    secs =  t / 1000;
    requestAnimationFrame(loop);
    gameMod.update(state.game, secs, now);
    draw.back(ctx, state.game, canvas);
    draw.playerShip(ctx, state.game);
    draw.textDistance(ctx, state.game, 10, 10);
    draw.textPPS(ctx, state.game, 10, 20);
    draw.textETA(ctx, state.game, 10, 30);
    draw.ver(ctx, state, 2, canvas.height - 12);
    state.lt = now;
};

loop();
