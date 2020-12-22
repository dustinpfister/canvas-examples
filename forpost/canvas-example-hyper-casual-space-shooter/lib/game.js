var gameMod = (function(){
    
    // CONSTANTS

    var GAME_MONEY_START = 100000,

    // BLOCK CONSTANTS
    BLOCK_COUNT = 20,
    BLOCK_POS_MAX_DIST = 600,
    BLOCK_POS_SLOT_DIST = 15,
    BLOCK_HP_MIN = 5,
    BLOCK_HP_MAX = 1000,
    BLOCK_MONEY_BASE = 1,
    BLOCK_MONEY_DIST = 999,

    // SHIP AND MAP VALUES
    SHIP_AUTOFIRE = true,
    SHIP_HP = 100,
    SHIP_AUTOHEAL_RATE = 5,
    SHIP_AUTOHEAL_AMOUNT = 1,
    SHIP_MAX_SPEED_START = 64, // starting max ship speed in pps
    SHIP_MAX_SPEED_MAX = 1024,  // fully upgraded max ship speed in pps
    SHIP_ACC_START = 8, // starting Acceleration in ppsps
    SHIP_ACC_MAX = 128, // fully upgraded max ship speed in pps
    MAP_MAX_DIST = Math.pow(10,5), //Number.MAX_SAFE_INTEGER;      // max distance from BASE (0,0)

    // HOME BASE VALUES
    // values for the base area at the origin
    BASE_DIST = 100;

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
                    console.log(upgrade.levelObj.xpForNext);
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
                    console.log(upgrade.levelObj.xpForNext);
                    buyUpgrade(game, upgrade);
                    upgrade.applyToState(game, upgrade.levelObj, upgrade);
                    button.cost = upgrade.levelObj.xpForNext;
                }
            }
        }
    };

    // main WEAPONS Object that will be used to create DEFAULT_WEAPONS and append DEFAULT_UPGRADES
    var WEAPONS = {
        0: {
            name: 'Pulse Gun',
            firesPerSecond: { // min and max range for fires per second
                min: 2,
                max: 5
            },
            shotDamage: { // min and max range for shot damage
                min: 1,
                max: 5
            },
            levelOpt: { // values for weapon upgrade level object to be used with xp system
                levelCap: 10,
                expCap: 1000,
                perArgs: [0],
                tableX: -200,
                tableY: 200
            }
        },
        1: {
            name: 'Cannon',
            firesPerSecond: { // min and max range for fires per second
                min: 4,
                max: 10
            },
            shotDamage: { // min and max range for shot damage
                min: 4,
                max: 50
            },
            levelOpt: { // values for weapon upgrade level object to be used with xp system
                levelCap: 10,
                expCap: 1000,
                perArgs: [0],
                tableX: -200,
                tableY: 200
            }
        },
        2: {
            name: 'Atom',
            firesPerSecond: { // min and max range for fires per second
                min: 1,
                max: 3
            },
            shotDamage: { // min and max range for shot damage
                min: 100,
                max: 1000
            },
            levelOpt: { // values for weapon upgrade level object to be used with xp system
                levelCap: 10,
                expCap: 1000,
                perArgs: [0],
                tableX: -200,
                tableY: 200
            }
        }
    };

    // a helper to create DEFAULT_WERAPONS from WEAPONS
    var create_DEFAULT_WEAPONS = function(){
        return Object.keys(WEAPONS).map(function(weaponKey){
            var weaponDATA = WEAPONS[weaponKey];
            return {
                name: weaponDATA.name,
                firesPerSecond: weaponDATA.firesPerSecond.min,
                shotDamage: weaponDATA.shotDamage.min
            };
        });
    };

    // DEFAULT WEAPON OBJECT that will be cloned as game.weapons
    var DEFAULT_WEAPONS = create_DEFAULT_WEAPONS();
/*
    var DEFAULT_WEAPONS = {
        0 : {
            name: "Pulse gun",
            firesPerSecond: 5,
            shotDamage: 1
        },
        1 : {
            name: "Cannon",
            firesPerSecond: 10,
            shotDamage: 50
        },
        2 : {
            name: "Atom",
            firesPerSecond: 2,
            shotDamage: 500
        }
    };
*/

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
                levelCap: 30,
                expCap: 1000,
                perArgs: [0],
                tableX: 280,
                tableY: 200
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
                levelCap: 30,
                expCap: 1000,
                perArgs: [1.5],
                tableX: 280,
                tableY: 150
            }
        }
    ];

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

    var buyUpgrade = function(game, upgrade){
        var lvCurrent = upgrade.levelObj,
        lvNext;

        // if the current level is not at the level cap
        if(lvCurrent.level < upgrade.opt.levelCap){
            lvNext = utils.xp.byLevel(lvCurrent.l + 1, upgrade.opt);
            //lvNext = utils.xp.byLevel(lvCurrent.level, upgrade.opt);
            if(game.money >= lvNext.xp){
                upgrade.levelIndex = Math.floor(Math.floor(lvCurrent.l) + 1);
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
            autoHeal: {
                rate: 3,
                amount: 1, // every RATE heal AMOUNT
                secs: 0
            }
        };
    };

    var autoHealObject = function(obj, secs){
        if(obj.hp){
            obj.hp.autoHeal.secs += secs;
            if(obj.hp.autoHeal.secs >= obj.hp.autoHeal.rate){
                obj.hp.current += obj.hp.autoHeal.amount;
                obj.hp.current = obj.hp.current > obj.hp.max ? obj.hp.max : obj.hp.current;
                obj.hp.per = obj.hp.current / obj.hp.max;
                obj.hp.autoHeal.secs = 0;
            }
        }
    };

    var onShipDeath = function(game){
        game.ship = createShip(game);
        game.map.x = 0;
        game.map.y = 0;
        // set all blocks inactive
        poolMod.getAllActive(game.blocks).forEach(function(block){
           block.active = false;
           block.lifespan = 0;
        });
        // game money effected
        game.money = game.money > 0 ? game.money / 2 : 0;
    };

    // attack the given object with the given amount of damage
    var attackObject = function(game, obj, damage){
        if(obj.hp){
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
                count: 60,
                fillStyle: 'red',
                r: 2,
                spawn: function(obj, pool, state, opt){
                    obj.x = 0;
                    obj.y = 0;
                    // shot radian should be set to current map radian
                    obj.radian = state.game.map.radian;
                    obj.pps = 128;
                    obj.lifespan = 3;

                    var weapon = state.game.ship.weapon;
                    obj.damage = weapon.shotDamage; // damage when shot hits a block
                   
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
                            // if the block is dead
                            if(block.hp.current <= 0 ){
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
            upgrades: [],
            ship: {}, //createShip(),
            shots: createShotsPool(),
            blocks: createBlocksPool(),
            map: { // map position
                x: 0,
                y: 0,
                radian: 0, 
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
            upgrade.applyToState(game, upgrade.levelObj, upgrade);
            upgrade.id = upDef.id;
            return upgrade;
        });

        // create upgrade refernces and set starting cost values for buttons
        ['base'].forEach(function(mode){
             Object.keys(game.buttons[mode]).forEach(function(pageKey){
                 Object.keys(game.buttons[mode][pageKey]).forEach(function(buttonKey){
                     var button = game.buttons[mode][pageKey][buttonKey];
                     if(button.upgradeID){
                         // create a ref to upgrade, and set start cost
                         button.upgrade = getUpgradeById(game, button.upgradeID);
                         button.cost = button.upgrade.levelObj.xpForNext;
                     }
                 });
             });
        });

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
    // update the MAP using current RADIAN and PPS values
    // with the given SECS value.
    var updateMap = function(game, secs){
        var map = game.map;
        map.x += Math.cos(map.radian) * map.pps * secs;
        map.y += Math.sin(map.radian) * map.pps * secs;
        map.dist = utils.distance(0, 0, map.x, map.y);
        clampMapPos(map);
        map.per = game.map.dist / MAP_MAX_DIST;
        map.aToOrigin = utils.angleTo(map.x, map.y, 0, 0);
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
                    poolMod.spawn(game.shots, state, {});
                    ship.weaponSecs = 0;
                }
            }
        }

        // always update shot pool
        poolMod.update(game.shots, secs, state);;

    };

    api.update = function(game, secs, state){

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

        // update upgrades
        //var i = game.upgrades.length;
        //while(i--){
        //    var upgrade = game.upgrades[i];
        //    buyUpgrade(game, upgrade);
        //    upgrade.applyToState(game, upgrade.levelObj, upgrade);
        //}

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

    // return the Public API
    return api;
}());