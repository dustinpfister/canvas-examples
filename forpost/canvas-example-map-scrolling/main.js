// CANVAS
var canvasObj = utils.createCanvas({
   width: 320,
   height: 240
}),
canvas = canvasObj.canvas,
ctx = canvasObj.ctx;

// scale
var ratio = window.devicePixelRatio || 1;

// CREATE GRID
var grid = g.createGridObject(12, 8);
grid.xOffset = 0;
grid.yOffset = 0;

var mousedown = false,
gridDelta = {
    x: 0,
    y: 0
};

// MAIN APP LOOP
var loop = function () {
    requestAnimationFrame(loop);
    grid.xOffset += gridDelta.x * ratio;
    grid.yOffset += gridDelta.y * ratio;

    var offsets = g.clampedOffsets(grid, canvas, ratio);
    grid.xOffset = offsets.xOffset;
    grid.yOffset = offsets.yOffset;
    // fill black
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // draw map
    drawMap(grid, ctx, canvas, ratio);
    // draw ver
    ctx.fillStyle = 'red';
    ctx.textBaseline = 'top';
    ctx.textAlign = 'left';
    ctx.font = '10px arial';
    ctx.fillText('v' + grid.ver, 5, canvas.height - 15);
};
loop();

// EVENTS
canvas.addEventListener('mousedown', function (e) {
    var pos = utils.getCanvasRelative(e);
    e.preventDefault();
    mousedown = true;
    var cell = g.getCellFromCanvasPoint(grid, pos.x / ratio, pos.y / ratio);
    if (cell.i === grid.selectedCellIndex) {
        grid.selectedCellIndex = -1;
    } else {
        if (cell.i >= 0) {
            grid.selectedCellIndex = cell.i;
        }
    }
});
canvas.addEventListener('mouseup', function (e) {
    e.preventDefault();
    mousedown = false;
    gridDelta.x = 0;
    gridDelta.y = 0;
});
canvas.addEventListener('mousemove', function (e) {
    var canvas = e.target,
    bx = canvas.getBoundingClientRect(),
    x = (e.clientX - bx.left) * ratio,
    y = (e.clientY - bx.top) * ratio,
    deltas = g.getPointerMovementDeltas(grid, canvas, x, y);
    if (mousedown) {
        gridDelta.x = deltas.x;
        gridDelta.y = deltas.y;
    }
});
