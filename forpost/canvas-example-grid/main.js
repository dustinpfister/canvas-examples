var canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d'),
container = document.getElementById('canvas-app') || document.body;
container.appendChild(canvas);
canvas.width = 320;
canvas.height = 240;
ctx.translate(0.5, 0.5);

var grid = gridMod.create({
   width: 16,
   height: 8
});

var lt = new Date(),
radian = Math.PI * 0.25;
var loop = function () {

    var now = new Date(),
    secs = (now - lt) / 1000;

    requestAnimationFrame(loop);

    gridMod.moveMap(grid, secs, radian, -128);
    gridMod.applyBounds(grid);

    draw.back(ctx, canvas);
    draw.cells(ctx, grid);

    lt = new Date();

};

loop();