

// create and append canvas element, and get 2d context
var canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d'),
container = document.getElementById('gamearea') || document.body;
container.appendChild(canvas);
// set width and height
canvas.width = 320;
canvas.height = 240;

// creating a grid instance
var grid = new Grid({
        xOffset: 15,
        yOffset: 25,
        cellSize: 32,
        cellWidth: 9
    });

// create a sheet
var sheet = document.createElement('canvas'),
ctx_sheet = sheet.getContext('2d');
sheet.width = 64;
sheet.height = 32;
ctx_sheet.fillStyle = 'orange';
ctx_sheet.fillRect(0, 0, sheet.width, sheet.height);
ctx_sheet.fillStyle = 'green';
ctx_sheet.fillRect(grid.cellSize, 0, grid.cellSize, grid.cellSize);

// setting some cells to a background index
// other that the default 0
grid.cells[10].backgroundIndex = 1;
grid.cells[18].backgroundIndex = 1;
grid.cells[19].backgroundIndex = 1;
grid.cells[20].backgroundIndex = 1;
grid.cells[28].backgroundIndex = 1;

// fill black
ctx.fillStyle = 'black';
ctx.fillRect(0, 0, canvas.width, canvas.height);

// draw backgrounds
draw.cellBackgrounds(ctx, grid, sheet);
// draw grid lines
draw.cellLines(ctx, grid, 'grey');
