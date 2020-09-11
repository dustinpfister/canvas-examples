var gameMod = (function () {

    // hard coded settings
    var hardSet = {
        maxSecs: 0.25, // max seconds for sec value used in updates
        deltaNext: 1000, //100000, // deltaNext and levelCap
        levelCap: 100
    };

    // WEAPONS
    var Weapons = [{
            name: 'Blaster',
            pps: 256,
            shotRate: 0.125,
            blastRadius: 1,
            maxDPS: 10,
            accuracy: 0.75,
            hitRadius: 64,
            gunCount: 1,
            manaCost: 1,
            level: {
                maxDPS: {
                    SPEffectMax: 50,
                    levelEffectMax: 40,
                    baseValue: 10
                },
                manaCost: {
                    SPEffectMax: 0,
                    levelEffectMax: 0,
                    baseValue: 2
                }
            }
        }, {
            name: 'Assault Blaster',
            pps: 512,
            shotRate: 0.125,
            blastRadius: 2,
            maxDPS: 5,
            accuracy: 0.5,
            hitRadius: 64,
            gunCount: 4,
            manaCost: 5,
            level: {
                maxDPS: {
                    SPEffectMax: 70,
                    levelEffectMax: 25,
                    baseValue: 5
                },
                manaCost: {
                    SPEffectMax: 0,
                    levelEffectMax: 0,
                    baseValue: 5
                }
            }
        }, {
            name: 'Cannon',
            pps: 256,
            shotRate: 0.5,
            blastRadius: 3,
            maxDPS: 20,
            accuracy: 0.25,
            hitRadius: 32,
            gunCount: 2,
            manaCost: 10,
            level: {
                maxDPS: {
                    SPEffectMax: 300,
                    levelEffectMax: 180,
                    baseValue: 20
                },
                manaCost: {
                    SPEffectMax: 0,
                    levelEffectMax: 0,
                    baseValue: 10
                }
            }
        }, {
            name: 'Atom',
            pps: 256,
            shotRate: 1,
            blastRadius: 10,
            maxDPS: 75,
            accuracy: 0.9,
            hitRadius: 64,
            gunCount: 1,
            manaCost: 35,
            level: {
                maxDPS: {
                    SPEffectMax: 500,
                    levelEffectMax: 450,
                    baseValue: 50
                },
                manaCost: {
                    SPEffectMax: 0,
                    levelEffectMax: 0,
                    baseValue: 35
                }
            }
        }
    ];

    // SKILL POINTS
    var setWeaponsToLevel = function (game) {
        var level = game.levelObj.level;
        Weapons.forEach(function (weapon, i) {
            var lv = weapon.level,
            sp = game.skills['weapon_' + i].points;
            // use The applySkillPoints method in XP
            Object.keys(weapon.level).forEach(function (weaponStatName) {
                weapon[weaponStatName] = XP.applySkillPoints(game.levelObj, sp, weapon.level[weaponStatName]);
                weapon.accuracy = 0.95 - 0.9 * (1 - level / hardSet.levelCap);
            });
        });
    };

    // SHOT Object Options
    var shotOptions = {
        count: 20,
        // when a shot becomes active
        spawn: function (shot, game, radian) {
            var offset = game.cross.offset,
            w = Weapons[game.weaponIndex],
            ch = game.cross.crosshairs,
            r = Math.random() * (Math.PI * 2),
            d = w.hitRadius * (1 - w.accuracy) * Math.random(),
            x = ch.x + Math.cos(r) * d,
            y = ch.y + Math.sin(r) * d,
            d;
            //shot.x = game.canvas.width;
            //shot.y = game.canvas.height;
            shot.x = x + Math.cos(radian) * game.canvas.width;
            shot.y = y + Math.sin(radian) * game.canvas.width;
            shot.heading = Math.atan2(y - shot.y, x - shot.x);
            d = utils.distance(shot.x, shot.y, x, y);
            shot.pps = w.pps;
            shot.lifespan = d / shot.pps;
            shot.offset = offset;
        },
        // when a shot becomes inactive
        purge: function (shot, game) {
            poolMod.spawn(game.explosions, game, shot);
        },
        // update method for a shot
        update: function (shot, game, secs) {
            shot.x += Math.cos(shot.heading) * shot.pps * secs;
            shot.y += Math.sin(shot.heading) * shot.pps * secs;
            shot.lifespan -= secs;
        }
    };

    // Explosion Options
    var explosionOptions = {
        count: 20,
        spawn: function (ex, game, shot) {
            var w = Weapons[game.weaponIndex];
            ex.x = shot.x;
            ex.y = shot.y;
            ex.data.offset = {
                x: shot.offset.x,
                y: shot.offset.y
            };
            ex.data.radiusEnd = game.map.cellSize * w.blastRadius;
            ex.data.explosionTime = 0.6;
            ex.data.maxDPS = w.maxDPS; ;
            ex.lifespan = ex.data.explosionTime;
            ex.per = 0;
        },
        purge: function (ex, game) {},
        update: function (ex, game, secs) {
            ex.per = (ex.data.explosionTime - ex.lifespan) / ex.data.explosionTime;
            ex.radius = ex.data.radiusEnd * ex.per;
            var cell = mapMod.getWithCanvasPointAndOffset(game.map, ex.x, ex.y, ex.data.offset.x, ex.data.offset.y),
            blastRadius = Math.ceil((ex.radius + 0.01) / game.map.cellSize);
            if (cell) {
                var targets = mapMod.getAllFromPointAndRadius(game.map, cell.x, cell.y, blastRadius);
                targets.cells.forEach(function (cell, i) {
                    // apply damage
                    var damage = ex.data.maxDPS * (1 - (targets.dists[i] / blastRadius)) * secs;
                    if (cell.active) {
                        game.totalDamage += damage;
                        cell.HP -= damage;
                        cell.HP = cell.HP < 0 ? 0 : cell.HP;
                    }
                    cell.damage += damage;
                });
            }
            ex.lifespan -= secs;
        }
    };

    // shoot the current weapon
    var shoot = function (game) {
        var w = Weapons[game.weaponIndex];
        // check shot rate and mana
        if (game.shotSecs >= game.shotRate && game.mana.current >= w.manaCost) {
            var i = 0,
            radian;
            while (i < w.gunCount) {
                radian = Math.PI * 2 / 4 * i + Math.PI / 4;
                poolMod.spawn(game.shots, game, radian);
                i += 1;
            }
            game.shotSecs = 0;
            // deduct mana
            game.mana.current -= w.manaCost;
        }
    };

    // AUTOPLAY
    var autoPlay = {
        setRandomTarget: function (game) {
            var ch = game.cross.crosshairs,
            os = game.cross.offset,
            ap = game.autoPlay,
            map = game.map,
            activeCells = mapMod.getAllCellActiveState(map, true),
            x = Math.floor(map.cellWidth * Math.random()),
            y = Math.floor(map.cellHeight * Math.random()),
            cell;
            if (activeCells.length >= 1) {
                cell = activeCells[Math.floor(activeCells.length * Math.random())];
                //cell = map.cells[map.cells.length - 1];
                x = cell.x;
                y = cell.y;
            }
            ap.target.x = (map.cellSize / 2 + (map.cellSize * x)) * -1;
            ap.target.y = (map.cellSize / 2 + (map.cellSize * y)) * -1;
        },

        setByPercentRemain: function (game) {
            var map = game.map,
            ap = game.autoPlay;
            // hard coded default for weapon index
            game.weaponIndex = 0;
            // set AI values based on ap.behavior value
            if (ap.behavior === 'cannon') {
                game.weaponIndex = 2;
                ap.maxShootTime = 3;
            }
            if (ap.behavior === 'total-kill') {
                game.weaponIndex = Weapons.length - 1;
                ap.stopAtPercentRemain = 0;
            }
            if (ap.behavior === 'weapon-switch') {
                game.weaponIndex = Math.floor((Weapons.length) * utils.logPer(map.percentRemain, 2));
            }
            game.weaponIndex = game.weaponIndex >= Weapons.length ? Weapons.length - 1 : game.weaponIndex;
            // stay on move mode if
            if (map.percentRemain < ap.stopAtPercentRemain) {
                ap.mode = 'move';
            }
        },

        modes: {

            // AI Move mode
            move: function (game, secs) {
                var ch = game.cross.crosshairs,
                os = game.cross.offset,
                ap = game.autoPlay,
                map = game.map,
                a = Math.atan2(os.y - ap.target.y, os.x - ap.target.x),
                cross = game.cross,
                d = utils.distance(os.x, os.y, ap.target.x, ap.target.y),
                delta = game.cross.radiusOuter - 1;
                maxDelta = cross.radiusInner + cross.radiusDiff - 1,
                minDelta = cross.radiusInner + 5,
                slowDownDist = map.cellSize * 4,
                minDist = map.cellSize / 2,
                per = 0;
                if (d < slowDownDist) {
                    per = 1 - d / slowDownDist;
                }
                ap.target.d = d;
                delta = maxDelta - (maxDelta - minDelta) * per;
                if (d < minDist) {
                    // set right to target
                    os.x = ap.target.x;
                    os.y = ap.target.y;
                    // done
                    ap.shootTime = ap.maxShootTime;
                    autoPlay.setRandomTarget(game);
                    ap.mode = 'shoot';
                } else {
                    ch.x = game.cross.center.x + Math.cos(a) * delta;
                    ch.y = game.cross.center.y + Math.sin(a) * delta;
                }
            },

            shoot: function (game, secs) {
                var ch = game.cross.crosshairs,
                os = game.cross.offset,
                ap = game.autoPlay,
                map = game.map;
                ch.x = game.cross.center.x;
                ch.y = game.cross.center.y;
                shoot(game);
                ap.shootTime -= secs;
                if (ap.shootTime <= 0) {
                    ap.mode = 'move';
                    autoPlay.setRandomTarget(game);
                }
            }
        },

        update: function (game, secs) {
            // if autoplay
            if (game.autoPlay.enabled) {
                var ch = game.cross.crosshairs,
                os = game.cross.offset,
                ap = game.autoPlay,
                map = game.map;
                game.autoPlay.delay -= secs;
                if (game.userDown) {
                    game.autoPlay.delay = game.autoPlay.maxDelay;
                }
                game.autoPlay.delay = game.autoPlay.delay < 0 ? 0 : game.autoPlay.delay;
                if (game.autoPlay.delay === 0) {
                    // disable cross move back
                    game.cross.moveBackEnabled = false;
                    // set by percent remain?
                    autoPlay.setByPercentRemain(game);
                    // apply current mode
                    autoPlay.modes[ap.mode](game, secs);
                }
            }
        }
    };

    // setup the map object for a game object based on current mapLevelObj settings,
    // and change the settings if needed
    var mapSizes = ['8x6', '16x8', '16x16', '32x16'].map(function (str) {
        var a = str.split('x');
        return {
            w: a[0],
            h: a[1]
        };
    });
    var setMap = function (game, xp, deltaNext, levelCap, startingCellDamage) {
        levelCap = levelCap || 50;
        if (xp >= 0 || deltaNext) {
            game.mapLevelObj = XP.parseByXP(xp, levelCap, deltaNext);
        }
        // create the map
        var mapL = game.mapLevelObj,
        capPer = mapL.level / levelCap;
        var size = mapSizes[Math.floor(capPer * (mapSizes.length - 1))];
        game.map = mapMod.create({
                cellWidth: size.w,
                cellHeight: size.h,
                cellLevelCap: 5 + Math.floor(capPer * 95),
                cellDeltaNext: 1000 - Math.round(capPer * 750),
                genRate: 10 - 9.5 * capPer,
                genCount: 1 + Math.floor(6 * capPer),
                blastRMin: 2,
                blastRMax: 2 + Math.floor(size.w / 6 * capPer),
                blastCount: 3 + Math.round(17 * capPer),
                blastMaxDamage: 10 + 1000 * capPer,
                startCells: [0],
                startingCellDamage: startingCellDamage
            });
        // make sure autoPlay has a new target
        autoPlay.setRandomTarget(game);
        // center cross hairs
        crossMod.center(game.cross, game.map.cellWidth, game.map.cellHeight);
        // set all shots and explosions to inactive state
        poolMod.setActiveStateForAll(game.shots, false);
        poolMod.setActiveStateForAll(game.explosions, false);
    };

    var setManaToLevel = function (game) {
        var level = game.levelObj.level,
        mLv = game.mana.level;
        // MPS
        game.mana.mps = mLv.mpsStart + mLv.mpsPerLevel * level;
        // MAX mana
        game.mana.max = mLv.maxStart + mLv.maxPerLevel * level;
    };

    // reset skills helper
    var resetSkills = function (game) {
        Object.keys(game.skills).forEach(function (skillKey) {
            var skill = game.skills[skillKey];
            skill.points = 0;
        });
        game.skillPoints.free = game.skillPoints.total;
        setWeaponsToLevel(game);
    };
    // set free skill points value from total of skills
    var setFreeFromSkills = function (game) {
        var total = 0;
        Object.keys(game.skills).forEach(function (skillKey) {
            var skill = game.skills[skillKey];
            total += skill.points;
        });
        game.skillPoints.free = game.skillPoints.total - total;
    };
    var setSkillPointTotal = function (game) {
        game.skillPoints.total = (game.levelObj.level - 1) * 5;
        setFreeFromSkills(game);
    };

    var api = {};
    api.Weapons = Weapons;

    api.setMap = setMap;

    // create a new game state object
    api.create = function (opt) {
        opt = opt || {};
        var game = {
            levelObj: {}, // main level object for the player
            mapLevelObj: {}, // level object for the map
            canvas: opt.canvas,
            skillPoints: {
                total: 100,
                free: 50
            },
            skills: {
                weapon_0: {
                    points: 0
                },
                weapon_1: {
                    points: 0
                },
                weapon_2: {
                    points: 0
                },
                weapon_3: {
                    points: 0
                },
            },
            mana: {
                current: 50,
                max: 100,
                mps: 10,
                level: {
                    mpsStart: 9,
                    mpsPerLevel: 1,
                    maxStart: 90,
                    maxPerLevel: 10
                }
            },
            map: {},
            cross: {},
            shots: poolMod.create(shotOptions),
            explosions: poolMod.create(explosionOptions),
            shotRate: 1,
            shotSecs: 0,
            weaponIndex: 3,
            totalDamage: opt.totalDamage || 0,
            userDown: false,
            autoPlay: {
                enabled: true,
                behavior: 'total-kill',
                stopAtPercentRemain: 0,
                delay: 5,
                maxDelay: 5,
                mode: 'move',
                shootTime: 5,
                maxShootTime: 5,
                target: {
                    x: -16,
                    y: -16,
                    d: 0
                }
            }
        };
        // setup game level object
        game.levelObj = XP.parseByXP(game.totalDamage, hardSet.levelCap, hardSet.deltaNext);
        // create cross object
        game.cross = crossMod.create();
        // set up map
        setMap(game, opt.mapXP === undefined ? 0 : opt.mapXP || 0, opt.mapDeltaNext, opt.mapLevelCap || 50, opt.startingCellDamage);
        // first autoPlay target
        autoPlay.setRandomTarget(game);
        // set weapons to level for first time
        setWeaponsToLevel(game);
        // reset skills for now
        resetSkills(game);
        setSkillPointTotal(game);
        return game;
    };

    // update a game state object
    api.update = function (game, secs) {
        // do not let secs go over hard coded max secs value
        secs = secs > hardSet.maxSecs ? hardSet.maxSecs : secs;
        // set shot rate based on current weapon
        game.shotRate = Weapons[game.weaponIndex].shotRate;
        // cross object
        crossMod.update(game.cross, secs);
        // map
        mapMod.clampOffset(game.map, game.cross.offset);
        mapMod.update(game.map, secs);
        // update pools
        poolMod.update(game.shots, game, secs);
        poolMod.update(game.explosions, game, secs);
        // shoot
        game.shotSecs += secs;
        game.shotSecs = game.shotSecs >= game.shotRate ? game.shotRate : game.shotSecs;
        if (crossMod.isInInner(game.cross) && game.cross.userDown) {
            shoot(game);
        }
        // AutoPlay
        autoPlay.update(game, secs);
        // update level object
        game.levelObj = XP.parseByXP(game.totalDamage, hardSet.levelCap, hardSet.deltaNext);

        // apply game.level to weapons
        setWeaponsToLevel(game);
        // Mana
        setManaToLevel(game);
        game.mana.current += game.mana.mps * secs;
        game.mana.current = game.mana.current > game.mana.max ? game.mana.max : game.mana.current;
        // skill points
        setSkillPointTotal(game);
    };

    // CREATE SKILL BUTTONS to be used in the skill manager state
    // update button display helper
    var updateButtonDisplay = function (sm, button) {
        var sp = sm.game.skills['weapon_' + button.data.weaponIndex].points,
        w = button.data.weapon;
        button.info = sp + ' ' + Math.floor(w.maxDPS);
    };
    // set a skills sp value
    var setSkill = function (sm, skillKey, spValue) {
        var skill = sm.game.skills[skillKey],
        skillPoints = sm.game.skillPoints,
        delta = spValue - skill.points;
        if (skillPoints.free - delta >= 0 && skill.points + delta >= 0) {
            skillPoints.free -= delta;
            skill.points += delta;
        }
    };
    // public createSkillButton method
    api.createSkillButtons = function (sm) {
        // start with a buttons object
        var buttons = {
            toOptions: buttonMod.create({
                label: 'Options',
                x: 25,
                y: 200,
                r: 10,
                onClick: function (button, sm) {
                    // set state to options
                    sm.currentState = 'options';
                }
            }),
            resetSkills: buttonMod.create({
                label: 'Reset',
                x: 75,
                y: 200,
                r: 10,
                onClick: function (button, sm) {
                    // set state to options
                    //sm.currentState = 'options';
                    resetSkills(sm.game);

                    Weapons.forEach(function (weapon, weaponIndex) {
                        var button = buttons['weapon_' + weaponIndex];
                        updateButtonDisplay(sm, button);
                    });
                }
            })
        };

        // have a button for each weapon
        Weapons.forEach(function (weapon, weaponIndex) {
            var button = buttonMod.create({
                    label: weapon.name,
                    type: 'upgrade',
                    x: 50 + 60 * weaponIndex,
                    y: 120,
                    r: 25,
                    data: {
                        weaponIndex: weaponIndex,
                        weapon: weapon
                    },
                    onUpgrade: function (button, sm) {
                        var wi = button.data.weaponIndex,
                        skillKey = 'weapon_' + wi,
                        skill = sm.game.skills[skillKey];
                        setSkill(sm, skillKey, skill.points + 1);
                    },
                    onDowngrade: function (button, sm) {
                        var wi = button.data.weaponIndex,
                        skillKey = 'weapon_' + wi,
                        skill = sm.game.skills[skillKey];
                        setSkill(sm, skillKey, skill.points - 1);
                    },
                    onClick: function (button, sm) {
                        updateButtonDisplay(sm, button);
                    }
                });
            // set button to its index
            buttons['weapon_' + weaponIndex] = button;
            // update button display for first time
            updateButtonDisplay(sm, button);

        });
        return buttons;
    };

    return api;

}
    ());
