
var canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d');
document.getElementById('gamearea').appendChild(canvas);
canvas.width = 640;
canvas.height = 480;

var state = kaboom.createState(1);
state.pauseTime = -1;

canvas.addEventListener('mousedown', function (e) {
    state.pauseTime = 0;
});

canvas.addEventListener('mouseup', function (e) {
    state.pauseTime = -1;
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

};

loop();
