
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
        ],
        forCell: function (cell, grid) {
            var i = grid.objs.length,
            d,
            obj,
            per,
            c;
            while (i--) {
                obj = grid.objs[i];
                d = Math.sqrt(Math.pow(cell.x - obj.x, 2) + Math.pow(cell.y - obj.y, 2));
                if (d <= obj.radius) {
                    per = 1 - d / obj.radius;
                    c = cell.color;
                    c[0] = Math.floor(255 * per);
                    c[1] = 0;
                    c[2] = 0;
                }
            }
        }
    });

// fill black
ctx.fillStyle = 'black';
ctx.fillRect(0, 0, canvas.width, canvas.height);

draw.cells(ctx, grid);
