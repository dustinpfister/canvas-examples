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
        ctx.save();
        ctx.globalAlpha = obj.alpha;
        ctx.translate(obj.x, obj.y);
        ctx.rotate(obj.facing);
        draw.points(ctx, obj.points, 0, 0);
        ctx.restore();

        ctx.beginPath();
        ctx.moveTo(obj.x, obj.y);
        ctx.lineTo(
            obj.x + Math.cos(obj.facing) * obj.r1,
            obj.y + Math.sin(obj.facing) * obj.r1
        );
        ctx.stroke();

    });
    pool.update(state, secs);
    lt = now;
};
loop();