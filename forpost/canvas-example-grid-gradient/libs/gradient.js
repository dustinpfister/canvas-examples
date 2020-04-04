// GRID

var gradient = (function () {

    // object update methods
    //var objUpdaters = [];
    var objUpdaters = {
        objDefaults: function (grid, obj, secs) {
            obj.cps = 0;
            //obj.heading += Math.PI / 180 * 5 * secs;
            //obj.heading %= Math.PI * 2;
        }
    };

    var initMethods = {
        objDefaults: function (obj, grad, i) {
            obj.x = 0;
            obj.y = 0;
            obj.radius = 5;
            obj.power = [1, 1, 1, 1];
            obj.cps = 0;
            obj.heading = 1;
            //obj.objUpdaterIndex = 0;
            //obj.updaterList = ['objDefaults'];
            // default to all updaters in order of how they
            // appear in Object.keys
            obj.updaterList = Object.keys(objUpdaters);
            obj.radiusDir = 1;
        }
    };

    var Grid = function (opt) {
        opt = opt || {};
        var grad = this;
        grad.gridWidth = opt.gridWidth || 7;
        grad.gridHeight = opt.gridHeight || 6;
        grad.cellWidth = opt.cellWidth || 7;
        grad.cellHeight = opt.cellHeight || 6;
        grad.MIN_CPS = opt.MIN_CPS || 0.25;
        grad.MAX_CPS = opt.MAX_CPS || 1.5;
        grad.MIN_RADIUS = opt.MIN_RADIUS || 3;
        grad.MAX_RADIUS = opt.MAX_RADIUS || 5;
        grad.cells = [];
        grad.resetCells();
        grad.lt = new Date();

        // init methods
        grad.init = opt.init || ['objDefaults'];
        grad.initMethods = initMethods;

        // updaters
        grad.updaters = opt.updaters || ['objDefaults'];
        grad.objUpdaters = objUpdaters;

        //grad.objUpdaters = objUpdaters;
        // setup objects
        grad.objs = [];
        var i = opt.objCount || 5,
        rand,
        r,
        g,
        b;
        // create objects With init method(s)
        while (i--) {
            var obj = {};
            // ensure calling defaults at least once
            initMethods.objDefaults(obj, grad, i);
            if (opt.init) {
                if (typeof opt.init === 'string') {
                    initMethods[opt.init](obj, grad, i);
                }
                if (typeof opt.init === 'object') {
                    opt.init.forEach(function (initMethodKey) {
                        initMethods[initMethodKey](obj, grad, i);
                    });
                }
            }
            grad.objs.push(obj);
        }
        // update for the first time
        grad.update();
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
                color: [0, 0, 0, 0]
            };
            this.cells.push(cellObj);
            ci += 1;
        }
    };

    Grid.prototype.capCellColors = function () {
        this.cells.forEach(function (cell) {
            var c = cell.color;
            c[0] = Math.floor(c[0] > 255 ? 255 : c[0]);
            c[1] = Math.floor(c[1] > 255 ? 255 : c[1]);
            c[2] = Math.floor(c[2] > 255 ? 255 : c[2]);
            c[3] = c[3] > 1 ? 1 : c[3];
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
            c[3] += per * obj.power[3];
        }
    };

    var applyUpdaterList = function (grid, obj, secs) {
        obj.updaterList.forEach(function (updaterKey) {
            objUpdaters[updaterKey](grid, obj, secs);
        });
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
            /*
            var updater = objUpdaters[obj.objUpdaterIndex];
            if (updater) {
            updater(grid, obj, secs);
            }
             */

            applyUpdaterList(grid, obj, secs);

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
        // cap colors and set lt to now
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
            for (var key in plug.objUpdaters) {
                objUpdaters[key] = plug.objUpdaters[key];
            }
            //objUpdaters = objUpdaters.concat(plug.objUpdaters || []);
        }
    };

}
    ());
