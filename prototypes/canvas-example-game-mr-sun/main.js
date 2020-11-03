var getCanvasRelative = function (e) {
    var canvas = e.target,
    bx = canvas.getBoundingClientRect();
    return {
        x: (e.changedTouches ? e.changedTouches[0].clientX : e.clientX) - bx.left,
        y: (e.changedTouches ? e.changedTouches[0].clientY : e.clientY) - bx.top,
        bx: bx
    };
};

var distance = function (x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
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
            sm.game = gameMod.create(sm);
        },
        // for each update tick
        update: function (sm, secs) {
            var state = states[sm.currentState];
            var game = sm.game;
            var sun = game.sun;
            // draw background
            ctx.fillStyle = 'black';
            ctx.fillRect(0,0,canvas.width, canvas.height);
            // draw sections
            game.sections.forEach(function(section){
                var b = 50 + Math.round(section.per * 128);
                ctx.fillStyle = 'rgb(0,0,' + b + ')';
                ctx.beginPath();
                ctx.arc(section.x, section.y, section.radius, 0, Math.PI * 2 );
                ctx.fill();
                ctx.fillStyle = 'white';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.font = '10px arial';
                ctx.fillText(Math.round(section.per * 100), section.x, section.y);
            });
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
        pointerMove: function (sm, pos, e) {
            var sun = sm.game.sun;
            if(sm.input.pointerDown){
                sun.x = pos.x;
                sun.y = pos.y;
                gameMod.updateSections(sm.game);
            }
        },
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
