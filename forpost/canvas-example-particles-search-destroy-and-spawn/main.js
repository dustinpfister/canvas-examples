// MAIN
var canvasObj = u.createCanvas(),
canvas = canvasObj.canvas,
ctx = canvasObj.ctx;

var state = paricles.create({
        ver: '0.0.1',
        canvas: canvas,
        ctx: ctx
    });

var loop = function () {
    requestAnimationFrame(loop);
    draw.back(state);
    draw.pool(state);
    draw.ver(state.ctx, state.canvas, state);
    paricles.update(state);

};

loop();
