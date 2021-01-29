var canvasObj = utils.createCanvas(),
canvas = canvasObj.canvas,
ctx = canvasObj.ctx;

var g = Grass.create({
        maxBlades: 200,
        canvas: canvas
    });
var lt = new Date();
var loop = function () {
    var now = new Date(),
    t = now - lt;
    requestAnimationFrame(loop);
    draw.background(ctx, canvas);
    Grass.update(g, t);
    draw.grass(ctx, g);
    draw.info(ctx, canvas, g);
    lt = now;
};
loop();
