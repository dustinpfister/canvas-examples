var canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d'),
container = document.getElementById('canvas-app') || document.body;
container.appendChild(canvas);
canvas.width = 320;
canvas.height = 240;
ctx.translate(0.5, 0.5);

var changeState = function(sm, stateKey, opt){
    opt = opt || {};
    var newState = sm.states[stateKey];
    if(newState.start){
        newState.start(sm, opt);
    }
    sm.currentState = stateKey;
};

var states = {
    game: {
        init: function(sm){
            // setup sun object
            sm.game = gameMod.create({
                canvas: sm.canvas,
                sectionCount: 19,
                worldRadius: 100,
                yearRate: 3
            });
        },
        // for each update tick
        update: function (sm, secs) {
            gameMod.update(sm.game, secs);
            draw.back(sm);
            draw.sections(sm);
            draw.sun(sm);
            draw.disp(sm);
            draw.ver(sm);
        },
        // events
        pointerStart: function (sm, pos, e) {},
        pointerMove: function (sm, pos, e) {
            var sun = sm.game.sun;
            if(sm.input.pointerDown){
                gameMod.moveSun(sm.game, pos);
            }
        },
        pointerEnd: function (sm, pos) {
             console.log('pointer down');
             var section = gameMod.getSectionByPos(sm.game, pos.x, pos.y);
             if(section){
                 changeState(sm, 'observe_section', {
                     section: section
                 });
             }
        }
    },
    observe_section: {
        data: {
            section:{}
        },
        start: function(sm, opt){
            console.log('observe_section state start: ');
            console.log(opt.section);
            sm.states['observe_section'].section = opt.section;
        },
        update: function(sm, secs){
            gameMod.update(sm.game, secs);
            draw.back(sm);
            draw.sectionData(sm, sm.states['observe_section'].section);
        },
        pointerEnd: function (sm) {
             console.log('back to game');
             changeState(sm, 'game', {});
        }
    }
};
 
var sm = {
    ver: '0.1.0',
    canvas: canvas,
    currentState: 'game',
    ctx: ctx,
    game: {},
    states: states,
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
        var method = states[sm.currentState].pointerStart;
        if(method){
            method(sm, pos, e);
        }
    },
    move: function (sm, pos, e) {
        var method = states[sm.currentState].pointerMove;
        if(method){
            method(sm, pos, e);
        }
    },
    end: function (sm, pos, e) {
        sm.input.pointerDown = false;
        var method = states[sm.currentState].pointerEnd;
        if(method){
            method(sm, pos, e);
        }
    }
};
var createPointerHandler = function (sm, type) {
    return function (e) {
        var pos = utils.getCanvasRelative(e);
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
