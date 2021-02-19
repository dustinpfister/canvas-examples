// SETUP CANVAS
(function () {


    var canvasObj = utils.createCanvas();
    var canvas = canvasObj.canvas;
    var ctx = canvasObj.ctx;

    var state = {
        ver: '0.0.0',
        canvas: canvas,
        ctx: ctx,
        grid: new UnitGrid({
            xOffset: 15,
            yOffset: 25,
            cellSize: 32,
            cellWidth: 9
        })
    };

    // single event handler
    canvas.addEventListener('click', function (e) {
        var pos = utils.getCanvasRelative(e);
        var cell = state.grid.getCellFromPoint(pos.x, pos.y);
        if (cell.enemy) {
            state.grid.kills += 1;
            cell.enemy = false;
        }
    });
    // app loop
    var loop = function () {
        requestAnimationFrame(loop);
        // update
        state.grid.update();
        // draw
        draw.cls(ctx, canvas);
        draw.gridCellLines(state.grid, ctx);
        draw.disp(state, ctx);
        draw.ver(state, ctx);
    };
    loop();
}
    ());
