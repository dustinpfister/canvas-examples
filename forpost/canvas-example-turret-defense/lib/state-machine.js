
var stateMachine = (function () {

    var api = {};

    var STATES = {};

    // create and return what the value for 'this' should be in a
    // state object method
    var createThis = function(sm){
        var state = sm.states[sm.currentState];
        state.data = state.data || {};
        return {
            sm: sm,
            state : state,
            data: state.data
        };
    };

    // Create a Pointer EVENT handler
    var createPointerHandler = function(sm, eventType){
        eventType = eventType || 'start';
        return function (e) {
            var pos = sm.pos = utils.getCanvasRelative(e);
            var state = sm.states[sm.currentState],
            pointer = state.pointer;
            if(pointer){
                // call the point method of the current state if it has one
                if(pointer[eventType]){
                    pointer[eventType].call(createThis(sm), sm, pos, e, state);
                }
            }
            if(eventType === 'start'){
               sm.pointerDown = true;
            }
            if(eventType === 'end'){
                sm.pointerDown = false;
                if(state.click){
                    // call the click method of a state if it has one
                    state.click.call(createThis(sm), sm, pos, e, state);
                }
            }
        };
    };

    // STATE MACHINE
    api.create = function(opt){
        opt = opt || {};
        // create and append canvas element, and get 2d context
        var canvasObj = utils.createCanvas({
                width: 640,
                height: 480
            }),
        canvas = canvasObj.canvas,
        ctx = canvasObj.ctx;
        // create state machine object
        var sm = {
            ver: opt.ver || '',
            appName: opt.appName || '',
            debugMode: opt.debugMode || false,
            canvas: canvas,
            ctx: ctx,
            game: {},
            lt: new Date(),
            currentState: 'title',
            states: STATES,
            trans: {
                active: true,
                inState: true,
                secs: 0,
                secsTotal: 0.5,
                onDone: utils.noop
            },
            buttons: api.createButtonPool(20),
            background: 'blue',
            frameRate: opt.frameRate || 30,
            pointerDown: false,
            pos: {}
            // OLD PROPS FROM PTL that may be removed compleatly at some point
            //saveSlotIndex: opt.saveSlotIndex || 0,
            //dispObjects: api.createButtonPool(2),
            //pixmaps: pixmapMod.create(),
            //highScores: {},
            //gameModeIndex: 0,
            //gameMode: '',
            //modeSettingsCollection: {},
            //modeSettings: {} // current modeSettingsObject in modeSettingsCollection
        };

        sm.canvas.addEventListener('mousedown', createPointerHandler(sm, 'start'));
        sm.canvas.addEventListener('mousemove', createPointerHandler(sm, 'move'));
        sm.canvas.addEventListener('mouseup', createPointerHandler(sm, 'end'));

        sm.canvas.addEventListener('touchstart', createPointerHandler(sm, 'start'));
        sm.canvas.addEventListener('touchmove', createPointerHandler(sm, 'move'));
        sm.canvas.addEventListener('touchend', createPointerHandler(sm, 'end'));

        return sm;
    };
    // BUTTON OBJECT POOL
    api.createButtonPool = function(count){
        return poolMod.create({
            count: count || 20,
            maxSecs: 0.25,
            spawn: function (obj, pool, sm, opt) {
                // just ref opt for the data object
                obj.data = opt;
                obj.x = opt.hx;
                obj.y = opt.hy;
                obj.w = opt.w || 128;
                obj.h = opt.h || 32;
            },
            // update the button
            update: function (obj, pool, sm, secs) {
                var fp = {
                    sx: obj.data.sx || 0,
                    sy: obj.data.sy || 0,
                    dist: obj.data.dist || 0,
                    heading: obj.data.heading || 0,
                    frame: Math.round(sm.trans.secs / sm.trans.secsTotal * 50),
                    frameMax: 50,
                    rev: !sm.trans.inState // use trans instate bool to ser rev
                };
                poolMod.moveByFramePerObj(obj, fp);
                obj.lifespan = Infinity; // keep setting lifespan to 1
            }
        });
    };
    // a spawn button helper
    api.spawnButton = function(sm, bx, actionString, dispText, angle, poolKey){
        poolKey = poolKey === undefined ? 'buttons' : poolKey;
        angle = angle === undefined ? Math.PI * 0.5 : angle;
        var sx = bx.x + Math.cos(angle) * sm.canvas.width,
        sy = bx.y + Math.sin(angle) * sm.canvas.width;
        return poolMod.spawn(sm[poolKey], sm, {
            action: actionString,
            disp: dispText,
            fill: '#ffffff',
            sx: sx, //sm.canvas.width * 0.5 * -1,
            sy: sy, //sm.canvas.height * 0.4,
            w: bx.w || 256,
            h: bx.h || 64,
            alpha: 0.4,  // alpha value for background
            alpha2: 0.8, // alpha value for text and border
            dist: utils.distance(bx.x, bx.y, sx, sy), //sm.canvas.width - 128,
            heading: utils.mod(angle + Math.PI, Math.PI * 2)
        });
    };
    // get a button by id
    api.getButtonByAction = function(buttonPool, action){
        var result = buttonPool.objects.filter(function(button){
            return button.active && button.data.action === action;
        });
        if(result.length >= 1){
            return result[0];
        }
        return false;
    };
    // change the current state and set up a 'in' transition for the new state
    api.changeState = function (sm, stateKey) {
        sm.currentState = stateKey;
        sm.trans.active = true;
        sm.trans.inState = true;
        sm.trans.secs = 0;
        // reset pools
        poolMod.setActiveStateForAll(sm.buttons, false);
        //poolMod.setActiveStateForAll(sm.dispObjects, false);
        // call init method for the new state
        sm.states[sm.currentState].init(sm);
    };
    // start a 'out' transition to a state change
    api.startStateChangeTrans = function(sm, stateKey){
        sm.trans.active = true;
        sm.trans.inState = false;
        sm.trans.secs = 0;
        sm.trans.onDone = function(sm){
            api.changeState(sm, stateKey);
            sm.trans.onDone = function(){};
            sm.trans.onDone = utils.noop;
        };
    };
    // update state by calling trans or update method
    api.updateState = function (sm, secs) {
        if (sm.trans.active) {
            if (sm.trans.secs < sm.trans.secsTotal) {
                sm.trans.secs += secs;
                sm.trans.secs = sm.trans.secs > sm.trans.secsTotal ? sm.trans.secsTotal : sm.trans.secs;
                if (sm.trans.secs === sm.trans.secsTotal) {
                    sm.trans.active = false;
                    sm.trans.onDone(sm);
                }
            }
            sm.states[sm.currentState].trans(sm, secs);
        } else {
            sm.states[sm.currentState].update(sm, secs);
        }
    };
    api.load = function(stateObj){
        STATES[stateObj.key] = stateObj;
    };
    // return the public API
    return api;
}
    ());
