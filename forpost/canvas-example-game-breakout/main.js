
(function () {

/*
    var canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d'),
    container = document.getElementById('canvas-app') || document.body;
    container.appendChild(canvas);
    canvas.width = 320;
    canvas.height = 240;
    ctx.translate(0.5, 0.5);
*/

var canvasObj = utils.createCanvas(),
canvas = canvasObj.canvas,
ctx = canvasObj.ctx;

    var state = breakout.createNewState(canvas);

    var lt = new Date(),
    FPS_target = 30;
    var loop = function () {
        var now = new Date(),
        t = now - lt,
        secs = t / 1000;
        requestAnimationFrame(loop);
        if (t >= 1000 / FPS_target) {
            breakout.update(state, secs);
            draw.background(ctx, canvas);
            draw.blocks(ctx, state);
            draw.paddle(ctx, state);
            draw.balls(ctx, state);
            draw.info(ctx, canvas, state);
            lt = now;
        }
    };
    loop();

}
    ());
