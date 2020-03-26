
var canvas = document.getElementById('thecanvas'),
ctx = canvas.getContext('2d');
canvas.width = 320;
canvas.height = 240;
ctx.translate(0.5, 0.5);

// creating a grid instance
var grid = new Grid({
        xOffset: 15,
        yOffset: 25,
        cellSize: 32,
        cellWidth: 9
    });

// fill black
ctx.fillStyle = 'black';
ctx.fillRect(0, 0, canvas.width, canvas.height);

draw.cells(ctx, grid, 'grey');
