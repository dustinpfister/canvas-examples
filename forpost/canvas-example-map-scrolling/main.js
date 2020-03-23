// CANVAS
var canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d'),
container = document.getElementById('gamearea') || document.body;
container.appendChild(canvas);

// scale
var ratio = window.devicePixelRatio || 1;
canvas.width = 320 * ratio;
canvas.height = 120 * ratio;

console.log(ratio);
console.log(window.innerWidth);

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
};
loop();

// EVENTS
canvas.addEventListener('mousedown', function (e) {
    var canvas = e.target,
    bx = canvas.getBoundingClientRect(),
    x = e.clientX - bx.left,
    y = e.clientY - bx.top;
    e.preventDefault();
    mousedown = true;
    var cell = g.getCellFromCanvasPoint(grid, x / ratio, y / ratio);
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
