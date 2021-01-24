var Machine = (function () {

    // TOOLS

    // find out if the given to sets of
    // box areas overlap or not
    var boundingBox = function (x1, y1, w1, h1, x2, y2, w2, h2) {
        return !(
            (y1 + h1) < y2 ||
            y1 > (y2 + h2) ||
            (x1 + w1) < x2 ||
            x1 > (x2 + w2));
    };

    // standard distance formula
    var distance = function (x1, y1, x2, y2) {
        return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
    };

    // PARSE arguments

    // Parse a container argument
    var parseContainer = function (container) {
        // if object assume element that is to be used as the container
        if (typeof container === 'object' && container != null) {
            return container;
        }
        // if string assume id
        if (typeof container === 'string') {
            return document.getElementById(container);
        }
        // if we get this far return document.body
        return document.body;
    };

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
                return boundingBox(pt.pos.x, pt.pos.y, 1, 1, x, y, w, h);
            };

            pt.distance = function (x, y) {
                return distance(pt.pos.x, pt.pos.y, x, y);
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
            container: parseContainer(container),
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
    api.boundingBox = boundingBox;
    api.distance = distance;

    // return the public API
    return api;

}
    ());
