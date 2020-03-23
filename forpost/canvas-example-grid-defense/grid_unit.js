// ENEMY OBJECT CLASS
var Enemy = function (opt) {
    this.board = opt.board || new UnitGrid();
    this.cell = opt.cell || {};
    this.ticksPerMove = 8;
    this.ticks = 0;
};
// update and enemy
Enemy.prototype.update = function (ticks) 
    this.ticks += ticks;
    // move to next
    if (this.ticks >= this.ticksPerMove) {
        var target = this.board.getCell(Math.floor(this.cell.x - 1), this.cell.y);
        if (target) {
            if (!target.enemy) {
                this.cell.enemy = false;
                target.enemy = this;
                this.cell = target;
            }
        } else {
            this.board.hits += 1;
            this.cell.enemy = false;
        }
        this.ticks = 0;
    }
};
// UNIT GRID CLASS
var UnitGrid = function (opt) {
    opt = opt || {};
    // same base properties
    Object.assign(this, new Grid(opt));
    this.maxEnemies = opt.maxEnemies || 5;
    this.tickRate = opt.tickRate === undefined ? 1000 / 4 : opt.tickRate;
    this.enemyCount = 0;
    this.lastTick = new Date();
    this.hits = 0; // times hit by an enemy
    this.kills = 0; // number of kills of enemies

};
UnitGrid.prototype = Object.create(new Grid());
// spawn a new enemy
UnitGrid.prototype.spawn = function () {
    if (this.enemyCount < this.maxEnemies) {
        var y = 0,
        len = this.cellHeight,
        options = [],
        cell;
        while (y < len) {
            cell = this.getCell(this.cellWidth - 1, y);
            if (!cell.enemy) {
                options.push(cell);
            }
            y += 1;
        }
        if (options.length > 0) {
            cell = options[Math.floor(Math.random() * options.length)];
            cell.enemy = new Enemy({
                    board: this,
                    cell: cell
                });
        }
    }
};
// update board
UnitGrid.prototype.update = function () {
    var i = 0,
    now = new Date(),
    t = now - this.lastTick,
    ticks = t / this.tickRate,
    len = this.cells.length,
    cell;
    // update cells if ticks >= 1
    if (ticks >= 1) {
        this.enemyCount = 0;
        while (i < len) {
            cell = this.cells[i];
            if (cell.enemy) {
                this.enemyCount += 1;
                cell.enemy.update(ticks);
            }
            i += 1;
        }
        this.spawn();
        this.lastTick = now;
    }
};
