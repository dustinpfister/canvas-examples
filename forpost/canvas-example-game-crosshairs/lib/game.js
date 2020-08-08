var gameMod = (function () {

    //var debug = utils.logOnce();

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

    var userPointerStart = function (game) {
        var cross = crossMod.createEvent(game.cross, 'start');
        return function (e) {
            var pos = utils.getCanvasRelative(e);
            e.preventDefault();
            cross(e);
            game.userDown = true;
            // cycle weapons
            var b = gameMod.buttons.changeWeapon,
            d = utils.distance(pos.x, pos.y, b.x, b.y);
            if (d < b.r) {
                game.weaponIndex += 1;
                game.weaponIndex %= Weapons.length;
            }
        };
    };

    var userPointerEnd = function (game) {
        var cross = crossMod.createEvent(game.cross, 'end');
        return function (e) {
            e.preventDefault();
            cross(e);
            game.userDown = false;
        };
    };

    var userPointerMove = function (game) {
        var cross = crossMod.createEvent(game.cross, 'move');
        return function (e) {
            e.preventDefault();
            cross(e);
        };
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
        //modes: ['shoot', 'move'],
        setRandomTarget: function (game) {

            var ch = game.cross.crosshairs,
            os = game.cross.offset,
            ap = game.autoPlay,
            map = game.map,
            x = Math.floor(map.cellWidth * Math.random()),
            y = Math.floor(map.cellHeight * Math.random());

            ap.target.x = (map.cellSize / 2 + (map.cellSize * x)) * -1;
            ap.target.y = (map.cellSize / 2 + (map.cellSize * y)) * -1;

        },
        update: function (game, secs) {

            var ch = game.cross.crosshairs,
            os = game.cross.offset,
            ap = game.autoPlay;

            game.autoPlay.delay -= secs;
            if (game.userDown) {
                game.autoPlay.delay = game.autoPlay.maxDelay;
            }
            game.autoPlay.delay = game.autoPlay.delay < 0 ? 0 : game.autoPlay.delay;
            if (game.autoPlay.delay === 0) {

                // if shoot mode
                if (ap.mode === 'shoot') {
                    ch.x = game.cross.center.x;
                    ch.y = game.cross.center.y;

                    shoot(game);
                    ap.shootTime -= secs;
                    if (ap.shootTime <= 0) {
                        ap.mode = 'move';
                        autoPlay.setRandomTarget(game);
                    }
                }

                if (ap.mode === 'move') {

                    var a = Math.atan2(os.y - ap.target.y, os.x - ap.target.x),
                    d = utils.distance(os.x, os.y, ap.target.x, ap.target.y),
                    delta = game.cross.radiusOuter - 1;

                    if (d < 32) {
                        delta = game.cross.radiusInner + 32 * (d / 32) + 5;
                    }
                    if (d < 1) {
                        os.x = ap.target.x;
                        os.y = ap.target.y;
                    } else {
                        ch.x = game.cross.center.x + Math.cos(a) * delta;
                        ch.y = game.cross.center.y + Math.sin(a) * delta;
                    }
                    if (d === 0) {
                        ap.shootTime = ap.maxShootTime;
                        ap.mode = 'shoot';
                    }

                }
            }
        }
    }

    return {
        Weapons: Weapons,
        buttons: {
            changeWeapon: {
                x: 280,
                y: 32,
                r: 16
            }
        },
        create: function (opt) {
            opt = opt || {};
            var game = {
                ver: '0.7.0',
                canvas: canvas,
                map: mapMod.create(),
                cross: {},
                shots: poolMod.create(shotOptions),
                explosions: poolMod.create(explosionOptions),
                shotRate: 1,
                shotSecs: 0,
                weaponIndex: 0,
                totalDamage: 0,
                userDown: false,
                autoPlay: {
                    delay: 0,
                    maxDelay: 3,
                    mode: 'move',
                    shootTime: 3,
                    maxShootTime: 3,
                    target: {
                        x: -16,
                        y: -16
                    }
                }
            };

            game.cross = crossMod.create({
                    offsetX: game.map.cellWidth * game.map.cellSize / 2 * -1,
                    offsetY: game.map.cellHeight * game.map.cellSize / 2 * -1,
                });

            // main game events
            game.canvas.addEventListener('mousedown', userPointerStart(game));
            game.canvas.addEventListener('mousemove', userPointerMove(game));
            game.canvas.addEventListener('mouseup', userPointerEnd(game));
            game.canvas.addEventListener('touchstart', userPointerStart(game));
            game.canvas.addEventListener('touchmove', userPointerMove(game));
            game.canvas.addEventListener('touchend', userPointerEnd(game));

            return game;

        },

        update: function (game, secs) {
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
