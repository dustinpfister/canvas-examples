

var canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d'),
container = document.getElementById('canvas-app') || document.body;
container.appendChild(canvas);
canvas.width = 320;
canvas.height = 240;
ctx.translate(0.5, 0.5);

var state = breakout.createNewState(canvas);

window.addEventListener('keydown', function (e) {
    var key = e.key.toLowerCase();
    if (key === 'a') {
        state.input.left = true;
    }
    if (key === 'd') {
        state.input.right = true;
    }
});

window.addEventListener('keyup', function (e) {
    var key = e.key.toLowerCase();
    if (key === 'a') {
        state.input.left = false;
    }
    if (key === 'd') {
        state.input.right = false;
    }
});

var pointerHandlers = {
    start: function (state, e) {
        state.input.pointerDown = true;
    },
    move: function (state, e) {
        // just need to update state.input.pos in main hander
        // put we can expand here later of needed
    },
    end: function (state, e) {
        state.input.pointerDown = false;
        state.input.left = false;
        state.input.right = false;
    }
};

var createPointerHandler = function (state, type) {
    return function (e) {
        var pos = state.input.pos = util.getCanvasRelative(e);
        e.preventDefault();
        pointerHandlers[type](state, e, pos);
    };
};

canvas.addEventListener('mousedown', createPointerHandler(state, 'start'));
canvas.addEventListener('mousemove', createPointerHandler(state, 'move'));
canvas.addEventListener('mouseup', createPointerHandler(state, 'end'));
canvas.addEventListener('touchstart', createPointerHandler(state, 'start'));
canvas.addEventListener('touchmove', createPointerHandler(state, 'move'));
canvas.addEventListener('touchend', createPointerHandler(state, 'end'));

var lt = new Date();
var loop = function () {
    var now = new Date();
    requestAnimationFrame(loop);
    breakout.update(state, (now - lt) / 1000);
    lt = now;
    draw.background(ctx, canvas);
    draw.blocks(ctx, state);
    draw.paddle(ctx, state);
    draw.balls(ctx, state);
    draw.info(ctx, canvas, state);
};
loop();
