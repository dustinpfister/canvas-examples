var gameMod = (function(){
    
    // CONSTANTS
    /********** CONSTANTS **********
        harde coded CONSTANTS for game values
    **********/

    // money (see also BLOCK_MONEY_* values)
    var GAME_MONEY_START = 0,                // The amount of money to start a new game with
    GAME_UPDATE_MAX_SECS = 0.8,              // max secs value for main update loop
    MONEY_PERLOSS_ON_DEATH = 0.1,            // percent of money loss on death 0-1

    // blocks
    BLOCK_COUNT = 40,                        // max number of blocks in the game.blocks pool
    BLOCK_POS_MAX_DIST = 1500,               // max distnace the a black can have from a ship until it becomes inactive
    BLOCK_SPAWN_DIST = 250,                  // the distance the ship needs to go from last block spawn, for another block spawn
    BLOCK_SPAWN_COUNT_PER_DIST_MIN = 3,      // the MIN count of poolMod.spawn calls when spawn dist is reached
    BLOCK_POS_SLOT_DIST = 15,                // used in setting the position of blocks ( see getFreePositions helper )
    BLOCK_HP_MIN = 10,                       // min hit points for a block
    BLOCK_HP_MAX = 1000,                     // max hit points for a block
    BLOCK_MONEY_BASE = 1,                    // base amount of money a block is worth
    BLOCK_MONEY_DIST = 99,                  // max about of money that a block is worth based on distance from map pos 0,0
    BLOCK_ARMOR_MINDAM_MIN = 0,              // min and max values for armor min damage prop
    BLOCK_ARMOR_MINDAM_MAX = BLOCK_HP_MAX * 0.05,

    // ship
    SHIP_AUTOFIRE = true,                    // auto fire on or off by default
    SHIP_HP = 100,                           // ship hit points
    SHIP_AUTOHEAL_ENABLED=true,              // auto heal values for ship
    SHIP_AUTOHEAL_RATE = 3,
    SHIP_AUTOHEAL_AMOUNT = 1,
    SHIP_ROTATION_RATE_MIN = 45,             // min and max rotattion rates in degrees
    SHIP_ROTATION_RATE_MAX = 180,
    SHIP_MAX_SPEED_START = 128,              // starting max ship speed in pps
    SHIP_MAX_SPEED_MAX = 1024,               // fully upgraded max ship speed in pps
    SHIP_ACC_START = 64,                     // starting Acceleration in ppsps
    SHIP_ACC_MAX = 256,                      // fully upgraded max ship speed in pps

    // map
    //MAP_MAX_DIST = 2.5 * Math.pow(10,5),     // max distance from BASE (0,0) ( set to Number.MAX_SAFE_INTEGER ? )
    MAP_MAX_DIST = 5 * Math.pow(10,5),
    //MAP_MAX_DIST = 5 * Math.pow(10,7),
    //MAP_MAX_DIST = Number.MAX_SAFE_INTEGER,
    //MAP_MAX_DIST = Math.pow(10,4),
    MAP_POINTERS = [
        {
            label: 'base',
            pos: {x: 0, y: 0},
            minDist: 200
        },
        {
            label: 'limit:0',
            pos: {x: MAP_MAX_DIST, y: 0}
        },
        {
            label: 'limit:90',
            pos: {x: 0, y: MAP_MAX_DIST}
        },
        {
            label: 'limit:180',
            pos: {x: MAP_MAX_DIST * -1, y: 0}
        },
        {
            label: 'limit:270',
            pos: {x: 0, y: MAP_MAX_DIST * -1}
        },
        {   // to limit in front of ship
            label: function(game){
                return 'limit:' + Math.floor(game.map.degree);
            },
            pos: function(game){
                return {
                    x: Math.cos(game.map.radian) * MAP_MAX_DIST,
                    y: Math.sin(game.map.radian) * MAP_MAX_DIST
                };
            }
        },
        {   // to block
            label: 'block',
            pos: function(game){
                var active = poolMod.getAllActive(game.blocks),
                len = active.length;
                if(len > 0){
                    return {
                        x: game.map.x + active[len-1].x,
                        y: game.map.y + active[len-1].y
                    };
                }
                return false;
            },
            minDist: 64
        }
    ];

    // energy
    ENERGY_MAX = 100,                        // energy max and auto heal cost
    ENERGY_AUTOHEAL_COST=3,

    // values for the base area at the origin
    BASE_DIST = 100;

    /********** HELPERS **********
        miscellaneous helpers that are, or might be used by two or more game.js features
    **********/

    // get a value by map dist, and additional options like a minVal and maxVal 
    var getValueByMapDist = function(game, opt){
        opt = opt || {};
        opt.minVal = opt.minVal || 0; // min value of the result
        opt.maxVal = opt.maxVal || 1; // max value of the result
        opt.roundFunc = opt.roundFunc || Math.round; // rounding method to use, false for none
        opt.perFunc = opt.perFunc || utils.log1; // the percent function to use, false for none
        opt.perFuncArgs = opt.perFuncArgs || [];
        // default per to game.map.per
        var per = game.map.per,
        delta = opt.maxVal - opt.minVal;
        if(opt.perFunc){
            per = opt.perFunc.apply(null, [per, 1, 'per'].concat(opt.perFuncArgs));
        }
        // use a percent method
        var result = opt.minVal + delta * per;
        if(opt.roundFunc){
            return opt.roundFunc(result);
        }
        return result;
    };
    // create the ship object
    var createShip = function(game){
        var ship = {
            type: 'ship',
            x: 0, // ship position relative to map position
            y: 0,
            r: 8,
            newShip: true, // used in main app loop to reset things
            hp: createHPObject(SHIP_HP),
            energy: createEnergyObject(),
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
    // create an ETA object to the given point
    var createETA = function(game, x, y, label, minDist){
        var map = game.map,
        dist = utils.distance(map.x, map.y, x, y),
        unit = 'S',
        t = dist / map.pps;
        if(t > 60 && unit === 'S'){
           t /= 60;
           unit = 'M';
        }
        if(t > 60 && unit === 'M'){
            t /= 60;
            unit = 'H'
        }
        if(t > 24 && unit === 'H'){
            t /= 24;
            unit = 'D'
        }
        if(t > 365.25 && unit === 'D'){
            t /= 365.25;
            unit = 'Y'
        }
        if(t > 1000 && unit === 'Y'){
            t /= 1000;
            unit = 'K'
        }
        return {
            label: label || '',
            dist: dist,
            minDist: minDist || 160,
            radian: utils.angleTo(x, y, map.x, map.y),
            t: t,
            unit: unit
        };
    };
    // update game.ETA with current pointer index
    var updateETA = function(game){
        var pointer = MAP_POINTERS[game.pointerIndex];
        var pos = pointer.pos;
        var label = pointer.label;
        if(typeof pos === 'function'){
            pos = pos(game);
        }
        if(typeof label === 'function'){
            label = label(game);
        }
        game.ETA = createETA(game, pos.x, pos.y, label, pointer.minDist);
    };

    /********** WEAPONS **********
        Data objects, and helpers for ship weapons
    **********/

    // main WEAPONS Object that will be used to create DEFAULT_WEAPONS and append DEFAULT_UPGRADES
    var WEAPONS = {
        0: {
            name: 'Pulse Gun',
            firesPerSecond: { // min and max range for fires per second
                min: 2,
                max: 10,
                levelOpt: {
                    levelCap: 20,
                    expCap: 250,
                    perMethod: 'log1',
                    perArgs: [],
                    tableX: 160 - 12,
                    tableY: 120 - 12 - 30
                }
            },
            shotDamage: { // min and max range for shot damage
                min: 0.5,
                max: Math.floor(BLOCK_ARMOR_MINDAM_MAX * 0.10),
                levelOpt: { 
                    levelCap: 20,
                    expCap: 750,
                    perMethod: 'log1',
                    perArgs: [],
                    tableX: 160 - 12,
                    tableY: 120 - 12
                }
            },
            effects: ['burn', 'acid'],
            //effects:[],
            shotRange: 128,
            shotPPS: 96,
            shotsPerFire: [2],
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
                min: 2,
                max: 5,
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
                min: Math.floor(BLOCK_ARMOR_MINDAM_MAX * 0.10),
                max: Math.floor(BLOCK_ARMOR_MINDAM_MAX * 0.25),
                levelOpt: { 
                    levelCap: 10,
                    expCap: 50000,
                    perMethod: 'log1',
                    perArgs: [],
                    tableX: 160 - 12,
                    tableY: 120 - 12
                }
            },
            effects: ['burn', 'acid'],
            shotRange: 256,
            shotsPerFire: [3],
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
                max: 3,
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
                min: Math.floor(BLOCK_ARMOR_MINDAM_MAX * 0.25),
                max: Math.floor(BLOCK_ARMOR_MINDAM_MAX * 1.20),
                levelOpt: { 
                    levelCap: 10,
                    expCap: 30000,
                    perMethod: 'log1',
                    perArgs: [],
                    tableX: 160 - 12,
                    tableY: 120 - 12
                }
            },
            effects: ['acid'],
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

    /********** MAP **********
        map helpers
    **********/

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
    };


    /********** BUTTONS **********
        buttons
    **********/
    var SPACE_BUTTONS = {
        main: {
            0: {
                desc: 'Auto Fire',
                x: 130,
                y: 40,
                r: 10,
                onClick: function(game){
                    console.log('click auto fire');
                    game.autoFire = !game.autoFire;
                }
            }
        }
    };

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
            },
            2: {
                desc: 'Effects',
                x: 96 + 8,
                y: -32,
                r: 16,
                onClick: function(game){
                    game.buttons.currentPage = 'effects';
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
                    button.cost = upgrade.levelObj.xpForNext;
                }
            }
        },
        effects: {
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
                desc: 'Burn',
                type: 'effectUpgrade',
                effectType: 'burn',
                x: 64,
                y: 32,
                r: 16,
                cost: 0,
                onClick: function(game, button){
                    var upgrade = button.upgrade;
                    buyUpgrade(game, upgrade);
                    button.cost = upgrade.levelObj.xpForNext;
                }
            },
            2: {
                desc: 'ACID',
                type: 'effectUpgrade',
                effectType: 'acid',
                x: 64,
                y: -32,
                r: 16,
                cost: 0,
                onClick: function(game, button){
                    var upgrade = button.upgrade;
                    buyUpgrade(game, upgrade);
                    button.cost = upgrade.levelObj.xpForNext;
                }
            }
        }
    };

    // check if a button was clicked
    var buttonCheck = function(button, pos){
        if(utils.distance(button.x, button.y, pos.x - 160, pos.y - 120) <= button.r){
            return true;
        }
        return false;
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
                         if(button.type === 'effectUpgrade'){
                             var upgradeID = 'e-' + button.effectType;
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

    /********** UPGRADES **********
        upgrades
    **********/

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
                    Object.keys(effect.upStat).forEach(function(effectKey){
                        var upStat = effect.upStat[effectKey];
                        var delta = (upStat.max - upStat.min) * levelObj.perToLevelCap;
                        effect[effectKey] = upStat.min + delta;
                        if(upStat.round){
                            effect[effectKey] = Math[upStat.round](effect[effectKey]);
                        }
                    });
                },
                levelOpt: utils.deepClone({
                    levelCap: 10,
                    expCap: 50000,
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
            lvNext = upgrade.levelObjArray[lvCurrent.level];
            if(game.money >= lvNext.xp){
                upgrade.levelIndex = lvNext.level -1; //Math.floor(Math.floor(lvCurrent.l) + 1);
                upgrade.levelObj = lvNext;
                game.money -= lvNext.xp;
                // call apply to state
                upgrade.applyToState(game, upgrade.levelObj, upgrade);
                //'level up for ' + upgrade.desc
            }else{
                // not enough money for upgrade
            }
        }else{
            // level cap reached.
        }
    };

    var getLowestUpgrade = function(game){
        var cost = Infinity, lvNext,
        lowest = false;
        game.upgrades.forEach(function(upgrade){
            var lvCurrent = upgrade.levelObj;
            if(lvCurrent.level < upgrade.opt.levelCap){
                lvNext = upgrade.levelObjArray[lvCurrent.level];
                if(lvNext.xp < cost && game.money < lvNext.xp){
                    cost = lvNext.xp;
                    lowest = {
                        upgrade: upgrade,
                        cost: lvNext.xp
                    };
                }
            }
        });
        return lowest;
    };

    /********** HIT POINTS **********
        hit points, attack, and autoheal
    **********/
    var createHPObject = function(maxHP){
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
    // attack the given TARGET object with the given ATTACKER object
    var attackObject = function(game, target, attacker){
        if(target.hp){
            if(target.armor){
                // return out of function if damage is two low
                if(attacker.damage < target.armor.minDam){
                    attacker.damage = 0;
                }
            }
            if(target.type === 'block'){
                poolMod.applyOnAttackEffects(target, attacker.damage);
                // create any effects the shot might have
                attacker.effects.forEach(function(effect){
                    poolMod.createEffect(target, effect);
                    // effect stats
                    target.effectStats=poolMod.getEffectStats(target);
                });
            }
            target.hp.current -= attacker.damage;
            target.hp.current = target.hp.current < 0 ? 0 : target.hp.current;
            target.hp.per = target.hp.current / target.hp.max;
            // if ship death
            if(target.hp.current === 0 && target.type === 'ship'){
                onShipDeath(game);
            }
        }
    };

    /********** ENERGY **********
        Ship energy
    **********/

    // create and return am energy object
    var createEnergyObject = function(){
        return {
            current: ENERGY_MAX * 0.5,
            max: ENERGY_MAX,
            per: 0,
            rate: 1,
            secs: 0
        };
    };

    // clamp energy helper
    var clampEnergy = function(energy){
        energy.current = energy.current > energy.max ? energy.max: energy.current;
        energy.current = energy.current < 0 ? 0: energy.current;
    };

    // update energy
    var updateEnergy = function(game, secs){
        var energy = game.ship.energy;
        energy.per = energy.current / energy.max;
        // add to energy by current rate
        energy.current += energy.rate * secs;
        // clamp energy
        clampEnergy(energy);
    };


    /********** Shots **********
        weapon shot objects
    **********/

    // shot style data
    var shotStyleHelper = function(shot){
        shot.fillStyle = 'rgba(255,255,255,0.2)';
        shot.r = 2;
        if(shot.effects.length > 0){
            var r = 0, b = 0, g = 0;
            shot.effects.forEach(function(effect){
                if(effect.effectType === 'burn'){
                    r = 255;
                }
                if(effect.effectType === 'acid'){
                    b = 255;
                }
            });
            shot.fillStyle = 'rgb(' + r + ',' + g + ', ' + b + ')';
            shot.r = 3;
        }
    };

    // create shots pool helper
    var createShotsPool = function(){
        return poolMod.create({
                type: 'shot',
                count: 60,
                fillStyle: 'white',
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
                    weapon.effects.forEach(function(effectType){
                        var effect = poolMod.parseEffectObject(state.game.effects[effectType]);
                        var roll = Math.random();
                        if(roll < effect.chance){
                            // push a refernce to the effect object
                            shot.effects.push(effect);

                        }
                    });
                    shotStyleHelper(shot);
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
                            attackObject(state.game, block, shot);

                            // if the block is dead
                            if(block.hp.current <= 0 ){
                                // aways give block money on a 'shot death'
                                state.game.money += block.money;
                                state.game.moneyPerHour.money += block.money;
                                state.game.moneyPerHour.blockValues.push({
                                    date: new Date(),
                                    money: block.money
                                });
                                state.game.moneyPerHour.secs = 0;
                                state.game.moneyPerHour.purgeOut = false;
                                block.lifespan = 0;
                                block.active = false;
                            }
                            break;
                        }
                    }
                }
            });
    };

    // update shots helper that is called in main api.update
    var updateShots = function(game, secs, state){
        var ship = game.ship,
        weapon = ship.weapon;
        // only shoot new shots in 'space' mode
        if(game.mode === 'space'){
            ship.weaponSecs += secs;
            if(game.autoFire || state.input.fire){
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

    /********** BLOCKS **********
        The block objects
    **********/

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

    var updateBlocks = function(game, secs, state){
        var blockSpawn = game.blockSpawn,
        spawnIndex;
        // only spawn blocks in space mode
        if(game.mode === 'space'){

            poolMod.update(game.blocks, secs, state);
            blockSpawn.dist = utils.distance(game.map.x, game.map.y, blockSpawn.lastPos.x, blockSpawn.lastPos.y);
            if(blockSpawn.dist >= BLOCK_SPAWN_DIST){
                blockSpawn.lastPos.x = game.map.x;
                blockSpawn.lastPos.y = game.map.y;
                spawnIndex = BLOCK_SPAWN_COUNT_PER_DIST_MIN;
                while(spawnIndex--){
                    poolMod.spawn(game.blocks, state, {});
                }
            }
        }
        // all blocks are inactive in base mode
        if(game.mode === 'base'){
            poolMod.setActiveStateForAll(game.blocks, false);
        }
    };

    // create block pool helper
    var createBlocksPool = function(){
        return poolMod.create({
            type: 'block',
            data: {},
            fillStyle: '#1a1a1a',
            count: BLOCK_COUNT,
            spawn: function(obj, pool, state, opt){
                var game = state.game,
                map = game.map;
                // set starting position of block
                positionBlock(state, obj);
                obj.radian = utils.wrapRadian(map.radian + Math.PI);
                obj.pps = map.pps;
                obj.lifespan = 1;

                // block props
                obj.hp = createHPObject( BLOCK_HP_MIN + Math.round( (BLOCK_HP_MAX - BLOCK_HP_MIN) ) * map.per );
                obj.damage = getValueByMapDist(game, {
                    minVal: 1, 
                    maxVal: 100,
                    perFunc: utils.log1,
                    roundFunc: Math.floor
                });
                // block money based on BASE amount plus DIST AMOUNT
                obj.money = BLOCK_MONEY_BASE + Math.round(game.map.per * BLOCK_MONEY_DIST);

                // block armor
                //var minVal = BLOCK_ARMOR_MINDAM_MIN,
                //maxVal = BLOCK_ARMOR_MINDAM_MAX;
                //obj.armor.minDam = Math.round( minVal + ( maxVal - minVal ) * map.per);
                obj.armor.minDam = getValueByMapDist(game, {
                    minVal: BLOCK_ARMOR_MINDAM_MIN, 
                    maxVal: BLOCK_ARMOR_MINDAM_MAX,
                    perFunc: utils.log1,
                    roundFunc: Math.floor
                });
            },
            update: function(block, pool, state, secs){
                var game = state.game;
                var map = state.game.map;
                // keep reseting lifespan
                block.lifespan = 1;
                // set block radain and pps based off of current map radian and pps
                block.radian = utils.wrapRadian(state.game.map.radian + Math.PI);
                block.pps = state.game.map.pps;
                // move block
                var objDeltaX = Math.cos(block.radian) * block.pps * secs;
                var objDeltaY = Math.sin(block.radian) * block.pps * secs;
                block.x += objDeltaX;
                block.y += objDeltaY;
                // data object for 'block'
                block.data.dist = utils.distance(block.x, block.y, state.game.ship.x, state.game.ship.y);
                // apply current autoHeal values
                autoHealObject(block, secs);
                // become inactive if
                // block hits ship
                if(block.data.dist <= game.ship.r + block.r){
                    attackObject(game, game.ship, block);
                    block.lifespan = 0;
                }
                // block goes out of range
                if(block.data.dist >= BLOCK_POS_MAX_DIST){
                    block.lifespan = 0;
                }
                // if bloxk hp === 0
                if(block.hp.current <= 0){
                    // award money on 'effect death' if awardBlockMoney is true
                    if(block.awardBlockMoney){
                        game.money += block.money;
                        game.moneyPerHour.money += block.money;
                        game.moneyPerHour.blockValues.push({
                            date: new Date(),
                            money: block.money
                        });
                        game.moneyPerHour.secs = 0;
                        game.moneyPerHour.purgeOut = false;
                    }
                    block.lifespan = 0;
                }
                // effect stats
                block.effectStats=poolMod.getEffectStats(block);
            }
        });
    };

    /********** PUBLIC API **********
        methods to be used by project features outside of this module
    **********/

    var api = {};

    // public create method
    api.create = function(opt){
        opt = opt || {};
        var game = {
            money: opt.money === undefined ? GAME_MONEY_START : opt.money,
            moneyPerHour: {
                money: 0,                  // the amount of money to use to find an avg
                startTime: new Date(),     // the startTime to use to find an avg
                current: 0,                // the current avg
                ETM:0,                     // Estimated time to money target
                ETMUnit: 'H',
                target: 439,
                blockValues: [],
                maxValues: 5,
                startPurgeOutAfter: 60,    // amount of time till block values get purged out over time
                purgeOut: false,
                secs: 0,
                purgeOutAfter: 5,
                valueOf: function(){       // object value should be current avg
                    return this.current;
                }
            },
            ETA: {},
            pointerIndex:0,
            mode: 'space',
            autoFire: SHIP_AUTOFIRE,
            weapons: utils.deepClone(DEFAULT_WEAPONS),
            effects: utils.deepClone(poolMod.EFFECT_TYPES),
            upgrades: [],
            ship: {},
            shots: createShotsPool(),
            blocks: createBlocksPool(),
            blockSpawn: {
                dist: 0,
                lastPos: {x:0, y:0}
            },
            map: { // map position
                x: opt.mapX === undefined ? 0 : opt.mapX,
                y: opt.mapY === undefined ? 0 : opt.mapY,
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
               base: utils.deepClone(BASE_BUTTONS),
               space: utils.deepClone(SPACE_BUTTONS)
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
        var upgradeIndices = opt.upgradeIndices || {
            s1: 1
        };
        game.upgrades = DEFAULT_UPGRADES.map(function(upDef){
            var upgrade = utils.xp.createUpgrade(upDef.desc, 0, upDef.applyToState, upDef.levelOpt);
            upgrade.id = upDef.id;
            upgrade.levelIndex = upgradeIndices[upgrade.id] || 0;
            upgrade.levelObj = upgrade.levelObjArray[upgrade.levelIndex];
            if(upgrade.id == 's1'){
                console.log(upgrade.levelIndex);
                console.log(upgrade.levelObjArray[upgrade.levelIndex]);
            }
            upgrade.applyToState(game, upgrade.levelObj, upgrade);
            return upgrade;
        });
        // create upgrade refernces and set starting cost values for buttons
        updateButtons(game);

        game.ETA = createETA(game, 0, 0);


        // buy starting upgrades
/*
        var upgrade = getUpgradeById(game, 'e-burn');
        buyUpgrade(game, upgrade);
        buyUpgrade(game, upgrade);
        buyUpgrade(game, upgrade);

        var upgrade = getUpgradeById(game, 'e-acid');
        buyUpgrade(game, upgrade);
        buyUpgrade(game, upgrade);
        buyUpgrade(game, upgrade);
*/
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

    api.update = function(game, secs, state){

        // clamp secs between 0 and GAME_UPDATE_MAX_SECS const
        secs = secs > GAME_UPDATE_MAX_SECS ? GAME_UPDATE_MAX_SECS : secs;
        secs = secs < 0 ? 0 : secs;

        // move baseObject
        game.baseObj.x = game.map.x * -1;
        game.baseObj.y = game.map.y * -1;
        // update map, blocks, shots
        updateMap(game, secs);
        // switch modes based on map.dist
        if(game.map.dist > BASE_DIST && game.mode === 'base'){
            game.buttons.currentPage= 'main';
            game.mode = 'space';
        }
        if(game.map.dist <= BASE_DIST && game.mode === 'space'){
            // set all shots and blocks to inactive state
            poolMod.setActiveStateForAll(game.shots, false);
            poolMod.setActiveStateForAll(game.shots, false);
            game.buttons.currentPage = 'main';
            game.mode = 'base';
        }
        if(game.mode === 'space'){
            updateBlocks(game, secs, state);
            updateShots(game, secs, state);
        }
        // energy
        updateEnergy(game, secs);
        // autoHeal ship
        if(game.ship.hp.current < game.ship.hp.max && game.ship.energy.current > ENERGY_AUTOHEAL_COST * secs){
            game.ship.energy.current -= ENERGY_AUTOHEAL_COST * secs;
            autoHealObject(game.ship, secs);
        }

        // ETA
        updateETA(game);
/*
        var pointer = MAP_POINTERS[game.pointerIndex];
        var pos = pointer.pos;
        var label = pointer.label;
        if(typeof pos === 'function'){
            pos = pos(game);
        }
        if(typeof label === 'function'){
            label = label(game);
        }
        game.ETA = createETA(game, pos.x, pos.y, label);
*/
        // update money per hour
        var mph = game.moneyPerHour,
        len = mph.blockValues.length;
        if(len > mph.maxValues){
            mph.blockValues.splice(0, len - mph.maxValues);
        }
        // purge out over time
        mph.secs += secs;
        //if(mph.secs >= mph.purgeOutAfter){
        if(mph.secs >= mph.startPurgeOutAfter && !mph.purgeOut){
            mph.purgeOut = true;
        }
        if(mph.secs >= mph.purgeOutAfter && mph.purgeOut){
            if(mph.blockValues.length >= 1){
                mph.blockValues.splice(0, 1);
            }
            mph.secs = 0;
        }
        // if block values array has at least one value
        if(mph.blockValues.length >= 1){
            var now = new Date(),
            t = now - mph.blockValues[0].date,
            hours = t / 1000 / 60 / 60;
            mph.money = 0;
            mph.blockValues.forEach(function(bv){
                mph.money += bv.money;
            });
            mph.current = mph.money / hours;
            mph.ETMUnit = 'H';
            mph.ETM = (mph.target - game.money) / mph.current;
            mph.ETM = mph.ETM < 0 ? 0 : mph.ETM;
            mph.ETM = mph.ETM > 999 ? 999 : mph.ETM;
            // if ETM < 1 switch to minutes
            if(mph.ETM < 1){
                mph.ETMUnit = 'M';
                mph.ETM = mph.ETM * 60;
            }
            
        }else{
            mph.ETM = 0;
            mph.current = 0;
            mph.money = 0;
        }
        var lowest = getLowestUpgrade(game);
        if(lowest){
            mph.target = lowest.cost;
        }
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

    api.loopPointers = function(game){
        game.pointerIndex += 1;
        game.pointerIndex = utils.mod(game.pointerIndex, MAP_POINTERS.length);
    };

    // make update buttons public
    api.updateButtons = updateButtons;

    // return the Public API
    return api;
}());