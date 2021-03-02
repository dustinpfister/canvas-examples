var container = document.getElementById('canvas-app'),
canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d');
ctx.translate(0.5,0.5);
canvas.width = 320;
canvas.height = 240;
container.appendChild(canvas);

var state = pool.createState(),
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