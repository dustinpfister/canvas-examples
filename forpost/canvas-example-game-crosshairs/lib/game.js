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
            shotRate: 3,
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
        return function (e) {
            var pos = utils.getCanvasRelative(e);
            e.preventDefault();
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
        return function (e) {
            e.preventDefault();
            game.userDown = false;
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
                    cell.HP -= ex.data.maxDPS * (1 - (targets.dists[i] / blastRadius)) * secs;
                    cell.HP = cell.HP < 0 ? 0 : cell.HP;
                });
                // percent killed
                game.map.percentRemain = 0;
                game.map.cells.forEach(function (cell) {
                    game.map.percentRemain += cell.HP / cell.maxHP;
                });
                game.map.percentRemain /= game.map.cells.length;
            }
            ex.lifespan -= secs;
        }
    };

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
                ver: '0.4.0',
                canvas: canvas,
                map: mapMod.create(),
                cross: {},
                shots: poolMod.create(shotOptions),
                explosions: poolMod.create(explosionOptions),
                shotRate: 1,
                shotSecs: 0,
                weaponIndex: 1,
                userDown: false
            };

            game.cross = crossMod.create({
                    offsetX: game.map.cellWidth * game.map.cellSize / 2 * -1,
                    offsetY: game.map.cellHeight * game.map.cellSize / 2 * -1,
                });

            // cross events
            game.canvas.addEventListener('mousedown', crossMod.createEvent(game.cross, 'start'));
            game.canvas.addEventListener('mouseup', crossMod.createEvent(game.cross, 'end'));
            game.canvas.addEventListener('mousemove', crossMod.createEvent(game.cross, 'move'));
            game.canvas.addEventListener('touchstart', crossMod.createEvent(game.cross, 'start'));
            game.canvas.addEventListener('touchend', crossMod.createEvent(game.cross, 'end'));
            game.canvas.addEventListener('touchmove', crossMod.createEvent(game.cross, 'move'));

            // main game events
            game.canvas.addEventListener('mousedown', userPointerStart(game));
            game.canvas.addEventListener('mouseup', userPointerEnd(game));
            game.canvas.addEventListener('touchstart', userPointerStart(game));
            game.canvas.addEventListener('touchend', userPointerEnd(game));

            return game;

        },

        update: function (game, secs) {
            var w = Weapons[game.weaponIndex];
            game.shotRate = Weapons[game.weaponIndex].shotRate;

            crossMod.update(game.cross, secs);
            mapMod.clampOffset(game.map, game.cross.offset);
            poolMod.update(game.shots, game, secs);
            poolMod.update(game.explosions, game, secs);
            game.shotSecs += secs;
            game.shotSecs = game.shotSecs >= game.shotRate ? game.shotRate : game.shotSecs;

            // shoot
            if (game.shotSecs >= game.shotRate && game.userDown && crossMod.isInInner(game.cross) && game.cross.userDown) {
                var i = 0,
                radian;
                while (i < w.gunCount) {
                    radian = Math.PI * 2 / 4 * i + Math.PI / 4;
                    poolMod.spawn(game.shots, game, radian);
                    i += 1;
                }
                game.shotSecs = 0;
            }
        }

    }

}
    ());
