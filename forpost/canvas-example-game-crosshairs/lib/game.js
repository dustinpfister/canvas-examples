var gameMod = (function () {

    return {

        create: function (canvas) {

            var game = {
                ver: '0.2.0',
                canvas: canvas,
                map: mapMod.create(),
                cross: {}
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

            return game;

        },

        update: function (game, secs) {
            crossMod.update(game.cross, secs);
            mapMod.clampOffset(game.map, game.cross.offset);
        }

    }

}
    ());
