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
                    radius: 32,
                    heading: 0,
                    pps: 32,
                    lifespan: 3,
                    spawn: opt.spawn || function (obj, state) {
                        obj.active = true;
                    },
                    update: opt.update || function (obj, state, secs) {
                        obj.x += obj.pps * secs;
                        obj.lifespan -= secs;
                    }
                })
                i += 1;
            }
            return pool;
        },

        spawn: function (pool) {
            var i = pool.length,
            obj;
            while (i--) {
                obj = pool[i];
                if (!obj.active) {
                    obj.active = true;
                    obj.spawn.call(obj, obj);
                    console.log('pool object active!');
                }
            }
        },

        update: function (pool, secs) {
            var i = pool.length,
            obj;
            while (i--) {
                obj = pool[i];
                if (obj.active) {
                    obj.update(obj, secs);
                    obj.lifespan = obj.lifespan < 0 ? 0 : obj.lifespan;
                    if (obj.lifespan === 0) {
                        obj.active = false;
                        console.log('pool object inactive!');
                    }
                }
            }
        }

    }

}
    ());
