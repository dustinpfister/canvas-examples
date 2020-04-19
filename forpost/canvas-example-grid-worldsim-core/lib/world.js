var world = (function () {

    var CELL_VALUES = {
        sx: 32,
        sy: 32,
        size: 32
    };

    var events = {};

    // hard coded initObjects
    // this can be extend via a plug-in
    var init = {
        defaultValues: {
            before: function (state) {
                console.log('defualt values before hook');
                //state.cells = [];
            },
            forCell: function (state, events, cell) {
                cell.x = cell.i % state.width;
                cell.y = Math.floor(cell.i / state.width);
                console.log('default values forCell: ' + JSON.stringify(cell));
            },
            after: function (state) {
                console.log('default values after hook');
            }
        }
    };

    // call a hook
    var callHook = function (state, initObjKey, hookName, cell) {
        hookName = hookName || 'before';
        initObjKey = initObjKey || 'defaultValues';
        var initObj = init[initObjKey];
        if (initObj[hookName]) {
            initObj[hookName](state, events, cell);
        }
    };

    // create cells for the world
    var createCells = function (state) {
        var i = 0,
        len = state.width * state.height,
        cell;
        // set up cells with just index prop
        state.cells = [];
        while (i < len) {
            cell = {};
            cell.i = i;
            state.cells.push(cell);
            i += 1;
        }
        // call init methods for each initObj
        Object.keys(init).forEach(function (initObjKey) {
            callHook(state, initObjKey, 'before');
            i = 0;
            while (i < len) {
                callHook(state, initObjKey, 'forCell', state.cells[i]);
                i += 1;
            }
            callHook(state, initObjKey, 'after');
        });
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
        load: function (plug) {
            // just ref it in for now as long as that works
            if (plug.init) {
                init[plug.key] = plug.init;
            }

            if (plug.events) {
                Object.keys(plug.events).forEach(function (eventKey) {
                    events[eventKey] = plug.events[eventKey];
                });
            }

            console.log('plugin: ' + plug.key + ' loaded.');
            console.log(init);
            console.log(events);

        },

        // tick year, and update world state for new year
        tickYear: function (state) {
            state.year += 1;
        }
    }
}
    ());
