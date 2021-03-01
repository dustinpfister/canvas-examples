var Machine = (function () {

    // attach a canvas event
    var attachCanvasEvent = function (sm, DOMType, smType) {
        sm.canvas.addEventListener(DOMType, function (e) {
            var pos = utils.getCanvasRelative(e),
            stateObj = sm.states[sm.currentState],
            handler,
            mode;
            // prevent default
            e.preventDefault();
            // call top level if there
            if (stateObj.userPointer) {
                handler = stateObj.userPointer[smType];
                if (handler) {
                    handler(pos, sm, e);
                }
            }
            // call for current mode if there
            if (stateObj.modes && sm.currentMode) {
                mode = stateObj.modes[sm.currentMode];
                if (mode.userPointer) {
                    handler = mode.userPointer[smType];
                    if (handler) {
                        handler(pos, sm, e);
                    }
                }
            }
        });
    };

    // attach canvas events for the given state machine
    var attachAllCanvasEvents = function (sm) {
        attachCanvasEvent(sm, 'mousedown', 'start');
        attachCanvasEvent(sm, 'mousemove', 'move');
        attachCanvasEvent(sm, 'mouseup', 'end');
        attachCanvasEvent(sm, 'touchstart', 'start');
        attachCanvasEvent(sm, 'touchmove', 'move');
        attachCanvasEvent(sm, 'touchend', 'end');
    };

    // create a new state machine
    return function (container, w, h) {
        var canvasObj = utils.createCanvas();
        // state machine Object
        var sm = {
            ver: '0.0.0',
            currentState: null,
            currentMode: null,
            game: {},
            draw: {},
            states: {},
            canvas: canvasObj.canvas,
            container: canvasObj.container,  //parseContainer(container),
            ctx: canvasObj.ctx,
            load: function (stateObj) {
                // just reference the object for now as long as
                // that works okay
                sm.states[stateObj.name || 'game'] = stateObj;
                if (stateObj.bootState) {
                    sm.currentState = stateObj.name;
                }
            },
            start: function (stateName) {
                sm.currentState = stateName || sm.currentState;
                var init = sm.states[sm.currentState].init || null;
                if (init) {
                    init(sm);
                }
                loop();
            }
        };
        // create canvas and attach event handlers
        //createCanvas(sm, w, h);
        attachAllCanvasEvents(sm);
        // main loop
        var loop = function () {
            requestAnimationFrame(loop);
            var stateObj = sm.states[sm.currentState] || {};
            // call top level tick
            if (stateObj.tick) {
                stateObj.tick(sm);
            }
            // call mode tick
            if (stateObj.modes && sm.currentMode) {
                var mode = stateObj.modes[sm.currentMode];
                if (mode.tick) {
                    mode.tick(sm);
                };
            }
        };
        return sm;
    };

}
    ());
