// MAIN file including state machine
(function () {

    var canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d'),
    container = document.getElementById('canvas-app') || document.body;
    container.appendChild(canvas);
    canvas.width = 320;
    canvas.height = 240;
    ctx.translate(0.5, 0.5);

    var sm = {
        canvas: canvas,
        ctx: ctx,
        game: gameMod.create({
            canvas: canvas
        })
    };

    var lt = new Date(),
    FPS_target = 30;
    var loop = function () {
        var now = new Date(),
        t = now - lt,
        secs = t / 1000;
        requestAnimationFrame(loop);
        if (t >= 1000 / FPS_target) {
            gameMod.update(sm.game, secs);
            draw.back(ctx, canvas);
            draw.map(ctx, sm.game.map, sm.game.cross);
            draw.explosions(ctx, sm.game);
            draw.cross(ctx, sm.game.cross);
            draw.shots(ctx, sm.game);
            draw.buttons(ctx);
            draw.ver(ctx, sm.game);
            //draw.statBar(ctx, sm.game);
            //draw.info(ctx, sm.game);
            draw.debugAutoPlay(ctx, sm.game);
            lt = now;
        }
    };

    loop();

}
    ());
