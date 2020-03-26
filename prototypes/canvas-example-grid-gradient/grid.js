// GRID
var Grid = function (opt) {
    opt = opt || {};

    this.gridWidth = opt.gridWidth || 7;
    this.gridHeight = opt.gridHeight || 6;
    this.cellWidth = opt.cellWidth || 7;
    this.cellHeight = opt.cellHeight || 6;
    this.cells = [];
    this.resetCells();
    this.lt = new Date();

    // setup objects
    this.objs = [];
    var i = 9,
    rand,
    r,
    g,
    b;
    while (i--) {
        rand = Math.random() * 0.75 + 0.25;
        r = rand;
        g = 0;
        b = 0;
        if (u.mod(i, 2) === 0) {
            r = 0;
            g = 0;
            b = rand;
        }
        if (u.mod(i, 3) === 0) {
            r = 0;
            g = rand;
            b = 0;
        }
        this.objs.push({
            x: this.gridWidth * Math.random(),
            y: this.gridHeight * Math.random(),
            radius: 7,
            power: [r, g, b],
            cps: 4,
            heading: Math.PI * 2 * Math.random()
        });
    }

    this.update();
};

// setup reset cells
Grid.prototype.resetCells = function () {
    this.cells = [];
    var ci = 0,
    cellObj,
    cLen = this.gridWidth * this.gridHeight;
    while (ci < cLen) {
        cellObj = {
            i: ci,
            y: Math.floor(ci / this.gridWidth),
            x: ci % this.gridWidth,
            color: [0, 0, 0, 1]
        };
        this.cells.push(cellObj);
        ci += 1;
    }
};

Grid.prototype.capCellColors = function () {
    this.cells.forEach(function (cell) {
        var c = cell.color;
        c[0] = Math.floor(c[0] > 255 ? 255 : c[0]);
    });
}

Grid.prototype.update = function () {

    var grid = this,
    now = new Date(),
    t = now - grid.lt,
    secs = t / 1000;

    // reset
    grid.resetCells();
    // increase color channel values for objects
    grid.objs.forEach(function (obj) {
        obj.x += Math.cos(obj.heading) * obj.cps * secs;
        obj.y += Math.sin(obj.heading) * obj.cps * secs;
        obj.x = u.mod(obj.x, grid.gridWidth);
        obj.y = u.mod(obj.y, grid.gridHeight);
        grid.cells.forEach(function (cell) {
            d = u.distance(cell.x, cell.y, obj.x, obj.y);
            if (d <= obj.radius) {
                var per = 1 - d / obj.radius;
                var c = cell.color;
                c[0] += Math.floor(255 * per * obj.power[0]);
                c[1] += Math.floor(255 * per * obj.power[1]);
                c[2] += Math.floor(255 * per * obj.power[2]);
            }
        });
    });
    grid.capCellColors();

    grid.lt = now;

};
