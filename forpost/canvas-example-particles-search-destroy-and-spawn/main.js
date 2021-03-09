// MAIN
var canvasObj = u.createCanvas(),
canvas = canvasObj.canvas,
ctx = canvasObj.ctx;

var state = paricles.create({
        canvas: canvas,
        ctx: ctx
    });

var loop = function () {
    requestAnimationFrame(loop);
    draw.back(state);
    draw.pool(state);
    paricles.update(state);

};

loop();
