var world = (function () {

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
            state.cells.push(cell);
            i += 1;
        }
    };

    // the public API
    return {
        create: function () {
            var state = {
                year: 0,
                cells: [],
                width: 16,
                height: 16
            };
            createCells(state);
            return state;
        },
        update: function () {}
    }
}
    ());
