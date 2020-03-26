
var canvas = document.getElementById('thecanvas'),
ctx = canvas.getContext('2d');
canvas.width = 320;
canvas.height = 240;

// creating a grid instance
var grid = new Grid({
        //cellSize: 32,
        cellWidth: canvas.width / 10,
        cellHeight: canvas.height / 10,
        gridWidth: 10,
        gridHeight: 10,
        forCell: function (cell) {
            var c = cell.color;
            c[0] = 255;
            c[1] = 255;
            c[2] = 255;
        }
    });

// fill black
ctx.fillStyle = 'black';
ctx.fillRect(0, 0, canvas.width, canvas.height);

draw.cells(ctx, grid);
