var world = (function () {

    var CELL_VALUES = {
        sx: 32,
        sy: 32,
        size: 32
    };

    var init = {

        defaultValues: {
            before: function (state) {
                console.log('defualt values before hook');
                state.cells = [];
            },
            forCell: function (cell, state) {

                cell.x = cell.i % state.width;
                cell.y = Math.floor(cell.i / state.width);
                cell.land = {};
                cell.air = {};

            },
            after: function (world) {}
        }

    };

    var callInitBeforeMethods = function (state) {
        Object.keys(init).forEach(function (initObjKey) {
            var initObj = init[initObjKey];
            if (initObj.before) {
                initObj.before(state);
            }
        });
    };

    // create cells for the world
    var createCells = function (state) {
        var i = 0,
        len = state.width * state.height,
        cell;

        callInitBeforeMethods(state);

        // for each cell
        while (i < len) {
            cell = {};
            cell.i = i;
            // make sure we have hard coded default values
            init.defaultValues.forCell(cell, state);
            state.cells.push(cell);
            i += 1;
        }
    };

    // the public API
    return {
        CELL_VALUES: CELL_VALUES,

        // create a world state object
        create: function () {
            var state = {
                year: 0,
                cells: [],
                width: 10,
                height: 8
            };
            createCells(state);
            return state;
        },

        // load plug-in
        load: function (plug) {},

        // tick year, and update world state for new year
        tickYear: function (state) {

            state.year += 1;

        }
    }
}
    ());
