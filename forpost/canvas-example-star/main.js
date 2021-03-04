var canvasObj = utils.createCanvas({
    width: 640,
    height: 480
}),
canvas = canvasObj.canvas,
ctx = canvasObj.ctx;
var state = pool.createState({
    count: 15,
    maxDist: 250,
    canvas: canvas
}),
lt = new Date();

state.background = draw.createBackground(ctx, canvas)

var loop = function () {
    var now = new Date(),
    t = now - lt,
    secs = t / 1000;
    requestAnimationFrame(loop);
    draw.background(ctx, canvas, state.background);
    state.pool.forEach(function(obj){
        draw.star(ctx, obj);
    });
    draw.ver(ctx, state);
    pool.update(state, secs);
    lt = now;
};
loop();