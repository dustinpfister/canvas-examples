// SETUP CANVAS
(function () {
    var canvasObj = utils.createCanvas();
    var canvas = canvasObj.canvas;
    var ctx = canvasObj.ctx;
    var state = {
        ver: '0.1.0',
        canvas: canvas,
        ctx: ctx,
/*
        grid: new UnitGrid({
            xOffset: 15,
            yOffset: 25,
            cellSize: 32,
            cellWidth: 9
        })
        */
        game: gameMod.create()
    };
    // single event handler
    canvas.addEventListener('click', function (e) {
        var pos = utils.getCanvasRelative(e);
        var cell = state.game.grid.getCellFromPoint(pos.x, pos.y);
        if (cell.enemy) {
            state.game.grid.kills += 1;
            cell.enemy = false;
        }
    });
    // app loop
    var loop = function () {
        requestAnimationFrame(loop);
        // update
        state.game.grid.update();
        // draw
        draw.cls(ctx, canvas);
        draw.gridCellLines(state.game.grid, ctx);
        draw.disp(state.game, ctx);
        draw.ver(state, ctx);
    };
    loop();
}
    ());
