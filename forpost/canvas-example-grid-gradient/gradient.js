// GRID

var gradient = (function () {

    // object update methods
    var objUpdaters = [];

    var initMethods = {
        objDefaults: function (obj, grad, i) {
            obj.x = 0;
            obj.y = 0;
            obj.radius = 5;
            obj.power = [1, 1, 1, 1];
            obj.cps = 0;
            obj.heading = 1;
            obj.objUpdaterIndex = 0;
            obj.radiusDir = 1;
        }
    };

    var Grid = function (opt) {
        opt = opt || {};

        var grad = this;

        this.gridWidth = opt.gridWidth || 7;
        this.gridHeight = opt.gridHeight || 6;
        this.cellWidth = opt.cellWidth || 7;
        this.cellHeight = opt.cellHeight || 6;
        this.MIN_CPS = opt.MIN_CPS || 0.25;
        this.MAX_CPS = opt.MAX_CPS || 1.5;
        this.MIN_RADIUS = opt.MIN_RADIUS || 3;
        this.MAX_RADIUS = opt.MAX_RADIUS || 5;
        this.cells = [];
        this.resetCells();
        this.lt = new Date();

        this.initMethods = initMethods;
        this.objUpdaters = objUpdaters;

        // setup objects
        this.objs = [];
        var i = opt.objCount || 5,
        rand,
        r,
        g,
        b;

        // create objects With init method(s)
        while (i--) {
            var obj = {};
            initMethods.objDefaults(obj, grad, i);
            if (opt.initMethod) {
                if (typeof opt.initMethod === 'string') {
                    initMethods[opt.initMethod](obj, grad, i);
                }
                if (typeof opt.initMethod === 'object') {
                    opt.initMethod.forEach(function (initMethodKey) {
                        initMethods[initMethodKey](obj, grad, i);
                    });
                }
            }
            this.objs.push(obj);
        }
        // update for the first time
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

    var upCellColor = function (grid, cell, obj, x, y) {

        d = u.distance(cell.x, cell.y, x, y);
        if (d <= obj.radius) {
            var per = 1 - d / obj.radius;
            var c = cell.color;
            c[0] += Math.floor(255 * per * obj.power[0]);
            c[1] += Math.floor(255 * per * obj.power[1]);
            c[2] += Math.floor(255 * per * obj.power[2]);
        }

    };

    Grid.prototype.update = function () {

        var grid = this,
        now = new Date(),
        t = now - grid.lt,
        secs = t / 1000;

        // reset
        grid.resetCells();
        // increase color channel values for objects
        grid.objs.forEach(function (obj) {
            // call updater
            var updater = objUpdaters[obj.objUpdaterIndex];
            if (updater) {
                updater(grid, obj, secs);
            }
            obj.x += Math.cos(obj.heading) * obj.cps * secs;
            obj.y += Math.sin(obj.heading) * obj.cps * secs;
            obj.x = u.mod(obj.x, grid.gridWidth);
            obj.y = u.mod(obj.y, grid.gridHeight);
            grid.cells.forEach(function (cell) {

                upCellColor(grid, cell, obj, obj.x - grid.gridWidth, obj.y);
                upCellColor(grid, cell, obj, obj.x + grid.gridWidth, obj.y);
                upCellColor(grid, cell, obj, obj.x, obj.y - grid.gridHeight);
                upCellColor(grid, cell, obj, obj.x, obj.y + grid.gridHeight);
                upCellColor(grid, cell, obj, obj.x - grid.gridWidth, obj.y - grid.gridHeight);
                upCellColor(grid, cell, obj, obj.x + grid.gridWidth, obj.y + grid.gridHeight);
                upCellColor(grid, cell, obj, obj.x - grid.gridWidth, obj.y + grid.gridHeight);
                upCellColor(grid, cell, obj, obj.x + grid.gridWidth, obj.y - grid.gridHeight);

                upCellColor(grid, cell, obj, obj.x, obj.y);
            });
        });
        grid.capCellColors();

        grid.lt = now;

    };

    return {
        Grid: Grid,
        load: function (plug) {

            // load any init methods
            for (var key in plug.initMethods) {
                initMethods[key] = plug.initMethods[key];
            }

            // load any update methods
            objUpdaters = objUpdaters.concat(plug.objUpdaters || []);
        }
    };

}
    ());
