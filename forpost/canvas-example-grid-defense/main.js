// SETUP CANVAS
(function () {
    var state = {
        grid: new UnitGrid({
            xOffset: 15,
            yOffset: 25,
            cellSize: 32,
            cellWidth: 9
        })
    };
    // create and append canvas element, and get 2d context
    var canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d'),
    container = document.getElementById('gamearea') || document.body;
    container.appendChild(canvas);
    // set width and height
    canvas.width = 320;
    canvas.height = 240;
    // single event handler
    canvas.addEventListener('click', function (e) {
        var bx = e.target.getBoundingClientRect(),
        x = e.clientX - bx.left,
        y = e.clientY - bx.top;
        var cell = state.grid.getCellFromPoint(x, y);
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
    };
    loop();
}
    ());
