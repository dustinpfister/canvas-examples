var poolMod = (function () {

    var api = {};

    // get next inactive object in the given pool
    api.getInactive = function (pool) {
        var i = pool.objects.length,
        obj;
        while (i--) {
            obj = pool.objects[i];
            if (!obj.active) {
                return obj;
            }
        }
        return false;
    };

    // create a new pool
    api.create = function (opt) {
        opt = opt || {};
        opt.count = opt.count || 10;
        var i = 0,
        pool = {
            objects: [],
            spawn: opt.spawn || function (obj, state) {},
            purge: opt.purge || function (obj, state) {},
            update: opt.update || function (obj, state, secs) {
                obj.lifespan -= secs;
            }
        };
        while (i < opt.count) {
            pool.objects.push({
                active: false,
                x: opt.x === undefined ? 0 : opt.x,
                y: opt.y === undefined ? 0 : opt.y,
                w: opt.w === undefined ? 32 : opt.w,
                h: opt.h === undefined ? 32 : opt.h,
                heading: opt.heading === undefined ? 0 : opt.heading,
                pps: opt.pps === undefined ? 32 : opt.pps,
                lifespan: opt.lifespan || 3,
                data: opt.data || {}
            });
            i += 1;
        }
        return pool;
    };

    // spawn the next inactive object in the given pool
    api.spawn = function (pool, state, opt) {
        var obj = api.getInactive(pool);
        if (obj) {
            if (!obj.active) {
                obj.active = true;
                pool.spawn.call(obj, obj, state, opt);
                return obj;
            }
        }
        return false;
    };
    // update a pool object by a secs value
    api.update = function (pool, secs, state) {
        var i = pool.objects.length,
        obj;
        state = state || {}; // your projects state object
        while (i--) {
            obj = pool.objects[i];
            if (obj.active) {
                pool.update(obj, state, secs);
                obj.lifespan = obj.lifespan < 0 ? 0 : obj.lifespan;
                if (obj.lifespan === 0) {
                    obj.active = false;
                    pool.purge.call(obj, obj, state);
                }
            }
        }
    };

    // set all to inActive or active state
    api.setActiveStateForAll = function (pool, bool) {
        bool = bool === undefined ? false : bool;
        var i = pool.objects.length,
        obj;
        while (i--) {
            obj = pool.objects[i];
            obj.active = bool;
        }
    };

    return api;
}
    ());
