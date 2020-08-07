var mapMod = (function () {

    var get = function (map, x, y) {
        return map.cells[y * map.cellWidth + x];
    };

    // auto heal a cell
    var autoHeal = function (cell, secs) {
        cell.autoHeal.secs += secs;
        if (cell.autoHeal.secs >= cell.autoHeal.rate) {
            cell.autoHeal.secs %= cell.autoHeal.rate;
            cell.HP += cell.autoHeal.amount;
            cell.HP = cell.HP > cell.maxHP ? cell.maxHP : cell.HP;
        }
    };

    return {

        create: function () {
            var map = {
                cellSize: 32,
                cellWidth: 32,
                cellHeight: 16,
                cells: [],
                percentRemain: 1
            };
            var i = 0,
            x,
            y,
            len = map.cellWidth * map.cellHeight;
            while (i < len) {
                map.cells.push({
                    i: i,
                    x: i % map.cellWidth,
                    y: Math.floor(i / map.cellWidth),
                    HP: 100,
                    maxHP: 100,
                    active: true,
                    autoHeal: {
                        rate: 0.5,
                        amount: 1,
                        secs: 0
                    }
                });
                i += 1;
            }
            return map;
        },

        clampOffset: function (map, offset) {
            offset.x = offset.x > 0 ? 0 : offset.x;
            offset.y = offset.y > 0 ? 0 : offset.y;
            offset.x = offset.x < map.cellWidth * map.cellSize * -1 ? map.cellWidth * map.cellSize * -1 : offset.x;
            offset.y = offset.y < map.cellHeight * map.cellSize * -1 ? map.cellHeight * map.cellSize * -1 : offset.y;
        },

        // get all cells from a given cell position, and radius from that position
        getAllFromPointAndRadius: function (map, x, y, r) {
            //??? just do it the stupid way for now
            var i = map.cells.length,
            d,
            cell,
            cells = [],
            dists = [];
            while (i--) {
                cell = map.cells[i];
                d = utils.distance(cell.x, cell.y, x, y);
                if (d <= r) {
                    cells.push(cell);
                    dists.push(d);
                }
            }
            return {
                cells: cells,
                dists: dists
            };
        },

        getWithCanvasPointAndOffset: function (map, canvasX, canvasY, offsetX, offsetY) {
            var x = canvasX - 160 + Math.abs(offsetX),
            y = canvasY - 120 + Math.abs(offsetY);
            return get(map, Math.floor(x / map.cellSize), Math.floor(y / map.cellSize));
        },

        update: function (map, secs) {
            var i = map.cells.length,
            cell;
            while (i--) {
                cell = map.cells[i];

                if (map.active) {
                    autoHeal(cell, secs);
                }
            }
        }
    }

}
    ());
