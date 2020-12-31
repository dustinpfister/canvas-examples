var gameMod = (function(){
    
    // CONSTANTS

    // MONEY
    var GAME_MONEY_START = 750000,
    GAME_UPDATE_MAX_SECS = 0.8,   // max secs value for main update loop
    MONEY_PERLOSS_ON_DEATH = 0.1, // percent of money loss on death 0-1

    // BLOCK CONSTANTS
    BLOCK_COUNT = 20,
    BLOCK_POS_MAX_DIST = 600,
    BLOCK_POS_SLOT_DIST = 15,
    BLOCK_HP_MIN = 5,
    BLOCK_HP_MAX = 1000,
    BLOCK_MONEY_BASE = 1,
    BLOCK_MONEY_DIST = 999,

    // SHIP AND MAP VALUES
    SHIP_AUTOFIRE = false,
    SHIP_HP = 30,
    SHIP_AUTOHEAL_ENABLED=true,
    SHIP_AUTOHEAL_RATE = 10,
    SHIP_AUTOHEAL_AMOUNT = 1,
    SHIP_ROTATION_RATE_MIN = 45,   // min and max rotattion rates in degrees
    SHIP_ROTATION_RATE_MAX = 180,
    SHIP_MAX_SPEED_START = 64,     // starting max ship speed in pps
    SHIP_MAX_SPEED_MAX = 1024,     // fully upgraded max ship speed in pps
    SHIP_ACC_START = 32,            // starting Acceleration in ppsps
    SHIP_ACC_MAX = 128,            // fully upgraded max ship speed in pps
    MAP_MAX_DIST = Math.pow(10,4), //Number.MAX_SAFE_INTEGER;      // max distance from BASE (0,0)

    // HOME BASE VALUES
    // values for the base area at the origin
    BASE_DIST = 100;


    // main WEAPONS Object that will be used to create DEFAULT_WEAPONS and append DEFAULT_UPGRADES
    var WEAPONS = {
        0: {
            name: 'Pulse Gun',
            firesPerSecond: { // min and max range for fires per second
                min: 2,
                max: 10,
                levelOpt: {
                    levelCap: 10,
                    expCap: 1000,
                    perMethod: 'log1',
                    perArgs: [],
                    tableX: 160 - 12,
                    tableY: 120 - 12 - 30
                }
            },
            shotDamage: { // min and max range for shot damage
                min: 1,
                max: Math.floor(BLOCK_HP_MAX * 0.05),
                levelOpt: { 
                    levelCap: 10,
                    expCap: 1500,
                    perMethod: 'log1',
                    perArgs: [],
                    tableX: 160 - 12,
                    tableY: 120 - 12
                }
            },
            effects: ['burn','acid'],
            shotRange: 128,
            shotPPS: 256,
            shotsPerFire: [2,2,2,1],
            onFireStart: function(game, secs, state){
                var weapon = game.weapons[game.ship.weaponIndex];
                var shotIndex = 0;
                var radianStart = state.game.map.radian;
                var shotsPerFire = weapon.shotsPerFire[weapon.shotsPerFireIndex];
                while(shotIndex < shotsPerFire){
                    var side = shotIndex % 2 === 0 ? -1 : 1;
                    var dist = 8;
                    if(shotsPerFire === 1){
                        dist = 0;
                    }
                    poolMod.spawn(game.shots, state, {
                        radian: radianStart,
                        x: Math.sin(Math.PI - radianStart) * dist * side,
                        y: Math.cos(Math.PI + radianStart) * dist * side
                    });
                    shotIndex += 1;
                }
            }
        },
        1: {
            name: 'Cannon',
            firesPerSecond: { 
                min: 4,
                max: 10,
                levelOpt: { 
                    levelCap: 10,
                    expCap: 15000,
                    perMethod: 'log1',
                    perArgs: [],
                    tableX: 160 - 12,
                    tableY: 120 - 12 - 30
                }
            },
            shotDamage: { 
                min: Math.floor(BLOCK_HP_MAX * 0.05),
                max: Math.floor(BLOCK_HP_MAX * 0.25),
                levelOpt: { 
                    levelCap: 10,
                    expCap: 50000,
                    perMethod: 'log1',
                    perArgs: [],
                    tableX: 160 - 12,
                    tableY: 120 - 12
                }
            },
            shotRange: 256,
            shotsPerFire: [3, 2],
            onFireStart: function(game, secs, state){
                var weapon = game.weapons[game.ship.weaponIndex];
                var shotIndex = 0;
                var radianStart = state.game.map.radian - Math.PI / 180 * 20;
                while(shotIndex < weapon.shotsPerFire[weapon.shotsPerFireIndex]){
                    var shotPer = shotIndex / (weapon.shotsPerFire[weapon.shotsPerFireIndex] - 1);
                    var radianDelta = Math.PI / 180 * 40 * shotPer;
                    poolMod.spawn(game.shots, state, {
                        radian: radianStart + radianDelta
                    });
                    shotIndex += 1;
                }
            }
        },
        2: {
            name: 'Atom',
            firesPerSecond: { 
                min: 1,
                max: 5,
                levelOpt: { 
                    levelCap: 10,
                    expCap: 25000,
                    perMethod: 'log1',
                    perArgs: [],
                    tableX: 160 - 12,
                    tableY: 120 - 12 - 30
                }
            },
            shotDamage: { 
                min: Math.floor(BLOCK_HP_MAX * 0.25),
                max: BLOCK_HP_MAX,
                levelOpt: { 
                    levelCap: 10,
                    expCap: 30000,
                    perMethod: 'log1',
                    perArgs: [],
                    tableX: 160 - 12,
                    tableY: 120 - 12
                }
            },
            shotRange: 64,
            shotsPerFire: [1]
        }
    };

    // a helper to create DEFAULT_WERAPONS from WEAPONS
    var create_DEFAULT_WEAPONS = function(){
        return Object.keys(WEAPONS).map(function(weaponKey){
            var weaponDATA = WEAPONS[weaponKey];
            return {
                name: weaponDATA.name,
                firesPerSecond: weaponDATA.firesPerSecond.min,
                shotDamage: weaponDATA.shotDamage.min,
                shotRange: weaponDATA.shotRange || 64,
                shotsPerFire: weaponDATA.shotsPerFire || [1],
                onFireStart: weaponDATA.onFireStart || function(game, secs, state){
                    poolMod.spawn(game.shots, state, {
                        radian: state.game.map.radian
                    });
                },
                shotPPS: weaponDATA.shotPPS || 128,
                shotsPerFireIndex : 0,
                effects: weaponDATA.effects || []
            };
        });
    };

    // DEFAULT WEAPON OBJECT that will be cloned as game.weapons
    var DEFAULT_WEAPONS = create_DEFAULT_WEAPONS();

    var BASE_BUTTONS = {
        main: {
            0: {
                desc: 'Weapons',
                x: 64,
                y: -32,
                r: 16,
                onClick: function(game){
                    game.buttons.currentPage = 'weapons';
                }
            },
            1: {
                desc: 'Ship',
                x: 64,
                y: 32,
                r: 16,
                onClick: function(game){
                    game.buttons.currentPage = 'ship';
                }
            }
        },
        weapons:{
            0: {
                desc: 'Back',
                x: 64,
                y: 0,
                r: 16,
                onClick: function(game){
                    game.buttons.currentPage = 'main';
                }
            },
            1: {
                desc: 'Change Weapon',
                x: 64,
                y: 32,
                r: 16,
                onClick: function(game){
                    game.ship.weaponIndex += 1;
                    game.ship.weaponIndex = utils.mod(game.ship.weaponIndex, Object.keys(game.weapons).length);
                    game.ship.weapon = game.weapons[game.ship.weaponIndex];
                    updateButtons(game);
                }
            },
            2: {
                desc: 'Fires Per Second',
                x: -64,
                y: -32,
                r: 16,
                cost:0,
                type: 'weaponUpgrade',
                weaponProp: 'firesPerSecond',
                onClick: function(game, button){
                    var upgradeID = 'w-' + game.ship.weaponIndex + '-firesPerSecond',
                    upgrade = getUpgradeById(game, upgradeID);
                    buyUpgrade(game, upgrade);
                    upgrade.applyToState(game, upgrade.levelObj, upgrade);
                    button.cost = upgrade.levelObj.xpForNext;
                }
            },
            3: {
                desc: 'Damage',
                x: -64,
                y: 0,
                r: 16,
                cost:0,
                type: 'weaponUpgrade',
                weaponProp: 'shotDamage',
                onClick: function(game, button){
                    var upgradeID = 'w-' + game.ship.weaponIndex + '-shotDamage',
                    upgrade = getUpgradeById(game, upgradeID);
                    buyUpgrade(game, upgrade);
                    upgrade.applyToState(game, upgrade.levelObj, upgrade);
                    button.cost = upgrade.levelObj.xpForNext;
                }
            }
        },
        ship:{
            0: {
                desc: 'Back',
                x: 64,
                y: 0,
                r: 16,
                onClick: function(game){
                    game.buttons.currentPage = 'main';
                }
            },
            1: {
                desc: 'Max Speed',
                x: 64,
                y: -32,
                r: 16,
                cost: 0,
                upgradeID: 's1',
                onClick: function(game, button){
                    var upgrade = button.upgrade;
                    buyUpgrade(game, upgrade);
                    upgrade.applyToState(game, upgrade.levelObj, upgrade);
                    button.cost = upgrade.levelObj.xpForNext;
                }
            },
            2: {
                desc: 'Max Acc',
                x: 64,
                y: 32,
                r: 16,
                cost: 0,
                upgradeID: 's2',
                onClick: function(game, button){
                    var upgrade = button.upgrade;
                    buyUpgrade(game, upgrade);
                    upgrade.applyToState(game, upgrade.levelObj, upgrade);
                    button.cost = upgrade.levelObj.xpForNext;
                }
            },
            3: {
                desc: 'Rotation',
                x: 64,
                y: 64,
                r: 16,
                cost: 0,
                upgradeID: 's3',
                onClick: function(game, button){
                    var upgrade = button.upgrade;
                    buyUpgrade(game, upgrade);
                    upgrade.applyToState(game, upgrade.levelObj, upgrade);
                    button.cost = upgrade.levelObj.xpForNext;
                }
            }
        }
    };

    // create upgrade object references and cost/display info
    var updateButtons = function(game){
        ['base'].forEach(function(mode){
             Object.keys(game.buttons[mode]).forEach(function(pageKey){
                 Object.keys(game.buttons[mode][pageKey]).forEach(function(buttonKey){
                     var button = game.buttons[mode][pageKey][buttonKey];
                     // attach a single upgrade ref
                     if(button.upgradeID){
                         // create a ref to upgrade, and set start cost
                         button.upgrade = getUpgradeById(game, button.upgradeID);
                     }
                     if(button.type){
                         // if the button is for a weapon upgrade
                         if(button.type === 'weaponUpgrade'){
                             var upgradeID = 'w-' + game.ship.weaponIndex + '-' + button.weaponProp;
                             button.upgrade = getUpgradeById(game, upgradeID);
                         }
                     }
                     if(button.upgrade && button.cost != undefined){
                             button.cost = button.upgrade.levelObj.xpForNext;
                     }
                 });
             });
        });
    };

    // UPGRADES

    var DEFAULT_UPGRADES = [
        {
            id: 's1',
            desc: 'Max Speed',
            applyToState: function(game, levelObj, upgrade){
                var delta = SHIP_MAX_SPEED_MAX - SHIP_MAX_SPEED_START;
                game.map.maxPPS = SHIP_MAX_SPEED_START + delta * levelObj.perToLevelCap;
            },
            levelOpt: { 
                levelCap: 10,
                expCap: 10000,
                perMethod: 'log1',
                perArgs: [],
                tableX: 260,
                tableY: 120 - 12 - 32
            }
        },
        {
            id: 's2',
            desc: 'Ship Acceleration',
            applyToState: function(game, levelObj, upgrade){
                var delta = SHIP_ACC_MAX - SHIP_ACC_START;
                game.map.ppsDelta = SHIP_ACC_START + delta * levelObj.perToLevelCap;
                
            },
            levelOpt: {
                levelCap: 10,
                expCap: 7500,
                perMethod: 'log1',
                perArgs: [],
                tableX: 260,
                tableY: 120 - 12 + 32
            }
        },
        {
            id: 's3',
            desc: 'Rotation',
            applyToState: function(game, levelObj, upgrade){
                var delta = SHIP_ROTATION_RATE_MAX - SHIP_ROTATION_RATE_MIN;
                game.map.degreesPerSecond = SHIP_ROTATION_RATE_MIN + delta * levelObj.perToLevelCap;
            },
            levelOpt: {
                levelCap: 10,
                expCap: 5000,
                perMethod: 'log1',
                perArgs: [],
                tableX: 260,
                tableY: 120 - 12 + 64
            }
        }
    ];

    // append upgrade objects to DEFAULT_UPGRADES from WEAPONS
    var append_WEAPON_UPGRADES = function(){
        // loop all WEAPONS
        Object.keys(WEAPONS).forEach(function(weaponKey){
            var weapon = WEAPONS[weaponKey];
            // create upgrades for these properties
            ['firesPerSecond', 'shotDamage'].forEach(function(weaponProp){
                levelOpt = utils.deepClone(weapon[weaponProp].levelOpt || {});
                levelOpt.levelCap = levelOpt.levelCap || 30;
                levelOpt.expCap = levelOpt.expCap || 10000;
                levelOpt.perArgs = levelOpt.perArgs || [0];
                //levelOpt.tableX = 0;
                //levelOpt.tableY = 0;
                var upgrade = {
                    id: 'w-' + weaponKey + '-' + weaponProp,
                    desc: weapon.name + ' ' + weaponProp,
                    applyToState: function(game, levelObj, upgrade){
                        var weaponIndex = Number(upgrade.id.split('-')[1]),
                        weapon = game.weapons[weaponIndex],
                        weaponDATA = WEAPONS[weaponIndex],
                        weaponProp = upgrade.id.split('-')[2];
                        // expression to set property of game.weapon object
                        var delta = weaponDATA[weaponProp].max - weaponDATA[weaponProp].min;
                        weapon[weaponProp] = weaponDATA[weaponProp].min + delta * levelObj.perToLevelCap;
                    },
                    levelOpt: levelOpt
                };
                DEFAULT_UPGRADES.push(upgrade);
            });
        });
    };

    // create and append upgrade objects for EFFECTS
    var append_EFFECT_UPGRADES = function(){
        Object.keys(poolMod.EFFECT_TYPES).forEach(function(key){
            var effectDATA = poolMod.EFFECT_TYPES[key];
            DEFAULT_UPGRADES.push({
                id: 'e-' + key,
                desc: key,
                applyToState: function(game, levelObj, upgrade){
                    var effect = game.effects[upgrade.id.split('-')[1]];
                    console.log('applying ' + effect.effectType);

                    effect.chance = 1;

                    Object.keys(effect.upStat).forEach(function(effectKey){
                        var upStat = effect.upStat[effectKey];

                        var delta = (upStat.max - upStat.min) * levelObj.perToLevelCap;
                        effect[effectKey] = upStat.min + delta;
                        if(upStat.round){
                            effect[effectKey] = Math[upStat.round](effect[effectKey]);
                        }
                        console.log('');
                        console.log(effect.effectType, effectKey, upStat.min, upStat.max);
                        console.log('delta=', delta);
                        console.log('value=', effect[effectKey]);
                        //effect.maxStack = maxStack.min + delta;
                    });

                    // maxStack values
                    //var upStat = effect.upStat,
                    //maxStack = upStat.maxStack,
                    //delta = Math.floor((maxStack.max - maxStack.min) * levelObj.perToLevelCap);
                    //effect.maxStack = maxStack.min + delta;
                    //console.log('');
                    //console.log(levelObj.perToLevelCap, delta, effect.maxStack);
                    
                },
                levelOpt: utils.deepClone({
                    levelCap: 10,
                    expCap: 1000,
                    perMethod: 'log1'
                })
            });
        });
    };

    // call append_WEAPON_UPGRADES here to compleate DEFAULT_UPGRADES
    append_WEAPON_UPGRADES();
    append_EFFECT_UPGRADES();

    // get an upgrade object by id
    var getUpgradeById = function(game, id){
        var i = game.upgrades.length;
        while(i--){
            var upgrade = game.upgrades[i];
            if(id === upgrade.id){
                return upgrade;
            }
        }
        return false;
    };

    // buy an upgrade if there is enough money
    var buyUpgrade = function(game, upgrade){
        var lvCurrent = upgrade.levelObj,
        lvNext;
        // if the current level is not at the level cap
        if(lvCurrent.level < upgrade.opt.levelCap){
            //lvNext = utils.xp.byLevel(lvCurrent.l + 1, upgrade.opt);
            //lvNext = utils.xp.byLevel(lvCurrent.level, upgrade.opt);
            lvNext = upgrade.levelObjArray[lvCurrent.level];
            if(game.money >= lvNext.xp){
                upgrade.levelIndex = lvNext.level -1; //Math.floor(Math.floor(lvCurrent.l) + 1);
                upgrade.levelObj = lvNext;
                game.money -= lvNext.xp;
                //console.log('level up for ' + upgrade.desc);
            }else{
                //console.log('not enough money for ' + upgrade.desc + ' upgrade.');
            }
        }else{
            //console.log('level cap reached.');
        }
    };

    var api = {};

    // HIT POINTS
    var CreateHPObject = function(maxHP){
        return {
            current: maxHP || 100,
            max: maxHP || 100,
            per: 1,
            autoHeal: { // every RATE heal AMOUNT
                enabled: false,
                rate: 5,
                amount: -1,
                secs: 0
            }
        };
    };
    // update autoHeal stats
    var autoHealObject = function(obj, secs){
        if(obj.hp){
            if(obj.hp.autoHeal.enabled){
                obj.hp.autoHeal.secs += secs;
                if(obj.hp.autoHeal.secs >= obj.hp.autoHeal.rate){
                    obj.hp.current += obj.hp.autoHeal.amount;
                    obj.hp.current = obj.hp.current > obj.hp.max ? obj.hp.max : obj.hp.current;
                    obj.hp.current = obj.hp.current < 0 ? 0 : obj.hp.current;
                    obj.hp.per = obj.hp.current / obj.hp.max;
                    obj.hp.autoHeal.secs = 0;
                }
            }else{
                obj.hp.autoHeal.secs = 0;
            }
        }
    };
    // what to do when the player ship dies
    var onShipDeath = function(game){
        game.ship = createShip(game);
        game.map.x = 0;
        game.map.y = 0;
        game.map.pps = 0;
        // set all blocks inactive
        poolMod.getAllActive(game.blocks).forEach(function(block){
           block.active = false;
           block.lifespan = 0;
        });
        // game money effected
        game.money = game.money > 0 ? game.money * ( 1 - MONEY_PERLOSS_ON_DEATH) : 0;
    };

    // attack the given object with the given amount of damage
    var attackObject = function(game, obj, damage){
        if(obj.hp){
            if(obj.type === 'block'){
                poolMod.applyOnAttackEffects(obj, damage);
            }
            obj.hp.current -= damage;
            obj.hp.current = obj.hp.current < 0 ? 0 : obj.hp.current;
            obj.hp.per = obj.hp.current / obj.hp.max;
            // if ship death
            if(obj.hp.current === 0 && obj.type === 'ship'){
                onShipDeath(game);
            }
        }
    };

    // SHOTS

    // create shots pool helper
    var createShotsPool = function(){
        return poolMod.create({
                type: 'shot',
                count: 60,
                fillStyle: 'red',
                r: 2,
                spawn: function(shot, pool, state, opt){
                    var weapon = state.game.ship.weapon,
                    range = weapon.shotRange || 32;
                    shot.x = opt.x === undefined ? 0 : opt.x;
                    shot.y = opt.y === undefined ? 0 : opt.y;
                    // shot radian should be set to current map radian
                    shot.radian = opt.radian; //state.game.map.radian;
                    shot.pps = weapon.shotPPS;
                    shot.lifespan = 1 / shot.pps * range;
                    shot.damage = weapon.shotDamage; // damage when shot hits a block

                    // shot effects
                    shot.effects = [];
                    //weapon.effects.forEach(function(effect){
                    weapon.effects.forEach(function(effectType){
                        //var effectType = typeof effect === 'string' ? effect : effect.effectType;
                        //var upgrade = getUpgradeById(state.game, 'e-' + effectType);
                        //console.log(effectType, upgrade);
                        var effect = poolMod.parseEffectObject(state.game.effects[effectType]);
                        
                        var roll = Math.random();
                        if(roll < effect.chance){
                            // push a refernce to the effect object
                            shot.effects.push(effect);
                        }
                    });
                },
                update: function(shot, pool, state, secs){
                    var objDeltaX = Math.cos(shot.radian) * shot.pps * secs;
                    var objDeltaY = Math.sin(shot.radian) * shot.pps * secs;
                    shot.x += objDeltaX;
                    shot.y += objDeltaY;
                    // check if the shot has hit an active block
                    var blocks = poolMod.getAllActive(state.game.blocks, true);
                    var i = blocks.length;
                    while(i--){
                        var block = blocks[i];
                        var dist = utils.distance(shot.x, shot.y, block.x, block.y);
                        // if a shot hits a block
                        if(dist <= block.r + shot.r){
                            shot.lifespan = 0;
                            attackObject(state.game, block, shot.damage);
                            // create any effects the shot might have
                            shot.effects.forEach(function(effect){
                                poolMod.createEffect(block, effect);
                                // effect stats
                                block.effectStats=poolMod.getEffectStats(block);
                            });
                            // if the block is dead
                            if(block.hp.current <= 0 ){
                                // aways give block money on a 'shot death'
                                state.game.money += block.money;
                                block.lifespan = 0;
                                block.active = false;
                            }
                            break;
                        }
                    }
                }
            });
    };

    // BLOCK POOL

    // get all free positions where a block can go
    // will retrun an empty array in the event that there are none
    var getFreePositions = function(game, blockPool){
        var map = game.map,
        activeBlocks = poolMod.getAllActive(blockPool || game.blocks, true),
        xMapAjust = utils.mod(game.map.x, 32), // take into account current map position
        yMapAjust = utils.mod(game.map.y, 32),
        spotX, // the position relative to 0,0
        spotY,
        blockIndex,
        block,
        free = [],
        gridH = 10,
        gridW = 10,
        slotDist = BLOCK_POS_SLOT_DIST,
        // starting position of grid
        sx = Math.ceil(Math.cos(game.map.radian) * (gridH / 2 + slotDist) - gridW / 2),
        sy = Math.ceil(Math.sin(game.map.radian) * (gridH / 2 + slotDist) - gridH / 2),
        x = sx, // grid position
        y = sy;
        while(y < gridH + sy){
            x = sx;
            spotY =  y * 32 - yMapAjust;
            loopx:while(x < gridW + sx){
                spotX = x * 32 - xMapAjust;
                blockIndex = activeBlocks.length;
                while(blockIndex--){
                    block = activeBlocks[blockIndex];
                    if(utils.distance(block.x, block.y, spotX, spotY) <= block.r){
                       x+=1;
                       continue loopx;
                    }
                }
                free.push({
                    x: spotX,
                    y: spotY
                });
                x += 1;
            }
            y += 1;
        }
        return free;
    };

    // position a block
    var positionBlock = function(state, obj){
        var game = state.game;
        var freeSlots = getFreePositions(game);
        if(freeSlots.length === 0){
            obj.active = false;
            obj.lifespan = 0;
        }else{
            var slot = freeSlots.splice(Math.floor(freeSlots.length * Math.random()), 1)[0];
            obj.x = slot.x;
            obj.y = slot.y;
        }
    };

    // CREATE

    // create block pool helper
    var createBlocksPool = function(){
        return poolMod.create({
            type: 'block',
            data: {},
            fillStyle: '#1a1a1a',
            count: BLOCK_COUNT,
            spawn: function(obj, pool, state, opt){
                var game = state.game;
                // set starting position of block
                positionBlock(state, obj);
                obj.radian = utils.wrapRadian(game.map.radian + Math.PI);
                obj.pps = game.map.pps;
                obj.lifespan = 1;

                // block props
                obj.hp = CreateHPObject( BLOCK_HP_MIN + Math.round( (BLOCK_HP_MAX - BLOCK_HP_MIN) ) * game.map.per );
                obj.damage = 1;
                // block money based on BASE amount plus DIST AMOUNT
                obj.money = BLOCK_MONEY_BASE + Math.round(game.map.per * BLOCK_MONEY_DIST);

            },
            update: function(obj, pool, state, secs){
                obj.lifespan = 1;
                var game = state.game;
                var map = state.game.map;
                obj.radian = utils.wrapRadian(state.game.map.radian + Math.PI);
                obj.pps = state.game.map.pps;
                var objDeltaX = Math.cos(obj.radian) * obj.pps * secs;
                var objDeltaY = Math.sin(obj.radian) * obj.pps * secs;
                obj.x += objDeltaX;
                obj.y += objDeltaY;
                // data object for 'block'
                obj.data.dist = utils.distance(obj.x, obj.y, state.game.ship.x, state.game.ship.y);
                // apply current autoHeal values
                autoHealObject(obj, secs);
                // become inactive if
                // block hits ship
                if(obj.data.dist <= game.ship.r + obj.r){
                    attackObject(game, game.ship, obj.damage);
                    obj.lifespan = 0;
                }
                // block goes out of range
                if(obj.data.dist >= BLOCK_POS_MAX_DIST){
                    obj.lifespan = 0;
                }
                // if hp === 0
                if(obj.hp.current <= 0){
                    // award money on 'effect death' if awardBlockMoney is true
                    if(obj.awardBlockMoney){
                        game.money += obj.money;
                    }
                    obj.lifespan = 0;
                }

                // effect stats
                obj.effectStats=poolMod.getEffectStats(obj);
            }
        });
    };

    // create ship object
    var createShip = function(game){
        var ship = {
            type: 'ship',
            x: 0, // ship position relative to map position
            y: 0,
            r: 8,
            hp: CreateHPObject(SHIP_HP),
            fillStyle: 'blue',
            weaponSecs: 0,
            weaponIndex:0,
            weapon: game.weapons[0] // reference to the current weapon
        };
        ship.hp.autoHeal.enabled = SHIP_AUTOHEAL_ENABLED;
        ship.hp.autoHeal.rate = SHIP_AUTOHEAL_RATE;
        ship.hp.autoHeal.amount = SHIP_AUTOHEAL_AMOUNT;
        return ship;
    };

    // public create method
    api.create = function(){
        var game = {
            money: GAME_MONEY_START,
            mode: 'space',
            weapons: utils.deepClone(DEFAULT_WEAPONS),
            effects: utils.deepClone(poolMod.EFFECT_TYPES),
            upgrades: [],
            ship: {}, //createShip(),
            shots: createShotsPool(),
            blocks: createBlocksPool(),
            map: { // map position
                x: 0,
                y: 0,
                degree: 270,
                degreesPerSecond: SHIP_ROTATION_RATE_MIN,
                radian: 0,
                aToOrigin: 0,
                pps: 0,
                ppsDelta: SHIP_ACC_START,
                maxPPS: SHIP_MAX_SPEED_START,
                dist: 0,
                per: 0 // map.dist / MAX_MAX_DIST
            },
            //baseButtons: BASE_BUTTONS,
            buttons: {
               currentPage: 'main',
               base: utils.deepClone(BASE_BUTTONS)
            },
            baseObj : {
                fillStyle: '#282828',
                x: 0,
                y: 0,
                r: BASE_DIST
            }
        };
        // set current weapon
        game.ship = createShip(game);
        // create game.upgrades
        game.upgrades = DEFAULT_UPGRADES.map(function(upDef){
            var upgrade = utils.xp.createUpgrade(upDef.desc, 0, upDef.applyToState, upDef.levelOpt);
            upgrade.id = upDef.id;
            upgrade.applyToState(game, upgrade.levelObj, upgrade);
            return upgrade;
        });
        // create upgrade refernces and set starting cost values for buttons
        updateButtons(game);


        // buy starting upgrades
        var upgrade = getUpgradeById(game, 'e-burn');
        buyUpgrade(game, upgrade);
        buyUpgrade(game, upgrade);
        buyUpgrade(game, upgrade);
        upgrade.applyToState(game, upgrade.levelObj, upgrade);

        var upgrade = getUpgradeById(game, 'e-acid');
        buyUpgrade(game, upgrade);
        buyUpgrade(game, upgrade);
        buyUpgrade(game, upgrade);
        upgrade.applyToState(game, upgrade.levelObj, upgrade);

        // log upgrades
/*
        console.log(game.upgrades.map(function(upgrade){
            return upgrade.levelObjArray.map(function(levelObj){
               //var lvNext = utils.xp.byLevel(levelObj.l + 1, upgrade.opt);
               //return lvNext.l;
               return levelObj.xp;
            });
        }));
*/
        return game;
    };

    // set map movment values and wrap or clamp anything that might go out of range
    api.setMapMovement = function(game, degree, pps){
        game.map.radian = utils.wrapRadian(Math.PI / 180 * degree);
        // clamp PPS
        game.map.pps = pps;
        game.map.pps = game.map.pps < 0 ? 0 : game.map.pps;
        game.map.pps = game.map.pps > game.map.maxPPS ? game.map.maxPPS : game.map.pps;
    };

    // clamp map pos helper for map updater
    var clampMapPos = function(map){
        if(map.dist >= MAP_MAX_DIST){
          var radian = utils.wrapRadian(map.radian + Math.PI);
          map.x = Math.cos(radian) * MAP_MAX_DIST;
          map.y = Math.sin(radian) * MAP_MAX_DIST;
        }
    };
    // update the MAP 
    var updateMap = function(game, secs){
        var map = game.map;
        //map.radian = utils.wrapRadian(Math.PI / 180 * map.degree);
        map.x += Math.cos(map.radian) * map.pps * secs;
        map.y += Math.sin(map.radian) * map.pps * secs;
        map.dist = utils.distance(0, 0, map.x, map.y);
        clampMapPos(map);
        map.per = game.map.dist / MAP_MAX_DIST;
        map.aToOrigin = utils.angleTo(0, 0, map.x, map.y);
        autoHealObject(game.ship, secs);
    };

    var updateBlocks = function(game, secs, state){
        // only spawn blocks in space mode
        if(game.mode === 'space'){
            poolMod.update(game.blocks, secs, state);
            poolMod.spawn(game.blocks, state, {});
        }
        // all blocks are inactive in base mode
        if(game.mode === 'base'){
            poolMod.setActiveStateForAll(game.blocks, false);
        }
    };

    var updateShots = function(game, secs, state){
        var ship = game.ship,
        weapon = ship.weapon;
        // only shoot new shots in 'space' mode
        if(game.mode === 'space'){
            ship.weaponSecs += secs;
            if(SHIP_AUTOFIRE || state.input.fire){
                if(ship.weaponSecs >= 1 / weapon.firesPerSecond){
                    weapon.onFireStart(game, secs, state);
                    weapon.shotsPerFireIndex += 1;
                    weapon.shotsPerFireIndex %= weapon.shotsPerFire.length;
                    ship.weaponSecs = 0;
                }
            }
        }
        // always update shot pool
        poolMod.update(game.shots, secs, state);;
    };

    api.update = function(game, secs, state){

        // clamp secs between 0 and GAME_UPDATE_MAX_SECS const
        secs = secs > GAME_UPDATE_MAX_SECS ? GAME_UPDATE_MAX_SECS : secs;
        secs = secs < 0 ? 0 : secs;

        // switch modes based on map.dist
        if(game.map.dist > BASE_DIST && game.mode === 'base'){
            game.mode = 'space';
        }
        if(game.map.dist <= BASE_DIST && game.mode === 'space'){
            game.buttons.currentPage = 'main';
            game.mode = 'base';
        }
        // move baseObject
        game.baseObj.x = game.map.x * -1;
        game.baseObj.y = game.map.y * -1;
        // update map, blocks, shots
        updateMap(game, secs);
        updateBlocks(game, secs, state);
        updateShots(game, secs, state);
    };

    var buttonCheck = function(button, pos){
        if(utils.distance(button.x, button.y, pos.x - 160, pos.y - 120) <= button.r){
            return true;
        }
        return false;
    };

    // check current mode and page of buttons
    api.checkButtons = function(game, pos, e){
        var buttons_mode = game.buttons[game.mode],
        i;
        if(buttons_mode){
            i = Object.keys(buttons_mode[game.buttons.currentPage]).length;
            while(i--){
                button = buttons_mode[game.buttons.currentPage][i];
                if(buttonCheck(button, pos)){
                    button.onClick(game, button, e);
                    break;
                }
            }
        }
    };

    // make update buttons public
    api.updateButtons = updateButtons;

    // return the Public API
    return api;
}());