var kaboom = (function () {

    var BOMBER = {
        y: 100,
        w: 32
    },
    PLAYER = {
        y: 400
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
                    pps: 32
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
            secs = t / 1000;

            // if pause set lt to now and return out of function
            if (state.pause) {
                state.lt = now;
                return;
            }

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

};

loop();
