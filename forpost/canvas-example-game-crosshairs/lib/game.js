var gameMod = (function () {

    var shotOptions = {
        count: 20,
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
        purge: function (shot, game) {
			console.log(shot);
            var cell = mapMod.getWithCanvasPointAndOffset(game.map, shot.x, shot.y, shot.offset.x, shot.offset.y);
            console.log(cell);
        },
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

            // attack!
            /*
            var attack = function (e) {
            var pos = utils.getCanvasRelative(e),
            cell = mapMod.getWithCross(game.map, game.cross, pos.x, pos.y);
            e.preventDefault();
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
            };
            game.canvas.addEventListener('mousedown', attack);
            game.canvas.addEventListener('touchstart', attack);
             */

            game.canvas.addEventListener('mousedown', function (e) {
                //var pos = utils.getCanvasRelative(e);
                //if (game.shotSecs >= game.shotRate) {
                //    poolMod.spawn(game.shots, game);
                //    game.shotSecs = 0;
                //}
                game.userDown = true;
            });
            game.canvas.addEventListener('mouseup', function (e) {
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
            if (game.shotSecs >= game.shotRate && game.userDown) {
                poolMod.spawn(game.shots, game);
                game.shotSecs = 0;
            }
        }

    }

}
    ());
