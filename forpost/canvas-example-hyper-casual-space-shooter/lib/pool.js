// Object Pool Module for canvas-example-hyper-casual-space-shooter

var poolMod = (function () {

    // Public API
    var api = {};

    var EFFECTS_MAX = 10; // max number of effects per object

    // BLOCK TYPES
    var BLOCK_TYPES = {
        block: { 
            spawn: function(obj, pool, state, opt){
                // blocks have an effects array
                obj.effects = [];
                obj.effectStats = {};
                obj.awardBlockMoney = false; // if true award money on effect death
            },
            update: function (obj, pool, state, secs) {
                if(obj.effects.length > 0){
                    Effects.update(obj, pool, state, secs);
                }
            }
        }
    };

    var EFFECT_TYPES = api.EFFECT_TYPES = {
        burn : {
            effectType: 'burn',
            chance: 0.1,
            maxStack: 3,
            damagePer: 0.01,
            every: 1,
            count: 5
        },
        acid : {
            effectType: 'acid',
            chance: 0.1,
            maxStack: 3,
            damageMulti: 1  // number of times extra damage is applyed
        }
    };

    // helper for an over time effect such as 'burn'
    var overTimeEffect = function(i, effect, obj, secs){
        effect.secs += secs;
        if(effect.secs >= effect.every){
            effect.secs = utils.mod(effect.secs, effect.every);
            // if damagePer apply that
            if(effect.damagePer){
                var damage = obj.hp.max * effect.damagePer;
                obj.hp.current -= damage; //effect.damage;
            }
            effect.count -= 1;
            // effect ends when count === 0
            if(effect.count <= 0 ){
                obj.effects.splice(i, 1);
            }
        }
    };

    

    // Effects create an update methods
    var Effects = {
        // create a new effect object for an effects array
        create: function(obj, effectObj){
            effectObj = effectObj || {};
            if(obj.effects.length < EFFECTS_MAX){
                obj.awardBlockMoney = true; // just set this true here for now as there is just one effect
                effectObj = utils.deepClone(effectObj);
                effectObj.secs = 0;
                obj.effects.push(effectObj);
            }
        },
        // for effects that are updated over time
        update: function(obj, pool, state, secs){
            // update effects
            var i = obj.effects.length, effect;
            // awardBlockMoney should be false if there are not effects at all in place
            if(obj.effects.length === 0){
                obj.awardBlockMoney = false;
            }
            while(i--){
                effect = obj.effects[i];

                if(effect.effectType === 'burn'){
                    overTimeEffect(i, effect, obj, secs);
                }
                // clamp hit points
                obj.hp.current = obj.hp.current > obj.hp.max ? obj.hp.max : obj.hp.current;
                obj.hp.current = obj.hp.current < 0 ? 0 : obj.hp.current;
                obj.hp.per = obj.hp.current / obj.hp.max;
            }
        },
        // for effects that are updated per attack
        onAttack: function(obj, damage){
            var i = obj.effects.length, effect;
            while(i--){
                effect = obj.effects[i];
                
                if(effect.effectType === 'acid'){
                    //console.log('acid: ',  damage, effect.damageMulti, damage * effect.damageMulti);
                    var extraDamage = effect.damageMulti * damage;
                    obj.hp.current -= extraDamage;
                }

                // clamp hit points
                obj.hp.current = obj.hp.current > obj.hp.max ? obj.hp.max : obj.hp.current;
                obj.hp.current = obj.hp.current < 0 ? 0 : obj.hp.current;
                obj.hp.per = obj.hp.current / obj.hp.max;
            }
        }
    };

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
    api.applyOnAttackEffects = function(obj, damage){
        Effects.onAttack(obj, damage);
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
    // return a vaild effect object from a given string of an effect type, or incompleate object
    api.parseEffectObject = function(effectSource){
        var effect;
        if(typeof effectSource === 'string'){
            effect = {
                effectType : effectSource
            };
        }else{
            effect = utils.deepClone(effectSource);
            effect.effectType = effect.effectType || 'burn';
        }
        // get a ref tp the object for the effect type in EFFECT_TYPES
        var effectData = EFFECT_TYPES[effect.effectType];
        Object.keys(effectData).forEach(function(key){
             effect[key] = effect[key] === undefined ? effectData[key] : effect[key];
        });

        //effect.chance = 1;
        //effect.maxStack = 3;
        //effect.damage = 1;
        //effect.every = 0.25;
        //effect.count = 10;

        effect.secs = 0;
        return effect;
    };
    // start an effect for the given display object
    api.createEffect = function(obj, opt){
        var stackCount = obj.effectStats[opt.effectType] || 0;
        if( stackCount < opt.maxStack){
            Effects.create(obj, opt);
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
                if(pool.type in BLOCK_TYPES){
                    BLOCK_TYPES[pool.type].spawn(obj, pool, state, opt);
                }
                // call custom spawn
                spawn(obj, pool, state, opt);
            },
            purge: opt.purge || function (obj, pool, state) {},
            update: function(obj, pool, state, opt){
                if(pool.type in BLOCK_TYPES){
                    BLOCK_TYPES[obj.type].update(obj, pool, state, opt);
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
