var game = (function () {

    // HARD CODED SETTINGS
    // ********** ********** ********** ********** **********

    // GRID 'Constants'
    var GRID = {
        w: 16,
        h: 12,
        cellSize: 16
    };

    // SPAWN 'Constants'
    var SPAWN = {
        rate: 0.5, // spawn rate in secs
        playerMax: 5, // max player units
        enemyMax: 10,
        shotMax: 100,
        blastMax: 50
    };

    var TURRET = {
        maxKillLevel: 10,
        minAttack: 1,
        maxAttack: 10,
        minAttackRange: 3,
        maxAttackRange: 7,

        minAccuracy: 0.4,
        maxAccuracy: 0.9,

        maxInaccuracy: 2
    };

    // CELLS create and get
    // ********** ********** ********** ********** **********

    // create the array of cell objects
    var createCells = function (areaData) {
        var i = 0,
        len = GRID.w * GRID.h,
        cells = [];
        while (i < len) {
            cells.push({
                i: i,
                x: i % GRID.w,
                y: Math.floor(i / GRID.w),
                areaType: areaData[i] === undefined ? 0 : areaData[i],
                clear: true // nothing on it
            })
            i += 1;
        }
        return cells;
    };

    // get cell
    var getCell = function (state, x, y) {
        return state.cells[GRID.w * y + x];
    };

    var getRandomCell = function (pool) {
        return pool[Math.floor(pool.length * Math.random())];
    };

    // get areas of type and clear status (optional)
    // clear === undefined (clear and not clear tiles)
    // clear === true (only clear tiles)
    // clear === false (only not clear tiles)
    var getAreas = function (state, areaType, clear) {
        return state.cells.filter(function (cell) {
            return String(cell.areaType) === String(areaType) && (clear === undefined ? true : clear === cell.clear);
        });
    };

    // get cells near the cell
    var getNear = function (state, cell, range, areaType) {
        range = range || 1;
        areaType = areaType === undefined ? 0 : areaType;
        return state.cells.filter(function (target) {
            return utils.distance(cell.x, cell.y, target.x, target.y) <= range;
        }).filter(function (target) {
            return String(areaType) === String(target.areaType) && cell.i != target.i;
        }).filter(function (target) {
            return target.clear;
        })
    };

    // return a list of objects with landIndex values sorted by
    // most amount of water tiles in the given range
    var getBestTurretLands = function (state, range) {
        var waterAreas = getAreas(state, 0);
        return getAreas(state, 2, true).map(function (cell) {
            var count = 0;
            waterAreas.forEach(function (waterCell) {
                if (utils.distance(cell.x, cell.y, waterCell.x, waterCell.y) <= range) {
                    count += 1;
                }
            });
            return {
                i: cell.i,
                cell: cell,
                waterCount: count
            }
        }).filter(function (obj) {
            return obj.waterCount > 0;
        }).sort(function (a, b) {
            if (a.waterCount > b.waterCount) {
                return -1;
            }
            if (a.waterCount < b.waterCount) {
                return 1;
            }
            return 0;
        });
    };

    // get border waters
    var getBorderWaters = function (state) {
        return getAreas(state, 0, true).filter(function (cell) {
            return cell.x === 0 || cell.y == 0 || cell.x === GRID.w - 1 || cell.y === GRID.h - 1;
        });
    };

    // BOAT and TURRET helpers
    // ********** ********** ********** ********** **********

    // set values of the given turret object bu the current killLevel value
    var applyTurretKillLevel = function (tur) {
        var per = tur.killLevel.level / TURRET.maxKillLevel,
        delta;
        // attack
        delta = (TURRET.maxAttack - TURRET.minAttack) * per;
        tur.attack = TURRET.minAttack + delta;
        // attack range
        delta = (TURRET.maxAttackRange - TURRET.minAttackRange) * per;
        tur.attackRange = TURRET.minAttackRange + delta;
        // accuracy
        delta = (TURRET.maxAccuracy - TURRET.minAccuracy) * per;
        tur.accuracy = TURRET.minAccuracy + delta;
    };

    // SPAWN boats and turrets
    // ********** ********** ********** ********** **********

    // spawn units
    var spawn = function (state, secs) {
        state.spawnSecs += secs;
        if (state.spawnSecs >= SPAWN.rate) {
            state.spawnSecs %= SPAWN.rate;
            // player spawn
            if (state.pool.player.length < SPAWN.playerMax) {
                var freeLands = getBestTurretLands(state, TURRET.minAttackRange);
                if (freeLands.length >= 1) {
                    var land = freeLands[0].cell;
                    land.clear = false;
                    var turret = {
                        x: land.x,
                        y: land.y,
                        h: 0, // heading
                        kills: 0,
                        killLevel: 1,
                        killsToNext: 0,
                        attack: 5,
                        attackRange: TURRET.minAttackRange,
                        fireRate: 0.1,
                        fireSecs: 0.2,
                        accuracy: 0.0,
                        shotPPS: 4,
                        shotBlastRadius: 1.5,
                        shotAttack: 2
                    };
                    turret.killLevel = utils.XP.parseByXP(turret.kills, TURRET.maxKillLevel);
                    applyTurretKillLevel(turret);
                    state.pool.player.push(turret);
                }
            }
            // enemy
            if (state.pool.enemy.length < SPAWN.enemyMax) {
                var waters = getBorderWaters(state);
                if (waters.length >= 1) {
                    var water = getRandomCell(waters);
                    water.clear = false;
                    state.pool.enemy.push({
                        x: water.x,
                        y: water.y,
                        hp: 100,
                        hpMax: 100,
                        secs: 0,
                        speed: 3
                    });
                }
            }
        }
    };

    // UPDATE  boats and turrets
    // ********** ********** ********** ********** **********

    // update boats
    var updateBoats = function (state, secs) {
        var i = state.pool.enemy.length,
        boat;
        while (i--) {
            boat = state.pool.enemy[i];
            boat.secs += secs;
            if (boat.secs >= boat.speed) {
                boat.secs %= boat.speed;
                var near = getNear(state, boat, 1.5, 0);
                if (near.length >= 1) {
                    var water = getRandomCell(near),
                    current = getCell(state, boat.x, boat.y);
                    current.clear = true;
                    water.clear = false;
                    boat.x = water.x;
                    boat.y = water.y;
                }
            }
            // purge dead boats
            if (boat.hp === 0) {
                var cell = getCell(state, boat.x, boat.y);
                cell.clear = true;
                state.pool.enemy.splice(i, 1);
                state.kills += 1;
            }
        }
    };

    // update player turrets
    var updateTurrets = function (state, secs) {
        var i = state.pool.player.length,
        turret;
        while (i--) {
            turret = state.pool.player[i];
            turret.fireSecs -= secs;
            // fire
            if (turret.fireSecs <= 0) {
                turret.fireSecs = turret.fireRate + Math.abs(turret.fireSecs) % turret.fireRate;
                var targets = state.pool.enemy.filter(function (boat) {
                        return utils.distance(boat.x, boat.y, turret.x, turret.y) <= turret.attackRange;
                    });
                if (targets.length >= 1) {
                    var target = getRandomCell(targets);
                    // push shot
                    if (state.pool.shots.length < SPAWN.shotMax) {
                        var sx = turret.x + 0.5,
                        sy = turret.y + 0.5,
                        ma = TURRET.maxInaccuracy,
                        tx = target.x + 0.5 + (-ma + ma * 2 * Math.random()) * (1 - turret.accuracy),
                        ty = target.y + 0.5 + (-ma + ma * 2 * Math.random()) * (1 - turret.accuracy);
                        turret.h = Math.atan2(ty - sy, tx - sx);
                        state.pool.shots.push({
                            shotFrom: turret,
                            x: sx,
                            y: sy,
                            sx: sx,
                            sy: sy,
                            tx: tx,
                            ty: ty,
                            secs: 0,
                            d: utils.distance(sx, sy, tx, ty),
                            h: turret.h,
                            pps: turret.shotPPS,
                            blastRadius: turret.shotBlastRadius,
                            attack: turret.shotAttack
                        });
                    }
                }
            }
        }
    };

    // SHOTS ans BLASTS
    // ********** ********** ********** ********** **********

    // shot blast
    var spawnBlast = function (state, shot) {
        var i = state.pool.enemy.length,
        boat,
        dam,
        d;
        // apply damage
        while (i--) {
            boat = state.pool.enemy[i];
            d = utils.distance(shot.x, shot.y, boat.x + 0.5, boat.y + 0.5);
            if (d <= shot.blastRadius) {
                dam = shot.attack - d / shot.blastRadius * shot.attack;
                // attack but do not purge boat, that is done in updateBoats
                boat.hp -= dam;
                boat.hp = boat.hp < 0 ? 0 : boat.hp;
                // step kills for shotFrom if we have that value
                var disp = shot.shotFrom;
                if (boat.hp === 0 && disp != undefined) {
                    disp.kills += 1;
                    disp.killLevel = utils.XP.parseByXP(disp.kills, TURRET.maxKillLevel);
                    applyTurretKillLevel(disp);
                }
            }
        }
        // push blast
        if (state.pool.blasts.length < SPAWN.blastMax) {
            state.pool.blasts.push({
                x: shot.x,
                y: shot.y,
                secs: 0,
                secsMax: 1,
                radius: shot.blastRadius
            });
        }
    };

    // update shots in the shot pool
    var updateShots = function (state, secs) {
        var i = state.pool.shots.length,
        shot;
        while (i--) {
            shot = state.pool.shots[i];
            shot.secs += secs;
            var d = shot.pps * shot.secs;
            d = d > shot.d ? shot.d : d;
            shot.x = shot.sx + Math.cos(shot.h) * d;
            shot.y = shot.sy + Math.sin(shot.h) * d;
            if (d === shot.d) {
                spawnBlast(state, shot);
                state.pool.shots.splice(i, 1);
            }
        }
    };

    // PUBLIC API
    // ********** ********** ********** ********** **********

    var api = {
        GRID: GRID,
        SPAWN: SPAWN,
        TURRET: TURRET
    };

    // create a state object
    api.create = function (opt) {
        opt = opt || {};
        opt.areaData = opt.areaData || '';
        var state = {
            cells: createCells(opt.areaData),
            lt: new Date(),
            spawnSecs: 0,
            kills: 0,
            pool: {
                player: [],
                enemy: [],
                shots: [],
                blasts: []
            }
        };
        return state;
    };

    // update a state object
    api.update = function (state) {
        // time
        var now = new Date(),
        t = now - state.lt,
        secs = t / 1000;
        // spawn
        spawn(state, secs);
        //purge(state);
        updateBoats(state, secs);
        updateTurrets(state, secs);
        updateShots(state, secs);
        // update blasts
        var i = state.pool.blasts.length;
        while (i--) {
            var blast = state.pool.blasts[i];
            blast.secs += secs;
            if (blast.secs >= blast.secsMax) {
                state.pool.blasts.splice(i, 1);
            }
        }
        // set lt to now
        state.lt = now;
    };

    return api;

}
    ());
