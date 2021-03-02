var canvasObj = utils.createCanvas({
    width: 640,
    height: 480
}),
canvas = canvasObj.canvas,
ctx = canvasObj.ctx;


var state = pool.createState({
    maxDist: 50, //200,
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
        ctx.fillStyle = 'green';
        ctx.lineWidth = 3;
        draw.points(ctx, obj.points, obj.x, obj.y);
    });
    pool.update(state, secs);
    lt = now;
};
loop();