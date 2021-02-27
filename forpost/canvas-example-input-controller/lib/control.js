var controlMod = (function () {

/*
    // is mouse helper
    var isMouse = function (e) {
        return (e.type === 'mousedown' || e.type === 'mouseup' || e.type == 'mousemove');
    }

    // get am array of point objects relative to the canvas
    // rather than the window object
    var getCanvasRelativeArray = function (e) {
        var canvas = e.target,
        bx = canvas.getBoundingClientRect(),
        arr = [];
        // mouse event
        if (isMouse(e)) {
            return [{
                    x: e.clientX - bx.left,
                    y: e.clientY - bx.top,
                    bx: bx,
                    e: e,
                    touch: {}
                }
            ];
        }
        // touch
        var i = 0,
        touch;
        while (i < e.targetTouches.length) {
            touch = e.targetTouches[i];
            arr.push({
                x: touch.clientX - bx.left,
                y: touch.clientY - bx.top,
                touch: touch,
                e: e,
                bx: bx
            });
            i += 1;
        }
        return arr;
    };
*/


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
            canvas: canvas,
            win: win,
            pointerDown: false,
            keys: {},
            pos: [],
            keys: fill(255, false),
            userHanders: {
                pointerStart: [],
                pointerMove: [],
                pointerEnd: [],
                keydown: [],
                keyup: []
            }
        };
        return input;
    };

    var callUserHanders = function (input, type, a, e) {
        input.userHanders[type].forEach(function (userHandler) {
            userHandler.call(input, a, input, e);
        });
    };

    // handers
    var handlers = {
        pointerStart: function (pos, input, e) {
            input.pointerDown = true;
            input.pos = pos;
            callUserHanders(input, 'pointerStart', pos, e);
        },
        pointerMove: function (pos, input, e) {
            // update pos only if pointer is down
            if (input.pointerDown) {
                input.pos = pos;
            }
            callUserHanders(input, 'pointerMove', pos, e);
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
            callUserHanders(input, 'pointerEnd', pos, e);
        }
    };

    // set an event handler for the given input state, DOMType, and type in handlers
    var setPointerHandler = function (input, DOMType, type) {
        console.log(input.canvas);
        input.canvas.addEventListener(DOMType, function (e) {
            var pos = utils.getCanvasRelativeArray(e);
            e.preventDefault();
            handlers[type](pos, input, e);
        });
    };

    // set a key handler
    var setKeyHandler = function (input, DOMType) {
        input.win.addEventListener(DOMType, function (e) {
            input.keys[e.keyCode] = e.type === 'keydown';
            callUserHanders(input, DOMType, input.keys, e);
        });
    };

    var api = function (canvas, win) {
        var input = createInputState(canvas, win || window);
        // mouse
        setPointerHandler(input, 'mousedown', 'pointerStart');
        setPointerHandler(input, 'mousemove', 'pointerMove');
        setPointerHandler(input, 'mouseup', 'pointerEnd');
        // touch
        setPointerHandler(input, 'touchstart', 'pointerStart');
        setPointerHandler(input, 'touchmove', 'pointerMove');
        setPointerHandler(input, 'touchend', 'pointerEnd');
        // keyboard
        setKeyHandler(input, 'keydown');
        setKeyHandler(input, 'keyup');
        return input;
    };

    // add a hander
    api.add = function (input, type, hander) {
        input.userHanders[type].push(hander);
    };

    return api;

}
    ());
