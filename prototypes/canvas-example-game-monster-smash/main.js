(function () {

    var canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d'),
    container = document.getElementById('canvas-app') || document.body;
    container.appendChild(canvas);
    canvas.width = 320;
    canvas.height = 240;
    ctx.translate(0.5, 0.5);

    var sm = {
        game: gameMod.create(),
        canvas: canvas,
        ctx: ctx
    };

    var loop = function () {
        requestAnimationFrame(loop);
        draw.back(sm);
        draw.map(sm);
    };

    loop();

}
    ());
