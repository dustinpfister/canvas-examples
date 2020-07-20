var game = (function () {

    // center the player
    var centerPlayer = function (state) {
        var pa = state.playArea,
        p = state.player;
        p.x = pa.x + pa.w / 2 - p.w / 2;
        p.y = pa.y + pa.h / 2 - p.h / 2;
    };

    // create player shot pool
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

    // get inactive pool object
    var getInactive = function (pool) {
        var p = state.player,
        i = pool.length,
        obj;
        while (i--) {
            obj = pool[i];
            if (!obj.active) {
                return obj;
            }
        }
        return false;
    };

    var hitCheck = function (obj, pool) {
        var i = pool.length,
        poolObj;
        while (i--) {
            poolObj = pool[i];
            if (poolObj.active && utils.bb(obj, poolObj)) {
                return poolObj;
            }
        }
        return false;
    };

    // update player shots
    var updatePlayerShots = function (state, secs) {
        var i = 0,
        p = state.player,
        shot,
        e,
        len = p.shots.length;
        while (i < len) {
            shot = p.shots[i];
            if (shot.active) {
                shot.x += Math.cos(shot.heading) * shot.pps * secs;
                shot.y += Math.sin(shot.heading) * shot.pps * secs;
                e = hitCheck(shot, state.enemies.pool);
                if (e) {
                    e.active = false;
                    p.kills += 1;
                }
                if (!utils.bb(shot, state.playArea) && !utils.bb(shot, state.board)) {
                    shot.active = false;
                }
            }
            i += 1;
        }
    };

    // create enemies pool
    var createEnemiesPool = function (state) {
        var i = 0,
        len = 10,
        p = state.player;
        state.enemies.pool = [];
        while (i < len) {
            state.enemies.pool.push({
                x: 0,
                y: 0,
                w: 8,
                h: 8,
                pps: 32,
                heading: 0,
                active: false
            })
            i += 1;
        }
    };

    var updateEnemies = function (state, secs) {
        var es = state.enemies,
        e;
        es.secs += secs;
        // spawn
        if (es.secs >= es.spawnRate) {
            es.secs %= es.spawnRate;
            e = getInactive(es.pool);
            if (e) {
                e.x = state.board.x + state.board.w / 2;
                e.y = state.board.y;
                e.heading = Math.PI * Math.random();
                e.active = true;
            }
        }
        // move
        var i = es.pool.length;
        while (i--) {
            e = es.pool[i];
            e.x += Math.cos(e.heading) * e.pps * secs;
            e.y += Math.sin(e.heading) * e.pps * secs;
            if (!utils.bb(e, state.board)) {
                e.active = false;
            }
        }
    };

    // create the state object
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
            },
            enemies: {
                pool: [],
                spawnRate: 1,
                secs: 0
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
            maxPPS: 32,
            kills: 0
        };
        centerPlayer(state);
        createPlayerShotPool(state);
        createEnemiesPool(state);
        return state;
    };

    return {
        create: createState,
        playerFire: function (state) {
            var p = state.player,
            shot = getInactive(state.player.shots);
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

            // update enemies
            updateEnemies(state, secs);

        }
    };

}
    ());
