// MAIN
var canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d'),
container = document.getElementById('canvas-app') || document.body;
container.appendChild(canvas);
canvas.width = 320;
canvas.height = 240;
ctx.translate(0.5, 0.5);

var map = mapMod.create(),
cross = crossMod.create({
        offsetX: map.cellWidth * map.cellSize / 2 * -1,
        offsetY: map.cellHeight * map.cellSize / 2 * -1,
    });

canvas.addEventListener('mousedown', crossMod.createEvent(cross, 'start'));
canvas.addEventListener('mouseup', crossMod.createEvent(cross, 'end'));
canvas.addEventListener('mousemove', crossMod.createEvent(cross, 'move'));

canvas.addEventListener('touchstart', crossMod.createEvent(cross, 'start'));
canvas.addEventListener('touchend', crossMod.createEvent(cross, 'end'));
canvas.addEventListener('touchmove', crossMod.createEvent(cross, 'move'));

// attack!
var attack = function (e) {
    var pos = utils.getCanvasRelative(e),
    cell = mapMod.getWithCross(map, cross, pos.x, pos.y);
    e.preventDefault();
    if (cell) {
        cell.HP -= 5;
        cell.HP = cell.HP < 0 ? 0 : cell.HP;
        // percent killed
        map.percentKilled = 0;
        map.cells.forEach(function (cell) {
            map.percentKilled += cell.HP / cell.maxHP;
        });
        map.percentKilled /= map.cells.length;
    }
};
canvas.addEventListener('mousedown', attack);
canvas.addEventListener('touchstart', attack);

var lt = new Date();
var loop = function () {
    var now = new Date(),
    t = now - lt,
    secs = t / 1000;
    requestAnimationFrame(loop);

    crossMod.update(cross, secs);
    mapMod.clampOffset(map, cross.offset);

    draw.back(ctx, canvas);
    draw.map(ctx, map, cross);
    draw.cross(ctx, cross);
    draw.info(ctx, cross, map);
    lt = now;
};

loop();
