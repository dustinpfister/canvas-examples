
var canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d');
document.getElementById('gamearea').appendChild(canvas);
canvas.width = 640;
canvas.height = 480;

var state = kaboom.createState(1);

canvas.addEventListener('mousedown', function (e) {
    state.player.inputPos.down = true;
    kaboom.pointerStart(state, e);
});
canvas.addEventListener('mousemove', function (e) {
    e.preventDefault();
    var pos = utils.getCanvasRelative(e),
    player = state.player;
    player.inputPos.x = pos.x;
    player.inputPos.y = pos.y;
});
canvas.addEventListener('mouseup', function (e) {
    state.player.inputPos.down = false;
});

window.addEventListener('keydown', function (e) {
    var key = e.key.toLowerCase(),
    player = state.player;
    player.inputKeys[key] = true;
    if (key === 'i') {
        player.inputAI = !player.inputAI;
    }
});

window.addEventListener('keyup', function (e) {
    var key = e.key.toLowerCase(),
    player = state.player;
    player.inputKeys[key] = false;
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
