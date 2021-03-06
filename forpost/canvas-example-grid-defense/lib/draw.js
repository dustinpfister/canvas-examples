// draw Cell Lines
var draw = {
    gridLineStyle: 'white',
    enemyFillStyle: 'red',
    textFill: 'yellow'
};
// clear the canvas
draw.cls = function (ctx, canvas) {
    ctx.fillStyle = 'blue';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
};
// draw grid lines and enemies
draw.gridCellLines = function (grid, ctx) {
    var ci = 0,
    x,
    y,
    cell,
    cLen = grid.cells.length;
    while (ci < cLen) {
        cell = grid.cells[ci];
        x = cell.x * grid.cellSize + grid.xOffset + 0.5;
        y = cell.y * grid.cellSize + grid.yOffset + 0.5;
        ctx.strokeStyle = draw.gridLineStyle;
        ctx.strokeRect(x, y, grid.cellSize, grid.cellSize);
        if (cell.enemy) {
            ctx.fillStyle = draw.enemyFillStyle;
            ctx.fillRect(x, y, grid.cellSize, grid.cellSize);
        }
        ci += 1;
    }
};
// draw display
draw.disp = function (game, ctx) {
    var grid = game.grid;
    ctx.fillStyle = draw.textFill;
    ctx.textBaseline = 'top';
    ctx.font = '10px arial';
    ctx.fillText('hp: ' + game.hp + '/' + game.hpMax + '; kills: ' + grid.kills, 10, 10);
};
// draw version number
draw.ver = function (state, ctx) {
    ctx.fillStyle = 'white';
    ctx.textBaseline = 'top';
    ctx.font = '10px arial';
    ctx.fillText('v' + state.ver, 5, state.canvas.height - 15);
};
