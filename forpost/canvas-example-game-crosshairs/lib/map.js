var mapMod = (function () {

    var cellTypes = [{
            i: 0,
            type: 'grass',
            HP: {
                min: 100,
                max: 500
            }
        }
    ];

    var setCellType = function (cell, typeIndex) {
        cell.type = cellTypes[typeIndex];
        cell.maxHP = cell.type.HP.min + Math.round((cell.type.HP.max - cell.type.HP.min) * Math.random());
    };

    // get cell method
    var get = function (map, x, y) {
        if (x < 0 || y < 0) {
            return undefined;
        }
        if (x >= map.cellWidth || y >= map.cellHeight) {
            return undefined;
        }
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

    // get border cells helper
    var getBorderCells = function (map, cell) {
        var i = 8,
        borderCell,
        cells = [],
        r,
        x,
        y;
        if (!cell) {
            return [];
        }
        while (i--) {
            r = Math.PI * 2 / 8 * i;
            x = Math.round(cell.x + Math.cos(r));
            y = Math.round(cell.y + Math.sin(r));
            borderCell = get(map, x, y);
            if (borderCell) {
                cells.push(borderCell);
            }

        }
        return cells;
    };

    // get the count of active border cells for the given cell and active status
    var getBorderCellsActiveCount = function (map, cell, active) {
        active === undefined ? true : active;
        var borderCells = getBorderCells(map, cell);
        return borderCells.reduce(function (acc, cell) {
            acc = typeof acc === 'object' ? Number(acc.active === active) : acc;
            return acc += Number(cell.active == active);
        });
    };

    // get all cells with an active state of true or false, and also filter farther with an
    // optional condition
    var getAllCellActiveState = function (map, active, condition) {
        active = active === undefined ? true : active;
        condition = condition === undefined ? function (cell) {
            return true;
        }
         : condition;
        return map.cells.filter(function (cell) {
            if (cell.active === active && condition(map, cell)) {
                return true;
            }
            return false;
        });
    };

    // condition for gen cells
    var condition_gen_cell = function (map, cell) {
        var borderCells = getBorderCells(map, cell);
        return getBorderCellsActiveCount(map, cell, true) >= 1;
    };

    // get all potential gen cells
    var getGenCells = function (map) {
        return getAllCellActiveState(map, false, condition_gen_cell);
    };

    var popRandomCell = function (cells) {
        var i = Math.floor(Math.random() * cells.length);
        return cells.splice(i, 1)[0];
    };

    // generate new cells by way of given secs amount
    var gen = function (map, secs) {

        var cells,
        cell,
        i;

        map.gen.secs += secs;
        if (map.gen.secs >= map.gen.rate) {
            map.gen.secs %= map.gen.rate;
            cells = getGenCells(map);
            i = map.gen.count;
            if (cells.length - i < 0) {
                i = cells.length;
            }
            if (i > 0) {
                while (i--) {
                    cell = popRandomCell(cells);
                    cell.active = true;
                    cell.HP = 1;
                    setCellType(cell, 0);
                }
            } else {

                cells = getAllCellActiveState(map, true);
                if (cells.length === 0) {

                    cell = map.cells[map.gen.startCells[Math.floor(Math.random() * map.gen.startCells.length)]];

                    cell.active = true;
                    cell.HP = 1;
                    setCellType(cell, 0);

                }

            }

        }
    };

    return {

        create: function () {
            var map = {
                cellSize: 32,
                cellWidth: 32,
                cellHeight: 16,
                cells: [],
                percentRemain: 1,
                gen: { // global cell generate values
                    rate: 5,
                    secs: 0,
                    count: 4,
                    startCells: [0, 31, 480, 511]
                }
            };
            var i = 0,
            cell,
            x,
            y,
            len = map.cellWidth * map.cellHeight;
            while (i < len) {
                cell = {
                    i: i,
                    x: i % map.cellWidth,
                    y: Math.floor(i / map.cellWidth),
                    HP: 50,
                    maxHP: 100,
                    active: true,
                    typeIndex: 0,
                    typeName: cellTypes[0].name,
                    type: cellTypes[0],
                    autoHeal: {
                        rate: 0.5,
                        amount: 1,
                        secs: 0
                    }
                };
                setCellType(cell, 0);
                map.cells.push(cell);
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

                if (cell.HP <= 0) {
                    cell.active = false;
                }

                if (cell.active) {
                    autoHeal(cell, secs);
                }
            }

            gen(map, secs);
        }
    }

}
    ());
