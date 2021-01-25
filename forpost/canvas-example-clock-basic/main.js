var canvasObj = utils.createCanvas(),
canvas = canvasObj.canvas,
ctx = canvasObj.ctx;

// loop
var loop = function () {
    requestAnimationFrame(loop);
    var clock = clockMod.create(new Date());
    draw.clear(canvas, ctx);
    draw.hourMarks(canvas, ctx, clock);
    draw.hands(canvas, ctx, clock);
    draw.clockDayCircle(canvas, ctx, clock);
    draw.clockText(canvas, ctx, clock);
    draw.info(ctx, canvas, clock);
};
// start loop
loop();
