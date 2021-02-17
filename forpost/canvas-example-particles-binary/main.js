// MAIN
var canvasObj = u.createCanvas(),
canvas = canvasObj.canvas,
ctx = canvasObj.ctx;
var state = paricles.create({
        ver: '0.0.0',
        canvas: canvas,
        ctx: ctx
    });
draw.setGradient(state);
var loop = function () {
    requestAnimationFrame(loop);
    draw.background(state);
    draw.pool(state);
    draw.ver(state);
    paricles.update(state);
};
loop();
