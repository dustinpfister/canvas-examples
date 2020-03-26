
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
                radius: 10,
                power: [1, 0, 0, 1],
                cps: 4,
                heading: 0
            }, {
                x: 17,
                y: 10,
                radius: 7,
                power: [0, 0, 1, 1],
                cps: 8,
                heading: 1
            }
        ]
    });

var loop = function () {
    requestAnimationFrame(loop);
    grid.update();
    draw.back(ctx, canvas);
    draw.cells(ctx, grid);

};

loop();
