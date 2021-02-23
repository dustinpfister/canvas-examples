// MAIN
var canvasObj = u.createCanvas({
    width: 640,
    height: 480
}),
canvas = canvasObj.canvas,
ctx = canvasObj.ctx;

var state = world.create();
state.ver = '0.0.0';
state.canvas = canvas;

var loop = function () {
    requestAnimationFrame(loop);

    world.update(state);

    draw.back(ctx, canvas);
    draw.worldCells(ctx, state);
    draw.infoBar(ctx, state);
    draw.ver(ctx, state);

};

loop();
