// MAIN
var canvasObj = u.createCanvas(),
canvas = canvasObj.canvas,
ctx = canvasObj.ctx;
var state = paricles.create({
        canvas: canvas,
        ctx: ctx
    });
draw.setGradient(state);
var loop = function () {
    requestAnimationFrame(loop);
    draw.background(state);
    draw.pool(state);
    paricles.update(state);
};
loop();
