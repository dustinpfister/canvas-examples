var PMMT = (function () {

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

    // out of canvas
    var outOfCanvas = function (sm, pos) {
        return pos.x < 0 || pos.x >= sm.canvas.width || pos.y < 0 || pos.y >= sm.canvas.height;
    };

    // get a pointer object if the state has one else return false
    var getPointer = function (sm) {
        var stateObj = sm[sm.currentState] || {};
        if (stateObj.pointer) {
            return stateObj.pointer;
        }
        return false;
    };

    // attach pointer events
    var attachPointerEvent = function (sm, domType, smType) {
        // attach a hander of the given domType to the canvas
        sm.canvas.addEventListener(domType, function (e) {
            // get position and state
            var pos = getCanvasRelative(e),
            pointer = getPointer(sm),
            hander,
            endHander;
            // prevent default
            e.preventDefault();
            // if we have a point object
            if (pointer) {
                handler = pointer[smType];
                // if we have a hander
                if (handler) {
                    // do not fire handler if we go out of bounds
                    // but trigger and end for the current state if
                    // if is there
                    if (outOfCanvas(sm, pos)) {
                        endHandler = pointer.end;
                        if (endHandler) {
                            endHandler(pos, sm, e);
                        }
                    } else {
                        // if we are in bounds just fire the hander
                        handler(pos, sm, e);
                    }
                }
            }
        });
    };

    // single attachment method for a state manager
    return function (sm) {
        // mouse events
        attachPointerEvent(sm, 'mousedown', 'start');
        attachPointerEvent(sm, 'mousemove', 'move');
        attachPointerEvent(sm, 'mouseup', 'end');
        attachPointerEvent(sm, 'mouseout', 'end');
        // touch events
        attachPointerEvent(sm, 'touchstart', 'start');
        attachPointerEvent(sm, 'touchmove', 'move');
        attachPointerEvent(sm, 'touchend', 'end');
        attachPointerEvent(sm, 'touchcancel', 'end');

    };

}
    ());
