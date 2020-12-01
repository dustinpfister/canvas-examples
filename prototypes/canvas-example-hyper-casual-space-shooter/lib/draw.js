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
            cellSize: 64,
            cellWidth: 7,
            cellHeight: 7,
            xOffset: state.map.x,
            yOffset: state.map.y
        },
        sx = grid.cellWidth * grid.cellSize / 2 * -1 - (grid.xOffset % grid.cellSize),
        sy = grid.cellHeight * grid.cellSize / 2 * -1 + (grid.yOffset % grid.cellSize),
        x, y,
        len = grid.cellWidth * grid.cellHeight,
        i = 0;
        ctx.strokeStyle = style || 'red';
        ctx.lineWidth = 1;
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
    },
    info: function(ctx, state){
        ctx.fillStyle = 'yellow';
        ctx.font = '10px arial';
        ctx.fillText(state.map.x.toFixed(2) + ',' + state.map.y.toFixed(2), 10, 10);
    },
    ver: function(ctx, state){
        ctx.fillStyle = 'yellow';
        ctx.font = '10px arial';
        ctx.textBaseline = 'top';
        ctx.fillText('v' + state.ver, 5, state.canvas.height - 15);
    }
};