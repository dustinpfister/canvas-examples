var mapMod = (function () {

    var cellTypes = [{
            i: 0,
            type: 'grass',
            HP: {
                min: 5,
                max: 10,
                base: 1.05
            },
            autoHeal: {
                rate: 0.5,
                amount: 1
            }
        }, {
            i: 1,
            type: 'tree',
            HP: {
                min: 20,
                max: 30,
                base: 1.08
            },
            autoHeal: {
                rate: 1,
                amount: 5
            }
        }, {
            i: 2,
            type: 'rock',
            HP: {
                min: 35,
                max: 50,
                base: 1.15
            },
            autoHeal: {
                rate: 3,
                amount: 50
            }
        }
    ];

    // set a cell as a given type index
    var setCellType = function (cell, typeIndex, opt) {

        var level = cell.levelObj.level,
        min,
        max;
        opt = opt || {};
        typeIndex = typeIndex === undefined ? Math.round(cell.damagePer * (cellTypes.length - 1)) : typeIndex;
        // set type and type index by way o given type index
        cell.type = cellTypes[typeIndex];
        cell.typeIndex = typeIndex;
        // active flag should typically be set to true
        cell.active = opt.active === undefined ? true : opt.active;
        // HP
        //cell.maxHP = cell.type.HP.min + Math.round((cell.type.HP.max - cell.type.HP.min) * Math.random());
        min = Math.pow(level, cell.type.HP.base) * cell.type.HP.min;
        max = Math.pow(level, cell.type.HP.base) * cell.type.HP.max;
        cell.maxHP = min + Math.round((max - min) * Math.random());
        cell.HP = opt.HP === undefined ? cell.maxHP : opt.HP;
        // autoHeal
        cell.autoHeal.rate = cell.type.autoHeal.rate;
        cell.autoHeal.amount = cell.type.autoHeal.amount;
    };
    var getHighestDamageCell = function (map) {
        return Math.max.apply(null, map.cells.map(function (cell) {
                return cell.damage;
            }));
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
                // activate 1 to map.gen.count cells
                while (i--) {
                    cell = popRandomCell(cells);
                    setCellType(cell);
                }
            } else {
                // if no active cells
                cells = getAllCellActiveState(map, true);
                if (cells.length === 0) {
                    cell = map.cells[map.gen.startCells[Math.floor(Math.random() * map.gen.startCells.length)]];
                    setCellType(cell);
                }
            }
        }
    };
    // STARTING DAMAGE
    var blastArea = function (map, x, y, r, maxDamage) {
        var cx,
        cy = y - r,
        d,
        cell;
        while (cy < y + r) {
            cx = x - r;
            while (cx < x + r) {
                cell = get(map, cx, cy);
                d = utils.distance(cx, cy, x, y);
                if (cell && d <= r) {
                    cell.damage += (1 - d / r) * maxDamage;
                }
                cx += 1;
            }
            cy += 1;
        }
        api.update(map, 0);
    };
    var startBlasts = function (map, opt) {
        opt = opt || {};
        var rMin = opt.blastRMin || map.cellWidth / 4,
        rMax = opt.blastRMax || map.cellWidth / 2,
        r = rMin + Math.round((rMax - rMin) * Math.random()),
        blastCount = opt.blastCount === undefined ? 10 : opt.blastCount,
        maxDamage = opt.blastMaxDamage || 10,
        x,
        y,
        i = 0;
        while (i < blastCount) {
            x = Math.floor(map.cellWidth * Math.random());
            y = Math.floor(map.cellHeight * Math.random());
            blastArea(map, x, y, r, maxDamage);
            i += 1;
        }
    };
    // PUBLIC API
    var api = {
		get: get,
        getAllCellActiveState: getAllCellActiveState,
        create: function (opt) {
            opt = opt || {};
            // create map object
            var map = {
                cellSize: 32,
                cellWidth: opt.cellWidth || 8,
                cellHeight: opt.cellHeight || 8,
                cells: [],
                cellLevel: {
                    cap: opt.cellLevelCap || 10,
                    deltaNext: opt.cellDeltaNext || 200
                },
                percentRemain: 1,
                gen: { // global cell generate values
                    rate: opt.genRate || 0.2,
                    secs: 0,
                    count: opt.genCount || 6,
                    // start cells for 32 x 16
                    // startCells: [0, 31, 480, 511] // corner cells
                    // startCells: [239, 240, 271, 272]// center cells
                    // startCells: [239, 240, 271, 272]
                    // 8 * 8 start cells
                    // [27, 28, 35, 36, 0, 63, 56, 7]
                    startCells: opt.startCells || [0]
                },
                highDamageCell: 0
            };
            // setup cells for first time
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
                    active: false,
                    typeIndex: 0,
                    typeName: cellTypes[0].name,
                    type: cellTypes[0],
                    autoHeal: {
                        rate: 1,
                        amount: 5,
                        secs: 0
                    },
                    damage: opt.startingCellDamage || 0,
                    damagePer: 0, // damage relative to highest damaged cell
                    levelObj: XP.parseByXP(0, map.cellLevel.cap, map.cellLevel.deltaNext)
                };
                //setCellType(cell, 0);
                map.cells.push(cell);
                i += 1;
            }
            // call an update to make sure certain values like damage per are set
            api.update(map, 0);

            // start damage
            startBlasts(map, opt);

            // starting types
            i = 0;
            while (i < len) {
                cell = map.cells[i];
                setCellType(cell);
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
            var i,
            cell;
            map.highDamageCell = getHighestDamageCell(map);
            map.percentRemain = 0;
            // update cells
            i = map.cells.length;
            while (i--) {
                cell = map.cells[i];
                // if HP is bellow or equal to zero set cell inactive
                if (cell.HP <= 0) {
                    cell.active = false;
                }
                // if cell is active
                if (cell.active) {
                    // apply auto heal
                    autoHeal(cell, secs);
                    // update percentRemain
                    map.percentRemain += cell.HP / cell.maxHP;
                }
                // figure damage percent
                if (cell.damage != 0) {
                    cell.damagePer = cell.damage / map.highDamageCell;
                }
                // update level
                cell.levelObj = XP.parseByXP(cell.damage, map.cellLevel.cap, map.cellLevel.deltaNext);

            }
            // figure percentRemain by diving tabulated total by total cells
            map.percentRemain /= map.cells.length;
            gen(map, secs);
        }
    };
    return api;
}
    ());
