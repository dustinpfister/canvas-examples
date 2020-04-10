var utils = {}
// bounding box
utils.bb = function (a, b) {
    return !(
        (a.y + a.size) < b.y ||
        a.y > (b.y + b.size) ||
        (a.x + a.size) < b.x ||
        a.x > (b.x + b.size));
};

var kaboom = (function () {

    var BOMBER = {
        y: 100,
        w: 32
    },
    PLAYER = {
        y: 400,
        w: 32
    };

    var LEVELS = {
        1: {
            bombPPS: 64,
            bombCount: 10,
            bomber: {
                pps: 32,
                changeRate: 0.5,
                dropRate: 1
            }
        },
        2: {
            bombPPS: 128,
            bombCount: 20,
            bomber: {
                pps: 64,
                changeRate: 0.25,
                dropRate: 1 / 2
            }
        },
        3: {
            bombPPS: 256,
            bombCount: 50,
            bomber: {
                pps: 256,
                changeRate: 0.125,
                dropRate: 1 / 5
            }
        },
        4: {
            bombPPS: 512,
            bombCount: 100,
            bomber: {
                pps: 1024,
                changeRate: 0.125,
                dropRate: 1 / 10
            }
        }
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

    // move the bomber
    var moveBomber = function (state, secs) {
        var bomber = state.bomber;
        // move bomber by secs and bomber dir property
        bomber.x += Math.floor(bomber.pps * secs * bomber.dir);
        // boundaries
        clampBoundaries(bomber, BOMBER);
        // update direction
        bomber.changeTime += secs;
        if (bomber.changeTime >= bomber.changeRate) {
            bomber.dir = 1 - Math.floor(Math.random() * 3);
            bomber.changeTime %= bomber.changeRate;
        }
    };

    var api = {

        BOMBER: BOMBER,
        PLAYER: PLAYER,

        playerDir: 0,

        createState: function (level) {
            level = level || 1;
            levelObj = LEVELS[level];
            return {
                lt: new Date(),
                pause: false,
                score: 0,
                level: level,

                bomber: {
                    x: 320,
                    dir: 1,
                    pps: levelObj.bomber.pps,
                    changeTime: 0,
                    changeRate: levelObj.bomber.changeRate,
                    dropTime: 0,
                    dropRate: levelObj.bomber.dropRate
                },
                bombPPS: levelObj.bombPPS,
                bombCount: levelObj.bombCount,
                bombs: [],
                player: {
                    x: 320,
                    hp: 3,
                    pps: 1024
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

            // move the bomber
            moveBomber(state, secs);

            // drop bombs
            bomber.dropTime += secs;
            if (bomber.dropTime >= bomber.dropRate) {
                if (state.bombCount > 0) {
                    state.bombs.push({
                        x: bomber.x,
                        y: BOMBER.y,
                        pps: state.bombPPS
                    });
                }
                state.bombCount -= 1;
                state.bombCount = state.bombCount < 0 ? 0 : state.bombCount;
                bomber.dropTime %= bomber.dropRate
            }

            // move bombs
            var i = state.bombs.length,
            bomb;
            while (i--) {
                bomb = state.bombs[i];
                bomb.y += bomb.pps * secs;
                if (bomb.y > 640) {
                    bomb.y = 640;
                }
            }

            state.lt = now;

        }

    };

    return api;

}
    ());

var canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d');
document.getElementById('gamearea').appendChild(canvas);
canvas.width = 640;
canvas.height = 480;

var state = kaboom.createState(1);

var loop = function () {

    requestAnimationFrame(loop);

    kaboom.update(state);

    ctx.fillStyle = 'blue';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'green';
    ctx.fillRect(0, kaboom.BOMBER.y, canvas.width, canvas.height - kaboom.BOMBER.y);

    ctx.fillStyle = 'black';
    ctx.fillRect(state.bomber.x, kaboom.BOMBER.y - 64, kaboom.BOMBER.w, 64);

    var i = state.bombs.length,
    bomb;
    ctx.fillStyle = 'red';
    while (i--) {
        bomb = state.bombs[i];
        ctx.fillRect(bomb.x, bomb.y, 32, 32);
    }

    ctx.fillStyle = 'white';
    ctx.font = '10px arial';
    ctx.textBaseline = 'top';

    ctx.fillText('level: ' + state.level, 10, 10);
    ctx.fillText('bombCount: ' + state.bombCount, 10, 20);
    ctx.fillText('bomber: { x: ' + state.bomber.x +
        ', dir: ' + state.bomber.dir +
        ', pps: ' + state.bomber.pps + ' }', 10, 30);
    ctx.fillText('player: { x: ' + state.player.x +
        ', hp: ' + state.player.hp +
        ', pps: ' + state.player.pps + ' }', 10, 40);

};

loop();
