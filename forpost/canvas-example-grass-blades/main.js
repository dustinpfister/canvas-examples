// MAIN
var canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d'),
container = document.getElementById('canvas-app') || document.body;
container.appendChild(canvas);
canvas.width = 320;
canvas.height = 240;
//canvas.style.width = '100%';
//canvas.style.height = '100%';
ctx.translate(0.5, 0.5);

var g = Grass.create({
        maxBlades: 200,
        canvas: canvas
    });
var lt = new Date();
var loop = function () {
    var now = new Date(),
    t = now - lt;
    requestAnimationFrame(loop);
    draw.background(ctx, canvas);
    Grass.update(g, t);
    draw.grass(ctx, g);
    draw.info(ctx, canvas, g);
    lt = now;
};
loop();
