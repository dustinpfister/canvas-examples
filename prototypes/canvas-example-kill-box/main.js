
// State Objects
var states = {
    // game state
    game: {
        // for each update tick
        update: function (sm, secs) {},
        // events
        pointerStart: function (sm, e) {},
        pointerMove: function () {},
        pointerEnd: function () {}
    }
};

// create canvas
var canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d'),
container = document.getElementById('canvas-app') || document.body;
container.appendChild(canvas);
canvas.width = 320;
canvas.height = 240;
ctx.translate(0.5, 0.5);

// Main State Machine Object
var sm = {
    ver: '0.0.0',
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
        states[sm.currentState].pointerStart(sm, e);
    },
    move: function (sm, e) {
        states[sm.currentState].pointerMove(sm, e);
    },
    end: function (sm, e) {
        sm.input.pointerDown = false;
        states[sm.currentState].pointerEnd(sm, e);
    }
};

var createPointerHandler = function (sm, type) {
    return function (e) {
        sm.input.pos = utils.getCanvasRelative(e);
        e.preventDefault();
        pointerHanders[type](sm, e);
    };
};

// main app loop
var loop = function () {
    requestAnimationFrame(loop);
    draw.back(ctx, canvas);

};

loop();
