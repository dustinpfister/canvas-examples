var getCanvasRelative = function (e) {
    var canvas = e.target,
    bx = canvas.getBoundingClientRect();
    return {
        x: (e.changedTouches ? e.changedTouches[0].clientX : e.clientX) - bx.left,
        y: (e.changedTouches ? e.changedTouches[0].clientY : e.clientY) - bx.top,
        bx: bx
    };
};
 
var canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d'),
container = document.getElementById('canvas-app') || document.body;
container.appendChild(canvas);
canvas.width = 320;
canvas.height = 240;
ctx.translate(0.5, 0.5);
 
var states = {
    game: {
        init: function(sm){
            // setup sun object
            var game = sm.game;
            game.sun = {
                radius: 16
            };
            game.sun.x = sm.canvas.width / 2;
            game.sun.y = sm.canvas.height / 2;
            // setup sections
            var i = 0,
            sections = [],
            total = 10,
            radian, 
            radius = 100,
            cx = sm.canvas.width / 2,
            cy = sm.canvas.height / 2;
            while(i < total){
                radian = Math.PI * 2 / total * i;
                sections.push({
                    x: Math.cos(radian) * radius + cx,
                    y: Math.sin(radian) * radius + cy,
                    radius: 16
                });
                i += 1;
            }
            game.sections = sections;
            console.log(game.sections);
        },
        // for each update tick
        update: function (sm, secs) {
            var state = states[sm.currentState];
            var game = sm.game;
            var sun = game.sun;
            // draw background
            ctx.fillStyle = 'black';
            ctx.fillRect(0,0,canvas.width, canvas.height);
            // draw sun
            ctx.fillStyle = 'yellow';
            ctx.beginPath();
            ctx.arc(sun.x, sun.y, sun.radius, 0, Math.PI * 2 );
            ctx.fill();
        },
        // events
        pointerStart: function (sm, pos, e) {
            var state = states[sm.currentState];
            console.log(pos);

        },
        pointerMove: function () {},
        pointerEnd: function () {}
    }
};
 
var sm = {
    ver: '0.0.0',
    canvas: canvas,
    currentState: 'game',
    ctx: ctx,
    game: {},
    input: {
        pointerDown: false,
        pos: {
            x: 0,
            y: 0
        }
    }
};
 
// Pointer Events
var pointerHanders = {
    start: function (sm, pos, e) {
        var pos = sm.input.pos;
        sm.input.pointerDown = true;
        states[sm.currentState].pointerStart(sm, pos, e);
    },
    move: function (sm, pos, e) {
        states[sm.currentState].pointerMove(sm, pos, e);
    },
    end: function (sm, pos, e) {
        sm.input.pointerDown = false;
        states[sm.currentState].pointerEnd(sm, pos, e);
    }
};
var createPointerHandler = function (sm, type) {
    return function (e) {
        var pos = getCanvasRelative(e);
        sm.input.pos = pos;
        e.preventDefault();
        pointerHanders[type](sm, pos, e);
    };
};
 
// attach for mouse and touch
canvas.addEventListener('mousedown', createPointerHandler(sm, 'start'));
canvas.addEventListener('mousemove', createPointerHandler(sm, 'move'));
canvas.addEventListener('mouseup', createPointerHandler(sm, 'end'));
canvas.addEventListener('touchstart', createPointerHandler(sm, 'start'));
canvas.addEventListener('touchmove', createPointerHandler(sm, 'move'));
canvas.addEventListener('touchend', createPointerHandler(sm, 'end'));
 
// init current state
states[sm.currentState].init(sm);
 
// loop
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
