
var Pool = (function () {

    // create a pool
    var createPool = function () {
        var state = {
            ver: '0.1.0',
            pool: [],
            spawnRate: 0.05,
            secs: 0,
            colors: ['red', 'green', 'blue']
        };
        var i = 50;
        while (i--) {
            state.pool.push({
                x: 32,
                y: 32,
                w: 32,
                h: 32,
                heading: 0,
                pps: 64,
                hcps: 0, // heading change per second in degrees
                alpha: 0.5,
                fill: state.colors[i % state.colors.length],
                active: false
            });
        }
        return state;
    };

    var spawn = function (state, secs) {
        var bx;
        state.secs += secs;
        if (state.secs >= state.spawnRate) {
            bx = getInactive(state.pool);
            if (bx) {
                bx.active = true;
                bx.x = canvas.width / 2;
                bx.y = canvas.height / 2;
                bx.heading = Math.PI * 2 * Math.random();
                bx.pps = 32 + 128 * Math.random();
                bx.hcps = -45 + 90 * Math.random();
            }
            state.secs %= state.spawnRate;
        }
    };

    update = function (state, secs) {
        var i = state.pool.length,
        bx;
        while (i--) {
            bx = state.pool[i];
            if (bx.active) {
                // move
                bx.x += Math.cos(bx.heading) * bx.pps * secs;
                bx.y += Math.sin(bx.heading) * bx.pps * secs;
                bx.heading += Math.PI / 180 * bx.hcps * secs;
            }
            // set inactive if out of bounds
            checkBounds(bx, canvas);
        }
        // spawn
        spawn(state, secs);
    };

    // get an inactive object or return false
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

    // check bounds with the given object and set it inactive if it is out
    var checkBounds = function (bx, canvas) {
        if (bx.x >= canvas.width || bx.x < bx.w * -1 || bx.y > canvas.height || bx.y < bx.h * -1) {
            bx.active = false;
        }
    };

    // public
    return {
        create: createPool,
        update: update
    }

}
    ());
