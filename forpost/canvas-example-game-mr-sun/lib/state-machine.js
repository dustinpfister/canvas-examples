var stateMod = (function(){

    // STATES ARRAY
    var changeState = function (sm, stateKey, opt) {
        opt = opt || {};
        var newState = sm.states[stateKey];
        if (newState.start) {
            newState.start(sm, opt);
        }
        sm.currentState = stateKey;
    };

    // the states array
    var states = {};

    // Pointer Events
    var pointerHanders = {
        start: function (sm, pos, e) {
            var pos = sm.input.pos;
            sm.input.pointerDown = true;
            sm.input.startPos = {
                x: pos.x,
                y: pos.y
            };
            sm.input.d = 0;
            var method = states[sm.currentState].pointerStart;
            if (method) {
                method(sm, pos, e);
            }
        },
        move: function (sm, pos, e) {
            var method = states[sm.currentState].pointerMove,
            startPos = sm.input.startPos;
            sm.input.d = utils.distance(startPos.x, startPos.y, pos.x, pos.y);
            if (method) {
                method(sm, pos, e);
            }
        },
        end: function (sm, pos, e) {
            sm.input.pointerDown = false;
            var method = states[sm.currentState].pointerEnd;
            if (method) {
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

    // start public api
    var api = {};

    // LOAD STATE OBJECTS
    api.load = function(stateObj){
        states[stateObj.name || Object.keys(states).length] = stateObj;
    }

    // CREATE a new sm object
    var createCanvas = function(opt){
        opt = opt || {};
        opt.container = opt.container || document.getElementById('canvas-app') || document.body;
        opt.canvas = document.createElement('canvas');
        opt.ctx = opt.canvas.getContext('2d');
        opt.container.appendChild(opt.canvas);
        opt.canvas.width = opt.width === undefined ? 320 : opt.width;
        opt.canvas.height = opt.height === undefined ? 240 : opt.height;
        opt.ctx.translate(0.5, 0.5);
        return opt;
    };

    api.create = function(opt){
        opt = opt || {};
        var can = createCanvas(opt);
        var sm = {
            canvas: can.canvas,
            ctx: can.ctx,
            ver: opt.ver || '0.0.0',
            currentState: opt.currentState || 'game',
            game: {},
            draw: {},
            states: states,
            input: {
                pointerDown: false,
                d: 0,
                startPos: {
                    x: 0,
                    y: 0
                },
                pos: {
                    x: 0,
                    y: 0
                }
            }
        };

        // attach events for mouse and touch
        sm.canvas.addEventListener('mousedown', createPointerHandler(sm, 'start'));
        sm.canvas.addEventListener('mousemove', createPointerHandler(sm, 'move'));
        sm.canvas.addEventListener('mouseup', createPointerHandler(sm, 'end'));
        sm.canvas.addEventListener('touchstart', createPointerHandler(sm, 'start'));
        sm.canvas.addEventListener('touchmove', createPointerHandler(sm, 'move'));
        sm.canvas.addEventListener('touchend', createPointerHandler(sm, 'end'));

        // call init for all state objects
        Object.keys(states).forEach(function(stateName){
            var stateObj = states[stateName];
            if(stateObj.init){
                stateObj.init(sm);
            }
        });

        return sm;
    };

    // start the given sm object
    api.start = function(sm){
        var lt = new Date(),
        FPS_target = 30;
        var loop = function () {
            var now = new Date(),
            t = now - lt,
            draw,
            secs = t / 1000;
            requestAnimationFrame(loop);
            if (t >= 1000 / FPS_target) {
                states[sm.currentState].update(sm, secs);
                draw = states[sm.currentState].draw;
                if(draw){
                    draw.call(sm, sm.draw, sm.ctx, sm.canvas, sm.game, sm);
                }
                lt = now;
            }
        };
        loop();
    };

    // return the public api to stateMod
    return api;

}());