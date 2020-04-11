
var canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d');
document.getElementById('gamearea').appendChild(canvas);
canvas.width = 640;
canvas.height = 480;

var state = kaboom.createState(10);
state.pause = true;

canvas.addEventListener('mousedown', function (e) {
    state.pause = false;
});

canvas.addEventListener('mouseup', function (e) {
    state.pause = true;
});

canvas.addEventListener('mousemove', function (e) {
    e.preventDefault();
    var pos = utils.getCanvasRelative(e),
    player = state.player;
    player.inputPos = pos;
});

var loop = function () {

    requestAnimationFrame(loop);

    kaboom.update(state);

    draw.back(ctx, canvas);
    draw.bomber(ctx, state);
    draw.bombs(ctx, state);
    draw.player(ctx, state);
    draw.score(ctx, state);
    draw.debug(ctx, state);

    /*

    // draw background
    ctx.fillStyle = 'blue';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'green';
    ctx.fillRect(0, kaboom.BOMBER.y, canvas.width, canvas.height - kaboom.BOMBER.y);

    // draw bomber
    ctx.fillStyle = 'black';
    ctx.fillRect(state.bomber.x, kaboom.BOMBER.y - 64, kaboom.BOMBER.w, 64);

    // draw bombs
    var i = state.bombs.length,
    bomb;
    ctx.fillStyle = 'red';
    while (i--) {
    bomb = state.bombs[i];
    ctx.fillRect(bomb.x, bomb.y, 32, 32);
    }

    // draw player
    ctx.fillStyle = 'lime';
    ctx.fillRect(state.player.x, kaboom.PLAYER.y, kaboom.PLAYER.w, kaboom.PLAYER.h);

    // draw score
    ctx.fillStyle = 'white';
    ctx.font = '10px arial';
    ctx.textBaseline = 'top';
    ctx.textAlign = 'center';
    ctx.fillText(state.score, 320, 20);

    // draw debug info
    ctx.fillStyle = 'white';
    ctx.font = '10px arial';
    ctx.textBaseline = 'top';
    ctx.textAlign = 'left';
    ctx.fillText('level: ' + state.level, 10, 10);
    ctx.fillText('bombCount: ' + state.bombCount, 10, 20);
    ctx.fillText('bomber: { x: ' + state.bomber.x +
    ', dir: ' + state.bomber.dir +
    ', pps: ' + state.bomber.pps + ' }', 10, 30);
    ctx.fillText('player: { x: ' + state.player.x +
    ', hp: ' + state.player.hp +
    ', dir: ' + state.player.dir +
    ', pps: ' + state.player.pps + ' }', 10, 40);
     */
};

loop();
