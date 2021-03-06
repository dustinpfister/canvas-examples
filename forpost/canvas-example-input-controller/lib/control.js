var controlMod = (function () {

    // fill an array
    var fill = function (count, val) {
        return Array.apply(0, {
            length: count
        }).map(function () {
            return val
        })
    };

    var createInputState = function (canvas, win) {
        var input = {
            ver: '0.0.1',
            canvas: canvas,
            win: win,
            pointerDown: false,
            pos: [],
            keys: fill(255, false),
            userHandlers: {
                pointerStart: [],
                pointerMove: [],
                pointerEnd: [],
                keydown: [],
                keyup: []
            }
        };
        return input;
    };

    var calluserHandlers = function (input, type, a, e) {
        input.userHandlers[type].forEach(function (userHandler) {
            userHandler.call(input, a, input, e);
        });
    };

    // handers
    var handlers = {
        pointerStart: function (pos, input, e) {
            input.pointerDown = true;
            input.pos = pos;
            calluserHandlers(input, 'pointerStart', pos, e);
        },
        pointerMove: function (pos, input, e) {
            // update pos only if pointer is down
            if (input.pointerDown) {
                input.pos = pos;
            }
            calluserHandlers(input, 'pointerMove', pos, e);
        },
        pointerEnd: function (pos, input, e) {
            if (utils.isMouse(e)) {
                input.pointerDown = false;
                input.pos = [];
            } else {
                if (e.targetTouches.length === 0) {
                    input.pointerDown = false;
                    input.pos = [];
                } else {
                    input.pos = pos;
                }
            }
            calluserHandlers(input, 'pointerEnd', pos, e);
        }
    };

    // set an event handler for the given input state, DOMType, and type in handlers
    var setPointerHandler = function (input, DOMType, type) {
        console.log(input.canvas);
        input.canvas.addEventListener(DOMType, function (e) {
console.log(DOMType);
            var pos = utils.getCanvasRelativeArray(e);
            e.preventDefault();
            handlers[type](pos, input, e);
        });
    };

    // set a key handler
    var setKeyHandler = function (input, DOMType) {
        input.win.addEventListener(DOMType, function (e) {
            input.keys[e.keyCode] = e.type === 'keydown';
            calluserHandlers(input, DOMType, input.keys, e);
        });
    };

    var api = function (canvas, win) {
        var input = createInputState(canvas, win || window);
        // mouse
        setPointerHandler(input, 'mousedown', 'pointerStart');
        setPointerHandler(input, 'mousemove', 'pointerMove');
        setPointerHandler(input, 'mouseup', 'pointerEnd');
        setPointerHandler(input, 'mouseout', 'pointerEnd');
        // touch
        setPointerHandler(input, 'touchstart', 'pointerStart');
        setPointerHandler(input, 'touchmove', 'pointerMove');
        setPointerHandler(input, 'touchend', 'pointerEnd');
        setPointerHandler(input, 'touchcancel', 'pointerEnd');
        // keyboard
        setKeyHandler(input, 'keydown');
        setKeyHandler(input, 'keyup');
        return input;
    };

    // add a hander
    api.add = function (input, type, hander) {
        input.userHandlers[type].push(hander);
    };

    return api;

}
    ());
