var gameMod = (function () {

    var shotOptions = {
        count: 20,
        // when a shot becomes active
        spawn: function (shot, game) {
            var offset = game.cross.offset,
            ch = game.cross.crosshairs,
            d;
            shot.x = game.canvas.width;
            shot.y = game.canvas.height;
            shot.heading = Math.atan2(ch.y - shot.y, ch.x - shot.x);
            d = utils.distance(shot.x, shot.y, ch.x, ch.y);
            shot.pps = 256;
            shot.lifespan = d / shot.pps;
            shot.offset = offset;
        },
        // when a shot becomes inactive
        purge: function (shot, game) {
            var cell = mapMod.getWithCanvasPointAndOffset(game.map, shot.x, shot.y, shot.offset.x, shot.offset.y);
            if (cell) {
                cell.HP -= 5;
                cell.HP = cell.HP < 0 ? 0 : cell.HP;
                // percent killed
                game.map.percentKilled = 0;
                game.map.cells.forEach(function (cell) {
                    game.map.percentKilled += cell.HP / cell.maxHP;
                });
                game.map.percentKilled /= game.map.cells.length;
            }
        },
        // update method for a shot
        update: function (shot, game, secs) {
            shot.x += Math.cos(shot.heading) * shot.pps * secs;
            shot.y += Math.sin(shot.heading) * shot.pps * secs;
            shot.lifespan -= secs;
        }
    };

    return {

        create: function (opt) {
            opt = opt || {};
            var game = {
                ver: '0.2.0',
                canvas: canvas,
                map: mapMod.create(),
                cross: {},
                shots: poolMod.create(shotOptions),
                shotRate: 0.125,
                shotSecs: 0,
                userDown: false
            };

            game.cross = crossMod.create({
                    offsetX: game.map.cellWidth * game.map.cellSize / 2 * -1,
                    offsetY: game.map.cellHeight * game.map.cellSize / 2 * -1,
                });

            game.canvas.addEventListener('mousedown', crossMod.createEvent(game.cross, 'start'));
            game.canvas.addEventListener('mouseup', crossMod.createEvent(game.cross, 'end'));
            game.canvas.addEventListener('mousemove', crossMod.createEvent(game.cross, 'move'));

            game.canvas.addEventListener('touchstart', crossMod.createEvent(game.cross, 'start'));
            game.canvas.addEventListener('touchend', crossMod.createEvent(game.cross, 'end'));
            game.canvas.addEventListener('touchmove', crossMod.createEvent(game.cross, 'move'));

            game.canvas.addEventListener('mousedown', function (e) {
                e.preventDefault();
                game.userDown = true;
            });
            game.canvas.addEventListener('mouseup', function (e) {
                e.preventDefault();
                game.userDown = false;
            });
            game.canvas.addEventListener('touchstart', function (e) {
                e.preventDefault();
                game.userDown = true;
            });
            game.canvas.addEventListener('touchend', function (e) {
                e.preventDefault();
                game.userDown = false;
            });

            return game;

        },

        update: function (game, secs) {
            crossMod.update(game.cross, secs);
            mapMod.clampOffset(game.map, game.cross.offset);
            poolMod.update(game.shots, game, secs);
            game.shotSecs += secs;
            game.shotSecs = game.shotSecs >= game.shotRate ? game.shotRate : game.shotSecs;
            if (game.shotSecs >= game.shotRate && game.userDown && crossMod.isInInner(game.cross)) {
                poolMod.spawn(game.shots, game);
                game.shotSecs = 0;
            }
        }

    }

}
    ());
