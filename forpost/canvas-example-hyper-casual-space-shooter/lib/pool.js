// Object Pool Module for canvas-example-hyper-casual-space-shooter

var poolMod = (function () {
    var EFFECTS_MAX = 10; // max number of effects per object
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
    var Effects = {
        create: function(obj, opt){
            opt = opt || {};
            if(obj.effects.length < EFFECTS_MAX){
                obj.awardBlockMoney = true; // just set this true here for now as there is just one effect
                obj.effects.push({
                    effectType: opt.effectType || 'burn',
                    maxStack: opt.maxStack === undefined ? 3 : opt.maxStack,
                    chance: opt.chance === undefined ? 1 : opt.chance,
                    damage: opt.damage === undefined ? 3 : opt.damage,  // 1 DAMAGE EVERY 1 second for a COUNT of 5 times
                    every: opt.every === undefined ? 1 : opt.every,
                    count: opt.count === undefined ? 5 : opt.count,
                    secs:0
                });
            }
        },
        update: function(obj, pool, state, secs){
            // update effects
            var i = obj.effects.length, effect;
            // if effects length === 0 then obj.awardBlockMoney = false
            if(obj.effects.length === 0){
                obj.awardBlockMoney = false;
            }
            while(i--){
                effect = obj.effects[i];
                effect.secs += secs;
                if(effect.secs >= effect.every){
                    effect.secs = utils.mod(effect.secs, effect.every);
                    // if damage apply that
                    if(effect.damage){
                        obj.hp.current -= effect.damage;
                    }
                    effect.count -= 1;
                    if(effect.count <=0 ){
                        obj.effects.splice(i, 1);
                    }
                    obj.hp.current = obj.hp.current > obj.hp.max ? obj.hp.max : obj.hp.current;
                    obj.hp.current = obj.hp.current < 0 ? 0 : obj.hp.current;
                    obj.hp.per = obj.hp.current / obj.hp.max;
                }
            }

        }
    };
    // return a vaild effect object from a given string of an effect type, or incompleate object
    api.parseEffectObject = function(effect){
        if(typeof effect === 'string'){
            effect = {
                effectType : effect
            };
        }
        effect.chance = 1;
        effect.maxStack = 3;
        effect.damage = 1;
        effect.every = 0.25;
        effect.count = 10;
        return effect;
    };
    // start an effect for the given display object
    api.createEffect = function(obj, effect){
        var stackCount = obj.effectStats[effect.effectType] || 0;
        if( stackCount < effect.maxStack){
            Effects.create(obj, effect);
        }
    };
    // get an object of effect types and count from the given object
    api.getEffectStats = function(obj){
        var stats = {};
        obj.effects.forEach(function(effect){
            stats[effect.effectType] = stats[effect.effectType] === undefined ? 1 : stats[effect.effectType] += 1;
        });
        return stats;
    };
    // TYPES
    var types = {
        block: { 
            spawn: function(obj, pool, state, opt){
                // blocks have an effects array
                obj.effects = [];
                obj.effectStats = {};
                obj.awardBlockMoney = false; // if true award money on effect death
            },
            update: function (obj, pool, state, secs) {
                Effects.update(obj, pool, state, secs);
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
        update = opt.update || function (obj, pool, state, secs) {},
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
            update: function(obj, pool, state, opt){
                if(obj.effects){
                    Effects.update(obj, pool, state, opt);
                }
                update(obj, pool, state, opt);
            }
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
