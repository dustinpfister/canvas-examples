var canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d'),
container = document.getElementById('canvas-app') || document.body;
container.appendChild(canvas);
canvas.width = 320;
canvas.height = 240;
ctx.translate(0.5, 0.5);

var grid = gridMod.create({
   width: 24,
   height: 16
});




// can pull in a loop
var loop = function () {
    requestAnimationFrame(loop);

    //grid.xOffset -= 1;
    gridMod.moveMap(grid, 0.025, 0, -32);
    gridMod.applyBounds(grid);


    draw.back(ctx, canvas);
    draw.cells(ctx, grid);
};

loop();