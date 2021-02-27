
// State Objects
var states = {
    // game state
    game: {
        // for each update tick
        update: function (sm, secs) {
            // DRAW for game state
            // draw background
            draw.back(ctx, canvas);
            draw.map(sm);
            // draw pools
            draw.pool(sm, 'enemies', 'red');
            draw.pool(sm, 'playerUnits', 'blue');
            draw.pool(sm, 'shots', 'white');
            // cursor and version
            draw.cursor(sm);
            draw.ver(sm);
        },
        // events
        pointerStart: function (sm, e) {},
        pointerMove: function () {},
        pointerEnd: function () {}
    }
};

// create canvas
var canvasObj = utils.createCanvas(),
canvas = canvasObj.canvas,
ctx = canvasObj.ctx;

// Main State Machine Object
var sm = {
    ver: '0.3.0',
    canvas: canvas,
    ctx: ctx,
    currentState: 'game',
    game: gameMod.create({
        canvas: canvas
    }),
    input: {
        pointerDown: false,
        pos: {
            x: 0,
            y: 0
        }
    }
};

var pointerHanders = {
    start: function (sm, e) {
        var pos = sm.input.pos;
        sm.input.pointerDown = true;
        sm.input.pos = utils.getCanvasRelative(e);
        states[sm.currentState].pointerStart(sm, e);
    },
    move: function (sm, e) {
        if (sm.input.pointerDown) {
            sm.input.pos = utils.getCanvasRelative(e);
            states[sm.currentState].pointerMove(sm, e);
        }
    },
    end: function (sm, e) {
        sm.input.pointerDown = false;
        states[sm.currentState].pointerEnd(sm, e);
    }
};

var createPointerHandler = function (sm, type) {
    return function (e) {
        e.preventDefault();
        pointerHanders[type](sm, e);
    };
};

// attach for mouse and touch
canvas.addEventListener('mousedown', createPointerHandler(sm, 'start'));
canvas.addEventListener('mousemove', createPointerHandler(sm, 'move'));
canvas.addEventListener('mouseup', createPointerHandler(sm, 'end'));
canvas.addEventListener('touchstart', createPointerHandler(sm, 'start'));
canvas.addEventListener('touchmove', createPointerHandler(sm, 'move'));
canvas.addEventListener('touchend', createPointerHandler(sm, 'end'));

var lt = new Date(),
FPS_target = 30;
var loop = function () {
    var now = new Date(),
    t = now - lt,
    secs = t / 1000;
    requestAnimationFrame(loop);
    if (t >= 1000 / FPS_target) {
        states[sm.currentState].update(sm, secs);
        lt = now;
    }
};
loop();
