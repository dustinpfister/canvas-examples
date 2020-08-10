

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

var pointerMove = function (state, pos) {
    if (pos.x < canvas.width / 2) {
        state.input.left = true;
        state.input.right = false;
    } else {
        state.input.left = false;
        state.input.right = true;
    }
};

var pointerHandlers = {
    start: function (state, e, pos) {
        state.pointerDown = true;
        pointerMove(state, pos);
    },
    move: function (state, e, pos) {
        if (state.pointerDown) {
            pointerMove(state, pos);
        }
    },
    end: function (state, e) {
        state.pointerDown = false;
        state.input.left = false;
        state.input.right = false;
    }
};

var createPointerHandler = function (state, type) {
    return function (e) {
        var pos = util.getCanvasRelative(e);
        pointerHandlers[type](state, e, pos);
    };
};

canvas.addEventListener('mousedown', createPointerHandler(state, 'start'));
canvas.addEventListener('mousemove', createPointerHandler(state, 'move'));
canvas.addEventListener('mouseend', createPointerHandler(state, 'end'));

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
