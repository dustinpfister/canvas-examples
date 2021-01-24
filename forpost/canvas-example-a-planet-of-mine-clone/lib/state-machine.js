var Machine = (function () {

    // CANVAS
    // attach a canvas event
    var attachCanvasEvent = function (sm, DOMType, smType) {
        sm.canvas.addEventListener(DOMType, function (e) {

            var stateObj = sm.states[sm.currentState],
            pt = {}, // pointer API
            handler,
            mode;
            pt.pos = utils.getCanvasRelative(e);

            pt.overlap = function (x, y, w, h) {
                return utils.boundingBox(pt.pos.x, pt.pos.y, 1, 1, x, y, w, h);
            };

            pt.distance = function (x, y) {
                return utils.distance(pt.pos.x, pt.pos.y, x, y);
            };

            // prevent default
            e.preventDefault();
            // call top level if there
            if (stateObj.userPointer) {
                handler = stateObj.userPointer[smType];
                if (handler) {
                    handler(pt, sm, e);
                }
            }
            // call for current mode if there
            if (stateObj.modes && sm.currentMode) {
                mode = stateObj.modes[sm.currentMode];
                if (mode.userPointer) {
                    handler = mode.userPointer[smType];
                    if (handler) {
                        handler(pt, sm, e);
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
    var api = function (container, w, h) {

        // state machine Object
        var sm = {
            ver: '0.1.0',
            currentState: null,
            currentMode: null,
            game: {},
            solar: {}, // solar object
            draw: {},
            states: {},
            canvas: null,
            container: null,
            ctx: null,
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
        var canvasObj = utils.createCanvas();
        sm.canvas = canvasObj.canvas;
        sm.ctx = canvasObj.ctx;
        sm.container = canvasObj.container;
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

    // append tools so they can be used outside of the module if need be
    api.boundingBox = utils.boundingBox;
    api.distance = utils.distance;

    // return the public API
    return api;

}
    ());
