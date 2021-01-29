var canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d'),
container = document.getElementById('canvas-app') || document.body;
container.appendChild(canvas);
canvas.width = 640;
canvas.height = 480;

var spin = spinner.create({
        cx: canvas.width / 2,
        cy: canvas.height / 2
    });

var lt = new Date();
var loop = function () {
    var now = new Date(),
    t = now - lt,
    secs = t / 1000;
    requestAnimationFrame(loop);
    spinner.update(spin, secs);
    draw.background(ctx, canvas);
    draw.sections(ctx, spin);
    draw.arrow(ctx, spin);
    draw.info(ctx, spin);
    draw.ver(ctx, canvas, spin);
    lt = now;
};
loop();

canvas.addEventListener('mousedown', function (e) {

    spinner.startSpin(spin);

});
