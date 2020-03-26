
var canvas = document.getElementById('thecanvas'),
ctx = canvas.getContext('2d');
canvas.width = 320;
canvas.height = 240;
ctx.translate(0.5, 0.5);

var grid = new Grid({
        cellWidth: canvas.width / 30,
        cellHeight: canvas.height / 20,
        gridWidth: 30,
        gridHeight: 20,
        objs: [{
                x: 14,
                y: 9,
                radius: 10
            }
        ]
    });

grid.update();

// fill black
ctx.fillStyle = 'black';
ctx.fillRect(0, 0, canvas.width, canvas.height);

draw.cells(ctx, grid);
