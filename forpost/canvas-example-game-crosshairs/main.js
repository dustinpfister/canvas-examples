// MAIN
var canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d'),
container = document.getElementById('canvas-app') || document.body;
container.appendChild(canvas);
canvas.width = 320;
canvas.height = 240;
ctx.translate(0.5, 0.5);

var game = gameMod.create(canvas);

var lt = new Date();
var loop = function () {
    var now = new Date(),
    t = now - lt,
    secs = t / 1000;
    requestAnimationFrame(loop);

    gameMod.update(game, secs);

    draw.back(ctx, canvas);
    draw.map(ctx, game.map, game.cross);
    draw.cross(ctx, game.cross);
    draw.info(ctx, game.cross, game.map);
    lt = now;
};

loop();
