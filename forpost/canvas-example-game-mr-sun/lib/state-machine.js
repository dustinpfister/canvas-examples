var stateMod = (function(){

    // STATES

    var changeState = function (sm, stateKey, opt) {
        opt = opt || {};
        //var oldState = sm.state;
        var newState = sm.states[stateKey];
        sm.state = newState;
        sm.currentState = stateKey;
        if (newState.init) {
            newState.init(sm, opt);
        }
    };
/*
    // start a state change delay
    var startStateChangeDelay = function(sm, newStateKey, delayFunc){
       sm.newStateKey = newStatekey;
       sm.delayFunc = delayFunc;
    };
*/
    // the states object
    var states = {};
    // the plugins object
    var plugins = {};

    // call a method for all plugins with given array of arguments
    var callMethodForAllPlugins = function(sm, methodName, args){
        var plugKeys = Object.keys(plugins);
        plugKeys.forEach(function(plugKey){
            var plugObj = plugins[plugKey];
            if(plugObj[methodName]){
                plugObj[methodName].apply(sm, args);
            }
        });
    };

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
            callMethodForAllPlugins(sm, 'pointerEvent', [sm, 'start', pos, e, states[sm.currentState], sm.game]);
        },
        move: function (sm, pos, e) {
            var startPos = sm.input.startPos;
            sm.input.d = utils.distance(startPos.x, startPos.y, pos.x, pos.y);
            callMethodForAllPlugins(sm, 'pointerEvent', [sm, 'move', pos, e, states[sm.currentState], sm.game]);
        },
        end: function (sm, pos, e) {
            sm.input.pointerDown = false;
            callMethodForAllPlugins(sm, 'pointerEvent', [sm, 'end', pos, e, states[sm.currentState], sm.game]);
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

    // LOAD OBJECTS
    api.load = function(obj){
        if(obj.type === undefined || obj.type === 'state'){
            states[obj.name || Object.keys(states).length] = obj;
        }
        if(obj.type === 'plugin'){
            plugins[obj.name || Object.keys(plugins).length] = obj;
        }
    };

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
            state:{},
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

        // attach built in sm methods
        sm.changeState = function(stateName, opt){
            console.log('change state to: ' + stateName);
            changeState(sm, stateName, opt || {} );
        };

        // attach events for mouse and touch
        sm.canvas.addEventListener('mousedown', createPointerHandler(sm, 'start'));
        sm.canvas.addEventListener('mousemove', createPointerHandler(sm, 'move'));
        sm.canvas.addEventListener('mouseup', createPointerHandler(sm, 'end'));
        sm.canvas.addEventListener('touchstart', createPointerHandler(sm, 'start'));
        sm.canvas.addEventListener('touchmove', createPointerHandler(sm, 'move'));
        sm.canvas.addEventListener('touchend', createPointerHandler(sm, 'end'));


        // call 'create' method for all plugins
        callMethodForAllPlugins(sm, 'create', [sm, opt]);

        Object.keys(states).forEach(function(stateName){
            var stateObj = states[stateName];
            // call any create methods for states
            if(stateObj.create){
                stateObj.create(sm);
            }
            // call all init methods for states once here (FOR NOW)
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

        // call changeState for first time
        sm.changeState(sm.currentState);

        var loop = function () {
            var now = new Date(),
            t = now - lt,
            draw,
            update,
            secs = t / 1000;
            requestAnimationFrame(loop);
            if (t >= 1000 / FPS_target) {
                // update current state
                update = states[sm.currentState].update;
                if(update){
                    callMethodForAllPlugins(sm, 'update', [sm, secs]);
                    update.call(sm, sm, secs);
                }
                // get draw method of current state
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