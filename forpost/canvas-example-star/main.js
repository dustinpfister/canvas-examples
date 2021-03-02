var canvasObj = utils.createCanvas({
    width: 320,
    height: 240
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
        ctx.fillStyle = 'green';
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 3;
        ctx.globalAlpha = obj.alpha;
        draw.points(ctx, obj.points, obj.x, obj.y);
        ctx.globalAlpha = 1;
    });
    pool.update(state, secs);
    lt = now;
};
loop();