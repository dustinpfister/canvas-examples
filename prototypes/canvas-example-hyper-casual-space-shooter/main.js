var createCanvas = function(opt){
    opt = opt || {};
    opt.container = opt.container || document.getElementById('canvas-app') || document.body;
    opt.canvas = document.createElement('canvas');
    opt.ctx = opt.canvas.getContext('2d');
    opt.container.appendChild(opt.canvas);
    opt.canvas.width = opt.width === undefined ? 320 : opt.width;
    opt.canvas.height = opt.height === undefined ? 240 : opt.height;
    opt.ctx.translate(0.5, 0.5);
    return opt;
};

// STATE
var canvasObj = createCanvas();
var state = {
    canvas : canvasObj.canvas,
    ctx: canvasObj.ctx,
    ship: { 
        x: 0, // ship position relative to map position
        y: 0
    },
    map: { // map position
        x: -16,
        y: -16
    }
};

var draw = {
    // draw background
    background: function (ctx, canvas) {
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    },
    ship: function(ctx, state){
        ctx.strokeStyle = 'blue';
        ctx.save();
        ctx.translate(160, 120);
        ctx.beginPath();
        ctx.lineWidth = 3;
        ctx.arc(state.ship.x, state.ship.y, 5, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
    },
    gridLines : function (ctx, state, style) {
        var grid={
            cellSize: 32,
            cellWidth: 11,
            cellHeight: 11,
            xOffset: state.map.x,
            yOffset: state.map.y
        },
        sx = grid.cellWidth * grid.cellSize / 2 * -1 - (grid.xOffset % grid.cellSize),
        sy = grid.cellHeight * grid.cellSize / 2 * -1 + (grid.yOffset % grid.cellSize),
        x, y,
        len = grid.cellWidth * grid.cellHeight,
        i = 0;
        ctx.strokeStyle = style || 'red';
        ctx.save();
        ctx.translate(160, 120);
        while(i < len){
            x = sx + (i % grid.cellWidth) * grid.cellSize;
            y = sy + Math.floor(i / grid.cellWidth) * grid.cellSize;
            ctx.beginPath();
            ctx.rect(x,y,grid.cellSize, grid.cellSize);
            ctx.stroke();
            i += 1;
        }
        ctx.restore();

    }
};

var lt = new Date(),
FPS_target = 1000 / 30;

var loop = function () {
    var now = new Date(),
    t = now - lt,
    secs = t / 1000;
    requestAnimationFrame(loop);
    if (t >= FPS_target) {
        draw.background(state.ctx, state.canvas);
        draw.gridLines(state.ctx, state, 'white');
        draw.ship(state.ctx, state);
        lt = now;
    }
};
loop();