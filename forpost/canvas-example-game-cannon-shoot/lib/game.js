// GAME

var game = (function () {

    var createNewState = function (opt) {
        var state = {
            canvas: canvas,
            ctx: ctx = canvas.getContext('2d'),
            mode: 'aim', // 'aim', 'fired, and 'over' modes
            userDown: false,
            lastTick: new Date(),
            time: 0,
            offset: {
                x: 0,
                y: 0
            },
            shot: {
                x: 0,
                y: 0,
                pps: 64, // pixels per second
                power: 1,
                plps: 1 / 10, // power loss per second
                startHeading: 0,
                heading: 0
            },
            cannon: {
                heading: 0,
                power: 1,
                sx: 0,
                sy: 0,
                len: 100
            }
        };
        setCannon(state, -1, 1);
        return state;
    };

    var setCannon = function (state, heading, power) {
        var cannon = state.cannon;
        cannon.heading = heading;
        cannon.power = power;
        cannon.sx = Math.cos(cannon.heading) * cannon.len,
        cannon.sy = Math.sin(cannon.heading) * cannon.len + state.canvas.height;
    };

    // set the shot heading and pps based on power and startHeading
    var setShot = function (shot) {
        shot.heading = shot.startHeading + shot.angleDistanceToGround * (1 - shot.power);
        shot.pps = 128 + Math.floor(256 * shot.power);
    };

    // fire the shot
    var fireShot = function (state) {
        var sh = state.shot,
        canvas = state.canvas,
        ca = state.cannon;

        sh.startHeading = ca.heading;
        sh.angleDistanceToGround = utils.angleMinDistance(sh.startHeading, Math.PI / 2);
        sh.x = canvas.width / 2,
        sh.y = canvas.height / 2,
        state.offset.x = ca.sx;
        state.offset.y = ca.sy;
        sh.power = ca.power;
        setShot(sh);
        state.lastTick = new Date();
        state.mode = 'fired';
    };

    // Events
    var eventTypeMaps = {
        mousedown: 'start',
        mousemove: 'move',
        mouseup: 'end',
        touchstart: 'start',
        touchmove: 'move',
        touchend: 'end'
    };
    var userAction = function (state) {
        return function (e) {
            var pos = utils.getCanvasRelative(e),
            myType = eventTypeMaps[e.type];
            if (myType === 'start') {
                state.userDown = true;
            }
            if (myType === 'end') {
                state.userDown = false;
            }
            var userActionMode = userAction[state.mode] || {},
            modeAction = userActionMode[myType];
            if (modeAction) {
                modeAction(pos, state, e);
            }
        };
    };

    userAction.aim = {
        start: function (pos, state, e) {},
        move: function (pos, state, e) {
            var cannon = state.cannon,
            canvas = state.canvas;
            if (state.userDown) {
                var d = utils.distance(pos.x, pos.y, 0, canvas.height);
                var power = d / cannon.len;
                power = power > 1 ? 1 : power;
                setCannon(state,
                    Math.atan2(canvas.height - pos.y, pos.x) * -1,
                    0.75 + 0.25 * power);
            }
        },
        end: function (pos, state, e) {
            var cannon = state.cannon;
            var overFire = utils.boundingBox(pos.x, pos.y, 1, 1, canvas.width - 64, canvas.height - 64, 64, 64);
            if (overFire) {
                fireShot(state);
            }
        }
    };

    userAction.over = {
        end: function (pos, state, e) {
            setCannon(state, -1, 1);
            state.offset.x = 0;
            state.offset.y = 0;
            state.mode = 'aim';
        }
    };

    var update = function (state) {
        var now = new Date();
        state.time = now - state.lastTick;
        state.lastTick = now;
        var modeUpdate = update[state.mode] || false;
        if (modeUpdate) {
            modeUpdate(state);
        }
    };

    update.fired = function (state) {
        var secs = state.time / 1000,
        canvas = state.canvas;
        state.offset.x += Math.cos(state.shot.heading) * state.shot.pps * secs;
        state.offset.y += Math.sin(state.shot.heading) * state.shot.pps * secs;

        if (state.offset.y > canvas.height) {
            state.offset.y = canvas.height;
            state.mode = 'over';
        } else {
            state.shot.power -= state.shot.plps * secs;
            state.shot.power = state.shot.power < 0.025 ? 0 : state.shot.power;
        }
        setShot(state.shot);
    };

    return {
        update: update,
        createNewState: createNewState,
        userAction: userAction
    }

}
    ());
