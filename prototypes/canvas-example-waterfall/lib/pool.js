var poolMod = (function () {

    return {

        create: function (opt) {
            opt = opt || {};
            opt.count = opt.count || 10;
            var i = 0,
            pool = [];
            while (i < opt.count) {
                pool.push({
                    active: false,
                    x: 0,
                    y: 0,
                    radius: 8,
                    heading: 0,
                    pps: 32,
                    lifespan: opt.lifespan || 3,
                    data: {},
                    spawn: opt.spawn || function (obj, state) {},
                    purge: opt.purge || function (obj, state) {},
                    update: opt.update || function (obj, state, secs) {
                        obj.x += obj.pps * secs;
                        obj.lifespan -= secs;
                    }
                });
                i += 1;
            }
            return pool;
        },

        spawn: function (pool, game, opt) {
            var i = pool.length,
            obj;
            while (i--) {
                obj = pool[i];
                if (!obj.active) {
                    obj.active = true;
                    obj.spawn.call(obj, obj, game, opt);
                    break;
                }
            }
        },

        update: function (pool, state, secs) {
            var i = pool.length,
            obj;
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
