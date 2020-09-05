var poolMod = (function () {
    return {
        // create a new pool
        create: function (opt) {
            opt = opt || {};
            opt.count = opt.count || 10;
            var i = 0,
            pool = [];
            while (i < opt.count) {
                pool.push({
                    active: false,
                    x: opt.x === undefined ? 0 : opt.x,
                    y: opt.y === undefined ? 0 : opt.y,
                    w: opt.w === undefined ? 32 : opt.w,
                    h: opt.h === undefined ? 32 : opt.h,
                    heading: opt.heading === undefined ? 0 : opt.heading,
                    pps: 32,
                    lifespan: opt.lifespan || 3,
                    data: {},
                    spawn: opt.spawn || function (obj, state) {},
                    purge: opt.purge || function (obj, state) {},
                    update: opt.update || function (obj, state, secs) {
                        obj.lifespan -= secs;
                    }
                });
                i += 1;
            }
            return pool;
        },
        // spawn the next inactive object in the given pool
        spawn: function (pool, game, opt) {
            var i = pool.length,
            obj;
            while (i--) {
                obj = pool[i];
                if (!obj.active) {
                    obj.active = true;
                    obj.spawn.call(obj, obj, game, opt);
                    return obj;
                }
            }
            return false;
        },
        // update a pool object by a secs value
        update: function (pool, secs, state) {
            var i = pool.length,
            obj;
            state = state || {}; // your projects state object
            while (i--) {
                obj = pool[i];
                if (obj.active) {
                    obj.update(obj, state, secs);
                    obj.lifespan = obj.lifespan < 0 ? 0 : obj.lifespan;
                    if (obj.lifespan === 0) {
                        obj.active = false;
                        obj.purge.call(obj, obj, state);
                    }
                }
            }
        },
        // set all to inActive or active state
        setActiveStateForAll: function (pool, bool) {
            bool = bool === undefined ? false : bool;
            var i = pool.length,
            obj;
            while (i--) {
                obj = pool[i];
                obj.active = bool;
            }
        }
    }
}
    ());
