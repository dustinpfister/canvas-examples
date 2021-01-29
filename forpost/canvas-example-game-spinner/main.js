var canvasObj = utils.createCanvas({
  width: 320,
  height: 240
}),
canvas = canvasObj.canvas,
ctx = canvasObj.ctx;

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
