var game = (function () {

    var centerPlayer = function (state) {
        var pa = state.playArea,
        p = state.player;
        p.x = pa.x + pa.w / 2 - p.w / 2;
        p.y = pa.y + pa.h / 2 - p.h / 2;
    };

    var createPlayerShotPool = function (state) {
        var i = 0,
        len = 10,
        p = state.player;
        p.shots = [];
        while (i < len) {
            p.shots.push({
                x: 0,
                y: 0,
                w: 3,
                h: 3,
                pps: 128,
                heading: Math.PI * 1.5,
                active: false
            })
            i += 1;
        }
    };

    // return next inactive shot or false
    var getInactiveShot = function (state) {
        var p = state.player,
        i = p.shots.length,
        shot;
        while (i--) {
            shot = p.shots[i];
            if (!shot.active) {
                return shot;
            }
        }
        return false;
    };

    var updatePlayerShots = function (state, secs) {
        var i = 0,
        p = state.player,
        shot,
        len = p.shots.length;
        while (i < len) {
            shot = p.shots[i];
            if (shot.active) {
                shot.x += Math.cos(shot.heading) * shot.pps * secs;
                shot.y += Math.sin(shot.heading) * shot.pps * secs;
                if (!utils.bb(shot, state.playArea) && !utils.bb(shot, state.board)) {
                    shot.active = false;
                }
            }
            i += 1;
        }
    };

    var createState = function (opt) {
        opt = opt || {};
        var state = {
            canvas: opt.canvas,
            ctx: opt.canvas.getContext('2d'),
            board: {
                x: 16,
                y: 16,
                w: 128,
                h: 128
            },
            playArea: {
                x: 16,
                y: 144,
                w: 128,
                h: 64
            }
        };
        state.player = {
            x: 0,
            y: 0,
            w: 16,
            h: 16,
            shots: [],
            heading: Math.PI * 1.5,
            pps: 0,
            maxPPS: 32
        };
        centerPlayer(state);
        createPlayerShotPool(state);
        return state;
    };

    return {
        create: createState,
        playerFire: function (state) {
            var p = state.player,
            shot = getInactiveShot(state);
            if (shot) {
                shot.active = true;
                shot.x = p.x + p.w / 2 - shot.w / 2;
                shot.y = p.y;
            }
        },
        update: function (state, secs) {
            var p = state.player,
            pa = state.playArea;
            p.x += Math.cos(p.heading) * p.pps * secs;
            p.y += Math.sin(p.heading) * p.pps * secs;
            // clamp player
            utils.clamp(p, pa);

            // update shots
            updatePlayerShots(state, secs);

        }
    };

}
    ());
