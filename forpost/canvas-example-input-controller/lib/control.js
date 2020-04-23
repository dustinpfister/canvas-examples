var controlMod = (function () {

    var getCanvasRelativeArray = function (e) {
        var canvas = e.target,
        bx = canvas.getBoundingClientRect(),
        arr = [];
        // mouse event
        if (e.type === 'mousedown' || e.type === 'mouseup' || e.type == 'mousemove') {
            return [{
                    x: e.clientX - bx.left,
                    y: e.clientY - bx.top,
                    bx: bx
                }
            ];
        }
        // touch
        var i = 0,
        touch;
        while (i < e.changedTouches.length) {
            touch = e.changedTouches[i];
            arr.push({
                x: touch.clientX - bx.left,
                y: touch.clientY - bx.top,
                bx: bx
            });
            i += 1;
        }
        return arr;
    };

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
            keys: fill(255, false)
        };
        return input;
    };

    // handers
    var handlers = {
        pointerStart: function (pos, input, e) {
            input.pointerDown = true;
            input.pos = pos;
        },
        pointerMove: function (pos, input, e) {
            // update pos only if pointer is down
            if (input.pointerDown) {
                input.pos = pos;
            }
        },
        pointerEnd: function (pos, input, e) {
            input.pointerDown = false;
            input.pos = pos;
        }
    };

    // set an event handler for the given input state, DOMType, and type in handlers
    var setPointerHandler = function (input, DOMType, type) {
        console.log(input.canvas);
        input.canvas.addEventListener(DOMType, function (e) {
            var pos = getCanvasRelativeArray(e);
            e.preventDefault();
            handlers[type](pos, input, e);
        });
    };

    // set a key handler
    var setKeyHandler = function (input, DOMType) {
        input.win.addEventListener(DOMType, function (e) {
            input.keys[e.keyCode] = e.type === 'keydown';
        });
    };

    return function (canvas, win) {
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

}
    ());
