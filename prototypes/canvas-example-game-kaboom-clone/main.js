var utils = {}
// bounding box
utils.bb = function (a, b) {
    return !(
        (a.y + a.h) < b.y ||
        a.y > (b.y + b.h) ||
        (a.x + a.w) < b.x ||
        a.x > (b.x + b.w));
};

utils.distance = function (x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
};

utils.getCanvasRelative = function (e) {
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

var kaboom = (function () {

    var BOMBER = {
        y: 100,
        w: 32
    },
    PLAYER = {
        y: 350,
        w: 64,
        h: 64
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

    // move the player
    var movePlayer = function (state, secs) {
        var player = state.player,
        inputPos = player.inputPos,

        hw = PLAYER.w / 2,
        x = inputPos.x - hw;

        player.dir = 0;
        var d = utils.distance(player.x, PLAYER.y, x, PLAYER.y);
        dir = d < hw ? d / hw : 1;
        if (x < player.x) {
            player.dir = dir * -1;
        }
        if (x > player.x) {
            player.dir = dir;
        }

        player.x += Math.floor(player.pps * secs * player.dir);
        clampBoundaries(player, PLAYER);
    };

    var api = {

        BOMBER: BOMBER,
        PLAYER: PLAYER,

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
                    inputPos: {
                        x: 320,
                        y: 0
                    },
                    hp: 3,
                    dir: -1,
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
            movePlayer(state, secs);

            // drop bombs
            bomber.dropTime += secs;
            if (bomber.dropTime >= bomber.dropRate) {
                if (state.bombCount > 0) {
                    state.bombs.push({
                        x: bomber.x,
                        y: BOMBER.y,
                        w: 32,
                        h: 32,
                        pps: state.bombPPS
                    });
                }
                state.bombCount -= 1;
                state.bombCount = state.bombCount < 0 ? 0 : state.bombCount;
                bomber.dropTime %= bomber.dropRate
            }

            // update bombs
            var i = state.bombs.length,
            player = state.player,
            bomb;
            while (i--) {
                bomb = state.bombs[i];
                // move bomb
                bomb.y += bomb.pps * secs;
                if (bomb.y > 640) {
                    bomb.y = 640;
                }

                // hit player?
                if (utils.bb({
                        x: player.x,
                        y: PLAYER.y,
                        w: PLAYER.w,
                        h: PLAYER.h
                    }, bomb)) {
                    state.bombs.splice(i, 1);
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

var state = kaboom.createState(3);
state.pause = true;

canvas.addEventListener('mousedown', function (e) {
    state.pause = false;
});

canvas.addEventListener('mouseup', function (e) {
    state.pause = true;
});

canvas.addEventListener('mousemove', function (e) {
    e.preventDefault();
    var pos = utils.getCanvasRelative(e),
    player = state.player;
    player.inputPos = pos;
});

var loop = function () {

    requestAnimationFrame(loop);

    kaboom.update(state);

    // draw background
    ctx.fillStyle = 'blue';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'green';
    ctx.fillRect(0, kaboom.BOMBER.y, canvas.width, canvas.height - kaboom.BOMBER.y);

    // draw bomber
    ctx.fillStyle = 'black';
    ctx.fillRect(state.bomber.x, kaboom.BOMBER.y - 64, kaboom.BOMBER.w, 64);

    // draw bombs
    var i = state.bombs.length,
    bomb;
    ctx.fillStyle = 'red';
    while (i--) {
        bomb = state.bombs[i];
        ctx.fillRect(bomb.x, bomb.y, 32, 32);
    }

    // draw player
    ctx.fillStyle = 'lime';
    ctx.fillRect(state.player.x, kaboom.PLAYER.y, kaboom.PLAYER.w, kaboom.PLAYER.h);

    // draw debug info
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
        ', dir: ' + state.player.dir +
        ', pps: ' + state.player.pps + ' }', 10, 40);

};

loop();
