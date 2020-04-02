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

    // create a canvas for the given state machine
    var createCanvas = function (sm, w, h) {
        sm.canvas = document.createElement('canvas');
        sm.ctx = sm.canvas.getContext('2d');
        sm.container.appendChild(sm.canvas);
        sm.canvas.width = w || 320;
        sm.canvas.height = h || 240;
        // fill black for starters
        sm.ctx.fillStyle = 'black';
        sm.ctx.fillRect(0, 0, sm.canvas.width, sm.canvas.height);
    };

    // get canvas relative point
    var getCanvasRelative = function (e) {
        var canvas = e.target,
        bx = canvas.getBoundingClientRect();
        var x = (e.changedTouches ? e.changedTouches[0].clientX : e.clientX) - bx.left,
        y = (e.changedTouches ? e.changedTouches[0].clientY : e.clientY) - bx.top;
        return {
            x: x,
            y: y,
            bx: bx
        };
    };

    // attach a canvas event
    var attachCanvasEvent = function (sm, DOMType, smType) {
        sm.canvas.addEventListener(DOMType, function (e) {

            var stateObj = sm.states[sm.currentState],
            pt = {}, // pointer API
            handler,
            mode;
            pt.pos = getCanvasRelative(e);

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
            currentState: null,
            currentMode: null,
            game: {},
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
        createCanvas(sm, w, h);
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
