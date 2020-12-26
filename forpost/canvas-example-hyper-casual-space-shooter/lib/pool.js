// Object Pool Module for canvas-example-hyper-casual-space-shooter

var poolMod = (function () {
    // Public API
    var api = {};
    // get next inactive object in the given pool
    var getInactive = function (pool) {
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
    // create and return a single display object
    api.createDisplayObject = function(opt){
        var obj = {
            type: opt.type || '',
            active: false,
            i: opt.i === undefined ? null : opt.i,
            x: opt.x === undefined ? 0 : opt.x,
            y: opt.y === undefined ? 0 : opt.y,
            r: opt.r === undefined ? 16 : opt.r,
            radian: opt.radian === undefined ? 0 : opt.radian,
            pps: opt.pps === undefined ? 32 : opt.pps,
            lifespan: opt.lifespan || 3,
            // basic style
            fillStyle: opt.fillStyle || 'red',
            data: {}
        };
        return obj;
    };
    // TYPES
    var types = {
        block: { 
            spawn: function(obj, pool, state, opt){
                // blocks have an effects array
                obj.effects = [];
            }
        }
    };
    // create a new pool
    api.create = function (opt) {
        opt = opt || {};
        opt.count = opt.count || 10;
        opt.type = opt.type || '';
        var i = 0,
        spawn = opt.spawn || function (obj, pool, state, opt) {},
        pool = {
            type: opt.type,
            objects: [],
            data: opt.data || {},
            spawn: function(obj, pool, state, opt){
                // call any built in spawn method for the type first
                if(pool.type in types){
                    types[pool.type].spawn(obj, pool, state, opt);
                }
                // call custom spawn
                spawn(obj, pool, state, opt);
            },
            purge: opt.purge || function (obj, pool, state) {},
            update: opt.update || function (obj, pool, state, secs) {}
        };
        while (i < opt.count) {
            pool.objects.push(api.createDisplayObject(opt));
            i += 1;
        }
        return pool;
    };
    // spawn the next inactive object in the given pool
    api.spawn = function (pool, state, opt) {
        var obj = getInactive(pool);
        state = state || {};
        opt = opt || {};
        if (obj) {
            if (!obj.active) {
                obj.active = true;
                pool.spawn.call(pool, obj, pool, state, opt);
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
                pool.update.call(pool, obj, pool, state, secs);
                obj.lifespan -= secs;
                obj.lifespan = obj.lifespan < 0 ? 0 : obj.lifespan;
                if (obj.lifespan === 0) {
                    obj.active = false;
                    pool.purge.call(pool, obj, pool, state);
                }
            }
        }
    };
    // get all objects with the gieven activeState
    api.getAllActive = function(pool, activeState){
        activeState = activeState === undefined ? true : activeState;
        return pool.objects.filter(function(object){
            return object.active === activeState;
        });
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
    // return the public API
    return api;
}
    ());
