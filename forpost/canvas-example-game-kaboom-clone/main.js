
var canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d');
document.getElementById('gamearea').appendChild(canvas);
canvas.width = 640;
canvas.height = 480;

var state = kaboom.createState(10);

canvas.addEventListener('mousedown', function (e) {
    kaboom.pointerStart(state, e);
});
canvas.addEventListener('mousemove', function (e) {
    e.preventDefault();
    var pos = utils.getCanvasRelative(e),
    player = state.player;
    player.inputPos = pos;
});

window.addEventListener('keydown', function (e) {

    var key = e.key.toLowerCase(),
    player = state.player,
    pos = {
        x: 0,
        y: 0,
        w: 1,
        h: 1
    };

    if (key === 'a') {
        pos.x = 0;
        player.inputPos = pos;
    }

    if (key === 'd') {
        pos.x = 640;
        player.inputPos = pos;
    }

});

window.addEventListener('keyup', function (e) {

    state.player.inputPos.x = state.player.x;
});

var loop = function () {

    requestAnimationFrame(loop);

    kaboom.update(state);

    draw.back(ctx, canvas);
    draw.bomber(ctx, state);
    draw.bombs(ctx, state);
    draw.player(ctx, state);
    draw.score(ctx, state);
    draw.ui(ctx, state);
    draw.pauseOverlay(ctx, canvas, state);

    draw.debug(ctx, state);

};

loop();
