var world = (function () {

    var CELL_VALUES = {
        sx: 32,
        sy: 32,
        size: 32
    };

    // create cells for the world
    var createCells = function (state) {
        var i = 0,
        len = state.width * state.height,
        cell;
        state.cells = [];
        while (i < len) {
            cell = {};
            cell.i = i;
            cell.x = i % state.width;
            cell.y = Math.floor(i / state.width);
            cell.land = {};
            cell.air = {};
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
