// MAIN
var canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d'),
container = document.getElementById('canvas-app') || document.body;
container.appendChild(canvas);
canvas.width = 320;
canvas.height = 240;
ctx.translate(0.5, 0.5);

var game = gameMod.create({
        canvas: canvas
    });

var lt = new Date(),
FPS_target = 30;
var loop = function () {
    var now = new Date(),
    t = now - lt,
    secs = t / 1000;

    requestAnimationFrame(loop);

    if (t >= 1000 / FPS_target) {

        gameMod.update(game, secs);

        draw.back(ctx, canvas);
        draw.map(ctx, game.map, game.cross);
        draw.explosions(ctx, game);
        draw.cross(ctx, game.cross);
        draw.shots(ctx, game);
        draw.buttons(ctx);
        draw.info(ctx, game);
        lt = now;

    }
};

loop();
