var kaboom = (function () {

    var BOMBER = {
        y: 100,
        w: 32
    },
    PLAYER = {
        y: 400,
        w: 32
    };

    // clamp boundaries for the given objState and objConstant
    // (state.bomber, BOMBER and state.player, PLAYER)
    var clampBoundaries = function (objState, objConst) {
        if (objState.x > 640 - objConst.w) {
            objState.x = 640 - objConst.w;
        }
        if (objState.x < 0) {
            objState.x = 0;
        }
    };

    var moveBomber = function (state, secs) {
        var bomber = state.bomber;
        // move bomber by secs and bomber dir property
        bomber.x += bomber.pps * secs * bomber.dir;
        // boundaries
        clampBoundaries(bomber, BOMBER);
        // update direction
        bomber.changeTime += secs;
        if (bomber.changeTime >= bomber.changeRate) {
            bomber.dir = 1 - Math.floor(Math.random() * 3);
            bomber.changeTime %= bomber.changeRate;
        }
    };

    return {

        BOMBER: BOMBER,
        PLAYER: PLAYER,

        createState: function () {
            return {
                lt: new Date(),
                pause: false,
                score: 0,
                level: 1,
                bomber: {
                    x: 320,
                    dir: 1,
                    pps: 512,
                    changeTime: 0,
                    changeRate: 0.5
                },
                bombs: [],
                player: {
                    x: 320,
                    hp: 3
                }
            };
        },

        update: function (state) {
            var now = new Date(),
            t = now - state.lt,
            secs = t / 1000,
            bomber = state.bomber;

            // if pause set lt to now and return out of function
            if (state.pause) {
                state.lt = now;
                return;
            }

            moveBomber(state, secs);

            state.lt = now;

        }

    }

}
    ());

var canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d');
document.getElementById('gamearea').appendChild(canvas);
canvas.width = 640;
canvas.height = 480;

var state = kaboom.createState();

var loop = function () {

    requestAnimationFrame(loop);

    kaboom.update(state);

    ctx.fillStyle = 'blue';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'green';
    ctx.fillRect(0, kaboom.BOMBER.y, canvas.width, canvas.height - kaboom.BOMBER.y);

    ctx.fillStyle = 'black';
    ctx.fillRect(state.bomber.x, kaboom.BOMBER.y - 64, kaboom.BOMBER.w, 64);

    ctx.fillStyle = 'white';
    ctx.fillText(state.bomber.changeTime, 10, 10);

};

loop();
