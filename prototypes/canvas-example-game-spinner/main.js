var canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d'),
container = document.getElementById('gamearea') || document.body;
container.appendChild(canvas);
canvas.width = 640;
canvas.height = 480;

var spin = spinner.create({
        cx: canvas.width / 2,
        cy: canvas.height / 2
    });

var loop = function () {
    requestAnimationFrame(loop);
    draw.background(ctx, canvas);
    draw.sections(ctx, spin);
    draw.arrow(ctx, spin);
    draw.info(ctx, spin);
};
loop();
