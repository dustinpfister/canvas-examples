var gameMod = (function () {

    // hard coded settings
    var hardSet = {
        maxSecs: 0.25 // max seconds foe sec value used in updaes
    };

    var Weapons = [{
            name: 'Blaster',
            pps: 256,
            shotRate: 0.125,
            blastRadius: 1,
            maxDPS: 10,
            accuracy: 0.75,
            hitRadius: 64,
            gunCount: 1,
        }, {
            name: 'Assault Blaster',
            pps: 512,
            shotRate: 0.125,
            blastRadius: 2,
            maxDPS: 5,
            accuracy: 0.5,
            hitRadius: 64,
            gunCount: 4
        }, {
            name: 'Cannon',
            pps: 256,
            shotRate: 0.5,
            blastRadius: 3,
            maxDPS: 150,
            accuracy: 0.25,
            hitRadius: 64,
            gunCount: 2
        }, {
            name: 'Atom',
            pps: 256,
            shotRate: 1,
            blastRadius: 10,
            maxDPS: 250,
            accuracy: 0.9,
            hitRadius: 128,
            gunCount: 1
        }
    ];

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

    var shoot = function (game) {
        var w = Weapons[game.weaponIndex];
        if (game.shotSecs >= game.shotRate) {
            var i = 0,
            radian;
            while (i < w.gunCount) {
                radian = Math.PI * 2 / 4 * i + Math.PI / 4;
                poolMod.spawn(game.shots, game, radian);
                i += 1;
            }
            game.shotSecs = 0;
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
            y = Math.floor(map.cellHeight * Math.random());
            if (activeCells.length >= 1) {
                var cell = activeCells[Math.floor(activeCells.length * Math.random())];
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
                // !!! know bug where AI movement does not work as desired might
                // is temp fixed by setting a minDist, might still cause problems
                // with very low frame rates
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
                    // !!! know bug where AI movement does not work as desired might
                    // be fixed here by way of a tempX and Y maybe
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

            game.levelObj = XP.parseByXP(game.totalDamage, 100, 10000);

        }
    };

    return {
        Weapons: Weapons,
        buttons: {
            options: {
                x: 300,
                y: 20,
                r: 10
            },
            changeWeapon: {
                x: 290,
                y: 210,
                r: 16
            }
        },
        create: function (opt) {
            opt = opt || {};
            var game = {
                levelObj: {},
                canvas: opt.canvas,
                map: mapMod.create(),
                cross: {},
                shots: poolMod.create(shotOptions),
                explosions: poolMod.create(explosionOptions),
                shotRate: 1,
                shotSecs: 0,
                weaponIndex: 3,
                totalDamage: 0,
                userDown: false,
                autoPlay: {
                    enabled: true,
                    behavior: 'cannon',
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
            // set game level object for first time
            game.levelObj = XP.parseByXP(game.totalDamage, 100, 10000);
            // first autoPlay target
            autoPlay.setRandomTarget(game);
            // create cross object
            game.cross = crossMod.create({
                    offsetX: game.map.cellWidth * game.map.cellSize / 2 * -1,
                    offsetY: game.map.cellHeight * game.map.cellSize / 2 * -1,
                });
            return game;
        },

        update: function (game, secs) {

            // do not let secs go over hard coded max secs value
            secs = secs > hardSet.maxSecs ? hardSet.maxSecs : secs;

            game.shotRate = Weapons[game.weaponIndex].shotRate;

            // cross object
            crossMod.update(game.cross, secs);

            // map
            mapMod.clampOffset(game.map, game.cross.offset);
            mapMod.update(game.map, secs);

            // update pools
            poolMod.update(game.shots, game, secs);
            poolMod.update(game.explosions, game, secs);

            game.shotSecs += secs;
            game.shotSecs = game.shotSecs >= game.shotRate ? game.shotRate : game.shotSecs;

            // shoot
            if (crossMod.isInInner(game.cross) && game.cross.userDown) {
                shoot(game);
            }

            // AutoPlay
            autoPlay.update(game, secs);

        }

    }

}
    ());
