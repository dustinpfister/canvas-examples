var canvasObj = utils.createCanvas({
    width: 640,
    height: 480
}),
canvas = canvasObj.canvas,
ctx = canvasObj.ctx;


var state = pool.createState({
    maxDist: 150,
    canvas: canvas
}),
lt = new Date();

var loop = function () {
    var now = new Date(),
    t = now - lt,
    secs = t / 1000;
    requestAnimationFrame(loop);
    draw.background(ctx, canvas);
    state.pool.forEach(function(obj){
        draw.star(ctx, obj);
    });
    pool.update(state, secs);
    lt = now;
};
loop();