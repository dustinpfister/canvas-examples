var world = (function () {

    var CELL_VALUES = {
        sx: 32,
        sy: 32,
        size: 32
    };

    // hard coded initObjects
    // this can be extend via a plug-in
    var init = {
        defaultValues: {
            before: function (state) {
                //console.log('defualt values before hook');

            },
            forCell: function (state, events, cell) {
                cell.x = cell.i % state.width;
                cell.y = Math.floor(cell.i / state.width);
                //console.log('default values forCell: ' + JSON.stringify(cell));
            },
            after: function (state) {
                //console.log('default values after hook');
            }
        }
    };

    // events and forTick objects
    var events = {};
    var ticks = {};

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
                lt: new Date(),
                yearRate: 1,
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

            if (plug.tick) {
                ticks[plug.key] = plug.tick;
            }

            console.log('plugin: ' + plug.key + ' loaded.');
            console.log(init);
            console.log(events);
            console.log(ticks);

        },

        // tick year, and update world state for new year
        update: function (state) {

            var now = new Date(),
            t = now - state.lt,
            years = 0,
            secs = t / 1000;

            if (secs >= state.yearRate) {
                years = Math.floor(secs / state.yearRate);
                state.year += years;
                state.lt = new Date(now - secs % state.yearRate * 1000);

                Object.keys(ticks).forEach(function (plugKey) {

                    var tick = ticks[plugKey];
                    if (tick.before) {
                        tick.before(state, events, state.year);
                    }
                    if (tick.forCell) {
                        state.cells.forEach(function (cell) {
                            tick.forCell(state, events, state.year, cell);
                        });
                    }
                    if (tick.after) {
                        tick.after(state, events, state.year);
                    }

                });

            }
        }
    }
}
    ());
